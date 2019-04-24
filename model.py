# from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Article(db.Model):
    """Databse of news articles"""

    __tablename__ = "articles"

    article_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(300), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    published = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(2000), nullable=False)

    tones = db.relationship('Tone',
                            secondary='article_tones', 
                            backref='articles')

    def __repr__(self):

        return "<Article> article_id {} url {}".format(self.article_id,
                                                        self.url)


class Article_Tone(db.Model):
    """All tones and score for articles"""

    __tablename__ = "article_tones"

    relation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id'))
    tone_id = db.Column(db.Integer, db.ForeignKey('tones.tone_id'))
    score = db.Column(db.Float, nullable=False)

    def __repr__(self):

        return "<Article_Tone> relation_id {} article_id {} tone_id {}".format(self.relation_id,
                                                                                self.article_id,
                                                                                self.tone_id)


class Tone(db.Model):
    """Db of tones"""

    __tablename__ = 'tones'

    tone_id = db.Column(db.String(3), primary_key=True)
    tone = db.Column(db.String(20), nullable=False)

    def __repr__(self):

        return "<Tone> tone_id {} tone {}".format(self.tone_id, self.tone)


def connect_to_db(app):
    """Connect to db"""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres:///news'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = False # to print sql statements
    db.app = app
    db.init_app(app)
    db.create_all()

if __name__ == "__main__":  
    
    from server import app

    connect_to_db(app)
    print("after connect is called")


    