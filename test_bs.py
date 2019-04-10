from bs4 import BeautifulSoup
import requests

saved_articles = ['https://www.cbssports.com/college-basketball/news/virginia-vs-auburn-score-live-final-four-updates-2019-ncaa-tournament-highlights-stream-tv-info/', 'https://www.foxnews.com/opinion/dan-gainor-media-concede-theres-a-border-crisis-but-wont-give-trump-credit-for-getting-mexico-to-act', 'https://www.cnn.com/2019/04/06/us/coachella-festival-worker-dies/index.html', 'https://www.aljazeera.com/news/2019/04/gna-head-accuses-haftar-betrayal-vows-tripoli-push-190406195133847.html', 'https://pagesix.com/2019/04/06/lori-loughlins-other-daughter-is-still-in-her-corner/', 'https://www.cbssports.com/college-basketball/news/michigan-state-vs-texas-tech-game-prediction-pick-start-time-odds-2019-final-four-how-to-watch-live-stream/', 'https://www.ndinsider.com/football/notebook-notre-dame-qb-ian-book-pushing-through-a-false/article_b0877ddc-a79a-5919-a0fa-8d4be738a01d.html', 'https://www.washingtonexaminer.com/news/fbi-joins-investigation-into-fires-at-3-black-churches-in-louisiana', 'https://www.usatoday.com/story/news/politics/2019/04/06/president-trump-ilhan-omar-boasts-israel-relations/3368304002/', 'https://www.theverge.com/good-deals/2019/4/6/18298444/logitech-harmony-650-sale-best-buy-good-deal', 'https://www.vox.com/policy-and-politics/2019/4/6/18298287/barack-obama-berlin-town-hall-speech', 'https://www.androidpolice.com/2019/04/06/google-assistant-now-shows-ads-in-some-answers/', 'https://splinternews.com/ny-judge-rules-in-favor-of-unvaccinated-children-spread-1833861419', 'https://www.npr.org/2019/04/06/710634646/mummified-mice-and-falcons-found-in-newly-unveiled-egyptian-tomb', 'https://www.businessinsider.com/supermassive-black-hole-first-photo-2019-4', 'https://www.tmz.com/2019/04/06/kodak-black-lauren-london-nipsey-hussle-widow-shoot-shot-disrespect/', 'http://time.com/5565525/identify-children-separated-border/', 'https://www.eonline.com/news/1030327/sophie-turner-steals-the-show-at-jonas-brothers-surprise-college-bar-concert', 'https://www.politico.com/story/2019/04/06/trump-mueller-probe-1260078', 'https://www.reuters.com/article/us-venezuela-politics/venezuelans-march-to-demand-power-water-and-end-to-maduro-idUSKCN1RI0L1']

test_url = 'https://news.nationalgeographic.com/2017/03/how-trump-is-changing-science-environment/'

response = requests.get(test_url)

soup = BeautifulSoup(response.content, "html.parser")

name_box = soup.find_all('p')

for name in name_box:
    print("1 HTML:", name)
# print("1 TEXT:", name_box.text.strip())

text = []

# for tag in soup.find_all("p"):
#     if 'class' in i.attrs:
#         if "class-name" in i.attrs['class']:
#             continue
#         else:
#             text.append(tag)