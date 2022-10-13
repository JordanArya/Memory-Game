
var logos = document.getElementById("logo");

function ChangeTheme(self){
	
	document.body.classList.toggle('ligth-theme')
	if(document.body.classList.contains("ligth-theme")){
		document.getElementById('logo').src = "static/icon/moon.svg"
		document.getElementById('logo-name').innerText = 'Dark'
		localStorage.ligthmode = 'Ligth'
	}
	else{
		document.getElementById('logo').src = "static/icon/brightness-high.svg"
		document.getElementById('logo-name').innerText = 'Ligth'
		localStorage.ligthmode = 'Dark'
	}

	if (screen.width <= 920){
		document.getElementById('logo-name').innerText = ''
	}
	
	// document.getElementsById('')
}








