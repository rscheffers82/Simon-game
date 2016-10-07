// Javascript

//     Global vars     \\
var SimonON = false;							// Is the game switched on or off, true or false
var gameInProgress = false;						// Has start been pressed
var strictON = false;							// Strict mode, no mistake is allowed
var sequence = [];								// Sequence of button presses unique to each game
var seqPos = 4;										// At what position is the game in the sequence
var clicked = ['top-left', 'top-right', 
			'bottom-right', 'bottom-left'];

var switchON = function(on){	
	SimonON = on;							// true or false
	display( on === true ? '--' : '' );
	if (!on) reset();
}

var reset = function(){
	$('#simon-part-click').css('z-index', '-10');
	gameInProgress = false;
	equence = [];
}

var startSimon = function(){			
	if (!SimonON) return;
	gameInProgress = true;
	sequence = setSequence();
	//seqPos = 0;
	//gameON();
}
var gameON = function(){
	display(1);
	highlight(sequence[0], 600);
}

var setSequence = function(){
	var arr = [0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3];
	return arr;
}

var setStrict = function(){
	if (!SimonON) return;
	strictON = strictON === true ? false : true;
	// set / unset indicator
}
/*
var colorClicked = function(input){
	if (!SimonON) return;
	if (!gameInProgress) return;
	display(input);
	highlight(input, 600);
}
*/
var display = function(output){
	$('.display').text(output);
}

var highlight = function(button, duration, tempSeqPos){
	console.log('tempSeqPos(highlight): ', tempSeqPos);
	console.log('seqPos(highlight): ', seqPos);	
	console.log(tempSeqPos >= seqPos);
	if (tempSeqPos >= seqPos || !SimonON) return;

	$('img').css('pointer-events', 'none');
	$('#simon-part-click').removeClass('top-left top-right bottom-left bottom-right');
	$('#simon-part-click').addClass(clicked[button]);
	$('#simon-part-click').css('z-index', '10');
//timer event
	var lightUp = window.setTimeout(dim, duration);
	function dim(){
		$('#simon-part-click').removeClass(clicked[button]);
		$('#simon-part-click').css('z-index', '-10');
		$('img').css('pointer-events', 'auto');
		tempSeqPos = tempSeqPos === undefined ? 1 : tempSeqPos += 1;
		console.log('tempSeqPos(lightUp): ', tempSeqPos);
		highlight(sequence[tempSeqPos], duration, tempSeqPos);
	}
	//when done
	// 	$('#simon-part').css('pointer-events', 'auto');
}

//     click event for input     \\
$('.simon').on('click', function(e){
	var pressed = e.target.id;
	if (!pressed) return;			// don't execute on invalid click events
	console.log(pressed);

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
	//display('down');
	if (!SimonON) return;
	if (!gameInProgress) return;	
	var pressed = e.target.id;
	
	$('#simon-part-click').removeClass('top-left top-right bottom-left bottom-right');
	$('#simon-part-click').addClass(clicked[pressed]);
	$('#simon-part-click').css('z-index', '10');
});

$('.part').mouseup(function(e){
	//display('up');
	if (!SimonON) return;
	if (!gameInProgress) return;
	$('#simon-part-click part').css('z-index', '-10');
});

//     Resize event and function     \\
window.addEventListener("resize", correctSize);

function correctSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

	css_values = [{
		"name": "body",
		"property": "font-size",
		"value": "2" 
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
		"value": "40.1" 
	},{  
		"name": "#start",
		"property": "left",
		"value": "39" 
	},{
		"name": "#strict",
		"property": "top",
		"value": "40.1" 
	},{
		"name": "#strict",
		"property": "left",
		"value": "46" 
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
	//console.log('all values', css_values);
//	console.log('add', css_values[0].value + add)
	css_values.forEach(function(e,count){
		$( css_values[count].name).css(css_values[count].property, css_values[count].value + add);
	});
}

//     Ensure the game is correctly displayed     \\
$( document ).ready(function() {
	correctSize();
});