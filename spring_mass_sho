// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, circle, collideCircleCircle */


// Define dimensions
var w = 500, h = 200
var w_m = 60, h_m = 60;
var k = 4, m = 1000, x_0 = 30, v_0 = 5, t=0;

let omega;
let offset, pos;

function setup() {
  // Canvas & color settings
  createCanvas(w, h);
  colorMode(RGB, 255, 255, 255);
  t = 0;
}

function draw() {
  t++;
  background(240,240,240);
  line(w/2, 0, w/2,h)
  oscillate();

}

function oscillate(){
  //position given by x(t) = x_0cos(omega*t) + v_0/omega*sin(omega*t)
  omega = Math.sqrt(k/m);
  pos = x_0 * Math.cos(omega * t) + v_0/omega * Math.sin(omega * t)
  offset = w/2 - w_m/2
  
  // line(0, h-w_m/2, pos+offset, h-w_m/2)
  fill(20, 20, 80);
  rect(pos + offset, h-h_m, w_m, h_m);
  
  noFill();

  //'Spring' motion
  arc((pos + offset)/2, h-w_m/2, pos+offset, 8000/(pos+offset), PI, 0);
  arc((pos + offset)/2, h-w_m/2, pos+offset, 8000/(pos+offset), 0, PI);
}
