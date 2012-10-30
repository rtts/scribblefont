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
				var min = this.parent.getAbsolutePosition();
				var max = {
					x : min.x + this.parent.get('.top_right')[0].attrs.x,
					y : min.y + this.parent.get('.meanline')[0].attrs.y
				};
				min.y += this.parent.get('.baseline')[0].attrs.y;
				return {
					x : this.isLeft ? (pos.x > max.x ? max.x : pos.x)
							: (pos.x < min.x ? min.x : pos.x),
					y : this.isTop ? (pos.y > max.y ? max.y : pos.y)
							: (pos.y < min.y ? min.y : pos.y)
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