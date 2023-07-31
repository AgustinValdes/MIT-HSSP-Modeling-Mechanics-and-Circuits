
// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, RGB, noFill, arc, PI, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, circle, collideCircleCircle */



// Start by defining 'sandbox' dimensions

var w = 500 // in number of pixels

var h = 200 

let offset // so that our position is at the mass center


// Defining the dimensions of the mass

var w_m = 60

var h_m = 60



//Spring variables
var x_1 = 0, y_1 = h - h_m/2, x_2=0, y_2 = h-h_m/2;
var n_turns = 100;
var r = (x_2/n_turns), h_spring=15;


// Define the system parameters

var k = 4 // Newtons/m (N/m)

var m = 1000 // Kilogram (kg)

var x_0 = 0// if this is zero, there will be no oscillations (unless there's an initial velocity)

var v_0 = 5 // meters/second

var t = 0

var b = 5 // units of b? 
//damping coefficient - for now there's no damping

var gamma = b/m // damping term


var omega = Math.sqrt(k/m) // calling the JS math library, asking for the sqrt function

var omega_d = Math.sqrt(omega**2 - (gamma**2)/4) // the damped frequency


let pos // 'let' create variable, but not assign it anything


// always going to have a setup function, that runs ONCE

function setup(){
  createCanvas(w, h)
  colorMode(RGB, 255, 255, 255) // RGB: at each pixel, I define how much red, green, and blue, I want to color the pixel (whose amounts range from 0 to 255)
}


// runs repeatedly
function draw(){
  t++ // increment (++) the time variable by 1
  background(240, 240, 240)
  line(w/2, 0, w/2, h)
  oscillate()
  
  
}

// abstraction 
// assign everything to do with the mass oscillating to the oscillate function
function oscillate(){
  // think of pos as the x(t) we solved 
  // sin or cos I need to call the Math library in JS
  
  // Master eqn we had solved for earlier
  
  pos = Math.exp(-gamma/2*t)*(x_0 * Math.cos(omega_d*t) + (v_0-gamma/2*x_0)/omega_d * Math.sin(omega_d*t))
  
  offset = w/2 - w_m/2

  x_2 = pos+offset-r/2
  r = (x_2/n_turns);
  
  noFill()
  drawSpring()
  
  fill(255, 0, 0) // assign rect. a color
  rect(pos +offset , h-h_m, w_m, h_m)

}

function drawSpring(){
  for (let n = 0; n<n_turns+1;n++){
    if (n%2 == 0){
      arc(x_1+n*r, y_1, r, h_spring, 0, PI);
    }
    else{
      arc(x_1+n*r, y_1, r, h_spring, PI, 0);
    }
  } 
}