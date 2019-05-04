from model import connect_to_db, db, Article, Tone, Score, Category

def sort_by_date(Article):
    """Sort Articles by date of publishing"""

    datetime = Article.published
    date = datetime.date()
    # print(date)
    return date

def get_Articles_with_filter(tone_id, tone_type):
    """Return list of Articles with highest score for chosen emotion"""

    # get all scores with the chosen tone_id
    Tone_Scores = Score.query.filter(Score.tone_id==tone_id).all()
    # get all articles with the chosen tone_id
    Tone_Articles = [Score.article for Score in Tone_Scores]
    # get all Scores for chosen articles
    Article_Scores = [article.scores for article in Tone_Articles]

    Article_ids = []
    # Loop thorugh article_scores to find Articles having highest score for chosen tone
    for scores in Article_Scores:
        for score in scores:
            if score.tone_id==tone_id:
                chosen_tone_score=score.score
        for score in scores:
            tone = score.tone
            if tone.tone_type==tone_type and score.score >= chosen_tone_score:
                highest_score = score.score
        
        Article_ids.append(score.article)

    # sort articles by day they were published
    Articles = sorted(Article_ids, key=sort_by_date, reverse=True)
    
    return Articles

