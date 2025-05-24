function minesweeperGame(){
	function makeMatrices(w,h){
		var x = new Array(w);
		for (var i = 0; i < x.length; i++) {
		  x[i] = new Array(h);
		}
		return x;
	}

	let button = document.getElementById("debug");
	let debug = false;

	button.addEventListener("click", function(event){
		debug = !debug;
	});

	let mouse = {
		x: undefined,
		y: undefined
	}

	function gameOver(){
		alert("GAME OVER!!");
	}

	function gameWon(){
		alert("GAME WON!!!");
	}


	let auxMouse = 0;

	document.addEventListener("click", function(event){
		auxMouse = 0;
		mouse.x = event.x;
		mouse.y = event.y;
	});

	document.addEventListener("auxclick", function(event){
		auxMouse = 1;
		mouse.x = event.x;
		mouse.y = event.y;
	});


	canvas.width = (sizeTile*wRows)+(wRows*2)-2;
	canvas.height = (sizeTile*hRows)+(hRows*2)-2;

	let nTiles = hRows * wRows;
	let nTilesOriginal = nTiles;

	let matrix = makeMatrices(hRows, wRows);

	let distGrid = 2;
	let y = 0;

	let nBombsOriginal = nBombs;

	function escreverBombas(){
		pBombs.innerHTML = "Bombs: " + nBombsOriginal;
	}
	
	escreverBombas();

	function getRandBomb(nBomb){
		let probBomb = nBomb/nTiles;
		let randN = Math.random();
		if(randN <= probBomb){
			nTiles --;
			nBombs--;
			return 1;
		} else {
			return 0;
		}
	}

	let bombRand = 0;
	let x = 0;
	let originalX = x;
	let originalY = y;

	function drawGrid(){
		while(nBombs != 0){
			nBombs = nBombsOriginal;
			nTiles = hRows*wRows;
			for(let i = 0; i < hRows; i++){
				x = originalX;
				for(let n = 0; n < wRows; n++){
					bombRand = 0;
					if(nBombs > 0){
						bombRand = getRandBomb(nBombsOriginal);
					}
					matrix[i][n] = new grid(x, y, sizeTile,bombRand,i,n);
					x += sizeTile+distGrid;
				}
				y += sizeTile+distGrid;
			}
			y = originalY;
		}
	}

	drawGrid();

	let firstClickQM = true;

	let fontSize = (1/2)*sizeTile;

	function getLocation(){
		let coordinates = canvas.getBoundingClientRect();
		return { x: coordinates.x, y: coordinates.y };
	}

	let locationMineSweeper = getLocation();

	window.addEventListener("resize",function(){
		mouse.x = false;
		mouse.y = false;
		locationMineSweeper = getLocation();
	});

	drawBackground();

	function grid(x,y,size,bomb,nArrH,nArrW){
		this.x = x;
		this.y = y;
		this.size = size;
		this.bomb = bomb;
		this.nArrH = parseInt(nArrH);
		this.nArrW = parseInt(nArrW);
		this.clickable = 1;
		this.showable = true;
		this.color = couleurTilesOne;
		this.flagged = false;
		let b = 0;
		let arrTiles = [];

		let locationMinWidth, locationMaxWidth, locationMinHeight, locationMaxHeight;
		
		this.defineColor = function(){
			if(lostQM != true){
				if(this.showable == false){
					this.color = couleurRevealed;
				} else {
					this.color = couleurTilesOne;
				}
				if(debug === true && this.bomb == 1){
					this.color = couleurDebugBomb;
				}
			} else {
				if(this.bomb == 1){
					this.color = couleurBomb;
					return true;
				} else {
					if(this.showable == false){
						this.color = couleurRevealed;
					} else {
						this.color = couleurTilesOne;
					}
				}
			}
			return false;
		}
		
		this.clicked = function(){
			this.showable = false;
			nTiles --;
			this.color = couleurRevealed;
		}

		this.reveal = function(){
			if(this.bomb == 1){
				if(firstClickQM == true){
					nBombs = nBombsOriginal;
					drawGrid();
				} else {
					lostQM = true;
				}
			} else {
				firstClickQM = false;
				this.clicked();
				this.showArea();
			}
		}

		this.update = function(show){
			let l = 0;
			if(this.showable == true){
				locationMinWidth = this.x+(locationMineSweeper.x);
				locationMaxWidth = this.x+this.size+(locationMineSweeper.x);
				locationMinHeight = this.y+(locationMineSweeper.y);
				locationMaxHeight = this.y+(locationMineSweeper.y)+this.size;
				if(auxMouse == 0){
					if(this.clickable == 1 && mouse.x >= locationMinWidth && mouse.x <= locationMaxWidth  && (mouse.y >=  locationMinHeight && mouse.y <= locationMaxHeight) ){
						this.reveal();
					} else if(show == 1 && this.bomb == 0){
						this.clicked();
						this.showArea();
					}
					else {
						l = 1;
					}
				} else {
					if(this.flagged == true || mouse.x >= locationMinWidth && mouse.x <= locationMaxWidth  && (mouse.y >=  locationMinHeight && mouse.y <= locationMaxHeight) && firstClickQM == false ){
						this.flag();
					}
						
				}
			}
			this.draw();
			return l;
		}

		this.flag = function(){ 
			if(mouse.x >= locationMinWidth && mouse.x <= locationMaxWidth  && (mouse.y >=  locationMinHeight && mouse.y <= locationMaxHeight) ){
				if(this.clickable == 1){
					if(nBombsOriginal > 0){
						this.clickable = 0;
						this.flagged = true;
						mouse.x = false;
						mouse.y = false;
						nBombsOriginal--;
					}
				}else {
					this.clickable = 1;
					mouse.x = false;
					mouse.y = false;
					auxMouse = 0;
					this.flagged = false;
					nBombsOriginal++;
				}
				escreverBombas();
			}
			
		}

		this.showArea = function(){
			b = 0;
			arrTiles = [];
			for(let k = 0; k < 3; k++){
			  if(this.nArrH + (k-1) >= 0 && this.nArrH + (k-1) < hRows){
			  for(let w = 0; w < 3; w++){
			    if( !(matrix[this.nArrH + (k-1)][this.nArrW + (w-1)] === undefined)){
			      arrTiles.push(matrix[this.nArrH + (k-1)][this.nArrW + (w-1)]);
			      b += matrix[this.nArrH + (k-1)][this.nArrW + (w-1)].bomb;
			    }
			}
			  }
			}
			if(b == 0){
				for(let h = 0; h < arrTiles.length; h++){
					arrTiles[h].update(1);
				}
			}
		}
		
		this.bombMark = function(){
			c.arc(this.x+(this.size/2),this.y+(this.size/2),this.size/4,0,Math.PI*2,false);
			c.fillStyle = couleurBombArc;
			c.strokeStyle = couleurBombArc;
			c.stroke();
			c.fill();
		}

		this.draw = function(){
			let bombQM = false;
			c.beginPath();
			bombQM = this.defineColor();
			c.fillStyle = this.color;
			c.fillRect(x,y,size,size);
			if(bombQM === true){
				this.bombMark();
			}
			
			if(this.flagged && this.showable != false && lostQM != true){
				c.drawImage(img,this.x+this.size*0.15, this.y+size*0.15,size*0.7,size*0.7);
			}
			
			if(b != 0){
				c.fillStyle = couleurText;
				c.font = "bold " + fontSize + "px Roboto";
				c.fillText(b, this.x-(fontSize/3)+this.size/2, this.y+(fontSize/3)+this.size/2);
			}
		}
	}

	animate();

	function animate(){
		if(nTiles > 0 && lostQM == false){
			req = requestAnimationFrame(animate);
		} else {
			if (lostQM == true){
			gameOver();
			} else if (nTiles <= 0){
			gameWon();
			}
		}
		for(let k = 0; k < hRows; k++){
			for(let w = 0; w < wRows; w++){
				matrix[k][w].update();
			}
		}
	}
}
