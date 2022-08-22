const Name=['static/Pciture_1/gambar1.jfif','static/Pciture_1/gambar2.jfif','static/Pciture_1/gambar3.jfif','static/Pciture_1/gambar4.jfif','static/Pciture_1/gambar5.jfif','static/Pciture_1/gambar6.jfif','static/Pciture_1/gambar7.jfif']
const First_name =['kusno','soeharto','bacharuddin','abdurrahman','megawati','susilo', 'joko'];
const Last_name = ['sosrodihardjo', '', 'jusuf habibie', 'wahid', 'soekarno putri', 'bambang yudhoyono', 'widodo'];
const Also_known = ['soekarno', '', 'habibie', 'gusdur', ' megawati', 'SBY', 'jokowi' ];
let point = 0;


function NextLevel(self){
		Check_answer(self)
		user_answer = answer.value;
		image = document.getElementById("q-picture");
		level = document.getElementById("level-tag");

		next_level = parseInt(level.innerText);
		if (next_level < Name.length){
			if (user_answer.length != 0){ 
			 	
				 image = document.getElementById("q-picture");
				 level = document.getElementById("level-tag");
				 next_level = parseInt(level.innerText);

				if(point){
				 	 if (next_level < (Name.length)){
				 	 	 image.src = Name[next_level];
				 	 	 level.innerText = next_level+1;
				 	}
				}

				else{
				 	live = document.getElementById('life-tag');
				 	player_live = live.innerText;
					live.innerText = parseInt(player_live)-1;
				 	alert('Jawaban Kamu Salah Coba Ingat Lagi');
				}
				answer.value = null
			}

			else{
				alert('Tolong Isi Jawabannya')
			}
		}

		else{
			alert('Your Score is ' + point)
		}
	}

	


function Check_answer(self){
	let score = 0
	answer = document.getElementById("User-Answer");
	user_answer = answer.value;
	level = document.getElementById("level-tag")
	next_level = parseInt(level.innerText);
	
	const first_name_answer = First_name[next_level-1].split(" ");
	const last_name_answer = Last_name[next_level-1].split(" ");
	const also_known_answer = Also_known[next_level-1].split(" ");

	if(First_name[next_level-1].includes(user_answer) || Last_name[next_level-1].includes(user_answer) || Also_known[next_level-1].includes(user_answer)){
		score = 100
		point += 100
	}

	



	for (var i = 0; i < first_name_answer.length; i ++){
		if (first_name_answer[i].includes(user_answer)){
			score = user_answer.length/first_name_answer[0].length * 100;
			point += score;
			break;
		}
	}

	if(score == 0){
		for (var i = 0; i < last_name_answer.length; i ++){
		if (last_name_answer[i].includes(user_answer)){
			score = user_answer.length/last_name_answer[0].length * 100;
			point += score
			break;
		}
	}
	}

	if(score == 0){
		for (var i = 0; i < also_known_answer.length; i ++){
		if (also_known_answer.includes(user_answer)){
			score += user_answer.length/also_known_answer[0].length * 100;
			point +=  score;
			score = 0;
			
		}
	}
}

}

function Start_from_zero(self){
	level = document.getElementById("level-tag").innerText = 1
	live = document.getElementById('life-tag').innerText = 5
	image = document.getElementById("q-picture").src = Name[0]
}

// const Name=['gambar1.jpg','gambar2.jpg','gambar3.jpg','gambar4.jpg','gambar5.jpg','gambar6.jpg']
document.getElementById('Max-level').innerText = '/ ' + (Name.length).toString()


var answer = document.getElementById("User-Answer");
answer.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
	NextLevel(this)
}

});




