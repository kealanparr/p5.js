var population;
var lifespan = 600;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;

var rx = 500;
var ry = 450;
var rw = 200;
var rh = 10;

var rx2 = 800;
var ry2 = 250;
var rw2 = 100;
var rh2 = 10;

function setup() {
	createCanvas(1400, 850);
	population = new Population();
	lifeP = createP();
	target = createVector(width/2, 50)
}

function draw() {
	background(0);
	population.run();
	lifeP.html(count);

	count++;
	if (count == lifespan) {
		population.evaluate();
		population.selection();
		count = 0;
	}

	fill(255);
	rect(rx, ry, rw, rh)

	rect(rx2, ry2, rw2, rh2)

	ellipse(target.x, target.y, 16, 16)
}