// const Name=['gambar1.jpg','gambar2.jpg','gambar3.jpg','gambar4.jpg','gambar5.jpg','gambar6.jpg']

	const picture_saved = [];
	
	const img = document.getElementById('picture_p');
	const img_inputed = document.getElementById('input_img');
	const number = document.getElementById('number_f');
	const f_name_txt = document.getElementById('input-f-name');
	const l_name_txt = document.getElementById('input-l-name') ;
	const relation_txt = document.getElementById('input-relationship');
	const user_choice = document.getElementById('user-indx');

	relation_txt.value = '';

	function create_option(){
		var option = document.createElement("option");
	    option.text = f_name_txt.value + ' ' + l_name_txt.value;
		user_choice.add(option)


		
	}

	function change_option(){
		user_choice.remove(number.textContent -2)
		var option = document.createElement("option")
		option.text = f_name_txt.value + ' ' + l_name_txt.value;
		user_choice.add(option,number.textContent -2 )
	}


	function change_picture(self){
		const data = self.files[0];
		if (data){
			const reader = new FileReader();
			reader.onload = function(){
			const result = reader.result;
			img.src = result
		}
		reader.readAsDataURL(data);		
	}}

	function next(){
		
		const f_name  = f_name_txt.value;
		const l_name = l_name_txt.value; 
		const relation = relation_txt.value;
		const datas = img_inputed.files[0];

		 if (picture_saved[parseInt(number.textContent-1)] != undefined){
			const data = picture_saved[number.textContent-1]
		
			if(datas != data[1] && datas != undefined || f_name != data[0][0] && f_name != '' || l_name != data[0][1] && l_name != '' || relation != data[0][2] && relation != ''){
				
				if(datas){
					picture_saved.splice((number.textContent-1),1,[[f_name,l_name,relation],datas]);
				}
					

				else {
					picture_saved.splice((number.textContent-1),1,[[f_name,l_name,relation],data[1]]);
					
				}
	
			}
			
			if (picture_saved[parseInt(number.textContent)] != undefined){
				const reader = new FileReader();
				reader.onload = function(){
				const result = reader.result;
				img.src = result
				user_choice.value = user_choice[number.textContent-1].value; 
				f_name_txt.value = picture_saved[parseInt(number.textContent)-1][0][0];
				l_name_txt.value =  picture_saved[parseInt(number.textContent)-1][0][1];
				relation_txt.value =  picture_saved[parseInt(number.textContent)-1][0][2];
			}
			reader.readAsDataURL(picture_saved[parseInt(number.textContent)][1]);
		}



		number.innerText =  parseInt(number.textContent) +1;
		change_option()
		img_inputed.value = '';
		f_name_txt.value = '';
		l_name_txt.value = '';
		relation_txt.value = '';
		img.src = '../static/icon/No_image_profile.jpg';
		user_choice.value = ''; 
	
		
	}
		
		else if (img_inputed.files[0] != undefined && f_name != '' && l_name != '' && relation !=''){
			picture_saved.push([[f_name,l_name,relation],datas])
			
			number.innerText =  parseInt(number.textContent) +1;
			create_option()
			img_inputed.value = '';
			img.src = '../static/icon/No_image_profile.jpg';
			f_name_txt.value = '';
			l_name_txt.value = '';
			relation_txt.value = '';
			user_choice.value = ''; 

			
	}
	
		
}

	function back(self){
		if (parseInt(number.textContent) > 1 ){

			const data = picture_saved[parseInt(number.textContent-2)][1]
			const previous_f_name = picture_saved[parseInt(number.textContent-2)][0][0]
			const previous_l_name = picture_saved[parseInt(number.textContent-2)][0][1]
			const previous_relation = picture_saved[parseInt(number.textContent-2)][0][2]
			
		if (data){
			const reader = new FileReader();
			reader.onload = function(){
			const result = reader.result;
			img.src = result
			f_name_txt.value = previous_f_name;
			l_name_txt.value = previous_l_name;
			relation_txt.value = previous_relation; 

			number.innerText =  parseInt(number.textContent) -1
		}

			reader.readAsDataURL(data);


	}}
		
		user_choice.value = user_choice[number.textContent - 2].value
		
	}


	function change_to_selected_index(){
		var i = user_choice.selectedIndex
		const data = picture_saved[parseInt(i)][1]
		const previous_f_name = picture_saved[i][0][0]
		const previous_l_name = picture_saved[i][0][1]
		const previous_relation = picture_saved[i][0][2]

		if (data){
			const reader = new FileReader();
			reader.onload = function(){
			const result = reader.result;
			img.src = result
			f_name_txt.value = previous_f_name;
			l_name_txt.value = previous_l_name;
			relation_txt.value = previous_relation; 

			number.innerText =  i+1
		}

			reader.readAsDataURL(data);


	}

	}