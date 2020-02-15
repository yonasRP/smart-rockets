var lifespan = 400;
var fps = 144;
var magnif = 0.4;
var blockspeed = 7;
var popsize = 20;
var population;
var timeP;
var count;
var finish;

function setup() {
    createCanvas(600, 500);
    frameRate(fps);
    population = new Population();
    finish = new Finish();
    barrier = new Barrier();
    count = createP();
}

function draw() {
    background(0);
    finish.show();
    population.run();
    population.collisionDetection();
    barrier.show();
    barrier.showStill();

    //COUNTER
    timeP = document.getElementById('count');
    count = document.getElementById('count').innerHTML;
    count++;
    timeP.innerHTML = count;

    if (count == lifespan) {
        population.evaluate();
        population.evolve();
        count = 0;
        barrier = new Barrier();
        timeP.innerHTML = count;
    }

}


function DNA(genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(magnif);
        }
    }
    this.mutation = function () {
        for (i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(magnif);
            }
        }
    }
    this.crossover = function (partner) {
        var randomcount = floor(random(this.genes.length));
        var newgenes = [];
        for (i = 0; i < this.genes.length; i++) {
            if (randomcount < i) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }

        }
        return new DNA(newgenes);
    }
}

function Finish() {
    this.pos = createVector(width / 2, 80);

    this.show = function () {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 20, 20);
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}


function Barrier() {
    this.width = width;
    this.height = 10;
    this.pos = createVector(0-this.width,200); //createVector(width / 2 - this.width / 2, 250);
    this.stillwidth = width/1.8;
    this.stillheight = 10;
    this.stillpos = createVector(width/2-this.stillwidth/2,300);


    this.show = function () {
        this.pos.x += blockspeed;
        var pos = this.pos;
        noStroke();
        fill(255);
        if (pos.x > width) {
            pos.x = 0-this.width+1;
        } else if (pos.x+this.width < 0) {
            pos.x = width+this.width;
        }
        rect(pos.x, pos.y, this.width, this.height);
    }

    this.showStill = function() {
        noStroke();
        fill(255);
        rect(this.stillpos.x, this.stillpos.y, this.stillwidth, this.stillheight);
    }
}