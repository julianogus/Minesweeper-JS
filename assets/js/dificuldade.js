let req;

let dificuldades = document.querySelectorAll('[id*="dificuldade"]')

let nBombs = 0, sizeTile, wRows, hRows;

function defineDifficulty(dificuldade){
	switch(dificuldade){
		case "dificuldadeExpert":
			nBombs = 99;
			sizeTile = 22;
			wRows = 24;
			hRows = 21;
			break;
		case "dificuldadeIntermediate":
			nBombs = 40;
			sizeTile = 35;
			wRows = 18;
			hRows = 14;
			break;
		case "dificuldadeBeginner":
		default:
			nBombs = 10;
			wRows = 10;
			hRows = 8;
			sizeTile = 50;
			break;
	}
}

defineDifficulty();
minesweeperGame();

for(let d = 0; d < dificuldades.length; d++){
	dificuldades[d].addEventListener("click", function(event){
		lostQM = false;
		cancelAnimationFrame(req);
		dificuldade = dificuldades[d].id;
		defineDifficulty(dificuldade);
		minesweeperGame();
	});
}

