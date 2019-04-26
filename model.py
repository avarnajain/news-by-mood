from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import psycopg2

db = SQLAlchemy()

article_category = db.Table('article_category',
    db.Column('article_id', db.Integer, db.ForeignKey('articles.article_id')),
    db.Column('category_id', db.String(20), db.ForeignKey('categories.category_id'))
    )

class Article(db.Model):
    """Databse of news articles"""

    __tablename__ = "articles"

    article_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String(500))
    url = db.Column(db.String(2000), nullable=False, unique=True)
    title = db.Column(db.String(1500), nullable=False)
    source = db.Column(db.String(200))
    image_url = db.Column(db.String(1500))
    published = db.Column(db.DateTime)
    description = db.Column(db.String(2000))

    def __repr__(self):

        return "<Article> article_id {} url {}".format(self.article_id,
                                                       self.url)

class Tone(db.Model):
    """Db of tones"""

    __tablename__ = "tones"

    tone_id = db.Column(db.String(20), primary_key=True)
    tone_type = db.Column(db.String(20), nullable=False)
    tone_name = db.Column(db.String(20), nullable=False)

    def __repr__(self):

        return "<Tone> tone_id {} tone {}".format(self.tone_id, self.tone)

class Score(db.Model):
    """All tones and score for articles"""

    __tablename__ = "scores"

    score_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id'))
    tone_id = db.Column(db.String(20), db.ForeignKey('tones.tone_id'))
    score = db.Column(db.Float, nullable=False)

    #Define relationship to Article
    article = db.relationship("Article", backref=db.backref("scores"))
    #Define relationship to Tone
    tone = db.relationship("Tone", backref=db.backref("scores"))

    def __repr__(self):

        return "<Article_Tone> score_id {} article_id {} tone_id {}".format(self.score_id,
                                                                            self.article_id,
                                                                            self.tone_id)

class Category(db.Model):
    """News Categories from News API"""

    __tablename__ = "categories"

    category_id = db.Column(db.String(20), primary_key=True)
    category_name = db.Column(db.String(20), nullable=False)

    #Define relationship to Article
    articles = db.relationship("Article", 
                        secondary=article_category,
                        backref=db.backref("categories"))

    def __repr__(self):

        return "<Category> category_id {}".format(self.category_id)

##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PostgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///news'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = False
    db.app = app
    db.init_app(app)
    db.create_all()


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app

    connect_to_db(app)
    print("Connected to DB.")
    