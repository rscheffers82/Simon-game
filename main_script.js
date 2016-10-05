// Javascript
$( document ).ready(function() {

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
	}];

	var add = '';
	if (w > h) {
		console.log('Width = larger');
		add = 'vh';
	}
	else {
		console.log('height = larger');
		// vh to vw change
		add = 'vw';
	}
	//console.log('all values', css_values);
//	console.log('add', css_values[0].value + add)
	css_values.forEach(function(e,count){
		$( css_values[count].name).css(css_values[count].property, css_values[count].value + add);
	});
	//$( css_values[0].name).css(css_values[0].property, css_values[0].value + add);
	//$( css_values[1].name).css(css_values[1].property, css_values[1].value + add);
}

$('.simon').on('click', function(e){

	console.log(e.target.id);
});