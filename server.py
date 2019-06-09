# run the following line WITHOUT VAGRANT alongside server.py in a diff terminal
# npm run start

# shell command to run AWS 
# ssh -i ~/.ssh/aws.pem ubuntu@34.214.50.15

#shell commands to update git repo on server
# ssh -i ~/.ssh/aws.pem ubuntu@34.214.50.15
# cd news-by-mood
# git pull
# sudo systemctl restart flask

import os
import requests
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, jsonify, session, send_from_directory
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_api_functions import *
from tone_api_functions import *
from sqlalchemy import desc, func
from db_functions import *
from stats import *

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

# Normally, if you use an undefined variablhe in Jinja2, it fails
# silently. This is horrible. Fix this so tat, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined

EMOTIONAL_TONES = ['anger', 'fear', 'joy', 'sadness']
LANGUAGE_TONES = ['analytical', 'confident', 'tentative']

@app.route('/')
def show_homepage():
    """Show homepage"""
    return render_template('homepage.html')

@app.route('/about')
def show_about():
    """Show about page"""
    return redirect('/')

@app.route('/headlines-by-emotion')
def show_headlines_by_emotion():
    """Display headlines for chisen emotion"""
    return render_template('headlines_by_emotion.html')

@app.route('/headlines-by-emotion/<chosen_emotion>')
def show_headlines_by_chosen_emotion(chosen_emotion):
    """Display headlines for chisen emotion"""
    session['selected_emotion'] = chosen_emotion.lower()
    session['selected_language'] = ''
    session['selected_tone_category'] = ''
    print("query string session['selected_emotion']", session['selected_emotion'] )
    # return render_template('headlines_by_emotion.html')
    return redirect('/headlines-by-emotion')

@app.route('/headlines-by-language')
def show_headlines_by_language():
    """Display headlines for chosen emotion"""
    return render_template('headlines_by_language.html')

@app.route('/headlines-by-language/<chosen_language>')
def show_headlines_by_chosen_language(chosen_language):
    """Display headlines for chisen emotion"""
    session['selected_language'] = chosen_language.lower()
    session['selected_emotion'] = ''
    session['selected_tone_category'] = ''
    print("query string session['selected_language']", session['selected_language'] )
    # return render_template('headlines_by_language.html')
    return redirect('/headlines-by-language')

@app.route('/source-stats/<chosen_source>')
def show_chosen_source_stats(chosen_source):
    """Get stats for chosen source"""
    # session['selected_source'] = chosen_source
    # print('Selected source changed insode source-stats/<chosen_source>', session['chosen_source'])
    return render_template('source_stats.html')

@app.route('/headlines-by-category')
def show_headlines_by_category():
    """Display headlines for chosen emotion"""
    return render_template('headlines_by_category.html')

@app.route('/headlines-by-category/<chosen_category>')
def show_headlines_by_category_query(chosen_category):
    """Display headlines for chosen emotion"""
    return render_template('headlines_by_category.html')

@app.route('/article/<chosen_article>')
def show_chosen_article(chosen_article):
    """Display infor for chosen article"""
    session['selected_article'] = chosen_article
    print("session['selected_article']", session['selected_article'])
    return render_template('article.html')

@app.route('/todays-headlines')
def show_todays_headlines():
    """render news for today"""
    session['selected_emotion'] = ''
    session['selected_language'] = ''
    print("session['selected_emotion']", session['selected_emotion'], "session['selected_language']", session['selected_language'])
    return render_template('todays_headlines.html')

########################################################################
#SETTING SESSION ROUTES
@app.route('/get-chosen-tone-from-popover', methods=['POST'])
def get_chosen_tone():
    """set session for tone thorugh popover"""
    chosen_tone = request.json['selected_popover']
    print('CHOSEN_TONE', chosen_tone)
    if chosen_tone in EMOTIONAL_TONES:
        session['selected_emotion'] = chosen_tone
        session['selected_language'] = ''
        session['selected_tone_category'] = ''
        print("'/get-chosen-emotion' session['selected_emotion']", session['selected_emotion'], "session['selected_language']", session['selected_language'], "session['selected_tone_category']", session['selected_tone_category'])
    elif chosen_tone in LANGUAGE_TONES:
        session['selected_language'] = chosen_tone
        session['selected_emotion'] = ''
        session['selected_tone_category'] = ''
        print("'/get-chosen-language/' session['selected_language']", session['selected_language'], "session['selected_emotion']", session['selected_emotion'], "session['selected_tone_category']", session['selected_tone_category'])
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/get-chosen-emotion', methods=['POST'])
def get_chosen_emotion():
    """Get chosen emotion from form post"""
    session['selected_emotion'] = request.json['selected_tone']
    session['selected_language'] = ''
    session['selected_tone_category'] = ''
    print("'/get-chosen-emotion' session['selected_emotion']", session['selected_emotion'], "session['selected_language']", session['selected_language'], "session['selected_tone_category']", session['selected_tone_category'])
    return redirect('/headlines-by-emotion')

