var GAME = window.GAME || {};

(Function() {
	//Initializes Game Components
	GAME.gameInit = function(){
		gameObject = new Object();
		gameObject.board = [[8], [8], [8], [8], [8], [8], [8], [8]];
		return gameObject;
	};
	
	//Populates Board
	GAME.populateBoard = function(gameObject){
		
	
	};
	
	//returns the BMI
	GAME.getCalculateBMI = function(height, weight){
		return ((weight/(height*height))*703);
	};
	
	//calculates caloric intake
	//requires weight in kg and height in cm
	GAME.getCaloricIntake = function(height, weight, gender, age){
		if(gender){
			return (66+(13.7*weight) + (5* height) - (6.8*age));
		}
		else{
			return (655 + (9.6 * weight) + (1.8*height) - (4.7 * age));
		}
	};
	
	// converts pounds to kg
	GAME.lbtokg = function(weight){
		return (weight/2.2046);
	};
	
	
	//converts inches to cm
	GAME.intocm = function(height){
		return (height/.39370);
	}
	
}());