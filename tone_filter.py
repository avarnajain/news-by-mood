import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

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

def get_tone_db():
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

def sort_by_date(Article):

    datetime = Article['published']
    date = datetime.date()
    return date

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

def single_Article_dict_json(Article, filter_id, filter_type, filter_score=None):

    Categories = Article.categories
    categories = [Category.category_id for Category in Categories]
    Scores = Article.scores
    score_list = []
    for Score in Scores:
        tone = Score.tone_id
        Tone_ = Tone.query.get(tone)
        tone_type = Tone_.tone_type
        score = Score.score
        score_dict = {'tone': tone, 'score': score, 'type': tone_type}
        score_list.append(score_dict)
    
    Article_dict = {
        'article_id': Article.article_id,
        'category': categories,
        'url': Article.url,
        'author': Article.author,
        'title': Article.title,
        'source': Article.source,
        'image_url': Article.image_url,
        'published': Article.published,
        'description': Article.description,
        'filter_id': filter_id,
        'filter_type': filter_type,
        'filter_score': filter_score,
        'scores': score_list
    }
    return Article_dict

def get_Articles_with_tone_dict(tone_id, tone_type):
    """create json object to return"""

    Articles_list = get_Articles_with_tone_filter(tone_id, tone_type)
   
    articles = []
    for Article in Articles_list:
        scores = Article.scores
        filter_score = None
        for s in scores:
            if s.tone_id == tone_id:
                filter_score = s.score
        Article_dict = single_Article_dict_json(Article, tone_id, tone_type, filter_score)
        articles.append(Article_dict)
    
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)
    return Articles_by_date

def get_highest_Scoring_Article(tone_id, tone_type):
    """Get the highest scoring article for the day"""

    article = (db.session.query(Article)
                .join(Score)
                .filter(Score.tone_id==tone_id)
                .order_by(Article.published.desc(), Score.score.desc())
                .first())
    scores = article.scores
    filter_score = None
    for s in scores:
        if s.tone_id == tone_id:
            filter_score = s.score
    
    Article_dict = single_Article_dict_json(article, tone_id, tone_type, filter_score)

    return Article_dict

def get_top_headline_dict():
    """"""
    fear_article = get_highest_Scoring_Article('fear', 'emotional')
    sadness_article = get_highest_Scoring_Article('sadness', 'emotional')
    joy_article = get_highest_Scoring_Article('joy', 'emotional')
    anger_article = get_highest_Scoring_Article('anger', 'emotional')
    analytical_article = get_highest_Scoring_Article('analytical', 'language')
    confident_article = get_highest_Scoring_Article('confident', 'language')
    tentative_article = get_highest_Scoring_Article('tentative', 'language')

    return [joy_article, fear_article, sadness_article, anger_article,
            analytical_article, confident_article, tentative_article]

#################################################################
# Category queries

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

def get_Articles_with_category_filter(category_id):
    """Return list of Articles with highest score for chosen category"""

    Cat = Category.query.get(category_id)
    Articles = Cat.articles

    articles = []
    for Article in Articles:
        scores = Article.scores        
        Article_dict = single_Article_dict_json(Article, category_id, 'category')
        articles.append(Article_dict)
    
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)

    return Articles_by_date


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")

