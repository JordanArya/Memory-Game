# Flask Things
from flask import Blueprint,render_template,request,redirect,url_for,flash,session,jsonify


# Data From Other File
# Anything else


views = Blueprint('views',__name__)


# Home index
@views.route("/")
@views.route("/home")
def home():
	return render_template('home.html')

# About index
@views.route("/about")
def about():
	return render_template('about.html')

@views.route("/choose")
def choose_draft():
	return render_template('choose_draft.html')


	
	




