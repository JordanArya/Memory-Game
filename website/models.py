from website import db, login_manager

from flask_login import UserMixin

from datetime import datetime

@login_manager.user_loader
def load_user(id):
	return User.query.get(id)

class Images(db.Model):
	id = db.Column(db.Integer, db.Identity(start = 1, cycle = True), primary_key = True)
	# draft_name = db.Column(db.String(100),  nullable = False)
	image_file = db.Column(db.String(100), unique = True, nullable = False)
	first_name = db.Column(db.String(20), nullable = False)
	last_name = db.Column(db.String(20), nullable = False)
	relationship = db.Column(db.String(20), nullable = False)
	draft_id = db.Column(db.Integer, db.ForeignKey('draft.id'), nullable=False)
	creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

class User(db.Model, UserMixin):
	id = db.Column(db.Integer, db.Identity(start = 1, cycle=True) ,primary_key = True)
	username = db.Column(db.String(20),unique = True, nullable = False)
	email = db.Column(db.String(50), unique = True, nullable = False)
	password = db.Column(db.String(20), nullable = False, unique = True)
	images = db.relationship('Images', backref = "creator", lazy = True)
	score = db.relationship('Score', backref = "creator", lazy = True)

class Draft(db.Model, UserMixin):
	id = db.Column(db.Integer, db.Identity(start = 1, cycle=True) ,primary_key = True)
	name = db.Column(db.String(255), nullable = False)
	creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

class Score(db.Model):
	id = db.Column(db.Integer, db.Identity(start = 1, cycle=True) ,primary_key = True)
	Keluarga_Inti_Persentage = db.Column(db.Float,  default = 0)
	Keluarga_Jauh_Persentage = db.Column(db.Float,  default = 0)
	Teman_Dekat_Persentage = db.Column(db.Float,  default = 0)
	Teman_Jauh_Persentage = db.Column(db.Float,  default = 0)
	creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)






