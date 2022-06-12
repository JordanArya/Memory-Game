# Import dari flask
from flask import Blueprint,render_template,redirect,request,flash,url_for



auth = Blueprint('auth',__name__)


@auth.route('/login',methods = ['GET','POST'])
def login():
	pass