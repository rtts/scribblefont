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

var CANVAS_HEIGHT = 600,				// Height of the html5 canvas
	CANVAS_WIDTH = 800,				// Width of the html5 canvas
	IMG_SRC = 'jjs_handschrift.jpg', // Background image of the canvas

	THEME_COLOR_1 = 'red',
	THEME_COLOR_2 = 'blue',
	THEME_COLOR_3 = 'green',
	OPACITY = 1,			// Opacity of the outline and lines of the box

	BOX_COLOR = THEME_COLOR_1,	// Color of the outline of the box
	BOX_WIDTH = 2,				// Width of the outline of the box
	BOX_ACTIVE_WIDTH = 4,		// Width of the outline of the active box
	
	LINE_COLOR_MEAN = THEME_COLOR_2,	// Color of the mean line of the box
	LINE_COLOR_BASE = THEME_COLOR_2,	// Color of the base line of the box
	LINE_WIDTH = BOX_WIDTH,
	LINE_WIDTH_ACTIVE = BOX_ACTIVE_WIDTH,
	LINE_WIDTH_HANDLE = 8,
	
	ANCHOR_RADIUS = 5,
	ANCHOR_COLOR = THEME_COLOR_1,
	ANCHOR_STROKE_WIDTH = BOX_WIDTH,
	ANCHOR_STROKE_ACTIVE_WIDTH = BOX_ACTIVE_WIDTH,
	ANCHOR_STROKE_COLOR = THEME_COLOR_2,
	
	LETTER_COLOR = THEME_COLOR_3,
	LETTER_FONT_FAMILY = 'monospace',
	LETTER_FONT_SIZE = 12,
	LETTER_PADDING = 5,
	LETTER_STROKE_COLOR = THEME_COLOR_3,
	LETTER_STROKE_WIDTH = BOX_WIDTH,
	LETTER_STROKE_ACTIVE_WIDTH = BOX_ACTIVE_WIDTH;
	