from model import Article, Tone, Score, Category, connect_to_db, db
from server import app

#Add rows to Tone table based on tones returned from the IBM API
if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()
    app.config['SQLALCHEMY_ECHO'] = False

    #Seed tones table
    anger = Tone(tone_id='anger', tone_type='emotional', tone_name='Anger')
    db.session.add(anger)

    fear = Tone(tone_id='fear', tone_type='emotional', tone_name='Fear')
    db.session.add(fear)

    joy = Tone(tone_id='joy', tone_type='emotional', tone_name='Joy')
    db.session.add(joy)

    sadness = Tone(tone_id='sadness', tone_type='emotional', tone_name='Sadness')
    db.session.add(sadness)

    analytical = Tone(tone_id='analytical', tone_type='language', tone_name='Analytical')
    db.session.add(analytical)

    confident = Tone(tone_id='confident', tone_type='language', tone_name='Confident')
    db.session.add(confident)

    tentative = Tone(tone_id='tentative', tone_type='language', tone_name='Tentative')
    db.session.add(tentative)

    #Seed categories table
    business = Category(category_id='business', category_name='Business')
    db.session.add(business)
    
    entertainment = Category(category_id='entertainment', category_name='Entertainment')
    db.session.add(entertainment)
    
    general = Category(category_id='general', category_name='General')
    db.session.add(general)

    health = Category(category_id='health', category_name='Health')
    db.session.add(health)

    science = Category(category_id='science', category_name='Science')
    db.session.add(science)

    sports = Category(category_id='sports', category_name='Sports')
    db.session.add(sports)

    technology = Category(category_id='technology', category_name='Technology')
    db.session.add(technology)

    #Commit all adds to session
    db.session.commit()

