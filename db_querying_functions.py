import os
import requests
from model import connect_to_db, db, Article, Tone, Score, Category
from sqlalchemy import desc

def get_tone_db():
    """get all tones"""

    tones = db.session.query(Tone.tone_id, Tone.tone_name, Tone.tone_type)
    return tones

def sort_by_date(Article):
    """Sort Articles by date of publishing"""

    datetime = Article.published
    date = datetime.date()
    return date

def get_Articles_with_tone_filter(tone_id, tone_type):
    """Return list of Articles with highest score for chosen emotion"""

    # get all scores with the chosen tone_id
    Tone_Scores = Score.query.filter(Score.tone_id==tone_id).all()
    # get all articles with the chosen tone_id
    Tone_Articles = [Score.article for Score in Tone_Scores]
    # get all Scores for chosen articles
    Article_Scores = [article.scores for article in Tone_Articles]

    Articles = []
    # Loop thorugh article_scores to 
    # find articles having chosen tone with highest score
    for scores in Article_Scores:
        for score in scores:
            if score.tone_id == tone_id:
                chosen_tone_score = score
                highest_score = score
        for score in scores:
            tone = score.tone
            if tone.tone_type == tone_type:
                if score.score > chosen_tone_score.score:
                    highest_score = score
        if chosen_tone_score == highest_score:
            Articles.append(score.article)
        else:
            continue

    # sort articles in descending order using published
    Articles_by_date = sorted(Articles, key=sort_by_date, reverse=True)
    
    return Articles_by_date

def get_sources_db():
    """Get all sources in db"""

    article_sources = db.session.query(Article.source).group_by(Article.source
                    ).order_by(Article.source).all()
    sources = []
    for article in article_sources:
        sources.append(article.source)

    return sources

def get_articles_for_source(source):
    """get all articles of specific source"""

    articles = Article.query.filter(Article.source==source).order_by(
                                                        Article.published).all()

    return articles

def create_tone_dict(tone_type):
    """create dict for specific tone type"""
    
    tone_dict = {}
    tones = get_tone_db()
    for tone in tones:
        if tone.tone_type == tone_type:
            tone_dict[tone.tone_id] = []

    return tone_dict

def get_highest_scores_for_tone_type_for_article(Article):
    """Get tone with highest scoe for article"""

    scores = Article.scores
    
    highest_emotional = ''
    highest_language = ''
    
    for score in scores:
        tone = score.tone
        if tone.tone_type == 'emotional':
            if highest_emotional == '':
                highest_emotional = score
            else:
                if score.score > highest_emotional.score:
                    highest_emotional = score
        else if tone.tone_type == 'language':
            if highest_language == '':
                highest_language = score
            else:
                if score.score > highest_language.score:
                    highest_language.score = score
        else:
            continue

    return {'emotional': highest_emotional, 'language': highest_language}

def get_tone_statistics(articles):
    """Analyze tone distribution for articles"""
    
    emotional_dict = create_tone_dict('emotional')
    language_dict = create_tone_dict('language')

    for article in articles:
        high_scores = get_highest_scores_for_tone_type_for_article(article)
        for key, value in high_scores:
            if (value):
                if key=='emotional':
                    emotional_dict[value.tone_id].append(value.article_id)
                else if key=='language':
                    language_dict[value.tone_id].append(value.article_id)

    print({emotional_dict, language_dict})
    return {emotional_dict, language_dict}














