let keyPressed = false;
let score = 0;

class Rect {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

let flappyUp = new Image();
flappyUp.src = 'flappy_up.png';
flappyUp.width = 30;
flappyUp.height = 30;

let flappyDown = new Image();
flappyDown.src = 'flappy_down.png';
flappyDown.width = 20;
flappyDown.height = 20;

let player = new Rect(50, 30);

let background = new Image();
background.src = "background.png";

let bg1 = {
	img: background,
	x: 0,
	y: 0
}

let bg2 = {
	img: background,
	x: cvs.width,
	y: 0
}

function render(img) {
	
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.drawImage(bg1.img, bg1.x, 0, cvs.width, cvs.height);
	ctx.drawImage(bg2.img, bg2.x, 0, cvs.width, cvs.height);
	for (let i=0; i<obstacles.length; i++) {
		ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
	}
	ctx.drawImage(img, player.x, player.y, img.width, img.height);
}

function moveCam() {
	if (bg1.x <= -cvs.width) {
		bg1.x = cvs.width;
	}
	else if (bg2.x <= -cvs.width) {
		bg2.x = cvs.width;
	}
	else {
		bg1.x -= bird_speed;
		bg2.x -= bird_speed;
	}
} 

window.onload = function() {
	//console.log('X: '+player.x + ', Y: '+player.y);
	render(flappyDown);
	let t = 0;
	let count = 0;
	let fall = setInterval(function(){
		//console.log('X: '+player.x + ', Y: '+player.y);
		if (count%150 === 0) {
			genObstacle();
		}

		for (let i=0; i<obstacles.length; i++) { 
			if (obstacles[i].colide(player)) {
				hitSound.play();
				clearInterval(fall);
				if(confirm('Restart ?')) {
					window.location.reload();
				};
			}
			if (obstacles[i].passed(player)) {
				score++;
				scoreEl.textContent = parseInt(score/50);
				pointSound.play();
			}
			obstacles[i].x -= bird_speed;
		}
		if (obstacles.length === 5) {
				obstacles.shift();
		}
		moveCam();
		if (keyPressed) {
			t = -speed_press;
			keyPressed = false;
		}
		if (player.y >= cvs.height-ground) {
			hitSound.play();
			clearInterval(fall);
			if(confirm('Restart ?')) {
				window.location.reload();
			};
		}
		player.y += speed(g, t);
		if (speed(g, t) <= 0) {
			render(flappyUp);
		}
		if (speed(g, t) > 0) {
			render(flappyDown);
		}
		
		t++;
		count++;


	}, 5);
};

window.addEventListener("keydown", function(e){
	if (e.keyCode === SPACE) {
		fly();
	}
});

window.addEventListener("click", fly);

window.addEventListener("touchstart", fly);

function fly() {
	keyPressed = true;
	wingSound.play();
}