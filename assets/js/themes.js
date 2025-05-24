let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

// UTILIZADO PARA CRIAR FLAGS COM MOUSE 2 POSTERIORMENTE
let img = new Image;
img.src = "https://cdn-icons-png.freepik.com/256/16008/16008199.png?semt=ais_hybrid";
//

let themes = document.querySelectorAll('[id*="theme"]')

let pBombs = document.getElementById("nBombas");

let theme;
let couleurTilesOne, couleurRevealed, couleurBackground, couleurBomb, couleurBombArc, couleurDebugBomb, couleurDebug;

function drawBackground(){
	c.fillStyle = couleurBackground;
	c.fillRect(0,0,canvas.width,canvas.height);
	document.body.style.background = couleurBackground;
	let buttons = document.querySelectorAll("button");
	for(let n = 0; n < buttons.length; n++){
		buttons[n].style.color = couleurTextButton;
		buttons[n].style.background = couleurButton;
	}
}

defineCouleur();

let lostQM = false;

function defineCouleur(theme){
	switch(theme){
		case "themeLear":
			couleurTilesOne = "#dfc3a4";
			couleurRevealed = "#c2b280";
			couleurBackground = "#c7a37d";
			couleurBomb = "#873f2b";
			couleurBombArc = "#410a0a";
			couleurButton = "rgba(31, 31, 31, 0.05)";
			couleurText = "#333333";
			couleurTextButton = couleurText;
			break;
		case "themeNight":
			couleurTilesOne = "#293863";
			couleurRevealed = "#454C73";
			couleurBackground = "#131E3A";
			couleurBomb = "#454C73";
			couleurBombArc = "#8B71BD";
			couleurText = "#f0f0f0";
			couleurButton = "rgba(0, 0, 0, 0.2)";
			couleurTextButton = couleurText;
			break;
		case "themeTropical":
			couleurTilesOne = "#2E5902";
			couleurRevealed = "#1B4001";
			couleurBackground = "#0A2611";
			couleurBomb = "#730D1F";
			couleurBombArc = "#410a0a";
			couleurText = "#68A629";
			couleurButton = "rgba(0, 0, 0, 0.2)";
			couleurTextButton = couleurText;
			break;
		case "themeSynth":
			couleurTilesOne = "#8B3DD9";
			couleurRevealed = "#3A37A6";
			couleurBackground = "#141759";
			couleurBomb = "#163E73";
			couleurBombArc = "#121a41";
			couleurText = "#4BF2F2";
			couleurButton = "rgba(31, 31, 31, 0.5)";
			couleurTextButton = couleurText;
			break;
		default:
			couleurTilesOne = "white";
			couleurRevealed = "green";
			couleurBackground = "#f0f0f0";
			couleurBomb = "#90021f";
			couleurBombArc = "#47000f";
			couleurDebugBomb = "red";
			couleurText = "#f0f0f0";
			couleurButton = "rgba(31, 31, 31, 0.05)";
			couleurTextButton = "#333333";
			break;
	}
	pBombs.style.color = couleurText;
	drawBackground();
}

for(let g = 0; g < themes.length; g++){
	themes[g].addEventListener("click", function(event){
		theme = themes[g].id;
		if(lostQM != true){
			defineCouleur(theme);
		}
	});
}
