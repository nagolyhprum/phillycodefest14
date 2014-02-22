var CONTROL = window.CONTROL || {};

(function() {
	//Initializes CONTROL Components
	CONTROL.init = function(){
		return {
			board : []
		};
	};
	
	//GET THE FOOD GROUPS
	var foods;	
	DB.getFoods(function(f) {
		foods = f;
	});
	
	//LOGIN
	DB.createUser(10, 20, 30, 40, function(bool) {
		if(bool[0] === true) {
			alert("Thank you for creating your new account.");
		} else if(bool[0] === false) {
			alert("Thank you for reusing your account.");
		} else if(bool[0] === null){			
			alert("Uh oh, could not create an account.");
		}
	});
	
	//Populates Board
	CONTROL.reset = function(game){
		
	};
	
	//returns the BMI
	CONTROL.getCalculateBMI = function(height, weight){
		return ((weight/(height*height))*703);
	};
	
	//calculates caloric intake
	//requires weight in kg and height in cm
	CONTROL.getCaloricIntake = function(height, weight, gender, age){
		if(gender){
			return (66+(13.7*weight) + (5* height) - (6.8*age));
		}
		else{
			return (655 + (9.6 * weight) + (1.8*height) - (4.7 * age));
		}
	};
	
	// converts pounds to kg
	CONTROL.lbtokg = function(weight){
		return (weight/2.2046);
	};
	
	
	//converts inches to cm
	CONTROL.intocm = function(height){
		return (height/.39370);
	}
	
}());