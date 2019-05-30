import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc
from tone_filter import *


def get_sources_dict_db():
    """Get all sources in db and pass as json"""

    article_sources = db.session.query(Article.source).group_by(Article.source
                    ).order_by(Article.source).all()
    sources_list = []
    for article in article_sources:
        source_dict = {
            'source':article.source
        }
        sources_list.append(source_dict)

    return sources_list

def get_sources_db():
    """Get all sources in db"""

    article_sources = db.session.query(Article.source).group_by(Article.source
                    ).order_by(Article.source).all()
    sources = []
    for article in article_sources:
        sources.append(article.source)

    return sources

def get_chosen_source_stats(chosen_source):
    """get list of tone_stats_dicts for a source

    Returns a list of dictionaries, one for each tone type
    Each dict has a key for total number of articles and tone_types 
    and values of a list of Articles within each tone type"""
    source_articles = get_articles_for_source(chosen_source)
    stats_list = get_tone_stats_dicts(source_articles, chosen_source)
    return stats_list

def get_source_Articles_by_tone(source, tone_type, tone_id):
    """return articles by tone id for a source as json"""

    stats_list = get_chosen_source_stats(source)

    for dict_item in stats_list:
        if dict_item['filter'] == tone_type:
            article_id_list = dict_item['data'][tone_id]
    
    article_list = []

    for article_id in article_id_list:
        article_obj = Article.query.get(article_id)
        article_dict = single_Article_dict_json(article_obj, tone_id, tone_type)
        article_list.append(article_dict)

    return article_list

def get_articles_for_source(source):
    """get all articles of specific source"""

    source_articles = Article.query.filter(Article.source==source).order_by(
                                                        Article.published).all()
    return source_articles

def get_num_articles(source):
    """Get total number of articles for a source"""

    articles = get_articles_for_source(source)
    counter = 0
    for article in articles:
        counter += 1
    return counter

def get_tone_stats_dicts(source_articles, source):
    """Analyze tone distribution of articles from a source"""
    
    emotional_dict = create_tone_type_dict('emotional', source)
    language_dict = create_tone_type_dict('language', source)
    none_dict = create_tone_type_dict('None', source)
    total_dict = create_tone_type_dict('total', source)
    total_dict['data']['total'] = get_num_articles(source)

    for article in source_articles:
        # get highest scores for each article
        high_scores = get_highest_scores_for_tone_types(article)
        for tone_type, score in high_scores.items():
            if (score):
                if tone_type=='emotional':
                    emotional_dict['data'][score.tone_id].append(score.article_id)
                elif tone_type=='language':
                    language_dict['data'][score.tone_id].append(score.article_id)
            elif tone_type=='None':
                none_dict['data']['None'].append(article.article_id)

    stats_list = [emotional_dict, language_dict, none_dict, total_dict]

    return stats_list

def create_tone_type_dict(tone_type, source):
    """create dict for specific tone type"""
    
    tone_type_dict = {
        'source': source,
        'filter': tone_type, 
        'data': {}
    }
    tones = get_tone_db()
    for tone in tones:
        if tone.tone_type == tone_type:
            tone_type_dict['data'][tone.tone_id] = []

    return tone_type_dict

def get_highest_scores_for_tone_types(Article):
    """Get tone with highest scoe for article"""

    scores = Article.scores
    highest_emotional = ''
    highest_language = ''
    
    for score in scores:
        tone = score.tone

        if tone.tone_type == 'emotional':
            if (highest_emotional) and score.score > highest_emotional.score:
                highest_emotional = score
            elif highest_emotional == '':
                highest_emotional = score

        if tone.tone_type == 'language':
            if (highest_language) and score.score > highest_language.score:
                highest_language = score
            elif highest_language == '':
                highest_language = score

        if tone.tone_type == 'None':
            return {'None': ''}
            
    return {'emotional': highest_emotional, 'language': highest_language}

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")