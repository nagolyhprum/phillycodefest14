var UTILS = window.UTILS || {};

(function() {		
	UTILS.getCalculateBMI = function(height, weight){
		return ((weight/(height * height)) * 703);
	};
	
	UTILS.padding = 50;
	
	UTILS.getCaloricIntake = function(height, weight, gender, age){
		if(gender){
			return (66 + (13.7 * weight) + (5 * height) - (6.8 * age));
		} else{
			return (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
		}
	};
	
	UTILS.lbtokg = function(weight){
		return (weight / 2.2046);
	};
	
	UTILS.intocm = function(height){
		return (height / 0.39370);
	};	
}());