// The way these are driven is by it's "DNA"
// the DNA is an array of vectors that are read through in order to determine the path
function Rocket(dna) {
	this.pos = createVector(width / 2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.completed = false;
	this.crashed = false;

	if (dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}
	this.fitness = 0;

	this.applyForce = function (force) {
		this.acc.add(force);
	}

	this.calcFitness = function () {
		var distance = dist(this.pos.x, this.pos.y, target.x, target.y);

		this.fitness = map(distance, 0, width, width, 0);
		if (this.completed) {
			this.fitness *= 10;
		}
		if (this.crashed) {
			this.fitness /= 10;
		}
	}

	this.update = function () {

		var distance = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (distance < 10) {
			this.completed = true;
			this.pos = target.copy();
		}

		if (
			this.pos.x > rx &&
			this.pos.x < rx + rw &&
			this.pos.y > ry &&
			this.pos.y < ry + rh
		) {
			this.crashed = true;
		}

		if (
			this.pos.x > rx2 &&
			this.pos.x < rx2 + rw2 &&
			this.pos.y > ry2 &&
			this.pos.y < ry2 + rh2
		) {
			this.crashed = true;
		}

		if (this.pos.x > width || this.pos.x < 0) {
			this.crashed = true;
		}
		if (this.pos.y > height || this.pos.y < 0) {
			this.crashed = true;
		}

		this.applyForce(this.dna.genes[count]);
		if (!this.completed && !this.crashed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4)
		}
	}

	this.show = function () {
		push(); // The push and pop that wrap this localise the physics (rotating, translating) to only affect this rocket
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}
}