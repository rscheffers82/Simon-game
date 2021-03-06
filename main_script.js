// Javascript

//     Global vars     \\
var SimonON = false;							// Is the game switched on or off, true or false
var gameInProgress = false;						// Has start been pressed
var strictON = false;							// Strict mode, no mistake is allowed
var clicked = ['top-left', 'top-right',
			'bottom-right', 'bottom-left'];
var highlightTime = 800;
var sound = [];

var Game = function(){
	this.sequence = [];			// g.sequence of button presses unique to each game
	this.currentPos = 0;		// At what position is the game in the g.sequence
	this.clickPos = 0;
};

Game.prototype = {
	reset: function(){
		this.sequence = [];
		this.currentPos = 0;		// current step in the game
		this.clickPos = 0;			// clicked step in currentPos
		this.win = 19; 				// When is the game won, total steps starting at 0
		display(this.currentPos + 1);
	},

	setSequence: function(){
		var sides = [];
		sides[0] = [3,1]; sides[1] = [0,2]; sides[2] = [1,3]; sides[3] = [0,2];
		var opposite = [];
		opposite[0] = [0,2]; opposite[1] = [1,3]; opposite[2] = [2,0]; opposite[3] = [3,1]; //opposite parts - 0=2, 1=3, 2=0, 3=1
		var mainOption;		// choice between sides and same or opposite
		var choice;			// 0 or 1, choose from the two sub-options
		var previous;
		var part;

		for (var x = 0; x <= this.win; x++){
			mainOption = Math.floor(Math.random() * 100);
			previous = this.sequence[x-1] !== undefined ? this.sequence[x-1] : Math.floor(Math.random() * 4);
			choice = Math.floor(Math.random() * 2);

			if ( mainOption <= 50 ) part = sides[previous][choice];
			else part = opposite[previous][choice];

			this.sequence.push( part );
		}
		console.log(this.sequence);
	},
	checkInput: function(part){
		// check for correct input
		//console.log('part: ', part);
		//console.log('What should be clicked: ', this.sequence[this.clickPos]);
		//console.log('currentPos: ',this.currentPos);
		//console.log('clickPos: ', this.clickPos);
		//console.log('---------------------------');
		if ( part !== this.sequence[this.clickPos] ) {	// incorrect input
			let flash = 0;
			display('XX');
			let x = window.setInterval(
				function (){
				console.log('incorrect flash: ', flash);
				if ( flash < 6 ){
					flash%2 === 0 ? display('XX') : display('');
					flash++;
				}
				else{
					clearInterval(x);
					console.log('else');
					g.incorrect();
				}
			}, 400);

		} else if (this.clickPos === this.win){ 				// the game is won

			let flash = 0;
			display('');
			let x = window.setInterval(
				function (){
				console.log('win flash: ', flash);
				if ( flash < 6 ){
					flash%2 === 0 ? display(g.win+1) : display('');
					flash++;
				}
				else{
					clearInterval(x);
					console.log('else');
					startSimon();
				}
			}, 400);

		} else if( this.clickPos >= this.currentPos ){			// show the next sequence
			this.clickPos = 0;
			this.currentPos++;
			window.setTimeout(
				function(){
					display(g.currentPos + 1);
					highlight(g.sequence[0], highlightTime);
				}, 400);

		} else {											// correct part clicked, wait for the next click
			this.clickPos++;
		}
	},
	incorrect: function(){
		if (strictON){											// start over
			this.reset();
			this.setSequence();
			highlight(this.sequence[0], highlightTime);
		} else {												// show the sequence again
			this.clickPos = 0;
			display(this.currentPos+1);
			highlight(this.sequence[0], highlightTime);
		}
	},
	nextPos: function(){

	}
};

var g = new Game();

var importSound = function(){
	for (let i = 0; i<4; i++){
		sound[i] = new Audio('sounds/simonSound'+i+'.mp3');
	}
};

var switchON = function(on){				// on/off button is pressed
	SimonON = on;							// true or false
	if (!on) {
		$('#simon-part-click').css('z-index', '-10');
		gameInProgress = false;
	}
	else g.reset();
	display( on === true ? '--' : '' );
};

var startSimon = function(){			// start button is pressed
	if (!SimonON) return;
	gameInProgress = true;
	g.reset();
	g.setSequence();
	highlight(g.sequence[0], highlightTime);
};

var setStrict = function(){
	if (!SimonON) return;
	strictON = strictON === true ? false : true;
	// set / unset strict LED
	$('.strictLED').toggleClass('LEDon');
};

var display = function(output){
	$('.display').text(output);
};

