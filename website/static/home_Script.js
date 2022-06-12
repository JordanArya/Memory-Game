const Name=['static/Pciture_1/gambar1.jpg','static/Pciture_1/gambar2.jpg','static/Pciture_1/gambar3.jpg','static/Pciture_1/gambar4.jpg','static/Pciture_1/gambar5.jpg','static/Pciture_1/gambar6.jpg']
const Answer=['Anas','Anas','Anas','Anas','Anas','Anas']

function NextLevel(self){
	answer = document.getElementById("User-Answer");
	user_answer = answer.value;
	

	image = document.getElementById("q-picture");
	level = document.getElementById("level-tag")

	next_level = parseInt(level.innerText)

	  if (user_answer.length != 0){ 
	 console.log(user_answer)
	 

	 image = document.getElementById("q-picture");
	 level = document.getElementById("level-tag")

	 next_level = parseInt(level.innerText)
	 if (user_answer.toLowerCase() === Answer[next_level-1].toLowerCase()){
	 	 if (next_level < Name.length){
	 	 	 image.src = Name[next_level]
	 	 	 level.innerText = next_level+1
	 }


	}
	 else{

	 	live = document.getElementById('life-tag')
	 	player_live = live.innerText
		live.innerText = parseInt(player_live)-1
	 	alert('Jawaban Kamu Salah Coba Ingat Lagi')
	 }
	answer.value = null
	}

	else{
		alert('Tolong Isi Jawabannya')
	}
	
	

}



function Start_from_zero(self){
	level = document.getElementById("level-tag").innerText = 1
	live = document.getElementById('life-tag').innerText = 5
	image = document.getElementById("q-picture").src = Name[0]
}




