//Elias Aripez
//earipez@ucsc.edu

// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  }
}

function handleDrawEvent(){
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);
  var v1X = document.getElementById('v1X').value;
  var v1Y = document.getElementById('v1Y').value;
  var v1 = new Vector3([parseFloat(v1X) || 0, parseFloat(v1Y) || 0, 0]);
  drawVector(v1, "red", ctx);
    
  var v2X = document.getElementById('v2X').value;
  var v2Y = document.getElementById('v2Y').value;
  var v2 = new Vector3([parseFloat(v2X) || 0, parseFloat(v2Y) || 0, 0]);
  drawVector(v2, "blue", ctx);
}

function handleDrawOperationEvent(){
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);
  var v1 = new Vector3([
    parseFloat(document.getElementById('v1X').value) || 0, parseFloat(document.getElementById('v1Y').value) || 0, 0 
  ]);
  drawVector(v1, "red", ctx);
  var v2 = new Vector3([
    parseFloat(document.getElementById('v2X').value) || 0, parseFloat(document.getElementById('v2Y').value) || 0, 0
  ]);
  drawVector(v2, "blue", ctx);
  
  var operation = document.getElementById('op-select').value;
  var scalar = parseFloat(document.getElementById('scalar').value) || 0;

  if (operation === "add") {
    let v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(v3, "green", ctx);
  }
  else if (operation === "sub") {
    let v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(v3, "green", ctx);
  }
  else if (operation === "mul") {
    let v3 = new Vector3(v1.elements);
    v3.mul(scalar);
    drawVector(v3, "green", ctx);

    let v4 = new Vector3(v2.elements);
    v4.mul(scalar);
    drawVector(v4, "green", ctx);
  }
  else if (operation === "div") {
    let v3 = new Vector3(v1.elements);
    v3.div(scalar);
    drawVector(v3, "green", ctx);

    let v4 = new Vector3(v2.elements);
    v4.div(scalar);
    drawVector(v4, "green", ctx);
  }
  else if (operation === "mag"){
    let m1 = v1.magnitude();
    console.log("Magnitude v1: " + m1);

    let m2 = v2.magnitude();
    console.log("Magnitude v2: " + m2);
  }
  else if ( operation === "norm"){
    let v3 = new Vector3(v1.elements);
    v3.normalize();
    drawVector(v3, "green", ctx);

    let v4 = new Vector3(v2.elements);
    v4.normalize();
    drawVector(v4, "green", ctx);
  }
  else if (operation === "angle"){
    let angle = angleBetween(v1, v2);
    console.log("Angle: " + angle.toFixed(2));
  }
  else if (operation === "area") {
    let area = areaTriangle(v1, v2);
    console.log("Area of the triangle: " + area);
  }
}

function angleBetween(v1, v2){
  let d = Vector3.dot(v1, v2);
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();
  let cosAlpha = d / (m1 * m2);
  cosAlpha = Math.min(Math.max(cosAlpha, -1), 1);
  let angleRad = Math.acos(cosAlpha);
  let angleDeg = angleRad * ( 180 / Math.PI);
  return angleDeg;
}

function areaTriangle(v1, v2){
  let v3 = Vector3.cross(v1, v2);
  let areaParallelogram = v3.magnitude();
  return areaParallelogram / 2;
}

function drawVector(v, color, ctx){

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  ctx.stroke();
}
