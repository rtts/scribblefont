/**
 * SCRIBBLEFONT
 * http://scribblefont.com/
 * Copyright 2012, Jolanda Verhoef
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: 25 sept 2012
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var CANVAS_HEIGHT = 600, 
	CANVAS_WIDTH = 800,
	IMG_SRC = "jjs_handschrift.jpg";

/**
 * The box that is currently active. Users can change the letter of this box. 
 * Its appearance is changed to show its activity.
 */
var active_box;

/**
 * A box consists of:
 * - an outer rectangle, representing the outer bounds of the contained letter
 * - a top line, representing the mean line of a font
 * - a bottom line, representing the baseline of a font * 
 * 
 */
var Box = function(config) {
	var box = new Kinetic.Group({letter: config.letter, draggable: true});

	box.on("mousedown touchstart", function() {
		box.getStage().setDraggable(false);
		box.moveToTop();
		select(box);
	});
	
	box.on("dragend", function() {
		box.getStage().setDraggable(true);
		box.getLayer().draw();
	});
	
	box.add(new Kinetic.Rect({x: config.x, y: config.y, width: config.width, height: config.height, strokeWidth: 1, stroke: 'red', opacity: 0.8}));
	
	var meanline = new Kinetic.Line(
			{
				points: 
					[
					 config.x,
					 config.y + config.height / 3, 
					 config.x + config.width, 
					 config.y + config.height / 3
					], 
				strokeWidth: 1,
				stroke: 'blue',
				draggable: true,
				dragConstraint: 'vertical'
			}
		);
	meanline.on("mousedown touchstart", function() {
		box.simulate('mousedown');
		box.setDraggable(false);
	});
	meanline.on("dragend", function() {
		box.setDraggable(true);
		box.simulate('dragend');
	});
	box.add(meanline);
	
	box.add(new Kinetic.Line({points: [config.x,config.y + config.height * 2 / 3, config.x + config.width, config.y + config.height * 2 / 3], strokeWidth: 1, stroke: 'blue'}));
	
	return box;
};

var unselect = function() {
	if(active_box) active_box.children[0].attrs.strokeWidth = 1;
};
var select = function(box) {
	unselect();
	box.children[0].attrs.strokeWidth = 2;
	active_box = box;
};

var boxes = [new Box({x: 30, y: 20, width: 200, height: 150, letter: 'a'}),
             new Box({x: 50, y: 60, width: 85, height: 120, letter: 'b'})
             ];

window.onload = function() {
	var stage = new Kinetic.Stage({
		container: "container",
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
		draggable: true
	});
	

	var layer = new Kinetic.Layer();
	var imgObj = new Image();

	imgObj.onload = function() {
		
		stage.setDragBounds({
			top: - imgObj.height + stage.getHeight(),
			left: - imgObj.width + stage.getWidth(),
			bottom: 0,
			right: 0
		});
		var img = new Kinetic.Image({
			image: imgObj,
			x: 0,
			y: 0,
		});
		layer.add(img);
		img.moveToBottom();
		layer.draw();
	};
	imgObj.src = IMG_SRC;

	layer.on("mousedown touchstart", function() {
		unselect();
	});

	stage.add(layer);

	var layer2 = new Kinetic.Layer();
	// add the shape to the layer

	for(var i=0; i<boxes.length; i++) {
		layer2.add(boxes[i]);
	}

	// add the layer to the stage
	stage.add(layer2);
};
