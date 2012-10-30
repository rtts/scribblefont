MyLine = function(config) {
    this._initMyLine(config);
};
MyLine.prototype = {
    _initMyLine: function(config) {
        this.shapeType = "MyLine";

        Kinetic.Group.call(this, {y: config.top ? config.height / 3 
        		: config.height / 3 * 2, name: config.name});
        
        this.add(new Kinetic.Rect({
        	width: config.width,
        	height: LINE_WIDTH_HANDLE,
//        	strokeWidth: 2,
//        	stroke: 'purple',
        	y: - LINE_WIDTH_HANDLE / 2,
        	x: 0
        }));
        this.add(new Kinetic.Line({
			points: [ 0, 0, config.width, 0], 
			strokeWidth: LINE_WIDTH,
			stroke: LINE_COLOR_MEAN
		}));
        this.setDraggable(true);
        
		this.setDragBoundFunc( function(pos) {
			var parY = this.parent.getAbsolutePosition().y;
			var topY, botY;
			if (config.top) {
				topY = parY;
				botY = this.parent.get(".baseline")[0].getAbsolutePosition().y;
			} else {
				topY = this.parent.get(".meanline")[0].getAbsolutePosition().y;
				botY = parY + config.height;
			}
            return {
            	x: this.getAbsolutePosition().x, 
            	y: pos.y < topY ? topY : (pos.y > botY ? botY : pos.y)
            };
          }
		);
        this.on('mouseover', function() {
        	this.children[1].setStrokeWidth(LINE_WIDTH_ACTIVE);
        	this.parent.setDraggable(false);
        });
        this.on('mouseout', function() {
        	this.children[1].setStrokeWidth(LINE_WIDTH);
        	this.parent.setDraggable(true);
        });
        this.on('dragend', function() {
        	this.moveToTop();
        });
    }
};

Kinetic.Global.extend(MyLine, Kinetic.Group);