#import modules
import os
import requests
from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from beautiful_soup import *
from model import connect_to_db, db, Article, Tone, Score, Category
import pprint

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

pp = pprint.PrettyPrinter(indent=4)

@app.route('/')
def homepage():
    """homepage"""

    return render_template('homepage.html')

# @app.route('/saved-articles')
# def saved_articles():
#     """Articles saved in env_news"""
    
#     env_news = {'status': 'ok', 'totalResults': 3, 'articles': [{'source': {'id': 'bloomberg', 'name': 'Bloomberg'}, 'author': 'Robert Burnson, Alyza Sebenius', 'title': "Keystone XL Pipeline Foes Sue to Void Trump's New Permit", 'description': 'Conservation groups urged a Montana federal court to toss out the new permit that President Donald Trump issued last month in an effort to skirt environmental laws and restart TransCanada Corp.’s stalled Keystone XL oil pipeline project.', 'url': 'https://www.bloomberg.com/news/articles/2019-04-06/keystone-pipeline-foes-seek-ruling-voiding-trump-s-new-permit', 'urlToImage': 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i_E2Pcyi1jxc/v1/1200x800.jpg', 'publishedAt': '2019-04-06T00:39:00+00:00', 'content': 'The Hardisty tank farm stands at dusk in Hardisty, Alberta.\r\nPhotographer: Brett Gundlock/Bloomberg\r\nConservation groups urged a Montana federal court to toss out the \r\nnew permit that President Donald Trump issued last month in an effort to skirt environment… [+1263 chars]'}, {'source': {'id': 'national-geographic', 'name': 'National Geographic'}, 'author': 'Michael Greshko, Laura Parker, Brian Clark Howard, Daniel Stone, Alejandra Borunda, Sarah Gibbens', 'title': 'A running list of how President Trump is changing environmental policy', 'description': 'The Trump administration has promised vast changes to U.S. science and environmental policy—and we’re tracking them here as they happen.', 'url': 'https://news.nationalgeographic.com/2017/03/how-trump-is-changing-science-environment.html', 'urlToImage': 'https://www.nationalgeographic.com/content/dam/environment/2018/10/trump_environment_ticker/trump_environment_ticker_nationalgeographic_1926130.jpg', 'publishedAt': '2019-04-03T01:22:27.4516367Z', 'content': None}, {'source': {'id': 'national-geographic', 'name': 'National Geographic'}, 'author': 'Christina Nunez', 'title': 'Fossil fuels, explained', 'description': "Much of the world's energy comes from material formed hundreds of millions of years ago, and there are environmental consequences for it.", 'url': 'https://www.nationalgeographic.com/environment/energy/reference/fossil-fuels.html', 'urlToImage': 'https://pmdvod.nationalgeographic.com/NG_Video/397/407/smpost_1502997138546.jpg', 'publishedAt': '2019-04-03T01:22:17.5610396Z', 'content': None}]}

#     return render_template('headlines_list.html' , data=env_news['articles'])


# @app.route('/get-headlines')
# def headlines_list():
#     """Retrieve list of all headlines"""

#     payload = {
#         'country': 'us',
#         'category': 'science'
#     }

#     response = requests.get(HEADLINES_URL, 
#                             params=payload, 
#                             headers=news_headers)
#     data = response.json()
#     news = data['articles']

#     return render_template('headlines_list.html' , data=news)

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
            print('author:', author)
            url = article['url']
            print('url:', url)
            title = article['title']
            print('title:', title)
            source = article['source']['name']
            print('source:', source)
            image_url = article['urlToImage']
            print('image_url:', image_url)
            published = article['publishedAt']
            print('published:', published)
            description = article['description']
            print('description:', description)

            add_article = Article(author=author,
                                  url=url,
                                  title=title,
                                  source=source,
                                  category=category,
                                  image_url=image_url,
                                  published=published,
                                  description=description)
            db.session.add(add_article)
            print(">>>>>END OF ARTICLE DB ADD")

        db.session.commit()
        print(">>>>>>>>>>ALL ARTICLES IN CATEGORY COMMMITED")
    print(">>>>>>>>>>>>>>>>>>>>ALL COMMMITED")

    # return render_template('headlines_list.html' , data=articles)

if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
