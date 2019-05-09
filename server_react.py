# run this WITHOUT VAGRANT alongside server_react.py
# python server-override.py 5002

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

    return render_template('homepage_react.html')

@app.route('/emotional_tones.json')
def emotional_form():
    """get list of dicts of emotional tones"""
    emotional_dict = get_tones_dict_db('emotional')
    return jsonify(emotional_dict)

@app.route('/language_tones.json')
def language_form():
    """get list of dicts of language tones"""
    language_dict = get_tones_dict_db('language')
    return jsonify(language_dict)

@app.route('/all_sources.json')
def get_all_sources():
    """get json of all sources"""
    sources_dict = get_sources_dict_db()
    return jsonify(sources_dict)

@app.route('/headlines-by-emotion')
def get_chosen_emotion():

    # get emotion chosen in form
    print('before emotion')
    emotion = request.json['selected_tone']
    print('after emotion', emotion)

@app.route('/source-stats')
def get_source_stats():
    """"""

    
@app.route('/headlines-by-emotion', methods=['POST'])
def headlines_by_emotion():
    """get headlines for chosen emotion from db"""
   
    Articles = get_Articles_with_tone_filter(emotion, 'emotional')

    # get list of all tone_ids in emotional type
    tone_type = Tone.query.filter(Tone.tone_type=='emotional').all()

    return render_template("headlines_list.html",
                            chosen=emotion,
                            type='emotion', 
                            filter=tone_type,
                            articles=Articles)


if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
