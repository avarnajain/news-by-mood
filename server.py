import os
import requests
from flask import Flask, render_template, request, flash, redirect, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_functions import *
from sqlalchemy import desc, func
from tone_filter import *
from source_stats import *

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

@app.route('/')
def homepage():
    """homepage"""

    # Get all tones
    tones = get_tone_db()

    #Get all sources in db
    sources = get_sources_db()
    
    return render_template('homepage.html', 
                            tones=tones,
                            sources=sources)

@app.route('/headlines-by-emotion')
def headlines_by_emotion():
    """get headlines for chosen emotion from db"""

    # get emotion chosen in form
    emotion = request.args.get('emotion')
    Articles = get_Articles_with_tone_filter(emotion, 'emotional')

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
    Articles = get_Articles_with_tone_filter(language, 'language')
    
    tone_type = Tone.query.filter(Tone.tone_type=='language').all()

    return render_template("headlines_list.html",
                            chosen=language,
                            type='language', 
                            filter=tone_type,
                            articles=Articles)


@app.route('/source-statistics')
def source_statistics():
    """get and save source to session"""

    source = request.args.get('source')
    
    stats_list = get_source_stats(source)

    emotional_dict = stats_list[0]
    language_dict = stats_list[1]
    
    return render_template("sources_list.html",
                                source=source,
                                stats_list=stats_list)

if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