var highlight = function(button, duration, tempSeqPos){
	//console.log('tempSeqPos(highlight): ', tempSeqPos);
	//console.log('g.currentPos(highlight): ', g.currentPos);
	//console.log(tempSeqPos >= g.currentPos);
	if (tempSeqPos > g.currentPos || !SimonON) {
		$('#simon-part').css('pointer-events', 'auto');
		return;
	}

	$('img').css('pointer-events', 'none');
	$('#simon-part-click').removeClass('top-left top-right bottom-left bottom-right');
	$('#simon-part-click').addClass(clicked[button]);
	$('#simon-part-click').css('z-index', '10');
	sound[button].play();

	//timer event
	window.setTimeout(
		function(){
		$('#simon-part-click').removeClass(clicked[button]);
		$('#simon-part-click').css('z-index', '-10');
		$('img').css('pointer-events', 'auto');
		tempSeqPos = tempSeqPos === undefined ? 1 : tempSeqPos += 1;

		window.setTimeout(
			function(){
				highlight(g.sequence[tempSeqPos], duration, tempSeqPos);
			}, 250);
	}, duration);
};

//     click event for input     \\
$('.simon').on('click', function(e){
	var pressed = e.target.id;
	if (!pressed) return;			// don't execute on invalid click events
	//console.log(pressed);

	switch(pressed){
		case 'on-off' :
			switchON(e.target.checked);
			break;
		case 'start'  :
			startSimon();
			break;
		case 'strict' :
			setStrict();
			break;
	}
});

$('.part').mousedown(function(e){
	console.log('part-down');
	if (!SimonON) return;
	if (!gameInProgress) return;
	var pressed = Number(e.target.id);

	$('#simon-part-click').removeClass('top-left top-right bottom-left bottom-right');
	$('#simon-part-click').addClass(clicked[pressed]);
	$('#simon-part-click').css('z-index', '10');
	sound[pressed].play();

	window.setTimeout(					// add a slight delay after the button is pressed
	function(){
		g.checkInput(pressed);
	}, 500);
});

$('.part').mouseup(function(){
	console.log('part-up');
	if (!SimonON) return;
	if (!gameInProgress) return;

	$('#simon-part-click').css('z-index', '-10');


});

$('.control').mousedown(function(e){
	console.log('btn-down');
	if (!SimonON) return;

	var pressed = e.target.id;
	console.log(pressed);
	$('#' + pressed).addClass('noshadow');
});

$('.control').mouseup(function(e){
	console.log('btn-up');
	if (!SimonON) return;

	var pressed = e.target.id;
	$('#' + pressed).removeClass('noshadow');
});

//     Resize event and function     \\
window.addEventListener("resize", correctSize);

function correctSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

	var css_values = [{
		"name": "body",
		"property": "font-size",
		"value": "1.85"
	},{
		"name": ".display",
		"property": "top",
		"value": "39"
	},{
		"name": ".display",
		"property": "left",
		"value": "27.5"
	},{
		"name": "#start",
		"property": "top",
		"value": "41"
	},{
		"name": "#start",
		"property": "left",
		"value": "39"
	},{
		"name": "#strict",
		"property": "top",
		"value": "41"
	},{
		"name": "#strict",
		"property": "left",
		"value": "46"
	},{
		"name": ".strictLED",
		"property": "top",
		"value": "39.2"
	},{
		"name": ".strictLED",
		"property": "left",
		"value": "47.15"
	},{
		"name": ".count",
		"property": "top",
		"value": "45.5"
	},{
		"name": ".count",
		"property": "left",
		"value": "28.3"
	},	{
		"name": ".start-txt",
		"property": "top",
		"value": "45.5"
	},{
		"name": ".start-txt",
		"property": "left",
		"value": "37.0"
	},{
		"name": ".strict-txt",
		"property": "top",
		"value": "45.5"
	},{
		"name": ".strict-txt",
		"property": "left",
		"value": "44.5"
	},{
		"name": ".off-text",
		"property": "top",
		"value": "49.6"
	},{
		"name": ".off-text",
		"property": "left",
		"value": "32.4"
	},{
		"name": ".on-text",
		"property": "top",
		"value": "49.6"
	},{
		"name": ".on-text",
		"property": "left",
		"value": "43.7"
	},{
		"name": ".switch",
		"property": "top",
		"value": "49.5"
	},{
		"name": ".switch",
		"property": "left",
		"value": "37"
	}];
/*
input:checked + .slider:before {
  -webkit-transform: translateX( $max-width * (35/900) );
  -ms-transform: translateX( $max-width * (35/900) );
  transform: translateX( $max-width * (35/900) );
*/
	var add = '';
	if (w > h) {
		add = 'vh';
		$('.slider').removeClass('slider2');
	}
	else {
		$('.slider').addClass('slider2');		// vh to vw change
		add = 'vw';
	}
	// console.log('all values', css_values);
	// console.log('add', css_values[0].value + add)
	css_values.forEach(function(e,count){
		$( css_values[count].name).css(css_values[count].property, css_values[count].value + add);
	});
}

//     Ensure the game is correctly displayed     \\
$( document ).ready(function() {
	correctSize();
	importSound();
});
