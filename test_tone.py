import json
import os

from watson_developer_cloud import ToneAnalyzerV3

IBM_KEY = os.environ['IBM_API_KEY']
IBM_URL = os.environ['IBM_URL']
IBM_VERSION = os.environ['IBM_VERSION']

saved_articles = ['https://www.cbssports.com/college-basketball/news/virginia-vs-auburn-score-live-final-four-updates-2019-ncaa-tournament-highlights-stream-tv-info/', 'https://www.foxnews.com/opinion/dan-gainor-media-concede-theres-a-border-crisis-but-wont-give-trump-credit-for-getting-mexico-to-act', 'https://www.cnn.com/2019/04/06/us/coachella-festival-worker-dies/index.html', 'https://www.aljazeera.com/news/2019/04/gna-head-accuses-haftar-betrayal-vows-tripoli-push-190406195133847.html', 'https://pagesix.com/2019/04/06/lori-loughlins-other-daughter-is-still-in-her-corner/', 'https://www.cbssports.com/college-basketball/news/michigan-state-vs-texas-tech-game-prediction-pick-start-time-odds-2019-final-four-how-to-watch-live-stream/', 'https://www.ndinsider.com/football/notebook-notre-dame-qb-ian-book-pushing-through-a-false/article_b0877ddc-a79a-5919-a0fa-8d4be738a01d.html', 'https://www.washingtonexaminer.com/news/fbi-joins-investigation-into-fires-at-3-black-churches-in-louisiana', 'https://www.usatoday.com/story/news/politics/2019/04/06/president-trump-ilhan-omar-boasts-israel-relations/3368304002/', 'https://www.theverge.com/good-deals/2019/4/6/18298444/logitech-harmony-650-sale-best-buy-good-deal', 'https://www.vox.com/policy-and-politics/2019/4/6/18298287/barack-obama-berlin-town-hall-speech', 'https://www.androidpolice.com/2019/04/06/google-assistant-now-shows-ads-in-some-answers/', 'https://splinternews.com/ny-judge-rules-in-favor-of-unvaccinated-children-spread-1833861419', 'https://www.npr.org/2019/04/06/710634646/mummified-mice-and-falcons-found-in-newly-unveiled-egyptian-tomb', 'https://www.businessinsider.com/supermassive-black-hole-first-photo-2019-4', 'https://www.tmz.com/2019/04/06/kodak-black-lauren-london-nipsey-hussle-widow-shoot-shot-disrespect/', 'http://time.com/5565525/identify-children-separated-border/', 'https://www.eonline.com/news/1030327/sophie-turner-steals-the-show-at-jonas-brothers-surprise-college-bar-concert', 'https://www.politico.com/story/2019/04/06/trump-mueller-probe-1260078', 'https://www.reuters.com/article/us-venezuela-politics/venezuelans-march-to-demand-power-water-and-end-to-maduro-idUSKCN1RI0L1']
env_news = {'status': 'ok', 'totalResults': 3, 'articles': [{'source': {'id': 'bloomberg', 'name': 'Bloomberg'}, 'author': 'Robert Burnson, Alyza Sebenius', 'title': "Keystone XL Pipeline Foes Sue to Void Trump's New Permit", 'description': 'Conservation groups urged a Montana federal court to toss out the new permit that President Donald Trump issued last month in an effort to skirt environmental laws and restart TransCanada Corp.’s stalled Keystone XL oil pipeline project.', 'url': 'https://www.bloomberg.com/news/articles/2019-04-06/keystone-pipeline-foes-seek-ruling-voiding-trump-s-new-permit', 'urlToImage': 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i_E2Pcyi1jxc/v1/1200x800.jpg', 'publishedAt': '2019-04-06T00:39:00+00:00', 'content': 'The Hardisty tank farm stands at dusk in Hardisty, Alberta.\r\nPhotographer: Brett Gundlock/Bloomberg\r\nConservation groups urged a Montana federal court to toss out the \r\nnew permit that President Donald Trump issued last month in an effort to skirt environment… [+1263 chars]'}, {'source': {'id': 'national-geographic', 'name': 'National Geographic'}, 'author': 'Michael Greshko, Laura Parker, Brian Clark Howard, Daniel Stone, Alejandra Borunda, Sarah Gibbens', 'title': 'A running list of how President Trump is changing environmental policy', 'description': 'The Trump administration has promised vast changes to U.S. science and environmental policy—and we’re tracking them here as they happen.', 'url': 'https://news.nationalgeographic.com/2017/03/how-trump-is-changing-science-environment.html', 'urlToImage': 'https://www.nationalgeographic.com/content/dam/environment/2018/10/trump_environment_ticker/trump_environment_ticker_nationalgeographic_1926130.jpg', 'publishedAt': '2019-04-03T01:22:27.4516367Z', 'content': None}, {'source': {'id': 'national-geographic', 'name': 'National Geographic'}, 'author': 'Christina Nunez', 'title': 'Fossil fuels, explained', 'description': "Much of the world's energy comes from material formed hundreds of millions of years ago, and there are environmental consequences for it.", 'url': 'https://www.nationalgeographic.com/environment/energy/reference/fossil-fuels.html', 'urlToImage': 'https://pmdvod.nationalgeographic.com/NG_Video/397/407/smpost_1502997138546.jpg', 'publishedAt': '2019-04-03T01:22:17.5610396Z', 'content': None}]}
articles = env_news['articles']

tone_analyzer = ToneAnalyzerV3(
    version=IBM_VERSION,
    iam_apikey=IBM_KEY,
    url=IBM_URL
)

text = 'Team, I know that times are tough! Product '\
    'sales have been disappointing for the past three '\
    'quarters. We have a competitive product, but we '\
    'need to do a better job of selling it!'

def analyze_tone(text):
    """Analyze sentimental tone of text"""

    tone_analysis = tone_analyzer.tone(tone_input={"text":text},
                                       content_type='application/json')
    return tone_analysis.get_result()



print(json.dumps(tone_analysis, indent=2))

