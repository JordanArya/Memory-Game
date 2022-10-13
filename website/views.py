# Flask Things
from flask import Blueprint,render_template,request,redirect,url_for,flash,session,jsonify
from flask_login import login_required,current_user

# Data From Other File
from website import app, db
from website.models import Images,Draft,Score,User

# Anything else
import base64
import json
from PIL import Image
from werkzeug.utils import secure_filename
import os
import time
import secrets

views = Blueprint('views',__name__)


# Home index
@views.route("/")
@views.route("/home")
@login_required
def home():

	return render_template('home.html', draft_name = 'a', image_files ='a', image_firstnames ='a', image_relations ='a', image_lastnames = 'a', user=current_user.username)

# About index
@views.route("/about")
def about():
	return render_template('about.html')

@views.route("/upload", methods = ["GET", "POST"])
@login_required
def upload_draft():
	if request.method == "POST":
		draft_name = request.form.get('draft-name')
		first_name = request.form.getlist('fname')
		last_name = request.form.getlist('lname')
		relationship = request.form.getlist('relation')
		image_files = request.files.getlist('image')

		if(not Draft.query.filter_by(name = draft_name).all()):

			draft = Draft(name = draft_name, creator_id = current_user.id)

			db.session.add(draft)
			db.session.commit()

			image_draft = []

			for x in range(len(first_name)):
				print(first_name[x])
				if first_name[x] != '':
					image_name = random_data(image_files[x])
					image_file = save_image(image_files[x],"static/Pciture_1", image_name)
					
					image = Images(first_name = first_name[x], last_name = last_name[x], relationship = relationship[x].lower(), image_file = image_name, draft_id = draft.id, creator_id = current_user.id)

					db.session.add(image)
					db.session.commit()
			return redirect(url_for("views.home"))
		
		else:
			flash("Draft already exist.",category='error')


	return render_template('upload_draft.html', user = current_user.username)


# Random picture file name

def random_data(form_picture):
	random_file_name = secrets.token_hex(16)
	f_name, f_ext = os.path.splitext(form_picture.filename)
	picture_file_name = random_file_name + f_ext

	return picture_file_name

#SAVE IMAGE
def save_image(input_image, paths, name):

	output_size = (540,450)
	filename = secure_filename(input_image.filename) 
	path = os.path.join(app.root_path, paths, name)
	image = Image.open(input_image)
	image.thumbnail(output_size)
	image.save(path)

	return filename

@views.route("/choose", methods = ["GET", "POST"])
def choose_draft():
	if request.method == "POST":
		draft_name = request.form.get('choosed')
		draft_names = Draft.query.filter_by(name = draft_name).all()
		all_name = Draft.query.all()
		print(draft_names)
		print(all_name)

		images = Images.query.filter_by(draft_id = draft_names[0].id ).all()
		# user = Images.query.filter_by(creator_id = current_user).all()
		# draft_name = Draft.query.filter_by(creator_id = current_user.id).all()
		
		image_filename = []
		image_firstname = []
		image_lastname = []
		image_relations = []
		for image in images:
			image_filename.append(image.image_file)
			image_firstname.append(image.first_name)
			image_lastname.append(image.last_name)
			image_relations.append(image.relationship)
		return render_template('home.html',draft_name = draft_name, image_files = image_filename, image_firstnames = image_firstname, image_relations = image_relations, image_lastnames = image_lastname, user=current_user.username)
			


	draft_names = []
	draft_name = Draft.query.filter_by(creator_id = current_user.id).all()
	if len(draft_name) > 0:
		for names in draft_name:
			draft_names.append(names.name)

	return render_template('choose_draft.html', draft_names = draft_names)
	
@views.route("/graph")
def graph():
	score =  Score.query.filter_by(creator_id = current_user.id).all()
	new_score = score[1:]
	total_score = score[0]
	data_keluarga_jauh = []
	data_keluarga_dekat = []
	data_teman_dekat = []
	data_teman_jauh = []

	total_data = []

	total_data.append(total_score.Keluarga_Inti_Persentage)
	total_data.append(total_score.Keluarga_Jauh_Persentage)
	total_data.append(total_score.Teman_Dekat_Persentage)
	total_data.append(total_score.Teman_Jauh_Persentage)

	for every_score in new_score:
		data_keluarga_jauh.append(every_score.Keluarga_Inti_Persentage)
		data_keluarga_dekat.append(every_score.Keluarga_Jauh_Persentage)
		data_teman_dekat.append(every_score.Teman_Dekat_Persentage)
		data_teman_jauh.append(every_score.Teman_Jauh_Persentage)


	

	return render_template('user_graph.html', data_keluarga_jauh = data_keluarga_jauh, data_keluarga_dekat = data_keluarga_dekat, data_teman_jauh = data_teman_jauh, data_teman_dekat = data_teman_dekat, total_score = total_data)




@views.route('/upload_score',methods=['POST','GET'])
def upload_score():

	score = request.form.get('score')
	keluarga_dekat = float(request.form.get('keluarga_dekat'))
	keluarga_jauh = float(request.form.get('keluarga_jauh'))
	teman_dekat = float(request.form.get('teman_dekat'))
	teman_kerja = float(request.form.get('teman_kerja'))

	
	score = Score.query.filter_by(creator_id = current_user.id).first()
	score.Keluarga_Inti_Persentage += keluarga_dekat
	score.Keluarga_Jauh_Persentage += keluarga_jauh
	score.Teman_Dekat_Persentage += teman_dekat
	score.Teman_Jauh_Persentage += teman_kerja

	# db.session.add(score)
	db.session.commit()

	print(score.Keluarga_Inti_Persentage)

	new_score = Score(Keluarga_Inti_Persentage = keluarga_dekat, Keluarga_Jauh_Persentage = keluarga_jauh, Teman_Dekat_Persentage = teman_dekat, Teman_Jauh_Persentage = teman_kerja, creator_id = current_user.id)
	db.session.add(new_score)
	db.session.commit()

	

	return render_template('user_graph.html', newest_score = new_score, total_score = score)

@views.route("/redirect_graph")
def redirect_graph():
	
	score =  Score.query.filter_by(creator_id = current_user.id).all()
	new_score = score[1:]
	total_score = score[-1]
	data_keluarga_jauh = []
	data_keluarga_dekat = []
	data_teman_dekat = []
	data_teman_jauh = []

	total_data = []

	total_data.append(total_score.Keluarga_Inti_Persentage)
	total_data.append(total_score.Keluarga_Jauh_Persentage)
	total_data.append(total_score.Teman_Dekat_Persentage)
	total_data.append(total_score.Teman_Jauh_Persentage)

	for every_score in new_score:
		data_keluarga_jauh.append(every_score.Keluarga_Inti_Persentage)
		data_keluarga_dekat.append(every_score.Keluarga_Jauh_Persentage)
		data_teman_dekat.append(every_score.Teman_Dekat_Persentage)
		data_teman_jauh.append(every_score.Teman_Jauh_Persentage)

	print(data_teman_jauh)




	

	return render_template('user_graph.html', data_keluarga_jauh = data_keluarga_jauh, data_keluarga_dekat = data_keluarga_dekat, data_teman_jauh = data_teman_jauh, data_teman_dekat = data_teman_dekat, total_score = total_data)




	




