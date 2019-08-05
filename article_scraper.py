from bs4 import BeautifulSoup, NavigableString
import requests
import re
import time
from requests import ConnectionError

def get_article_body(url):
    """Call all functions needed to extract p tag text from article urls"""
    # print('URL:', url)
    bs = fetch_article(url)
    # print(bs)
    if (bs):
        full_html_str = find_p_tags(bs)
        article_body = format_p_string(full_html_str)
    else:
        return []
    # return article_body

def fetch_article(url):
    """given the url, fetch the news article and parse html"""

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
    except ConnectionError:
        soup = None
    
    return soup

def find_p_tags(soup):
    """find all p elements and join together into one string"""
    
    text_list = []
    counter = 0
    for tag in soup.find_all('p'):
        # print('_______', '\n', tag)
        text_list.append(str(tag))
        counter += 1
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
    formatted_str.replace('&amp;apos', "'")
    # print('_____', formatted_str, '\n')
    return formatted_str

def find_text(html_string, start_from):
    """find and extract text strings within html tags"""

    try:
        start_index = html_string.index('>', start_from) + 1
        stop_index = html_string.index('<', start_index)
        result = html_string[start_index:stop_index]
        # print(result)
        if "\t" in result or '@media' in result:
            return ""
        # print(result, '\n')
        return result
    except ValueError:
        return ""


