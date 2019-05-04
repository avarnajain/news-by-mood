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
from db_querying_functions import *

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

@app.route('/')
def homepage():
    """homepage"""

    tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)

    return render_template('homepage.html', tones=tones)

@app.route('/headlines-by-emotion')
def headlines_by_emotion():
    """get headlines for chosen emotion from db"""

    # get emotion chosen in form
    emotion = request.args.get('emotion')
    Articles = get_Articles_with_filter(emotion, 'emotional')

    # get list of all tone_ids in emotional type
    tone_type = Tone.query.filter(Tone.tone_type=='emotional').all()
    
    return render_template("headlines_list.html",
                            chosen=emotion,
                            type='emotion', 
                            filter=tone_type,
                            articles=Articles)

@app.route('/headlines-by-language')
def headlines_by_language():
    """get headlines for chosen language from db"""
    
    # get language type chosen in form
    language = request.args.get('language')
    Articles = get_Articles_with_filter(language, 'language')
    
    tone_type = Tone.query.filter(Tone.tone_type=='language').all()

    return render_template("headlines_list.html",
                            chosen=language,
                            type='language', 
                            filter=tone_type,
                            articles=Articles)

if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
