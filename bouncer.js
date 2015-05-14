	
var divSize = 50;
var pageWidth = self.innerWidth;
var pageHeight = self.innerHeight;
var pugs = ['img/pug1.jpg', 'img/pug2.jpg', 'img/pug3.jpg', 'img/pug4.jpg'];
var numPugs = 0;
var speed = 0.6; // Magnitude of movement
var divs = [];

function move() {
	// Reset page size incase browser was resized
	pageWidth = self.innerWidth;
	pageHeight = self.innerHeight;

	// Move in direction of velocity vector
	for(var i = 0; i < divs.length; i++) {

		// Bounce off walls
		if(divs[i].x < 0 || divs[i].x > pageWidth - divSize)
			divs[i].vector.x = divs[i].vector.x * (-1);
		if(divs[i].y < 0 || divs[i].y > pageHeight - divSize)
			divs[i].vector.y = divs[i].vector.y * (-1);


		// Move according to velocity vector
		divs[i].x = divs[i].x + (divs[i].vector.x * speed);
		divs[i].elem.style['left'] = divs[i].x + 'px';

		divs[i].y = divs[i].y + (divs[i].vector.y * speed);
		divs[i].elem.style['top'] = divs[i].y + 'px';
	}
}

function normalize(x, y) {
	var length = Math.sqrt((x * x) + (y * y));
	return {
		x: x / length,
		y: y / length
	};
}

function updatePugCounter() {
	document.getElementById('pug-counter').innerHTML = 'Pugs: </br>' + numPugs;
}

function reset() {
	numPugs = 1;
	updatePugCounter();
	speed = 0.4;

	for(var i = 1; i < divs.length; i++) {
		document.body.removeChild(divs[i].elem);
	}

	var temp = [];
	temp.push(divs[0]);
	divs = temp;
}

function createDiv(parent) {
	if(parent) {
		var startingWidth = parseFloat(parent.style['left']);
		var startingHeight = parseFloat(parent.style['top']);
	}
	else {
		var startingWidth = Math.random() * ((pageWidth - divSize) - (divSize)) + (divSize);
		var startingHeight = Math.random() * ((pageHeight - divSize) - (divSize)) + (divSize);
	}

	var div = document.createElement('div');
	div.className = 'bouncing-div';
	div.style['left'] = startingWidth + 'px';
	div.style['top'] = startingHeight + 'px';
	numPugs++;
	updatePugCounter();
	document.body.appendChild(div);

	var img = document.createElement('img');
	img.src = pugs[Math.floor(Math.random() * pugs.length)];
	div.appendChild(img);

	div.addEventListener('mousedown', function() {
		createDiv(div);
	});

	var newDiv = {
		elem: div,
		x: parseFloat(div.style['left']),
		y: parseFloat(div.style['top']),
		vector: normalize(Math.random() * 100 - 50, Math.random() * 100 - 50)
	};

	divs.push(newDiv);
}

function speedup(){
	speed += 0.2;
}

function speeddown(){
	speed -= 0.2;
	if(speed < 0)
		speed = 0;
}

function initialize() {
	createDiv();
	setInterval(move, 0);
}