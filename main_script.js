// Javascript
$( document ).ready(function() {

});

window.addEventListener("resize", correctSize);

function correctSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    //document.getElementById( document ).innerHTML = "Width: " + w + "<br>Height: " + h;
	if (w > h) {
		console.log('Width = larger');	
		$('.simon-part-middle').css('top','24.35vh');
  		$('.simon-part-middle').css('left','24.4vh');		
	}
	else {
		console.log('height = larger');
		// vh to vw change
		$('.simon-part-middle').css('top','24.35vw');
  		$('.simon-part-middle').css('left','24.4vw'); 
	}
}

$('.simon').on('click', function(e){

	console.log(e.target.id);
});