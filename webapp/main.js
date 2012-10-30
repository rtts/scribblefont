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

var boxes = [new Box({x: 30, y: 20, width: 200, height: 150, letter: 'a'}),
             new Box({x: 300, y: 60, width: 85, height: 120, letter: 'b'})
             ];

window.onload = function() {
	var stage = new Kinetic.Stage({
		container: "container",
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	});
	
	var layer = new Kinetic.Layer({draggable: true});
	var imgObj = new Image();

	imgObj.onload = function() {
		
		layer.setDragBoundFunc(function (pos) {
			var maxX = - imgObj.width + stage.getWidth();
			var maxY = - imgObj.height + stage.getHeight();
			return {
				x: pos.x > 0 ? 0 : ( pos.x < maxX ? maxX : pos.x ), 
				y: pos.y > 0 ? 0 : ( pos.y < maxY ? maxY : pos.y )
			};
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
	
	for(var i=0; i<boxes.length; i++) {
		layer.add(boxes[i]);
	}
	
	stage.add(layer);
	layer.draw();
	
};
