// bezier curve demo. drag the anchor/control points.
const bod = document.getElementsByTagName("body")[0];
let desc = document.createElement("div");
let pts = [];

function setup() {
  createCanvas(1000, 800);

  // LEFT BUFFER
  pts = [
    createVector(50, 200),
    createVector(100, 300),
    createVector(300, 300),
    createVector(350, 200)
  ];
  checkbox = createCheckbox('Mirror bezier control points', false);

  // RIGHT BUFFER
  let slider_widths = "200px";

  petal_slider = createSlider(0, 100, 10);
  petal_slider.position(400, 10);
  petal_slider.style('width', slider_widths);

  turns_slider = createSlider(0, 2, 0.2, 0.02);
  turns_slider.position(400, 30);
  turns_slider.style('width', slider_widths);

  petalX_slider = createSlider(-100, 180, 0, 1);
  petalX_slider.position(400, 60);
  petalX_slider.style('width', slider_widths);

  petalY_slider = createSlider(-100, 180, 0, 1);
  petalY_slider.position(400, 90);
  petalY_slider.style('width', slider_widths);

  scale_slider = createSlider(0,1,1,0.01);
  scale_slider.position(400, 120);
  scale_slider.style('width', slider_widths)

  r_slider = createSlider(0,255,204,1);
  r_slider.position(700, 60);
  r_slider.style('width', slider_widths);

  g_slider = createSlider(0, 255, 101, 1);
  g_slider.position(700, 90);
  g_slider.style('width', slider_widths);

  b_slider = createSlider(0,255,192,1);
  b_slider.position(700, 120);
  b_slider.style('width', slider_widths)

  a_slider = createSlider(0,255,127,1);
  a_slider.position(700, 150);
  a_slider.style('width', slider_widths)

  // oriX_slider = createSlider(-100, 100, 0, 1);
  // oriX_slider.position(400, 180);
  // oriX_slider.style('width', slider_widths)

  // oriY_slider = createSlider(-100, 100, 0,1);
  // oriY_slider.position(400, 210);
  // oriY_slider.style('width', slider_widths)


  // A design for a simple flower
  noStroke();
}

function draw() {
 background(248);
  //fill(0);
  stroke(0);
  strokeWeight(1);

  function myBez(pts = pts) {
    beginShape();
    vertex(pts[0].x, pts[0].y);

    bezierVertex(
           pts[1].x, pts[1].y,
           pts[2].x, pts[2].y,
           pts[3].x, pts[3].y);

    if (checkbox.checked()) {
          pts_mirror = [];

      for (let i = pts.length-2; i > 0; i--) {
        pts_mirror.push(createVector(pts[i].x, pts[0].y+(pts[0].y - pts[i].y)));
      }
      pts_mirror.push(pts[0])

      bezierVertex(
             pts_mirror[0].x, pts_mirror[0].y,
             pts_mirror[1].x, pts_mirror[1].y,
             pts_mirror[2].x, pts_mirror[2].y);

    }
    endShape();
  }
  stroke(0);
  strokeWeight(1);
  myBez(pts)

  // bezier(pts[0].x, pts[0].y,
  //        pts[1].x, pts[1].y,
  //        pts[2].x, pts[2].y,
  //        pts[3].x, pts[3].y);


  noStroke(0);
  fill(255);
  for (let pt of pts) {
    fill("red");
    ellipse(pt.x, pt.y, 20, 20);
  }

  if (checkbox.checked()) {
    for (let pt of pts_mirror) {
      fill(255); 
      ellipse(pt.x, pt.y, 20, 20);
    }
  }

  if (mouseIsPressed) {
    for (let pt of pts) {
      if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
        pt.x = mouseX;
        pt.y = mouseY;
        break;
      }
    }
  }
  push()
  noStroke(0)
  fill(0)
  text('petals', petal_slider.x  + petal_slider.width, petal_slider.y);
  text('turns', turns_slider.x  + turns_slider.width, turns_slider.y);
  text('petal Y', petalY_slider.x  + petalY_slider.width, petalY_slider.y);
  text('petal X', petalX_slider.x  + petalX_slider.width, petalX_slider.y);
  text('scale', scale_slider.x  + scale_slider.width, scale_slider.y);
  text('Redness', r_slider.x  + r_slider.width, r_slider.y);
  text('Greeness', g_slider.x  + g_slider.width, g_slider.y);
  text('Blueness', b_slider.x  + b_slider.width, b_slider.y);
  text('Opacity', a_slider.x  + a_slider.width, a_slider.y);
  // text('Origin of Rotation X', oriX_slider.x  + oriX_slider.width, oriX_slider.y);
  // text('Origin of Rotation Y', oriY_slider.x  + oriY_slider.width, oriY_slider.y);
  pop()

  let n_petals = petal_slider.value();
  let turns = turns_slider.value();
  let petalX = petalX_slider.value();
  let petalY = petalY_slider.value();
  let scale = scale_slider.value();
  // let originOfRotationX = oriX_slider.value(); // need to change origin of rotation via "translate"
  // let originOfRotationY = oriY_slider.value(); // need to change origin of rotation via "translate"
  let r = r_slider.value()
  let g = g_slider.value()
  let b = b_slider.value()
  let a  = a_slider.value()

  let x = 0;
  let y = 0;

  // Set colors
  fill(r,g,b,a);

  let new_pts = [
    createVector(petalX + 0 * scale,petalY + 0 *scale),
    createVector((petalX + pts[1].x - pts[0].x) * scale, (petalY + pts[1].y - pts[0].y) * scale),
    createVector((petalX + pts[2].x - pts[0].x) * scale, (petalY + pts[2].y - pts[0].y) * scale),
    createVector((petalX + pts[3].x - pts[0].x) * scale, (petalY + pts[3].y - pts[0].y) * scale)
  ]

  push()
  translate(600, 500);
  for (let i = 0; i < n_petals; i ++) {
    myBez(new_pts);
    rotate(PI * turns);//turns);
  }
  pop()
}


