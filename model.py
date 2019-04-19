from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from server import app

db = SQLAlchemy()

class Article(db.Model):
    """Databse of news articles"""

    __tablename__ = "articles"

    article_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(50), nullable=False)
    published = db.Column(db.Datetime, nullable=False)
    description = db.Column(db.String(1000), nullable=False)

    def __repr__(self):

        return "<Article> article_id {} url {}".format(self.article_id,
                                                        self.url)


class Relation(db.Model):
    """Middle table to connect article to sentiment"""

    __tablename__ = "relations"

    relation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id'))
    sentiment_id = db.Column(db.Integer, db.ForeignKey('sentiments.sentiment_id'))
    score = db.Column(db.)

    def __repr__(self):

        return "<Relation> relation_id {} article_id {} sentiment_id {}".format(self.relation_id,
                                                                                self.article_id,
                                                                                self.sentiment_id)


class Sentiment(db.Model):
    """Db of sentiments"""

    __tablename__ = sentiments

    sentiment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tone = db.Column(db.String(20), nullable=False)

    def __repr__(self):

        return "<Sentiment> sentiment_id {} tone {}".format(self.sentiment_id,
                                                            self.tone)


def connect_to_db(app, db_name):
    """Connect to db"""

    app.config['SQLAlCHEMY_DATABASE_URI'] = 'postgresql:///' + db
    # app.config['SQLALCHEMY_ECHO'] = True # to print sql statements
    db.app = app
    db.init_app(app)
    db.create_all()

connect_to_db(app, db)


    