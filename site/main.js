var SCALE = 1;
var IMG_WIDTH = 400;
var IMG_HEIGHT = 400;
// BOXES is temporarily statically filled, in the future this array must
// be filled using a server-side calculation.
var BOXES = [
    {x: 100, y: 100, width: 100, height: 100, pos_high_line: 33, pos_low_line: 67, content: 'a'},
    {x:  65, y:  35, width: 300, height: 125, pos_high_line: 33, pos_low_line: 67, content: 'b' }
  ];

$(document).ready( function() {
  
  // Add a box with two lines to the DOM for each entry in BOXES
  boxes.map( function(box, index) {
    $("#canvas").append(
      '<div id="' + index + '" class="box">' +
        '<div class="line high"></div>' +
        '<div class="line low"></div>' +
      '</div>'
    );
  });
  
  // Make each box draggable, update BOXES when dragging is stopped
  $(".box").draggable({
    cursor: "move"
    stop: function(event, ui) {
      var box = boxes[this.id];
      box.top = ui.position.top / scale;
      box.left = ui.position.left / scale;
  });
  
}
