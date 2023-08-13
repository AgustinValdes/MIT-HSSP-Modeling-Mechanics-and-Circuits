// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, circle, collideCircleCircle 
          colorMode, RGB, rectMode, CENTER, noFill, exp, CORNERS
          */


// Define dimensions
var w = 500, h = 200, t=0;

// Define system parameters in ohms, henries, and farads, respectively
var R = 4, L= 0.00866, C = 1.04 * 10**-6;

//Define initial conditions in volts and amps, respectively

var V_0 = 5, I_0 = 2;

let E_0 = 0.5*C*V_0**2+0.5*L*I_0**2;

// Define derived expressions
let alpha = R/(2*L), P_diss = 0;
let omega_0 = 1/Math.sqrt(L*C);
let omega_d = Math.sqrt(omega_0**2-alpha**2);
let A = V_0, B = I_0/(C*omega_d)+(alpha*V_0)/omega_d;

function setup() {

  // Canvas & color settings
  createCanvas(w, h);
  textSize(15);
  colorMode(RGB, 255, 255, 255);
  t = 0;
}

function draw() {
  background(240,240,240);
  drawCircuit();
  fillCapacitor();
  fillInductor();
  strokeWeight(3);
  t+=0.000001;
}
function drawCircuit(){
  // Wires
  fill(0);
  line(w*0.25, h*0.2, w*0.5-35, h*0.2);
  line(w*0.5+35, h*0.2, w*0.75, h*0.2);
  line(w*0.25, h*0.2,w*0.25, h/2-30);
  line(w*0.75, h*0.2,w*0.75, h/2-30);
  
  line(w*0.25, h*0.8,w*0.25, h/2+30);
  line(w*0.75, h*0.8,w*0.75, h/2+30);
  
  line(w*0.25, h*0.8, w*0.75, h*0.8)
  
  text("C", w/8, h/2)
  text("L", 5*w/8, h/2)
  text("R", w/2.05, h/3)
  
  rectMode(CENTER)
  noFill();
  // Capacitor
  

  rect(w*0.25, h/2, 60, 60);
  rect(w*0.25, h/2, 60, 60);
  
  // Inductor
  rect(w*0.75, h/2, 60, 60);
  rect(w*0.75, h/2, 60, 60);
  
  //Resistor  
  rect(w*0.5, h*0.2, 70,20)
 
}

function fillInductor(){
  let I_l = C*(-alpha*exp(-alpha*t)*(A*Math.cos(omega_d*t)+B*Math.sin(omega_d*t))
              + exp(-alpha*t)*omega_d*(-A*Math.sin(omega_d*t)+B*Math.cos(omega_d*t)))
      
      
      //exp(-alpha*(t))*(A*Math.cos(omega_d*t)+B*Math.sin(omega_d*t));
  let E_l = 0.5*L*I_l**2;
  let frac = 60*E_l/E_0;
  fill(255,0,0)
  rectMode(CORNERS)
  rect(w*0.75-30, h/2+30, w*0.75+30, h*0.5+30-frac);
  
  P_diss += I_l**2*R

text("Power dissipated: " + (P_diss/1000).toFixed(1) + " kW", 10, 30);

fill(0, 102, 153);  
  
}

function fillCapacitor(){
  
  let V_c = exp(-alpha*(t))*(A*Math.cos(omega_d*t)+B*Math.sin(omega_d*t));
  let E_c = 0.5*C*V_c**2;
  let frac = 60*E_c/E_0;
  fill(0,0,255)
  rectMode(CORNERS)
  rect(w*0.25-30, h/2+30, w*0.25+30, h*0.5+30-frac);  
  
}