@app.route('/get-chosen-emotion/<chosen_emotion>')
def get_chosen_emotion_query():
    """Get chosen emotion from form post"""
    session['selected_emotion'] = chosen_emotion
    session['selected_language'] = ''
    session['selected_tone_category'] = ''
    print("/get-chosen-emotion/<chosen_emotion> session['selected_emotion']", session['selected_emotion'], "session['selected_language']", session['selected_language'], "session['selected_tone_category']", session['selected_tone_category'])
    return redirect('/headlines-by-emotion')

@app.route('/get-chosen-language', methods=['POST'])
def get_chosen_language():
    """Get chosen emotion from form post"""
    session['selected_language'] = request.json['selected_tone']
    session['selected_emotion'] = ''
    session['selected_tone_category'] = ''
    print("'/get-chosen-language/' session['selected_language']", session['selected_language'], "session['selected_emotion']", session['selected_emotion'], "session['selected_tone_category']", session['selected_tone_category'])
    return redirect('/headlines-by-language')

@app.route('/get-chosen-language/<chosen_language>')
def get_chosen_language_query():
    """Get chosen emotion from form post"""
    session['selected_language'] = chosen_language
    session['selected_emotion'] = ''
    session['selected_tone_category'] = ''
    print("'/get-chosen-language/<chosen_language>' session['selected_language']", session['selected_language'], "session['selected_emotion']", session['selected_emotion'], "session['selected_tone_category']", session['selected_tone_category'])
    return redirect('/headlines-by-language')

@app.route('/get-chosen-source', methods=['POST'])
def get_chosen_source():
    """Get chosen source from homepage"""
    session['selected_source'] = request.json['selected_source']
    session['selected_source_tone_id'] = ''
    session['selected_source_tone_type'] = ''
    session['selected_category_within_source'] = ''
    print("'/get-chosen-source' session['selected_source']", session['selected_source'], "session['selected_source_tone_id']", session['selected_source_tone_id'])
    return redirect(('/source_stats/{}').format(session['selected_source']))

@app.route('/get-chosen-source/<chosen_source>')
def get_chosen_source_get(chosen_source):
    """Get chosen source through link on DOM"""
    print('CHOSEN SOURCE', chosen_source)
    session['selected_source'] = chosen_source
    session['selected_source_tone_id'] = ''
    session['selected_source_tone_type'] = ''
    session['selected_category_within_source'] = ''
    print("'/get-chosen-source/<chosen_source>' session['selected_source']", session['selected_source'], "session['selected_source_tone_id']", session['selected_source_tone_id'])
    return redirect(('/source-stats/{}').format(session['selected_source']))

@app.route('/get-chosen-category', methods=['POST'])
def get_chosen_category():
    """Get chosen category from homepage"""
    session['selected_category'] = request.json['selected_category']
    session['selected_category_tone_id'] = ''
    print("'/get-chosen-category' session['selected_category']", session['selected_category'], "session['selected_category_tone_id']", session['selected_category_tone_id'])
    return redirect('/headlines-by-category')

@app.route('/get-chosen-category/<chosen_category>')
def get_chosen_category_get(chosen_category):
    """Get chosen source through link on DOM"""
    print('CHOSEN CATEGORY', chosen_category)
    session['selected_category'] = chosen_category
    session['selected_category_tone_id'] = ''
    print("'/get-chosen-category/<chosen_category>' session['selected_category']", session['selected_category'], "session['selected_category_tone_id']", session['selected_category_tone_id'])
    return redirect(('/headlines-by-category/{}').format(session['selected_category']))

@app.route('/get-source-news', methods=['POST'])
def get_source_news():
    """set session variables to get source news"""
    session['selected_source_tone_id'] = request.json['selected_pie_tone']
    print("'/get-source-news' session['selected_source_tone_id']", session['selected_source_tone_id'])
    
    if session['selected_source_tone_id'] in ['fear', 'joy', 'anger', 'sadness']:
        session['selected_source_tone_type'] = 'emotional'
    elif session['selected_source_tone_id'] in ['analytical', 'confident', 'tentative']:
        session['selected_source_tone_type'] = 'language'
    else:
        session['selected_source_tone_type'] = None
    return redirect('/source-stats/{}'.format(session['selected_source']))

