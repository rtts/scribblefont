MyLine = function(config) {
	this._initMyLine(config);
};
MyLine.prototype = {
	_initMyLine : function(config) {
		this.shapeType = 'MyLine';

		// PROPERTIES
		Kinetic.Group.call(this, {
			y : (config.name === 'meanline') ? config.height / 3
					: config.height / 3 * 2,
			name : config.name,
			draggable : true,
			dragBoundFunc : function(pos) {
				var parY = this.parent.get('.outline')[0].getAbsolutePosition().y;
				var topY, botY;
				if (config.name === 'meanline') {
					topY = parY;
					botY = this.parent.get('.baseline')[0]
							.getAbsolutePosition().y;
				} else {
					topY = this.parent.get('.meanline')[0]
							.getAbsolutePosition().y;
					botY = parY + this.parent.get('.outline')[0].getHeight();
				}
				return {
					x : this.getAbsolutePosition().x,
					y : pos.y < topY ? topY : (pos.y > botY ? botY : pos.y)
				};
			}
		});

		// SHAPES
		[ new Kinetic.Rect({
			width : config.width,
			height : LINE_WIDTH_HANDLE,
			y : -LINE_WIDTH_HANDLE / 2,
			x : 0,
			name: 'handle'
		}), new Kinetic.Rect({
			width: config.width,
			height: 0,
			stroke_width: LINE_WIDTH,
			stroke : LINE_COLOR_MEAN,
			name : 'line'
		}) ].map(this.add, this);

		// EVENTS
		this.on('mouseover', function() {
			this.get('.line')[0].setStrokeWidth(LINE_WIDTH_ACTIVE);
			this.parent.setDraggable(false);
		});
		this.on('mouseout', function() {
			this.get('.line')[0].setStrokeWidth(LINE_WIDTH);
			this.parent.setDraggable(true);
		});
		this.on('dragend', function() {
			// to prevent both lines getting stuck at top or bottom
			this.moveToTop();
		});
	},
	setWidth : function(width) {
		this.get('.line')[0].setWidth(width);
		this.get('.handle')[0].setWidth(width);
	}
};

Kinetic.Global.extend(MyLine, Kinetic.Group);