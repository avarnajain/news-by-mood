import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from article_scraper import *
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

def get_articles_add_to_db():
    """get articles by category and add to db"""

    for category in NEWS_CATEGORIES:
        articles = get_articles_by_category(category, 1)

        for article in articles:
            Article_added = add_Article_to_db(article)
            add_Article_Category_to_db(category, Article_added)

        print('Category completed (max 100 per category)')


def get_articles_by_category(category, pageSize=30):
    """API request for articles"""

    payload = {
            'country': 'us',
            'category': category,
            'pageSize': pageSize
    }
    response = requests.get(HEADLINES_URL,
                            params=payload,
                            headers=NEWS_HEADERS)

    data = response.json()
    total_results = data['totalResults']
    print('category: {}, totalResults: {}'.format(category, total_results))
    articles = data['articles'] 

    return articles


def add_Article_Category_to_db(category, Article_added):
    """Add Article, Article_Category to db"""

    category_obj = Category.query.get(category)
    Article_added.categories.append(category_obj)
    db.session.commit()

def add_Article_to_db(article):
    """Create article object"""
    
    author = article['author']
    url = article['url']
    title = article['title']
    source = article['source']['name']
    image_url = article['urlToImage']
    published = article['publishedAt']
    description = article['description']

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
        db.session.flush()
        return add_article

    except exc.IntegrityError:
        db.session.rollback()
        existing_obj = Article.query.filter(Article.url==url).one()
        db.session.commit()
        return existing_obj

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")
    get_articles_add_to_db()

