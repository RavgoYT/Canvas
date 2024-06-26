function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;
    this.alphaPower = 20;
    this.prevPos = this.pos.copy();
  
    this.update = function() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    this.follow = function(vectors) {
      var x = floor(this.pos.x / scl);
      var y = floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }
  
    this.applyForce = function(force) {
      this.acc.add(force);
    }
  
    this.showBlue = function() {
      stroke(0, 76, 153, this.alphaPower);
      
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
     
      this.updatePrev();
    }
  
    this.showMaroon = function() {
      stroke(165, 0, 68, this.alphaPower); // maroon
     
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
       
      this.updatePrev();
    }
  
    this.showYellow = function() {
      stroke(237, 188, 0, this.alphaPower);
      //stroke(1,2);
      
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      
      this.updatePrev();
    }
  
  
    this.updatePrev = function() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  
    this.edges = function() {
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
      }
  
    }
  
  }


  /* 

  follows cursor
  text box
  settings menu


  */
