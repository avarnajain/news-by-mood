from bs4 import BeautifulSoup, NavigableString
import requests
import re

def get_article_body(url):
    """Call all functions needed to extract p tag text from article urls"""

    bs = fetch_article(url)
    full_html_str = find_p_tags(bs)
    article_body = format_p_string(full_html_str)
    return article_body

def fetch_article(url):
    """given the url, fetch the news article and parse html"""

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    return soup

def find_p_tags(soup):
    """find all p elements and join together into one string"""
    
    text_list = []
    for tag in soup.find_all('p'):
        text_list.append(str(tag))
    html_string = " ".join(text_list)   

    return html_string


def format_p_string(html_string):
    """format p element strings from beautiful soup"""
    
    text_str = ''
    counter = -1
    for character in html_string:
        counter+=1
        if character == '>':
            text = find_text(html_string, counter)
            text_str+=text
    formatted_str = re.sub(' +', ' ', text_str).replace('\n', '')
    # .replace('&amp;apos', "'")
    return formatted_str

def find_text(html_string, start_from):
    """find and extract text strings within html tags"""

    try:
        start_index = html_string.index('>', start_from) + 1
        stop_index = html_string.index('<', start_index)
        result = html_string[start_index:stop_index]
        return result
    except ValueError:
        return ""

