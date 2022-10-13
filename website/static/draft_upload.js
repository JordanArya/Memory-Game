     // const Name=['gambar1.jpg','gambar2.jpg','gambar3.jpg','gambar4.jpg','gambar5.jpg','gambar6.jpg']

	// const picture_saved = [];
	
	
	const input_form_element = document.getElementById('input-form');
	const number = document.getElementById('number_f');
	const img = document.getElementById('picture_p');

	var img_inputed = document.getElementById('input_img_1');
	var f_name_txt = document.getElementById("input-f-name-1");
	var l_name_txt = document.getElementById("input-l-name-1") ;
	var relation_txt = document.getElementById("input-relationship-1");

	relation_txt.value = '';

	
	const user_choice = document.getElementById('user-indx');
	

	

	function create_option(){
		var option = document.createElement("option");
	    option.text = f_name_txt.value + ' ' + l_name_txt.value;
		user_choice.add(option)
		user_choice.value = ''
	}

	function creates_options(element,text){
		var option = document.createElement("option");
	    option.text = text
	    option.value = text
		element.add(option)
	}

	function create_new_input(){
		index = number.innerText
		var input_first_name = document.createElement('input');
		var input_last_name = document.createElement('input');
		var img_input = document.createElement("input");
		var relationship = document.createElement('select');
		
		creates_options(relationship,'Keluarga Inti')
		creates_options(relationship,'Keluarga Jauh')
		creates_options(relationship,'Teman Dekat')
		creates_options(relationship,'Teman Kerja')

		input_first_name.classList.add("input-name", "input-f-name")
		input_last_name.classList.add("input-name", "input-l-name")
		relationship.classList.add("input-name","input-relationship")
		img_input.classList.add("input-name" ,"input_img")

		input_first_name.id = "input-f-name-"+index
		input_last_name.id = "input-l-name-"+index
		img_input.id = "input_img_" + index 
		relationship.id = "input-relationship-"+index

		input_first_name.placeholder = "Siapa Nama depan-nya"
		input_last_name.placeholder = "Siapa Nama Belakang-nya"

		input_first_name.name = 'fname'
		input_last_name.name = 'lname'

		input_first_name.required
		input_last_name.required

		input_first_name.maxlength = 30
		input_last_name.maxlength = 30

		img_input.accept ='image/*'
		img_input.oninput = change_picture
		img_input.name = 'image'

		relationship.name = 'relation'
		relation_txt.required

		img_input.setAttribute('type',"file")

		document.getElementById('input-form').appendChild(img_input)
		document.getElementById('input-form').appendChild(input_first_name)
		document.getElementById('input-form').appendChild(input_last_name)
		document.getElementById('input-form').appendChild(relationship)
	}

	function change_option(){
		user_choice.remove(number.textContent -2)
		var option = document.createElement("option")
		option.text = f_name_txt.value + ' ' + l_name_txt.value;
		user_choice.add(option,number.textContent -2 )
	}


	function change_picture(){

		const data = img_inputed.files[0];
		if (data){
			const reader = new FileReader();
			reader.onload = function(){
			const result = reader.result;
			img.src = result
		}
		reader.readAsDataURL(data);		
	}}


	function change_data(index){
		f_name_id = 'input-f-name-' +index
		l_name_id = "input-l-name-" +index
		relation_id = "input-relationship-"+index
		input_image_id = "input_img_"+index
		

		img_inputed = document.getElementById(input_image_id);
		f_name_txt = document.getElementById(f_name_id);
		l_name_txt = document.getElementById(l_name_id) ;
		relation_txt = document.getElementById(relation_id);

		
	}

	function next(){
		var indx = 'input_img_'+(parseInt(number.textContent)+1)
		var next_elemnent = document.getElementById(indx)
		user_choice.value = ''



		if (f_name_txt != undefined){

			if(next_elemnent != undefined && f_name_txt.value != '' && l_name_txt.value != '' && img_inputed.value != '' && relation_txt.value !=''){
				console.log('ahllo')
				f_name_txt.style.visibility = 'hidden'
				l_name_txt.style.visibility = 'hidden'
				img_inputed.style.visibility = 'hidden'
				relation_txt.visibility = 'hidden'

				number.innerText =  parseInt(number.textContent) +1
				change_data(number.innerText)
				console.log(f_name_txt.id)

				var datas = img_inputed.files[0]
				if (datas){
					const readers = new FileReader();
					readers.onload = function(){
					const result = readers.result;
					img.src = result
				}
					readers.readAsDataURL(datas);		
				}

				img.src = '../static/icon/No_image_profile.jpg';

				f_name_txt.style.visibility = 'visible'
				l_name_txt.style.visibility = 'visible'
				img_inputed.style.visibility = 'visible'
				relation_txt.style.visibility  = 'visible'


			}

			else if(f_name_txt.value != '' && l_name_txt.value != '' && img_inputed.value != '' && relation_txt.value !=''){
				console.log(f_name_txt.value)
				console.log(img_inputed.value)
				console.log('hallo')
				number.innerText =  parseInt(number.textContent) +1;
				f_name_txt.style.visibility = 'hidden'
				l_name_txt.style.visibility = 'hidden'
				img_inputed.style.visibility = 'hidden'
				relation_txt.style.visibility = 'hidden'

				create_new_input()
				create_option()
				change_data(number.innerText)
				img.src = '../static/icon/No_image_profile.jpg';
				relation_txt.value = '';
			}			
		}
	}


	function back(self){
		user_choice.value = ''
		if (number.innerText > 1){
		number.innerText =  parseInt(number.textContent) -1
		f_name_txt.style.visibility = 'hidden'
		l_name_txt.style.visibility = 'hidden'
		img_inputed.style.visibility = 'hidden'
		relation_txt.style.visibility = 'hidden'

		change_data(number.innerText)
		// create_option()

		f_name_txt.style.visibility = 'visible'
		l_name_txt.style.visibility = 'visible'
		img_inputed.style.visibility = 'visible'
		relation_txt.style.visibility  = 'visible'

		var datas = img_inputed.files[0]
		if (datas){
			const readers = new FileReader();
			readers.onload = function(){
			const result = readers.result;
			img.src = result
		}
			readers.readAsDataURL(datas);		
		}}
}


	function change_to_selected_index(){
		f_name_txt.style.visibility = 'hidden'
		l_name_txt.style.visibility = 'hidden'
		img_inputed.style.visibility = 'hidden'
		relation_txt.style.visibility = 'hidden'

		var i = user_choice.selectedIndex +1
		number.innerText = i

		console.log(i)
		change_data(i)

		var datas = img_inputed.files[0]
		if (datas){
			const readers = new FileReader();
			readers.onload = function(){
			const result = readers.result;
			img.src = result
		}
			readers.readAsDataURL(datas);		
		}

		f_name_txt.style.visibility = 'visible'
		l_name_txt.style.visibility = 'visible'
		img_inputed.style.visibility = 'visible'
		relation_txt.style.visibility  = 'visible'



	}




	 

// var file = document.querySelector('#files > input[type="file"]').files[0];
// getBase64(file); // prints the base64 string


