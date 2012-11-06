


Letter = function(config) {
	this._initLetter(config);
};
Letter.prototype = {
	_initLetter : function(config) {
		this.shapeType = 'Letter';
		this.letter = config.letter;
		
		Kinetic.Text.call(this, {
			x : config.width,
			y : 0,
			strokeWidth : LETTER_STROKE_WIDTH,
			stroke : LETTER_STROKE_COLOR,
			align : 'center',
			padding : LETTER_PADDING,
			text : this.letter,
			textFill : LETTER_COLOR
		});

		// EVENTS
		this.on('mouseover', function() {
			this.setStrokeWidth(LETTER_STROKE_ACTIVE_WIDTH);
		});
		this.on('mouseout', function() {
			this.setStrokeWidth(LETTER_STROKE_WIDTH);
		});
		this.on('click tap', function() {
			// show a dialog to enter a new letter
		});
	}
};

Kinetic.Global.extend(Letter, Kinetic.Text);