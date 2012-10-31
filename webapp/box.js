/**
 * A box is a group of shapes with an associated letter. The shapes contained in
 * this group are (1) outline: a rectangle (2) meanline and baseline: lines (3)
 * anchors: four anchors
 * 
 * The group has a (x,y)-coordinate, the positions of the shapes within the
 * group are relative to this coordinate. The coordinate corresponds to the
 * top-left point of the box's rectangle.
 * 
 */

Box = function(config) {
	this._initBox(config);
};
Box.prototype = {
	_initBox : function(config) {
		this.shapeType = 'Box';
		this.letter = config.letter;

		// PROPERTIES
		Kinetic.Group.call(this, {
			x : config.x,
			y : config.y,
			draggable : true,
			opacity : OPACITY
		});

		// SHAPES
		[ new Kinetic.Rect({
			width : config.width,
			height : config.height,
			stroke : BOX_COLOR,
			strokeWidth : BOX_WIDTH,
			name : 'outline'
		}), new MyLine({
			width : config.width,
			height : config.height,
			name : 'meanline'
		}), new MyLine({
			width : config.width,
			height : config.height,
			name : 'baseline'
		}), new Anchor({
			x : 0,
			y: 0,
			name: 'top_left'
		}), new Anchor({
			x : config.width,
			y : 0,
			name: 'top_right'
		}), new Anchor({
			x : 0,
			y : config.height,
			name: 'bottom_left'
		}), new Anchor({
			x : config.width,
			y : config.height,
			name: 'bottom_right'
		}) ].map(this.add, this);

		// EVENT HANDLERS
		this.on('mouseover', function() {
			this.get('.outline')[0].setStrokeWidth(BOX_ACTIVE_WIDTH);
			this.parent.setDraggable(false);
			this.getLayer().draw();
		});
		this.on('mouseout', function() {
			this.get('.outline')[0].setStrokeWidth(BOX_WIDTH);
			this.parent.setDraggable(true);
			this.getLayer().draw();
		});
	},
	/**
	 * Changes the position, width, and height of shapes when an anchor moves.
	 * @param active_anchor The anchor that moved.
	 */
	resize : function(active_anchor) {
		var top_left = this.get(".top_left")[0];
        var top_right = this.get(".top_right")[0];
        var bottom_left = this.get(".bottom_left")[0];
        var bottom_right = this.get(".bottom_right")[0];
        var outline = this.get('.outline')[0];
        var meanline = this.get('.meanline')[0];
        var baseline = this.get('.baseline')[0];

        // update anchor positions
        switch (active_anchor.getName()) {
          case "top_left":
            top_right.attrs.y = active_anchor.attrs.y;
            bottom_left.attrs.x = active_anchor.attrs.x;
            break;
          case "top_right":
            top_left.attrs.y = active_anchor.attrs.y;
            bottom_right.attrs.x = active_anchor.attrs.x;
            break;
          case "bottom_left":
        	  bottom_right.attrs.y = active_anchor.attrs.y;
        	  top_left.attrs.x = active_anchor.attrs.x;
        	  break;
          case "bottom_right":
            bottom_left.attrs.y = active_anchor.attrs.y;
            top_right.attrs.x = active_anchor.attrs.x;
            break;
        }

        // change position of outline and lines
        outline.setPosition(top_left.attrs.x, top_left.attrs.y);
        meanline.setX(top_left.attrs.x);
        baseline.setX(top_left.attrs.x);
        
        // change size of outline and lines
        var width = top_right.attrs.x - top_left.attrs.x;
        var height = bottom_left.attrs.y - top_left.attrs.y;
        if(width && height) {
          outline.setSize(width, height);
          meanline.setWidth(width);
          baseline.setWidth(width);
        }
	}
};

Kinetic.Global.extend(Box, Kinetic.Group);