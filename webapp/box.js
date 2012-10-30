/**
 * A box is a group of shapes with an associated letter. The shapes contained in
 * this group: - outline: a rectangle - meanline and baseline: a group -
 * handles: four circles
 * 
 * The group has a (x,y)-coordinate, the positions of the shapes within the
 * group are relative to this coordinate. The coordinate corresponds to the
 * top-left point of the box's rectangle.
 * 
 * The group also has a width and height. If changed, the shapes in this group
 * will also be updated.
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
			width : config.width,
			height : config.height,
			name: 'top_left'
		}), new Anchor({
			width : config.width,
			height : config.height,
			name: 'top_right'
		}), new Anchor({
			width : config.width,
			height : config.height,
			name: 'bottom_left'
		}), new Anchor({
			width : config.width,
			height : config.height,
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

        outline.setPosition(top_left.attrs.x, top_left.attrs.y);
        meanline.setX(top_left.attrs.x);
        baseline.setX(top_left.attrs.x);
        
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