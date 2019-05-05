import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

def get_tone_db():
    """get all tones"""

    tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)
    return tones

def sort_by_date(Article):
    """Sort Articles by date of publishing"""

    datetime = Article.published
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

    Articles = []
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
            Articles.append(score.article)
        else:
            continue

    # sort articles in descending order using published
    Articles_by_date = sorted(Articles, key=sort_by_date, reverse=True)
    
    return Articles_by_date

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")














