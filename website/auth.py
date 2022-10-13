# Import dari flask
from flask import Blueprint,render_template,redirect,request,flash,url_for
from flask_login import login_user, current_user, logout_user, login_required

# Import dari file lain
from website import app, db, bcrypt
from .forms import RegistarationForm,LoginForm
from .models import User, Images, Score

# Import lain
from datetime import timedelta

auth = Blueprint('auth',__name__)


@auth.route('/login',methods = ['GET','POST'])
def login():
	form = LoginForm()
	if current_user.is_authenticated:
		return redirect(url_for("views.home"))
	if form.validate_on_submit():
		user = None
		username = form.username.data
		password = form.password.data
		email = form.username.data
		user_by_Username = User.query.filter_by(username=username).first()
		user_by_email = User.query.filter_by(email=email).first()

		if user_by_Username:
			user = user_by_Username
		elif user_by_email:
			user = user_by_email

		if user:
			if bcrypt.check_password_hash(user.password,password):
				flash('Logged in succesfully!',category='success')
				login_user(user,duration = timedelta(seconds=1))
				return redirect(url_for('views.home'))
			else:
				flash('Incorrect password, try again.',category='error')
		else:
			flash("Email does not exist.",category='error')
		
	return render_template('login_page.html',form = form)


@auth.route('/SignUp',methods = ['GET','POST'])
def SignUp():
	form = RegistarationForm()
	if current_user.is_authenticated:
		return redirect(url_for("views.home"))
	if form.validate_on_submit():
		username = form.username.data
		password = form.password.data
		email = form.email.data
		user = User.query.filter_by(username=username).first()
		if username != "null" or username != None:
			if user is None:
				user = User.query.filter_by(email=email).first()
				if user is None:	
					new_user = User(username = username,password=bcrypt.generate_password_hash(password),email=email)
					db.session.add(new_user)
					db.session.commit()

					score = Score(creator_id = new_user.id)

					db.session.add(score)
					db.session.commit()

					login_user(new_user,duration = timedelta(seconds=1))
					
					return redirect(url_for('views.home'))
				else:
					flash('email address already exist',category='error')
			else:
				flash('username already exist',category='error')
		


				
	return render_template('sign_up.html',form=form)

@auth.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('views.home'))