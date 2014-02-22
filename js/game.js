<script src="jquery.js"></script>
<script src="dbcalls.js"></script>

<script>
	//Initializes Game Components
	function gameInit(){
		gameObject = new Object();
		gameObject.board = [[8], [8], [8], [8], [8], [8], [8], [8]];
		return gameObject;
	}
	
	//Populates Board
	function populateBoard(gameObject){
		
	
	}
	
	//returns the BMI
	function getCalculateBMI(height, weight){
		return ((weight/(height*height))*703);
	}
	
	//calculates caloric intake
	//requires weight in kg and height in cm
	function getCaloricIntake(height, weight, gender, age){
		if(gender){
			return (66+(13.7*weight) + (5* height) - (6.8*age));
		}
		else{
			return (655 + (9.6 * weight) + (1.8*height) - (4.7 * age));
		}
	}
	
	// converts pounds to kg
	function lbtokg(weight){
		return (weight/2.2046);
	}
	
	
	//converts inches to cm
	function intocm(height){
		return (height/.39370);
	}
	
</script>