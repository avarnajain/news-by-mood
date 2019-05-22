import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

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

def sort_by_score(Article):
    """Sort filtered Articles by their score"""

    score = Article['selected_score']
    return score

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

def get_Articles_with_tone_dict(tone_id, tone_type):
    """create json object to return"""

    Articles_list = get_Articles_with_tone_filter(tone_id, tone_type)
   
    articles = []
    for Article in Articles_list:
        scores = Article.scores
        all_scores = {}
        for s in scores:
            if s.tone_id == tone_id:
                score = s.score
            all_scores[s.tone_id] = s.score
        Article_dict = {
            'article_id': Article.article_id,
            'url': Article.url,
            'author': Article.author,
            'title': Article.title,
            'source': Article.source,
            'image_url': Article.image_url,
            'published': Article.published,
            'description': Article.description,
            'selected_tone_type': tone_type,
            'selected_tone_id': tone_id,
            'selected_score': score,
            'other_scores': all_scores
        }
        articles.append(Article_dict)
    
    Articles_by_score = sorted(articles, key=sort_by_score, reverse=True)
    Articles_by_date = sorted(Articles_by_score, key=sort_by_date, reverse=True)

    return Articles_by_date

def get_highest_Scoring_Article(tone_id):
    """Get the highest scoring article for the day"""

    articles = Score.query.filter(Score.tone_id==tone_id).all()

    return 


def get_top_headline_dict():
    """"""
    fear_article = get_Articles_with_tone_dict('fear', 'emotional')[0]
    sadness_article = get_Articles_with_tone_dict('sadness', 'emotional')[0]
    joy_article = get_Articles_with_tone_dict('joy', 'emotional')[0]
    anger_article = get_Articles_with_tone_dict('anger', 'emotional')[0]
    analytical_article = get_Articles_with_tone_dict('analytical', 'language')[0]
    confident_article = get_Articles_with_tone_dict('confident', 'language')[0]
    tentative_article = get_Articles_with_tone_dict('tentative', 'language')[0]

    return {
        'joy': joy_article, 
        'fear': fear_article, 
        'sadness': sadness_article, 
        'anger': anger_article, 
        'analytical': analytical_article, 
        'confident': confident_article, 
        'tentative': tentative_article
    }

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")














