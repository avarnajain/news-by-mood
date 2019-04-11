import json
import os

from watson_developer_cloud import ToneAnalyzerV3
from beautiful_soup import *

IBM_KEY = os.environ['IBM_API_KEY']
IBM_URL = os.environ['IBM_URL']
IBM_VERSION = os.environ['IBM_VERSION']

tone_analyzer = ToneAnalyzerV3(
    version=IBM_VERSION,
    iam_apikey=IBM_KEY,
    url=IBM_URL
)

article_body = get_article_body('https://www.foxnews.com/opinion/dan-gainor-media-concede-theres-a-border-crisis-but-wont-give-trump-credit-for-getting-mexico-to-act')

def analyze_tone(text):
    """Analyze sentimental tone of text"""

    tone_analysis = tone_analyzer.tone(tone_input={"text":text},
                                       content_type='application/json',
                                       sentences=False)
    return tone_analysis.get_result()


ibm_result = analyze_tone(article_body)

print(ibm_result)

print(json.dumps(ibm_result, indent=2))

