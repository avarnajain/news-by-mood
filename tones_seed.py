from model import Article, Tone, Score, connect_to_db, db
from server import app

#Add rows to Tone table based on tones returned from the IBM API
if __name__ == "__main__":
    connect_to_db(app)
    # db.create_all()
    app.config['SQLALCHEMY_ECHO'] = True


    anger = Tone(tone_id='anger', tone_category='emotional', tone_name='Anger')
    db.session.add(anger)

    fear = Tone(tone_id='fear', tone_category='emotional', tone_name='Fear')
    db.session.add(fear)

    joy = Tone(tone_id='joy', tone_category='emotional', tone_name='Joy')
    db.session.add(joy)

    sadness = Tone(tone_id='sadness', tone_category='emotional', tone_name='Sadness')
    db.session.add(sadness)

    analytical = Tone(tone_id='analytical', tone_category='language', tone_name='Analytical')
    db.session.add(analytical)

    confident = Tone(tone_id='confident', tone_category='language', tone_name='Confident')
    db.session.add(confident)

    tentative = Tone(tone_id='tentative', tone_category='language', tone_name='Tentative')
    db.session.add(tentative)

    db.session.commit()