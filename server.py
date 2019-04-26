import os
import requests
from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from beautiful_soup import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_functions import *


#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

#Set categories for headlines by NEWS API
NEWS_CATEGORIES = ['business', 'entertainment', 'general', 
                   'health', 'science', 'sports', 'technology']

@app.route('/')
def homepage():
    """homepage"""

    return render_template('homepage.html')

@app.route('/headlines-by-category')
def headlines_by_category():
    """get headlines by category and insert into db"""

    for category in NEWS_CATEGORIES:
        payload = {
            'country': 'us',
            'category': category,
            'pageSize': 100
        }
        articles = get_headlines_by_category(category, payload)
        add_articles_to_db(category, articles)

if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
