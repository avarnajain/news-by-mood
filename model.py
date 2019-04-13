from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from server import app

db = SQLAlchemy()

class Article(db.Model):
    """Databse of news articles"""

    __tablename__ = "articles"

    url = db.Column(db.String(200), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    source = db.Column
    published
    description
    sentiment
    body

class Sentiment(db.Model):
    """Db of sentiments"""

    __tablename__ = sentiments

    





def connect_to_db(app, db_name):
    """Connect to db"""

    app.config['SQLAlCHEMY_DATABASE_URI'] = 'postgresql:///' + db
    # app.config['SQLALCHEMY_ECHO'] = True # to print sql statements
    db.app = app
    db.init_app(app)
    db.create_all()

connect_to_db(app, db)


    