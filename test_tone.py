import json
import os
from operator import itemgetter
from watson_developer_cloud import ToneAnalyzerV3

IBM_KEY = os.environ['IBM_API_KEY']
IBM_URL = os.environ['IBM_URL']
IBM_VERSION = os.environ['IBM_VERSION']

tone_analyzer = ToneAnalyzerV3(
    version=IBM_VERSION,
    iam_apikey=IBM_KEY,
    url=IBM_URL
)

def analyze_tone(text):
    """Analyze sentimental tone of text"""

    tone_analysis = tone_analyzer.tone(tone_input={"text":text},
                                       content_type='application/json',
                                       sentences=False)
    return tone_analysis.get_result()

ibm_result_sample = {
  "document_tone": {
    "tones": [
      {
        "score": 0.563865,
        "tone_id": "sadness",
        "tone_name": "Sadness"
      },
      {
        "score": 0.788541,
        "tone_id": "tentative",
        "tone_name": "Tentative"
      },
      {
        "score": 0.773136,
        "tone_id": "analytical",
        "tone_name": "Analytical"
      }
    ]
  }
}

def extract_tones(ibm_result_json):
    """extract tones in order of their score from IBM json results"""

    tones_dict = ibm_result_json['document_tone']['tones']
    sorted_tones = sorted(tones_dict, key=itemgetter('score'), reverse=True)
    tones_list = [item['tone_id'] for item in sorted_tones] 
    print(tones_list)
    return tones_list

extract_tones(ibm_result_sample)
