var CANVAS, CONTEXT;
var CANVAS_WIDTH, CANVAS_HEIGHT;
var IMAGE;
var ZOOMFACTOR = 2;
var scale = 1; // canvas scale. 1 is unscaled, < 1 is zoomed out, > 1 is zoomed in.
var top = 0, left = 0;

var boxes = [
  {width: 65, height: 65, top: 35, left: 35, high: 33, low: 67},
  {width: 33, height: 33, top: 15, left: 15, high: 33, low: 67}];


// INIT

window.onload = function() {
  CANVAS = document.getElementById("myCanvas");
  CONTEXT = CANVAS.getContext("2d");
  CANVAS_WIDTH = CANVAS.width;
  CANVAS_HEIGHT = CANVAS.height;
  var img = new Image();
  img.onload = function() {
    IMAGE = img;
    draw();
  }
  img.src = 'jjs_handschrift.jpg';
  
  CANVAS.addEventListener('click', function(e) {
    var x = e.pageX - CANVAS.offsetLeft;
    var y = e.pageY - CANVAS.offsetTop;
    if (e.altKey) {
      zoom_out(x, y);
    }
    else {
      zoom_in(x, y);
    }
  });
}


// CANVAS

function zoom_in(x, y) {
  //console.log("zoom in (x, y) -- not implemented");
  //console.log("  zoom in in the (x,y) direction (default center)");
  zoom(x, y, ZOOMFACTOR);
}

function zoom_out(x, y) {
  //console.log("zoom out (x, y) -- not implemented");
  //console.log("  zoom out in the (x,y) direction (default center)");
  zoom(x, y, 1 / ZOOMFACTOR);
}

function zoom(x, y, factor) {
  var new_scale = scale * factor;
  
  var default_center_x = CANVAS_WIDTH / 2;
  var default_center_y = CANVAS_HEIGHT / 2;
  
  var zoom_center_x = x;
  var zoom_center_y = y;
  
  var new_center_x = ( default_center_x + zoom_center_x ) / 2;
  var new_center_y = ( default_center_y + zoom_center_y ) / 2;
  
  var image_x = left + ( new_center_x / scale );
  var image_y = top  + ( new_center_y / scale );
  
  var new_scaled_width = CANVAS_WIDTH / new_scale;
  var new_scaled_height = CANVAS_HEIGHT / new_scale;
  
  var new_left = image_x - ( new_scaled_width / 2 );
  var new_top  = image_y - ( new_scaled_height / 2 );
  
  scale = new_scale;
  top = new_top;
  left = new_left;
  
  draw();
}

// BOXES

boxes.add = function (top, left, width, height) {
  console.log("add box -- not implemented");
}

// LINES

// DRAWING

function draw() {
  // Wait for the image to be fully loaded, before drawing something
  if (! IMAGE) return;
  // Save the current untransformed, unscaled context
  CONTEXT.save();
  // Clear the whole canvas
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  // Move to the right drawing area
  CONTEXT.translate(-top, -left);
  CONTEXT.scale(scale, scale);
  // Draw
  CONTEXT.drawImage(IMAGE, 0, 0);
  for (var i=0; i < boxes.length; i++) {
    var box = boxes[i];
    CONTEXT.strokeRect(box.top, box.left, box.width, box.height);
  }
  // Return to the untransformed, unscaled context
  CONTEXT.restore();
}

// LOGGING

function log() {
  console.log("SCALE: " + scale);
//  console.log("CENTER: " + CENTER_X + ", " + CENTER_Y);
}
