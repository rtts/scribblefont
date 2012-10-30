Box = function(config) {
    this._initBox(config);
};
Box.prototype = {
    _initBox: function(config) {
        this.shapeType = "Box";
        this.letter = config.letter;

        Kinetic.Group.call(this, {
        	x: config.x, 
        	y: config.y,
    		draggable: true, 
    		opacity: BOX_OPACITY});
        
        this.on('mouseover', function() {
        	this.children[0].setStrokeWidth(BOX_ACTIVE_WIDTH);
        	this.parent.setDraggable(false);
        	this.getLayer().draw();
        });
        this.on('mouseout', function() {
        	this.children[0].setStrokeWidth(BOX_WIDTH);
        	this.parent.setDraggable(true);
        	this.getLayer().draw();
        });
        
    	var rect = new Kinetic.Rect({width: config.width, height: config.height});
    	rect.setStroke(BOX_COLOR);
    	rect.setStrokeWidth(BOX_WIDTH);
    	
    	var meanline = new MyLine({width: config.width, height: config.height,
    		top: true, name: "meanline"});
    	
    	var baseline = new MyLine({width: config.width, height: config.height,
    		top: false, name: "baseline"});
    	
    	this.add(rect);
    	this.add(meanline);
    	this.add(baseline);
    }
};

Kinetic.Global.extend(Box, Kinetic.Group);


/**
 * A box consists of:
 * - the letter it represents
 * - a group of shapes
 */
/*
function Box(config) {
	var that = this; // for closure
	
	this.letter = config.letter;
	this.group = new Kinetic.Group({
		x: config.x,
		y: config.y,
		draggable: true, opacity: BOX_OPACITY});
	
	this.group.on("mouseover", function() {
		select(that);
	});
	
	this.group.on("mouseout", function() {
		unselect();
	});
	
	var rect = new Kinetic.Rect({width: config.width, height: config.height});
	rect.setStroke(BOX_COLOR);
	rect.setStrokeWidth(BOX_WIDTH);
	
	
	var meanline = new MyLine({width: config.width, height: config.height});
	this.group.add(rect);
	this.group.add(meanline);
	
	
	//group.add(new Kinetic.Line({points: [config.x,config.y + config.height * 2 / 3, config.x + config.width, config.y + config.height * 2 / 3], strokeWidth: 1, stroke: 'blue'}));
	
}
*/