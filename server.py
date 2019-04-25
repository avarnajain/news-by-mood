#import modules
import os
import requests
from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from beautiful_soup import *
from model import connect_to_db, db, Article, Tone, Score, Category
# import pprint

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

#Call API key from environment
NEWS_KEY = os.environ.get('NEWS_API_KEY')
news_headers = {'Authorization': 'Bearer ' + NEWS_KEY}

#Base urls and endpoints
HEADLINES_URL = 'https://newsapi.org/v2/top-headlines'
EVERYTHING_URL = 'https://newsapi.org/v2/everything'

NEWS_CATEGORIES = ['business', 'entertainment', 'general', 
                   'health', 'science', 'sports', 'technology']

# pp = pprint.PrettyPrinter(indent=4)

@app.route('/')
def homepage():
    """homepage"""

    return render_template('homepage.html')

@app.route('/headlines-by-category')
def headlines_by_category():
    """get headlines by category"""

    # Loop through each category provided by the NEWS API
    for category in NEWS_CATEGORIES:
        payload = {
            'country': 'us',
            'category': category
        }
        response = requests.get(HEADLINES_URL,
                                params=payload,
                                headers=news_headers)

        data = response.json()
        articles = data['articles']
    
        for article in articles:
            author = article['author']
            url = article['url']
            title = article['title']
            source = article['source']['name']
            image_url = article['urlToImage']
            published = article['publishedAt']
            description = article['description']

            add_article = Article(author=author,
                                  url=url,
                                  title=title,
                                  source=source,
                                  category=category,
                                  image_url=image_url,
                                  published=published,
                                  description=description)
            db.session.add(add_article)

        db.session.commit()

    return pass

if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
