import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from beautiful_soup import *
from tone_functions import *

#Call API key from environment
NEWS_KEY = os.environ.get('NEWS_API_KEY')
NEWS_HEADERS = {'Authorization': 'Bearer ' + NEWS_KEY}
#Base urls and endpoints for NEWS API
HEADLINES_URL = 'https://newsapi.org/v2/top-headlines'
EVERYTHING_URL = 'https://newsapi.org/v2/everything'

def get_headlines_by_category(category, payload):
    """return json of articles"""

    response = requests.get(HEADLINES_URL,
                            params=payload,
                            headers=NEWS_HEADERS)

    data = response.json()
    total_results = data['totalResults']
    print('*'*20, category, total_results)
    articles = data['articles'] 
    return articles


def add_articles_to_db(category, articles):
    """Loop through each article that comes in the category"""

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

# def get_everything_by_date():
#     """Get all articles by date"""

#     # Loop through each category of the NEWS API
#     for category in NEWS_CATEGORIES:
#         payload = {
#             'q': category,
#             'sources': 'us',
#             'language': 'en',
#             'sortBy': 'popularity',
#             'from': '2019-04-24T00:00:01',
#             'to': '2019-04-24T23:59:59',
#             'pageSize': 100,
#         }        
#         articles = get_articles(EVERYTHING_URL, payload)
#         add_articles_to_db(category, articles)

