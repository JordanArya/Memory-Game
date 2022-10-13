var finish = false;
let point = 0;
// check_layout()
var relationship_score = {"keluarga inti":0,"keluarga jauh":0,"teman jauh":0,'teman kerja':0}
var total_score = {"keluarga inti":0,"keluarga jauh":0,"teman jauh":0,'teman kerja':0}
var random_question = choose_question()
var random_answer = []
random_ans()



function choose_question(){
	variables = []
	question = []
	for (var x = 0; x < First_name.length; x++){
		variables.push(x)
	}
	variables = shuffle(variables)
	variables = variables.slice(0, 5)
	return variables
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function random_ans(){
	variables = []
	random_answer = []
	level = document.getElementById("level-tag");
	let count = 0
	for (var x = 0; x < First_name.length;x++){
		if (First_name[x] + ' ' + Last_name[x] != First_name[random_question[level.innerText-1]] + ' ' + Last_name[random_question[level.innerText-1]]){
			variables.push(x)
		}
	}
	variables = shuffle(variables)
	for (var y = 0; y < 4; y++){
		random_answer.push(First_name[variables[y]] + ' ' + Last_name[variables[y]])
	}

	y = level.innerText-1
	image = document.getElementById("q-picture");
	image.src = Name[random_question[y]]
	random_answer.push(First_name[random_question[y]] + ' ' +  Last_name[random_question[y]])
	random_answer = shuffle(random_answer)
	creates_options(random_answer)
}

function creates_options(data){
	var element = document.getElementById('User-Answer')
	for (var i = 0; i < 5; i++){
		var option = document.getElementById(i);
	    option.text = data[i]
	    option.value = data[i]
		element.add(option)
	}
}

function NextLevel(self){
		user_answer = answer.value;
		image = document.getElementById("q-picture");
		level = document.getElementById("level-tag");
		next_level = parseInt(level.innerText);
		
		if (! finish){
			Check_answer(self)
		}

		if (next_level < (random_question.length)){
			if (user_answer.length != 0){ 
			 	
				 image = document.getElementById("q-picture");
				 level = document.getElementById("level-tag");
				 next_level = parseInt(level.innerText);

				
				 	if (next_level < (random_question.length)){
				 		level.innerText = next_level+1;
				 		random_ans()
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
	
	const first_name_answer = First_name[random_question[next_level-1]].match(/\w+/g)
	const last_name_answer = Last_name[random_question[next_level-1]].match(/\w+/g)
	// const also_known_answer = Also_known[next_level-1].match(/\w+/g)
	const user_answers = user_answer.match(/\w+/g)
	answer = First_name[random_question[level.innerText-1]]
	if(Last_name[random_question[level.innerText-1]] !== '-'){
		answer = First_name[random_question[level.innerText-1]] + ' ' + Last_name[random_question[level.innerText-1]]
	}
	
	console.log(answer)
	console.log(user_answers.join(' '))
	if(answer == user_answers.join(' ')){
		if(relationship_score[relation[next_level-1]]){
			relationship_score[relation[next_level-1]] += 1
		} 

		else{
			relationship_score[relation[next_level-1]] = 1
		}
		score = 100
		point += 100

	}

	// if(score == 0){
	// 	for (var y = 0; y < user_answers.length; y ++){
	// 		for (var i = 0; i < first_name_answer.length; i ++){
	// 			if (first_name_answer[i].includes(user_answers[y])){
	// 				if(relationship_score[relation[next_level-1]]){
	// 					relationship_score[relation[next_level-1]] += 1
	// 				} 

	// 				else{
	// 					relationship_score[relation[next_level-1]] = 1
	// 				}
	// 				score = user_answers[i].length/first_name_answer[i].length * 100;
	// 				point += score;
	// 				break;
	// 			}
	// 		}
	// 	}
	// }

	// if(score == 0){
	// 	for (var y = 0; y < user_answers.length; y ++){
	// 		for (var i = 0; i < last_name_answer.length; i ++){
	// 			if (last_name_answer[i].includes(user_answers[y])){
	// 				if(relationship_score[relation[next_level-1]]){
	// 					relationship_score[relation[next_level-1]] += 1
	// 				} 

	// 				else{
	// 					relationship_score[relation[next_level-1]] = 1
	// 				}
	// 				score = user_answers[i].length/last_name_answer[i].length * 100;
	// 				point += score
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
	
	if(next_level == random_question.length){
		finish = true
		send_Data()
	}

	total_score[relation[next_level-1]] += 1

alert(point)

}

function Start_from_zero(self){
	level = document.getElementById("level-tag").innerText = 1
	image = document.getElementById("q-picture").src = Name[0]
}

function send_Data(){
	// var datas = ['anak','satu','dua']
	var data_keluarga_dekat = relationship_score['keluarga intit']
	var data_keluarga_jauh = relationship_score['keluarga jauh']
	var data_teman_dekat = relationship_score['teman dekat']
	var data_teman_jauh = relationship_score['teman jauh']
	

	$.ajax({
	    url: '/upload_score',
	    type: "POST",
	    dataType: "json",
	  	data: {
	  		score: JSON.stringify(point),
	  		keluarga_dekat: JSON.stringify(relationship_score['keluarga inti']),
	  		keluarga_jauh: JSON.stringify(relationship_score['keluarga jauh']),
	  		teman_dekat: JSON.stringify(relationship_score['teman jauh']),
	  		teman_kerja: JSON.stringify(relationship_score['teman kerja'])
	  	}
  	})

  	window.location.href = "/redirect_graph"
}

// const Name=['gambar1.jpg','gambar2.jpg','gambar3.jpg','gambar4.jpg','gambar5.jpg','gambar6.jpg']
document.getElementById('Max-level').innerText = '/ ' + (random_question.length).toString()

var answer = document.getElementById("User-Answer");
answer.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
	NextLevel(this)
}

});