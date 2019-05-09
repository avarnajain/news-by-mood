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

def get_source_stats(source):
    """get list of tone_stats_dicts for a source

    Returns a list of dictionaries, one for each tone type
    Each dict has a key for total number of articles and tone_types 
    and values of a list of Articles within each tone type"""

    source_articles = get_articles_for_source(source)
    stats_list = get_tone_stats_dicts(source_articles)

    return stats_list

def get_articles_for_source(source):
    """get all articles of specific source"""

    source_articles = Article.query.filter(Article.source==source).order_by(
                                                        Article.published).all()

    return source_articles

def get_tone_stats_dicts(source_articles):
    """Analyze tone distribution of articles from a source"""
    
    emotional_dict = create_tone_type_dict('emotional')
    language_dict = create_tone_type_dict('language')

    for article in source_articles:
        # get highest scores for each article
        high_scores = get_highest_scores_for_tone_types(article)
        for tone_type, score in high_scores.items():
            if (score):
                if tone_type=='emotional':
                    emotional_dict[score.tone_id].append(score.article_id)
                elif tone_type=='language':
                    language_dict[score.tone_id].append(score.article_id)

    emotional_total = count_total_articles_for_tone_type(emotional_dict)
    language_total = count_total_articles_for_tone_type(language_dict)
    
    stats_list = [emotional_total, language_total]

    return stats_list

def create_tone_type_dict(tone_type):
    """create dict for specific tone type"""
    
    tone_type_dict = {'total': 0}
    tones = get_tone_db()

    for tone in tones:
        if tone.tone_type == tone_type:
            tone_type_dict[tone.tone_id] = []

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

        elif tone.tone_type == 'language':
            if (highest_language) and score.score > highest_language.score:
                highest_language = score
            elif highest_language == '':
                highest_language = score

    return {'emotional': highest_emotional, 'language': highest_language}



def count_total_articles_for_tone_type(source_stats_dict):
    """Count total number of articles for each tone_type"""

    total = 0
    for tone, articles in source_stats_dict.items():
        if (articles):
            total += len(articles)

    source_stats_dict['total'] = total

    return source_stats_dict

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from server import app

    connect_to_db(app)
    print("Connected to DB.")