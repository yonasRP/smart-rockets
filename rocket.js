function Rocket(dna) {
    this.pos = createVector(width / 2, height - 20);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.count = 0
   

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    this.update = function () {
        this.applyForce(this.dna.genes[this.count]);
        this.count++;

        if (!this.completed && !this.crashed) {
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                this.acc.mult(0);
                this.vel.limit(4);
            
        }
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function (i) {
        push();
        noStroke();
        fill(255, 100);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 40, 10);
        //fill(255,150,150,255);
        //textSize(20);
        //text(i,0,0);
        pop();

    }

    //REPLACED BY Vector.random2D()
    /*this.applyForce = function () {
        var r = round(random(0, 6));
        switch (r) {
            case 0:
                this.vel.x += 0.1;
                break;
            case 1:
                this.vel.y += 0.1;
                break;
            case 2:
                this.vel.x -= 0.1;
                break;
            case 3:
                this.vel.y -= 0.1;
                break;
            case 4:
                this.vel.x += 0.1;
                this.vel.y += 0.1;
                break;
            case 5:
                this.vel.x -= 0.1;
                this.vel.y += 0.1;
                break;
            case 6:
                this.vel.x += 0.1;
                this.vel.y -= 0.1;
                break;
        }
    }*/

    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, finish.pos.x, finish.pos.y);
      
        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
          this.fitness *= 10;
        }
        if (this.crashed) {
          this.fitness /= 10;
        }
      }

}