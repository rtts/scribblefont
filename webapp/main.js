/**
 * SCRIBBLEFONT http://scribblefont.com/ Copyright 2012, Jolanda Verhoef
 * Licensed under the MIT or GPL Version 2 licenses. Date: 25 sept 2012
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This list of boxes is populated server-side.
var boxes = [ new Box({
	x : 30,
	y : 20,
	width : 200,
	height : 150,
	letter : 'a'
}), new Box({
	x : 300,
	y : 60,
	width : 85,
	height : 120,
	letter : 'b'
}) ];

window.onload = function() {

	var background = new Image();
	background.src = IMG_SRC;

	// wait until background image is loaded
	background.onload = function() {
		// configure layer
		var layer = new Kinetic.Layer({
			draggable : true,
			dragBoundFunc : function(pos) {
				var maxX = -background.width + stage.getWidth();
				var maxY = -background.height + stage.getHeight();
				return {
					x : pos.x > 0 ? 0 : (pos.x < maxX ? maxX : pos.x),
					y : pos.y > 0 ? 0 : (pos.y < maxY ? maxY : pos.y)
				};
			}
		});
		
		// add image to layer
		layer.add(new Kinetic.Image({
			image : background,
			x : 0,
			y : 0,
		}));
		
		// add boxes to layer
		boxes.map(layer.add, layer);
		
		// add layer to stage
		new Kinetic.Stage({
			container : 'container',
			width : CANVAS_WIDTH,
			height : CANVAS_HEIGHT
		}).add(layer);
	};
	
};