@app.route('/get-category-tone-filter', methods=['POST'])
def get_category_tone_filter():
    """set session variable to get tone news within a category"""
    session['selected_category_tone_id'] = request.json['selected_pie_tone']
    print("'/get-category-tone-filter' session['selected_category_tone_id']", session['selected_category_tone_id'])
    return redirect('/get-category-tone-news.json')

@app.route('/get-chosen-tone-from-dropdown', methods=['POST'])
def get_chosen_tone_form_dropdown():
    """set session variable based on dropdown tone selection"""
    session['selected_category_tone_id'] = request.json['selected_dropdown']
    print("'/get-chosen-tone-from-dropdown' session['selected_category_tone_id']", session['selected_category_tone_id'])
    return redirect('/get-category-tone-news.json')

@app.route('/get-chosen-category-from-dropdown', methods=['POST'])
def get_chosen_category_from_dropdown():
    """set session based on dropdown category selection"""
    session['selected_tone_category'] = request.json['selected_dropdown']
    print("'/get-chosen-category-from-dropdown' session['selected_tone_category']", session['selected_tone_category'])
    return redirect('/get-tone-category-news.json')

@app.route('/get-chosen-tone-within-source', methods=['POST'])
def get_chosen_tone_within_source():
    """set session based on dropdown category selection"""
    session['selected_source_tone_id'] = request.json['selected_dropdown']
    session['selected_category_within_source'] = ''
    if session['selected_source_tone_id'] in ['fear', 'joy', 'anger', 'sadness']:
        session['selected_source_tone_type'] = 'emotional'
    elif session['selected_source_tone_id'] in ['analytical', 'confident', 'tentative']:
        session['selected_source_tone_type'] = 'language'
    else:
        session['selected_source_tone_type'] = None
    print("'/get-chosen-tone-within-source' session['selected_source_tone_id']", session['selected_source_tone_id'])
    return redirect('/get-source-tone-news.json')

@app.route('/get-chosen-category-within-source', methods=['POST'])
def get_chosen_category_within_source():
    """set session based on dropdown category selection"""
    session['selected_category_within_source'] = request.json['selected_dropdown']
    session['selected_source_tone_id'] = ''
    session['selected_source_tone_type'] = ''
    print("'/get-chosen-category-within-source' session['selected_category_within_source']", session['selected_category_within_source'])
    return redirect('/get-source-category-news.json')

@app.route('/get-chosen-article', methods=['POST'])
def get_chosen_article():
    """set session for chosen article"""
    session['selected_article'] = request.json['selected_article']
    print("session['selected_article']", session['selected_article'])
    return redirect('/article/{}'.format(session['selected_article']))

#########################################################
#JSON ROUTES
@app.route('/emotional-tones.json')
def get_all_emotional_tones():
    """get list of dicts of emotional tones"""
    emotional_dict = get_tones_dict_db('emotional')
    return jsonify(emotional_dict)

@app.route('/language-tones.json')
def get_all_language_tones():
    """get list of dicts of language tones"""
    language_dict = get_tones_dict_db('language')
    return jsonify(language_dict)

@app.route('/all-sources.json')
def get_all_sources():
    """get json of all sources"""
    sources_dict = get_sources_dict_db()
    return jsonify(sources_dict)

@app.route('/all-categories.json')
def get_all_categories():
    """get json for all categories"""
    categories_dict = get_categories_dict_db()
    return jsonify(categories_dict)

@app.route('/headlines-by-emotion.json')
def get_headlines_by_emotion():
    """Get articles with chosen tone"""
    if (session['selected_tone_category']):
        tone_id = session['selected_emotion']
        tone_category_articles = get_tone_Articles_with_category_filter(tone_id, 'emotional', session['selected_tone_category'])
        return jsonify(tone_category_articles)
    else:
        emotional_articles_list = get_Articles_with_tone_dict(session['selected_emotion'], 'emotional')
        return jsonify(emotional_articles_list)        
    
@app.route('/headlines-by-language.json')
def get_headlines_by_language():
    """Get articles with chosen tone"""
    if (session['selected_tone_category']):
        tone_id = session['selected_language']
        tone_category_articles = get_tone_Articles_with_category_filter(tone_id, 'language', session['selected_tone_category'])
        return jsonify(tone_category_articles)
    else:
        language_articles_list = get_Articles_with_tone_dict(session['selected_language'], 'language')
        return jsonify(language_articles_list)

