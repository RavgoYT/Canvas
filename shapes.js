let canvasSize = document.querySelector('.art').clientHeight;

const sketch = function( p ) {
  p.setup = function() {
    const drawFunctions = [drawEllipse, drawLine, drawRectangle, drawTriangle];
    const roughSize = 200;
    p.createCanvas(canvasSize, canvasSize); 
    p.background('#62c9c4');
    for (let i = 0; i < 5; i++) {
      drawFunctions.forEach(draw => {
        let x = p.random(0,canvasSize);
        let y = p.random(0,canvasSize);
        let color = getRandomColorHex();
        p.fill(color);
        draw(x,y,roughSize);
      });  
    }
  }
  
  function drawEllipse(x,y,size) {
      width = p.random(0.5,1) * size;
      height = p.random(0.5,1) * size;
      p.ellipse(x,y,width,height);
  }
  
  function drawLine(x,y) {
    let len = p.height
    let drawVertical = p.random(0,1);
    let x1,y1,x2,y2;
    if (drawVertical > 0.5) {
        x1 = x;
        x2 = x;
        y1 = y - len / 2;
        y2 = y + len / 2;
    } else {
        x1 = x - len / 2;
        x2 = x + len / 2;
        y1 = y;
        y2 = y;
    }
    p.line(x1,y1,x2,y2);
  }

  function drawRectangle(x,y,size) {
    let width = p.random(0.1,1) * 2 * size;
    let height = p.random(0.1,1) * 2 * size;
    p.rect(x,y,width,height);
  }

  function drawTriangle(x,y,size) {
    let topPoint = [x,p.random(0.5,1)*(y+size)];
    let leftPoint = [p.random(0.5,1)*(x-size),y-size];
    let rightPoint = [p.random(0.5,1)*(x+size),y-size];
    let points = [...topPoint,...leftPoint,...rightPoint];
    p.triangle(...points);
  }
  
};
new p5(sketch,'shapes');

function getRandomColorHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}
