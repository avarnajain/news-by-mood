import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc
from db_functions import *

#Article functions
def get_Articles_with_tone_dict(tone_id, tone_type):
    """create json object to return"""
    Articles_list = get_Articles_with_tone_filter(tone_id, tone_type)   
    articles = []
    for Article in Articles_list:
        scores = Article.scores
        filter_score = None
        for s in scores:
            if s.tone_id == tone_id:
                filter_score = s.score
        Article_dict = single_Article_dict_json(Article, tone_id, tone_type, filter_score)
        articles.append(Article_dict)    
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)
    return Articles_by_date

def single_Article_dict_json(Article, filter_id, filter_type, filter_score=None):
    Categories = Article.categories
    categories = [Category.category_id for Category in Categories]
    Scores = Article.scores
    score_list = []
    for Score in Scores:
        tone = Score.tone_id
        Tone_ = Tone.query.get(tone)
        tone_type = Tone_.tone_type
        score = Score.score
        score_dict = {'tone': tone, 'score': score, 'type': tone_type}
        score_list.append(score_dict)
    title = format_article_title(Article)
    Article_dict = {
        'article_id': Article.article_id,
        'category': categories,
        'url': Article.url,
        'author': Article.author,
        'title': title,
        'source': Article.source,
        'image_url': Article.image_url,
        'published': Article.published,
        'description': Article.description,
        'filter_id': filter_id,
        'filter_type': filter_type,
        'filter_score': filter_score,
        'scores': score_list
    }
    return Article_dict

def format_article_title(Article):
    """format article title for display"""
    title_ = Article.title
    title = title_.split(' - ')[0]
    return title

def sort_by_date(Article):
    datetime = Article['published']
    date = datetime.date()
    return date

def get_category_articles_with_tone_filter(category_id, tone_id):
    """Get articles for chosen tone_id within a category"""

    articles = get_Articles_with_category_filter(category_id)
    tone_articles = []
    for article in articles:
        for tone in article['scores']:
            if tone['tone'] == tone_id:
                tone_articles.append(article)
    return tone_articles

def get_Articles_with_category_filter(category_id):
    """Return list of Articles with chosen category"""
    Articles = get_articles_for_Category(category_id)
    articles = []
    for Article in Articles:
        # scores = Article.scores        
        Article_dict = single_Article_dict_json(Article, category_id, 'category')
        if Article_dict['scores'][0]['tone'] != 'no text':
            articles.append(Article_dict)
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)
    return Articles_by_date

def get_tone_Articles_with_category_filter(tone_id, tone_type, category_id):
    """filter tone articles by category"""
    tone_articles = get_Articles_with_tone_dict(tone_id, tone_type)
    category_articles = []
    for article in tone_articles:
        categories = article['category']
        if category_id in categories:
            category_articles.append(article)
        # print('categories', categories)
    return category_articles

def get_all_source_Articles(source):
    """get all articles by a source for json"""
    source_articles = get_articles_for_source(source)    
    articles_list = []
    for article in source_articles:
        article_dict = single_Article_dict_json(article, source, 'source')
        if article_dict['scores'][0]['tone'] != 'no text':
            articles_list.append(article_dict)
    Articles_by_date = sorted(articles_list, key=sort_by_date, reverse=True)
    return Articles_by_date

def get_source_Articles_by_tone(source, tone_type, tone_id):
    """return articles by tone id for a source as json"""

    stats_list = get_chosen_stats(source, 'source')
    for dict_item in stats_list:
        if dict_item['filter'] == tone_type:
            article_id_list_ = dict_item['data'][tone_id]
    article_id_list = article_id_list_[::-1]
    article_list = []
    for article_id in article_id_list:
        article_obj = Article.query.get(article_id)
        article_dict = single_Article_dict_json(article_obj, tone_id, tone_type) #imported from tone_filter
        article_list.append(article_dict)
    Articles_by_date = sorted(article_list, key=sort_by_date, reverse=True)
    return Articles_by_date

