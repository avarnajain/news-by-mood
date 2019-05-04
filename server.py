import os
import requests
from flask import Flask, render_template, request, flash, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_functions import *
from sqlalchemy import desc

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

@app.route('/')
def homepage():
    """homepage"""

    tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)

    return render_template('homepage.html', tones=tones)


def sort_by_date(Article):
    """Sort Articles by date of publishing"""

    datetime = Article.published
    date = datetime.date()
    print(date)
    
    return date

# def sort_by_score(Article):
#     """Sort Scores within the article"""
    
#     scores = Article.scores

#     emotional_scores = scores.join((Tone, Score.tone_id == Tone.tone_id)
#             ).filter(Tone.tone_type == 'emotional').all()
#     for score in emotional_scores:
#         if score.tone 


@app.route('/headlines-by-emotion')
def headlines_by_emotion():
    """get headlines for chosen emotion from db"""

    # get emotion chosen in form
    emotion = request.args.get('emotion')
    # get all scores with the chosen tone_id
    Scores = Score.query.filter(Score.tone_id==emotion).order_by(desc(Score.score)).all()
    # get all articles with the chosen tone_id
    Articles = [Score.article for Score in Scores]
    # sort articles by day they were published
    Articles_date = sorted(Articles, key=sort_by_date)
    # get list of all tone_ids in emotional type
    article_filter = Tone.query.filter(Tone.tone_type=='emotional').all()
    
    return render_template("headlines_list.html",
                            chosen=emotion,
                            type='emotion', 
                            filter=article_filter,
                            articles=Articles)

@app.route('/headlines-by-language')
def headlines_by_language():
    """get headlines for chosen language from db"""
    
    language = request.args.get('language')
    Scores = Score.query.filter(Score.tone_id==language).order_by(desc(Score.score)).all()
    Articles = [Score.article for Score in Scores]
    
    article_filter = Tone.query.filter(Tone.tone_type=='language').all()

    return render_template("headlines_list.html",
                            chosen=language,
                            type='language', 
                            filter=article_filter,
                            articles=Articles)

if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
