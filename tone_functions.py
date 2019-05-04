import json
import os
from operator import itemgetter
from watson_developer_cloud import ToneAnalyzerV3, watson_service
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category

IBM_KEY = os.environ['IBM_API_KEY']
IBM_URL = os.environ['IBM_URL']
IBM_VERSION = os.environ['IBM_VERSION']

tone_analyzer = ToneAnalyzerV3(
    version=IBM_VERSION,
    iam_apikey=IBM_KEY,
    url=IBM_URL
)

def get_scores_add_to_db():
    """Add Score for each article without Score in db"""

    article_list = get_Articles_without_Score()
    
    # Loop over article to get tone analysis
    for article in article_list:
        url = article.url
        scores = get_scores_from_url(url)
        if (scores):
            add_Score_to_db(scores, article.article_id)
        else:
            print(("ERROR for article_id {}\nURL: {}\n").format(article.article_id, url))
        
def get_Articles_without_Score():
    """Get a list of Article objs without Score in db"""

    # Check db for outer left join
    # For entries in articles but not in scores
    article_list = db.session.query(Article).outerjoin((Score, 
                    Article.article_id == Score.article_id)
                    ).filter(Score.article_id == None).all()

    return article_list

def add_Score_to_db(scores, article_id):
    """Add scores to db given article_id"""

    for score in scores:
        tone_id = score[0]
        score = str(round(score[1], 2))

        add_score = Score(article_id=article_id,
                          tone_id=tone_id,
                          score=score)
        db.session.add(add_score)
    print(("Scores for article_id {} added").format(article_id))
    db.session.commit()


def get_scores_from_url(url):
    """Get tone and score from url"""

    text = get_article_body(url) #from article_scraper.py
    # print('ARTICLE BODY >>>>>>>>>>> \n',text)
    if (text):
        tones_json = analyze_text_for_tones(text)
        scores = extract_scores(tones_json)
        return scores
    else:
        return []

def analyze_text_for_tones(text):
    """Analyze emotional and language tone of text using IBM API"""
    try:
        tone_analysis = tone_analyzer.tone(tone_input={"text":text},
                                       content_type='application/json',
                                       sentences=False)
        tones_json = tone_analysis.get_result()
        return tones_json
    except watson_service.WatsonApiException as ex:
        print("Method failed with status code {}: {}".format(str(ex.code), ex.message))
        return "IBM API Method failed"

def extract_scores(tones_json):
    """extract tones and their scores from json as a list of tuples"""

    tones_list = tones_json['document_tone']['tones']
    scores = [(item['tone_id'], item['score']) for item in tones_list]
    return scores

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app

    connect_to_db(app)
    print("Connected to DB.")
    get_scores_add_to_db()


