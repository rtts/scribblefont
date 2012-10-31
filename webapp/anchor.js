/**
 * An anchor is a handle on the corner of a box with which you can resize
 */


Anchor = function(config) {
	this._initAnchor(config);
};
Anchor.prototype = {
	_initAnchor : function(config) {
		this.shapeType = 'Anchor';

		this.isLeft = config.name.indexOf('left') != -1;
		this.isTop = config.name.indexOf('top') != -1;
		
		Kinetic.Circle.call(this, {
			x : config.x,
			y : config.y,
			name : config.name,
			fill : ANCHOR_COLOR,
			stroke : ANCHOR_STROKE_COLOR,
			strokeWidth : ANCHOR_STROKE_WIDTH,
			draggable : true,
			dragBoundFunc : function(pos) {
				var parY = this.parent.getAbsolutePosition().y;
				var maxY = parY + this.parent.get('.meanline')[0].attrs.y;
				var minY = parY + this.parent.get('.baseline')[0].attrs.y;
				return {
					x : pos.x,
					y : this.isTop ? (pos.y > maxY ? maxY : pos.y)
							: (pos.y < minY ? minY : pos.y)
				};
			}
		});

		this.setRadius(ANCHOR_RADIUS);

		// EVENTS
		this.on('mouseover', function() {
			this.setStrokeWidth(ANCHOR_STROKE_ACTIVE_WIDTH);
			this.parent.setDraggable(false);
		});
		this.on('mouseout', function() {
			this.setStrokeWidth(ANCHOR_STROKE_WIDTH);
			this.parent.setDraggable(true);
		});
		this.on('dragmove', function() {
			this.parent.resize(this);
			this.getLayer().draw();
		});
	}
};

Kinetic.Global.extend(Anchor, Kinetic.Circle);