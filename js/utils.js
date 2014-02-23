var UTILS = window.UTILS || {};

(function() {		
	UTILS.getCalculateBMI = function(height, weight){
		return ((weight/(height * height)) * 703);
	};
	
	UTILS.timetomove = 500;
	
	UTILS.imagesize = 47;
	
	UTILS.next = function(max) {
		return Math.floor(max * Math.random());
	};

	UTILS.swap = function(a, b) {
		for(var i in a) {
			var temp = a[i];
			a[i] = b[i];
			b[i] = temp;
		}
	};
	
	UTILS.synch = function(calls, callback) {
		return function() {
			calls--;
			if(!calls) {
				callback();
			}
		};
	};
	
	UTILS.padding = 50;
	
	UTILS.offset = 22.5;
	
	UTILS.scale = 0.5;
	
	UTILS.man = 1;
	
	UTILS.woman = 0;
	
	UTILS.barheight = 40
	
	UTILS.getCaloricIntake = function(height, weight, gender, age){
		if(gender == UTILS.man){
			return Math.floor(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
		} else{
			return Math.floor(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
		}
	};
	
	UTILS.lbtokg = function(weight){
		return (weight / 2.2046);
	};
	
	UTILS.intocm = function(height){
		return (height / 0.39370);
	};	
}());