from bs4 import BeautifulSoup, NavigableString
import requests
import re

saved_articles = ['https://www.cbssports.com/college-basketball/news/virginia-vs-auburn-score-live-final-four-updates-2019-ncaa-tournament-highlights-stream-tv-info/', 'https://www.foxnews.com/opinion/dan-gainor-media-concede-theres-a-border-crisis-but-wont-give-trump-credit-for-getting-mexico-to-act', 'https://www.cnn.com/2019/04/06/us/coachella-festival-worker-dies/index.html', 'https://www.aljazeera.com/news/2019/04/gna-head-accuses-haftar-betrayal-vows-tripoli-push-190406195133847.html', 'https://pagesix.com/2019/04/06/lori-loughlins-other-daughter-is-still-in-her-corner/', 'https://www.cbssports.com/college-basketball/news/michigan-state-vs-texas-tech-game-prediction-pick-start-time-odds-2019-final-four-how-to-watch-live-stream/', 'https://www.ndinsider.com/football/notebook-notre-dame-qb-ian-book-pushing-through-a-false/article_b0877ddc-a79a-5919-a0fa-8d4be738a01d.html', 'https://www.washingtonexaminer.com/news/fbi-joins-investigation-into-fires-at-3-black-churches-in-louisiana', 'https://www.usatoday.com/story/news/politics/2019/04/06/president-trump-ilhan-omar-boasts-israel-relations/3368304002/', 'https://www.theverge.com/good-deals/2019/4/6/18298444/logitech-harmony-650-sale-best-buy-good-deal', 'https://www.vox.com/policy-and-politics/2019/4/6/18298287/barack-obama-berlin-town-hall-speech', 'https://www.androidpolice.com/2019/04/06/google-assistant-now-shows-ads-in-some-answers/', 'https://splinternews.com/ny-judge-rules-in-favor-of-unvaccinated-children-spread-1833861419', 'https://www.npr.org/2019/04/06/710634646/mummified-mice-and-falcons-found-in-newly-unveiled-egyptian-tomb', 'https://www.businessinsider.com/supermassive-black-hole-first-photo-2019-4', 'https://www.tmz.com/2019/04/06/kodak-black-lauren-london-nipsey-hussle-widow-shoot-shot-disrespect/', 'http://time.com/5565525/identify-children-separated-border/', 'https://www.eonline.com/news/1030327/sophie-turner-steals-the-show-at-jonas-brothers-surprise-college-bar-concert', 'https://www.politico.com/story/2019/04/06/trump-mueller-probe-1260078', 'https://www.reuters.com/article/us-venezuela-politics/venezuelans-march-to-demand-power-water-and-end-to-maduro-idUSKCN1RI0L1']

# test_url = 'https://www.foxnews.com/science/fossilized-remains-sea-monster-found'

# test_p_str = '<p><a href="https://www.foxnews.com/science/four-legged-whale-that-lived-40-million-years-ago-found-off-coast-in-peru" target="_blank"><strong>FOUR-LEGGED WHALE THAT LIVED 40 MILLION YEARS AGO FOUND OFF COAST IN PERU</strong></a></p>'

def find_text(html_string, start_from):
    # print('find_text string', string)
    try:
        start_index = html_string.index('>', start_from) + 1
        stop_index = html_string.index('<', start_index)
        result = html_string[start_index:stop_index]
        return result
    except ValueError:
        return ""


def format_p_string(html_string):
    """clean formatting of p element strings from beautiful soup"""
    text_str = ''
    counter = -1
    for character in html_string:
        counter+=1
        if character == '>':
            text = find_text(html_string, counter)
            text_str+=text
    
    formatted_str = re.sub(' +', ' ', text_str).replace(
                                    '\n', '').replace('&amp;apos', "'")
    return formatted_str

def fetch_article(url):
    """given the url, fetch the news article"""

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    return soup

def extract_p_tags(soup):
    """Extract all p elements and join together into one string"""
    
    text_list = []
    for tag in soup.find_all('p'):
        text_list.append(str(tag))
    html_string = " ".join(text_list)   

    return html_string

def get_body_from_article(url):
    bs = fetch_article(url)
    full_html_str = extract_p_tags(bs)
    article_body = format_p_string(full_html_str)
    return article_body

counter = 0
for article in saved_articles:
    counter+=1
    if counter==2:
        article_body = get_body_from_article(article)
        print(article_body)

