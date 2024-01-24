let myImage, myVid;
let c;


let yP = [];
let x2P = [];
let y2P = [];

let clrLen;
let whichClr;

let clr0         = [ [225, 77, 42],[253, 132, 31],[62, 109, 156], [0, 18, 83] ]; 
let clr1         = [ [0,0,0],[207, 10, 10],[220, 95, 0],[238, 238, 238] ]; 
let clr2         = [ [255, 247, 233], [255, 115, 29],[95, 157, 247],[23, 70, 162] ]; 
let clr3         = [ [0, 0, 0],[255, 255, 255]]; 
let clr4         = [ [49, 225, 247],[64, 13, 81],[216, 0, 166],[255, 119, 119] ]; 
let clr5         = [ [239, 239, 239], [210, 0, 26],[255, 222, 0],[255, 250, 231] ]; 
let clr6         = [ [252, 226, 219],[255, 143, 177],[178, 112, 162],[122, 68, 149] ]; 
let clr7         = [ [245, 237, 220],[207, 210, 207],[162, 181, 187],[235, 29, 54] ]; 
let clr8         = [ [245, 245, 245],[240, 84, 84],[48, 71, 94],[18, 18, 18] ]; 
let clr9         = [ [255, 255, 255], [0, 0, 0] ]; 

let clr1Num      = 255;
let clr1Cnt      = -1;
let clr1Blk;
let clrA         = [];

let whichColor;


// function preload() {
//   myImage = loadImage('nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.avif');
// }

var DEFAULT_SIZE = 1000;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var DIM = Math.min(WIDTH, HEIGHT);
var M = DIM / DEFAULT_SIZE;

let ts = 20;
let avx = 0;
let avxcol = 0;
let index;
let ranSize = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);
  
  // pixelDensity(1);
  // image(myImage, 0, 0, width, height);
  
  myVid = createCapture(VIDEO);
  myVid.size(WIDTH, HEIGHT);
  myVid.hide(); // hide it

  whichColor = 4;//int(random(0,10))
  
  if(whichColor==0)      whichClr = clr0;
  else if(whichColor==1) whichClr = clr1;
  else if(whichColor==2) whichClr = clr2;
  else if(whichColor==3) whichClr = clr3;
  else if(whichColor==4) whichClr = clr4;
  else if(whichColor==5) whichClr = clr5;
  else if(whichColor==6) whichClr = clr6;
  else if(whichColor==7) whichClr = clr7;
  else if(whichColor==8) whichClr = clr8;
  else if(whichColor==9) whichClr = clr9;
  else if(whichColor==10) whichClr = clr10;
  else if(whichColor==11) whichClr = clr11;
  else if(whichColor==12) whichClr = clr12;
  
  

  setColorTables();
  
}

function draw() {
  
  // let letter = [];
  // rectMode(CENTER)

  // rotate(PI/2)

  // translate(WIDTH/2, HEIGHT/2)
  // // scale(0.8)
  // translate(-WIDTH/2, -HEIGHT/2)
  
  // loadPixels()
  myVid.loadPixels();
  
  c = 0;
  for(var y = 0; y < HEIGHT; y+=ts){
    for(var x = WIDTH; x > 0; x-=ts){
      var index = (x + y * WIDTH) * 4;
      // letter[c] = round(map(myVid.pixels[index], 0, 255, 0, 9));
      alpha[c] = myVid.pixels[index];
      
      if(random(0,1)>0.9) ranSize[c] = random(50,100);
      else ranSize[c] = random(50,80);
      // fill(255);
      // textSize(5);
      // text(letter, x, y);
      c++;
      
    }
  }
  
  // background(0);
  
  c = 0;

  for(var y = 0; y < HEIGHT; y+=ts){
    for(var x = WIDTH; x > 0; x-=ts){
      index = (x + y * WIDTH) * 4;
      // var letter = round(map(pixels[index], 0, 255, 0, 9));
      // fill(255, 255, 255, alpha[c]);
      // textSize(ts);
      print(myVid.pixels[index])
      let r = map(myVid.pixels[index], 0, 255, -PI/2, PI/2);
      avx += map(myVid.pixels[index], 0, 255, 0, 1);
      avxcol = map(myVid.pixels[index], 0, 255, 0, 255);
      push();
      // fill(myVid.pixels[index])
      fill(clrA[(floor(avxcol))%clrA.length])
      // noStroke()
      strokeWeight(0.3)
      translate(WIDTH - x,y)
      // r+=noise(x/300,y/300)
      rotate(r + frameCount/60)
      rect(0,0,ranSize[c]/5*noise(x,y),ranSize[c] + ranSize[c]/5*noise(x,y)*4);
      pop();
      
      // text(letter[c], x, y);
      c++;      
    }
  }
  
  
  // print(Capture.list()); 
 
  // noLoop();
  // drawCust();
}

function setColorTables() {
  clrLen = whichClr.length;
  clr1Blk = floor(clr1Num/clrLen);
  for (let i = 0; i < clr1Num; ++i) {
    if( i%clr1Blk==0 ) clr1Cnt = (clr1Cnt+1)%clrLen;
    let _c1 = color( whichClr[(clr1Cnt)][0], whichClr[(clr1Cnt)][1], whichClr[(clr1Cnt)][2] );
    let _c2 = color(whichClr[(clr1Cnt+1)%clrLen][0], whichClr[(clr1Cnt+1)%clrLen][1], whichClr[(clr1Cnt+1)%clrLen][2]);
    clrA.push(  lerpColor( _c1, _c2, map(i, (clr1Cnt*clr1Blk), (((clr1Cnt+1))*clr1Blk), 0.0, 1.0) ) );
  }
}