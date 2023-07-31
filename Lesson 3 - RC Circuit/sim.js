// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, circle, collideCircleCircle */


// Define dimensions
var w = 500, h = 200, d=50, c_w = 50, t=0;

// Define circuit parameters; in ohms and farads, respectively
var R = 100, C = 10*10**(-6), V = 5, V_i = 0;


// Voltage across capacitor initialized to initial condition
var tau = R*C, V_c = V_i;

// Initial voltage or 'memory state '
//var V_0
// Voltage of capacitor
//var v_c= V_0, I

let closed = false;

//Spring variables


function setup() {
  // Canvas & color settings
  createCanvas(w, h);
  colorMode(RGB, 255, 255, 255);
  strokeWeight(3);
  noFill();

}

function draw() {
  background(240);
  drawCircuit();
  drawCapacitor();
  
  // Calculate voltage across cap
  V_c = V + (V_i-V)*exp(-t/tau);
  console.log(V_c);
  

}

function drawCapacitor(){
  // We fill the rectangle in proportion of V_c to the total V supplied
  
  var frac = 60*V_c/V;
  fill(0,0,255)
  rectMode(CORNERS)
  rect(w*0.8+40, h*0.5+30, w*0.8-40, h*0.5+30-frac);
  
  
}

function drawCircuit(){

  // Upper wire with switch and resistor
  
  // Switch
  line(w*0.2, h*0.2, w*0.3, h*0.2);
  
  if (!closed || V_c/V>0.99){
    stroke(0);
    line(w*0.3, h*0.2, w*0.4, h*0.1)
    
    
    
  }
  else{
    line(w*0.3, h*0.2, w*0.4, h*0.2);
    stroke(0,0,255)
    t+=0.00001; // Capacitors charge up super fast, let's slow down time
  }
  
  line(w*0.4, h*0.2, w*0.55, h*0.2);
  
  // Resistor onwards
  rectMode(CENTER)
  
  noFill();
  textSize(17);
  text('R', w*0.607, h*0.23);

  

  
  rect((w*0.55+w*0.7)/2, h*0.2, 70,20)
  line(w*0.7, h*0.2,w*0.8, h*0.2)

  // Left wire
  line(w*0.2, h*0.8, w*0.2, h*0.2);
  fill(255)
  circle(w*0.2, h*0.5, 50);
  noFill();
  text('v', w*0.192, h*0.52);
  
  // Right wire with capacitor
  line(w*0.8, h*0.2, w*0.8, h*0.35);
  line(w*0.8, h*0.65, w*0.8, h*0.8);
  noFill();
  rect(w*0.8, h*0.5, 80, 60);
  drawCapacitor();
  //Bottom wire
  line(w*0.2, h*0.8, w*0.8, h*0.8);

  
}



function keyTyped(){
  //Toggle boolean if s key clicked
  if (key === 's'){
    closed = !closed
  }
}