def get_source_Articles_by_category(source, category_id):
    """return source articles dict with category filters"""
    source_articles = get_articles_for_source(source)    
    category_articles_list = []
    for article in source_articles:
        categories = article.categories
        for category in categories:
            if category.category_id == category_id:
                article_dict = single_Article_dict_json(article, category_id, 'category')
                if article_dict['scores'][0]['tone'] != 'no text':
                    category_articles_list.append(article_dict)
    Articles_by_date = sorted(category_articles_list, key=sort_by_date, reverse=True)
    return Articles_by_date

def get_chosen_stats(stats_filter, stats_type):
    """get list of tone_stats_dicts for a source/category
        stats_type is a string of either sourceor category
        stats_filter is the specific source or category you want"""
    if stats_type == 'source':
        articles = get_articles_for_source(stats_filter)
    elif stats_type == 'category':
        articles = get_articles_for_Category(stats_filter)
    
    stats_list = get_tone_stats_dicts(articles, stats_filter, stats_type)
    return stats_list

def get_weighted_chosen_stats(stats_filter, stats_type):
    """get list of tone_stats_dicts for a source/category
        stats_type is a string of either sourceor category
        stats_filter is the specific source or category you want"""
    if stats_type == 'source':
        articles = get_articles_for_source(stats_filter)
    elif stats_type == 'category':
        articles = get_articles_for_Category(stats_filter)
    
    stats_list = get_weighted_tone_stats_dicts(articles, stats_filter, stats_type)
    return stats_list

def get_tone_stats_dicts(articles, stats_filter, stats_type):
    """get stats for tones within a source/category"""
    emotional_dict = create_tone_dict('emotional', stats_filter, stats_type)
    language_dict = create_tone_dict('language', stats_filter, stats_type)
    none_dict = create_tone_dict('None', stats_filter, stats_type)
    total_dict = create_tone_dict('total', stats_filter, stats_type)
    counter = 0
    for article in articles:
        counter += 1
        for score in article.scores:
            if score.tone_id in ['anger', 'fear', 'joy', 'sadness']:
                emotional_dict['data'][score.tone_id].append(score.article_id)
            elif score.tone_id in ['analytical', 'confident', 'tentative']:
                language_dict['data'][score.tone_id].append(score.article_id)
            elif score.tone_id == 'None':
                none_dict['data']['None'].append(article.article_id)
    total_dict['data']['total'] = counter
    stats_list = [emotional_dict, language_dict, none_dict, total_dict]
    return stats_list

def get_weighted_tone_stats_dicts(articles, stats_filter, stats_type):
    """get stats for tones within a source/category"""
    emotional_dict = create_tone_dict('emotional', stats_filter, stats_type)
    language_dict = create_tone_dict('language', stats_filter, stats_type)
    none_dict = create_tone_dict('None', stats_filter, stats_type)
    total_dict = create_tone_dict('total', stats_filter, stats_type)
    counter = 0
    for article in articles:
        counter += 1
        for score in article.scores:
            if score.tone_id in ['anger', 'fear', 'joy', 'sadness']:
                emotional_dict['data'][score.tone_id].append(score.score)
            elif score.tone_id in ['analytical', 'confident', 'tentative']:
                language_dict['data'][score.tone_id].append(score.score)
            elif score.tone_id == 'None':
                none_dict['data']['None'].append(0)
    total_dict['data']['total'] = counter
    stats_list = [emotional_dict, language_dict, none_dict, total_dict]
    return stats_list

def create_tone_dict(tone_type, stats_filter, stats_type):
    """create dict for specific tone type"""    
    tone_type_dict = {
        stats_type: stats_filter,
        'filter': tone_type, 
        'data': {}
    }
    tones = get_tones_db()
    for tone in tones:
        if tone.tone_type == tone_type:
            tone_type_dict['data'][tone.tone_id] = []
    return tone_type_dict

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")