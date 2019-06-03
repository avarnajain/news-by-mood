import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

#ARTICLE FUNCTIONS
def get_sources_dict_db():
    """Get dict of all sources in db to pass as json"""
    article_sources = db.session.query(Article.source).group_by(Article.source
                    ).order_by(Article.source).all()
    sources_list = []
    for article in article_sources:
        source_dict = {
            'source':article.source
        }
        sources_list.append(source_dict)
    return sources_list

def get_sources_db():
    """Get list of all sources in db"""
    article_sources = db.session.query(Article.source).group_by(Article.source
                    ).order_by(Article.source).all()
    sources = []
    for article in article_sources:
        sources.append(article.source)
    return sources

def get_articles_for_source(source):
    """get all articles of specific source"""
    source_articles = Article.query.filter(Article.source==source).order_by(
                                                        Article.published).all()
    return source_articles

def get_articles_for_Category(category_id):
    """get all articles within a category"""

    category_ = get_category_obj(category_id)
    return category_.articles

#TONE FUNCTIONS
def get_tones_db():
    """get all tones"""
    tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)
    return tones

def get_tones_dict_db(tone_type):
    """get all tones as a dictionary for react stuff"""
    all_tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)
    tones = [tone for tone in all_tones if tone.tone_type==tone_type]
    tones_list = []
    for tone in tones:
        tone_dict = {
            'tone_id': tone.tone_id,
            'tone_name': tone.tone_name,
            'tone_type': tone.tone_type
        }
        tones_list.append(tone_dict)
    return tones_list

def get_Articles_with_tone_filter(tone_id, tone_type):
    """Return list of Articles with highest score for chosen emotion"""
    # get all scores with the chosen tone_id
    Tone_Scores = Score.query.filter(Score.tone_id==tone_id).all()
    # get all articles with the chosen tone_id
    Tone_Articles = [Score.article for Score in Tone_Scores]
    # get all Scores for chosen articles
    Article_Scores = [article.scores for article in Tone_Articles]
    Articles_list = []
    # Loop thorugh article_scores to 
    # find articles having chosen tone with highest score
    for scores in Article_Scores:
        for score in scores:
            if score.tone_id == tone_id:
                chosen_tone_score = score
                highest_score = score
        for score in scores:
            tone = score.tone
            if tone.tone_type == tone_type:
                if score.score > chosen_tone_score.score:
                    highest_score = score
        if chosen_tone_score == highest_score:
            Articles_list.append(score.article)
        else:
            continue
    return Articles_list

#SCORE FUNCTIONS
def find_Articles_with_duplicate_Scores():
    """find Articles with duplicate Scores"""
    Articles = db.session.query(Article).all()
    duplicate_Articles_list = []
    for article in Articles:
        duplicate_Scores_list = []
        for Score in article.scores:
            if Score.tone_id in duplicate_Scores_list:
                duplicate_Articles_list.append(article.article_id)
            else:
                duplicate_Scores_list.append(Score.tone_id)
    return set(duplicate_Articles_list)

def delete_duplicate_Scores():
    """check and remove duplicate scores from an Articles"""
    Articles = find_Articles_with_duplicate_Scores()
    for article_id in Articles:
        article = Article.query.get(article_id)
        Scores = article.scores
        tone_list = []
        for score in Scores:
            if score.tone_id in tone_list:
                score_id = score.score_id
                print(article_id, score.tone_id)
                Score.query.filter(Score.score_id==score_id).delete()            
                db.session.commit()
            else:
                tone_list.append(score.tone_id)

#CATEGORY FUNCTIONS
def get_all_categories():
    """Get a list of all categories"""
    categories = Category.query.all()
    return [category.category_id for category in categories]

def get_category_obj(category_id):
    """Get category object from db"""
    return Category.query.get(category_id)

def get_categories_dict_db():
    """Get a list of all categories"""
    all_categories = db.session.query(Category.category_id, Category.category_name)
    category_list = []
    for category in all_categories:
        category_dict = {
            'category_id': category.category_id,
            'category_name': category.category_name,
        }
        category_list.append(category_dict)
    return category_list

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")
