var inc = 0.01;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var particlesMaroon = [];
var particlesBlue = [];
var particlesYellow = [];

var flowfield;
var flowfieldMaroon;
var flowfieldBlue;
var flowfieldYellow;

var gamma_is_high = false;
var beta_is_high = false;
var alpha_is_high = false;

var maroon_data=1000;
var blue_data = 1000;
var yellow_data = 1000;

setInterval(function() {
    ChangeLines();
}, 5000);

function dataRequest(){
    socket.emit('datarequest', {data: "request"});
}

function ChangeLines(){

    maroon_data = random(500, 2000);
    blue_data = random(500, 2000);
    yellow_data = random(500, 2000);

    gamma_is_high = true;
    alpha_is_high = true;
    beta_is_high = true;
}

function setup() {
  slider = createSlider(0.01, 0.1, 0.02,0);
  slider.position(10, 10);
  slider.style('width', '80px');
  ChangeLines();
  createCanvas(windowWidth-15, windowHeight-20);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);
  flowfieldMaroon = new Array(cols * rows);
  flowfieldBlue = new Array(cols * rows);
  flowfieldYellow = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
    particlesMaroon[i] = new Particle();
    particlesBlue[i] = new Particle();
    particlesYellow[i] = new Particle();
  }
  background(255);
}


function draw() {
  
  let val = slider.value();
  inc = val;

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var angleMaroon = noise(xoff, yoff, zoff) * TWO_PI;
      var angleBlue = noise(xoff, yoff, zoff) * TWO_PI;
      var angleYellow = noise(xoff, yoff, zoff) * TWO_PI;

      var v = p5.Vector.fromAngle(angle);
      var vm = p5.Vector.fromAngle(angleMaroon);
      var vb = p5.Vector.fromAngle(angleBlue);
      var vy = p5.Vector.fromAngle(angleYellow);

      v.setMag(5);
      vm.setMag(5);
      vb.setMag(5);
      vy.setMag(5);

      flowfield[index] = v;
      flowfieldMaroon[index] = vm;
      flowfieldBlue[index] = vb;
      flowfieldYellow[index] = vy;
      xoff += inc;
     
    }
    yoff += inc;

    
  }
  zoff += 0.0003;
  for (var i = 0; i < particles.length; i++) {
   
    if(gamma_is_high==true){
        particlesMaroon[i].follow(flowfieldMaroon);
        particlesMaroon[i].update();
        particlesMaroon[i].edges();
        particlesMaroon[i].showMaroon();
    }
    

    if(beta_is_high){
        particlesBlue[i].follow(flowfieldBlue);
        particlesBlue[i].update();
        particlesBlue[i].edges();
        particlesBlue[i].showBlue();
    }
   
    if(alpha_is_high){
        particlesYellow[i].follow(flowfieldYellow);
        particlesYellow[i].update();
        particlesYellow[i].edges();
        particlesYellow[i].showYellow();
    }
    
  }

  fr.html(floor(frameRate()));
}
