import json
import os
from model import connect_to_db, db, Article, Tone, Score, Category
import time
from tone_filter import *

def get_categories_dict_db():
    """Get a list of all categories"""

    all_categories = db.session.query(Category.category_id, Category.category_name)
    category_list = []
    for category in all_categories:
        category_dict = {
            'category_id': category.category_id,
            'category_name': category.category_name,
        }
        category_list.append(category_dict)

    return category_list


def get_Articles_with_category_filter(category_id):
    """Return list of Articles with highest score for chosen category"""

    Cat = Category.query.get(category_id)
    Articles = Cat.articles

    articles = []
    for Article in Articles:
        scores = Article.scores
        all_scores = {}
        for score in scores:
            all_scores[score.tone_id] = score.score
        Article_dict = {
            'article_id': Article.article_id,
            'category': category_id,
            'url': Article.url,
            'author': Article.author,
            'title': Article.title,
            'source': Article.source,
            'image_url': Article.image_url,
            'published': Article.published,
            'description': Article.description,
            'filter': 'category',
            'scores': all_scores
        }
        articles.append(Article_dict)
    
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)

    return Articles_by_date

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")