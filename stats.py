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

# Category functions
def get_chosen_category_stats(category_id):
    """get stats for all tones within chosen category"""
    category_articles = get_articles_for_Category(category_id)
    stats_list = get_category_tones_stats(category_articles, category_id)
    return stats_list

def get_category_tones_stats(category_articles, category_id):
    """get stats for tones within a category"""
    
    emotional_dict = create_category_tone_dict('emotional', category_id)
    language_dict = create_category_tone_dict('language', category_id)
    none_dict = create_category_tone_dict('None', category_id)
    total_dict = create_category_tone_dict('total', category_id)
    counter = 0
    for article in category_articles:
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

def create_category_tone_dict(tone_type, category):
    """create dict for specific tone type"""    
    tone_type_dict = {
        'category': category,
        'filter': tone_type, 
        'data': {}
    }
    tones = get_tones_db()
    for tone in tones:
        if tone.tone_type == tone_type:
            tone_type_dict['data'][tone.tone_id] = []
    return tone_type_dict

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
    """Return list of Articles with highest score for chosen category"""
    Cat = get_category_obj(category_id)
    Articles = Cat.articles
    articles = []
    for Article in Articles:
        scores = Article.scores        
        Article_dict = single_Article_dict_json(Article, category_id, 'category')
        articles.append(Article_dict)   
    Articles_by_date = sorted(articles, key=sort_by_date, reverse=True)
    return Articles_by_date

#Source functions
def get_chosen_source_stats(chosen_source):
    """get list of tone_stats_dicts for a source
    Returns a list of dictionaries, one for each tone type
    Each dict has a key for total number of articles and tone_types 
    and values of a list of Articles within each tone type"""
    source_articles = get_articles_for_source(chosen_source)
    stats_list = get_source_tone_stats_dicts(source_articles, chosen_source)
    return stats_list

def get_source_Articles_by_tone(source, tone_type, tone_id):
    """return articles by tone id for a source as json"""

    stats_list = get_chosen_source_stats(source)
    for dict_item in stats_list:
        if dict_item['filter'] == tone_type:
            article_id_list_ = dict_item['data'][tone_id]
    article_id_list = article_id_list_[::-1]
    article_list = []
    for article_id in article_id_list:
        article_obj = Article.query.get(article_id)
        article_dict = single_Article_dict_json(article_obj, tone_id, tone_type) #imported from tone_filter
        article_list.append(article_dict)
    return article_list

def get_source_tone_stats_dicts(source_articles, source):
    """Analyze tone distribution of articles from a source"""
    
    emotional_dict = create_source_tone_type_dict('emotional', source)
    language_dict = create_source_tone_type_dict('language', source)
    none_dict = create_source_tone_type_dict('None', source)
    total_dict = create_source_tone_type_dict('total', source)
    counter = 0
    for article in source_articles:
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

def create_source_tone_type_dict(tone_type, source):
    """create dict for specific tone type"""
    
    tone_type_dict = {
        'source': source,
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