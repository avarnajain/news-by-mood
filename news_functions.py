import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from beautiful_soup import *
from tone_functions import *
from sqlalchemy import exc
import server
import psycopg2

#Call API key from environment
NEWS_KEY = os.environ.get('NEWS_API_KEY')
NEWS_HEADERS = {'Authorization': 'Bearer ' + NEWS_KEY}
#Base urls and endpoints for NEWS API
HEADLINES_URL = 'https://newsapi.org/v2/top-headlines'
EVERYTHING_URL = 'https://newsapi.org/v2/everything'
#Set categories for headlines by NEWS API
NEWS_CATEGORIES = ['business', 'entertainment', 'general', 
                   'health', 'science', 'sports', 'technology']

def get_headlines_by_category():
    """return json of articles"""

    for category in NEWS_CATEGORIES:
        payload = {
            'country': 'us',
            'category': category,
            'pageSize': 100
        }
        response = requests.get(HEADLINES_URL,
                                params=payload,
                                headers=NEWS_HEADERS)

        data = response.json()
        total_results = data['totalResults']
        print('category: {}, totalResults: {}'.format(category, total_results))
        articles = data['articles'] 
        
        for article in articles:
            add_article_to_db(category, article)

        print('Category completed (max 100 per category)')


def add_article_to_db(category, article):
    """Add article and category to db"""

    author = article['author']
    url = article['url']
    title = article['title']
    source = article['source']['name']
    image_url = article['urlToImage']
    published = article['publishedAt']
    description = article['description']

    category_obj = Category.query.get(category)

    try:
        add_article = Article(author=author,
                              url=url,
                              title=title,
                              source=source,
                              image_url=image_url,
                              published=published,
                              description=description)

        db.session.add(add_article)
        db.session.commit()
        add_article.categories.append(category_obj)
        
        # Add Score for each article
        # scores = get_scores_from_url(url)
        # add_scores_to_db(scores, add_article.article_id)

        db.session.flush()

    except exc.IntegrityError:
        db.session.rollback()
        existing_obj = Article.query.filter(Article.url==url).one()
        existing_obj.categories.append(category_obj)
        db.session.commit()

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")
    get_headlines_by_category()

