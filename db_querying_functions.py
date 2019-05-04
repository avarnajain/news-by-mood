import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

def sort_by_date(Article):
    """Sort Articles by date of publishing"""

    datetime = Article.published
    date = datetime.date()
    # print(date)
    return date

def get_Articles_with_emotion(emotion):
    """Return list of Articles with highest score for given emotion"""

    # get all scores with the chosen tone_id
    Tone_Scores = Score.query.filter(Score.tone_id==emotion).order_by(desc(Score.score)).all()
    # get all articles with the chosen tone_id
    Tone_Articles = [Score.article for Score in Tone_Scores]
    # get all Scores for chosen articles
    Article_Scores = [article.scores for article in Tone_Articles]
    
    # Loop thorugh scores to find highest score for each article
    Articles_ids = []
    for scores in Article_Scores:
        for score in scores:
            if score.tone_id==emotion:
                chosen_tone_score=score.score
        if (chosen_tone_score):
            for score in scores:
                tone = score.tone
                if tone.tone_type=='emotional':
                    if score.score >= chosen_tone_score:
                            highest_score = score.score
        if (highest_score):
            Articles_ids.append(score.article_id)
    
    # Make a list of Articles with chosen emotion as highest score
    Articles = []
    for article_id in Articles_ids:
        Articles.append(Article.query.get(article_id))
    
    # sort articles by day they were published
    Articles_by_date = sorted(Articles, key=sort_by_date, reverse=True)
    
    return Articles_by_date