@app.route('/all-source-stats.json')
def get_all_source_stats():
    """Get stats on chosen source"""
    # filter_ = request.args.get("filter")  # all, emotional, language, or None
    source_stats_list = get_weighted_chosen_stats(session['selected_source'], 'source')
    return jsonify(source_stats_list)

@app.route('/session-emotion.json')
def get_session_emotion():
    return jsonify(session['selected_emotion'].capitalize())

@app.route('/session-language.json')
def get_session_language():
    return jsonify(session['selected_language'].capitalize())

@app.route('/session-category.json')
def get_session_category():
    return jsonify(session['selected_category'].capitalize())

@app.route('/session-source.json')
def get_session_source():
    return jsonify(session['selected_source'].capitalize())

@app.route('/session-category-tone.json')
def get_session_category_tone():
    if (session['selected_category_tone_id']):
        return jsonify(session['selected_category_tone_id'].capitalize())

@app.route('/session-tone-category.json')
def get_session_tone_category():
    if (session['selected_tone_category']):
        return jsonify(session['selected_tone_category'].capitalize())
    else:
        return jsonify('')

@app.route('/session-source-tone.json')
def get_session_source_tone():
    if (session['selected_source_tone_id']):
        return jsonify(session['selected_source_tone_id'].capitalize())
    else:
        return jsonify('')

@app.route('/session-source-category.json')
def get_session_source_category():
    if (session['selected_category_within_source']):
        return jsonify(session['selected_category_within_source'].capitalize())
    else:
        return jsonify('')

@app.route('/source-news.json')
def get_source_news_json():
    print("SOURCE NEWS JSON")
    if (session.get('selected_source_tone_type') and session.get('selected_source_tone_id')):
        source_news = get_source_Articles_by_tone(session['selected_source'], session['selected_source_tone_type'], session['selected_source_tone_id'])
        return jsonify(source_news)
    elif (session.get('selected_category_within_source')):
        source_news = get_source_Articles_by_category(session['selected_source'], session['selected_category_within_source'])
        return jsonify(source_news)
    else:
        source_news = get_all_source_Articles(session['selected_source'])
        return jsonify(source_news)

@app.route('/get-category-stats.json')
def get_category_stats():
    """get stats for category"""
    # print("get category stats for ", session['selected_category'])
    category_stats = get_weighted_chosen_stats(session['selected_category'], 'category')
    return jsonify(category_stats)

@app.route('/get-category-tone-news.json')
def get_category_tone_stats():
    """post json of stats for tone type within category"""
    if (session['selected_category_tone_id']):
        category_tone_stats = get_category_articles_with_tone_filter(session['selected_category'], session['selected_category_tone_id'])
        return jsonify(category_tone_stats)
    else:
        category_articles = get_Articles_with_category_filter(session['selected_category'])
        return jsonify(category_articles)

@app.route('/get-emotional-dropdown-list.json')
def get_emotional_dropdown_list():
    """get json for tone dropdown list"""
    dropdown_list = get_dropdown_filters_list('emotional')
    return jsonify(dropdown_list)

@app.route('/get-language-dropdown-list.json')
def get_language_dropdown_list():
    """get json for tone dropdown list"""
    dropdown_list = get_dropdown_filters_list('language')
    return jsonify(dropdown_list)

@app.route('/get-category-dropdown-list.json')
def get_category_dropdown_list():
    """get json for category dropdown list"""
    dropdown_list = get_dropdown_filters_list('category')
    return jsonify(dropdown_list)

@app.route('/article.json')
def get_chosen_article_info():
    """get json for chosen article"""
    article = get_article_json(session['selected_article'])
    return jsonify(article)

@app.route('/todays-stats.json')
def get_todays_stats():
    """get Todays news stats"""
    stats_json = get_todays_article_stats_json()
    return jsonify(stats_json)

@app.route('/todays-news.json')
def get_todays_news():
    """get todays headlines for news"""
    articles_json = get_todays_articles_json()
    return jsonify(articles_json)

########################################################################
# API ROUTE
# @app.route('/api-calls')
# def api_calls():
#     """Call news and tone api"""

#     time_start = time.time()
#     get_articles_add_to_db()
#     time_end = time.time()
#     print('Time taken to get news:', time_end - time_start)
#     return redirect('/')

#serve js files
@app.route("/dist/<path:resource>")
def get_resource(resource):
    return send_from_directory("dist", resource)

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    app.debug = False
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    # app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
