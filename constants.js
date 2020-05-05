let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

let scoreEl = document.getElementById('score');

const SPACE = 32;

let speed = (g, t) => g*t;  //Speed in function of gravity and time (5 ms)

const g = 0.02; //gravity aceleration

const speed_press = 40; // how much the bird jumps against gravity

const bird_speed = 1; // bird's speed relative to the background

const ground = 27; 

const space = 30;

function randInt(a, b) { 
	let num = parseInt(Math.random() * 1000 % b);
	while (num < a) {
		num = parseInt(Math.random() * 1000 % b);
	}
	return num;
};

//=============================== Audios =========================================

let hitSound = new Audio('sounds/hit.mp3');
let wingSound = new Audio('sounds/wing.mp3');
let pointSound = new Audio('sounds/point.mp3');
