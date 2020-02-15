function Population() {
    this.rockets = [];
    this.size = popsize;


    for (var i = 0; i < this.size; i++) {
        this.rockets[i] = new Rocket();
    }

    this.run = function () {
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].show(i);
            this.rockets[i].update();
        }
    }

    this.evaluate = function () {
        var maxfit = 0;
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].calcFitness();
            if (maxfit < this.rockets[i].fitness) {
                maxfit = this.rockets[i].fitness;
            }
        }
        for (i = 0; i < this.size; i++) {
            this.rockets[i].fitness /= maxfit;
        }
        this.matingpool = [];
        for (i = 0; i < this.size; i++) {
            var n = this.rockets[i].fitness * 100;
            for (j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
        
    }
    this.evolve = function () {
        var newRockets = [];
        for (i = 0; i < this.rockets.length; i++) {
            var ParentA = random(this.matingpool).dna;
            var ParentB = random(this.matingpool).dna;
            var child = ParentA.crossover(ParentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    this.collisionDetection = function () {
        barrW = barrier.width;
        barrH = barrier.height;
        barrX = barrier.pos.x;
        barrY = barrier.pos.y;
        for (i = 0;i < this.rockets.length;i++) {
            if (!this.rockets[i].completed) {
            var d = dist(this.rockets[i].pos.x,this.rockets[i].pos.y,finish.pos.x,finish.pos.y);
            if (d < 15) {
                this.rockets[i].completed = true;
                this.rockets[i].pos = finish.pos;
            } else if (this.rockets[i].pos.x >= width || this.rockets[i].pos.y >= height || this.rockets[i].pos.x <= 0 || this.rockets[i].pos.y <= 0) {
                this.rockets[i].crashed = true;
            } else if (this.rockets[i].pos.x > barrier.pos.x && this.rockets[i].pos.x < barrier.pos.x+barrier.width && this.rockets[i].pos.y > barrier.pos.y && this.rockets[i].pos.y < barrier.pos.y+barrier.height) {
                this.rockets[i].crashed = true;
            } else if (this.rockets[i].pos.x > barrier.stillpos.x && this.rockets[i].pos.x < barrier.stillpos.x+barrier.stillwidth && this.rockets[i].pos.y > barrier.stillpos.y && this.rockets[i].pos.y < barrier.stillpos.y+barrier.stillheight) {
                this.rockets[i].crashed = true;
            }
        }
        }
    }
}