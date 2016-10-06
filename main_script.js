// Javascript
$( document ).ready(function() {
	correctSize();
});

window.addEventListener("resize", correctSize);

function correctSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    //document.getElementById( document ).innerHTML = "Width: " + w + "<br>Height: " + h;
//	var width = 80vw;
//	var height = 80vw;
//	var maxHeight = 80vh;
//	var maxWidth = 80vh;


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
		"name": ".on-text",
		"property": "top",
		"value": "49.6" 
	},{
		"name": ".on-text",
		"property": "left",
		"value": "33.5" 	
	},{		
		"name": ".off-text",
		"property": "top",
		"value": "49.6" 
	},{
		"name": ".off-text",
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

$('.simon').on('click', function(e){

	console.log(e.target.id);
});
