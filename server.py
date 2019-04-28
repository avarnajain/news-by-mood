import os
import requests
from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_functions import *

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

@app.route('/')
def homepage():
    """homepage"""

    return render_template('homepage.html')

@app.route('/headlines-by-category')
def headlines_by_category():
    """get headlines by category and insert into db"""

    #to get headlines for all predefined categories
    get_headlines_by_category()
    print('Headlines for all categories added to DB')


if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
