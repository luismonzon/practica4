ws=io.connect('http://localhost:3000');
document.addEventListener('DOMContentLoaded', function(){
	io.emit('start',function(a){
		a.forEach(function(val,key){
			$('#info>tbody').append(a);
		});		
		
	});

});
