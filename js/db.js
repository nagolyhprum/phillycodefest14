var DB = window.DB || {};

(function() {
	//Creates a user in DB
	DB.createUser = function(h, w, g, a){
		$.ajax({
			url: "php/createuser.php",
			data: {
				height:h,
				weight:w,
				gender:g,
				age: a
			},
			type: "POST",
			success:function(data){
			
			}
		});
	}
	
	//creates a day in DB
	DB.createDay = function(c){
		$.ajax({
			url: "php/createday.php",
			type: "POST",
			data:{
				caloricintake: c
			},
			success:function(data){
			
			}
		});
	};
	
	//creates game in DB
	DB.createGame = function(){
		$.ajax({
			url: "php/creategame.php",
			type: "POST",
			dataTye : "json",
			success:function(currentDay){
			
			}
		});
	};
	
	//creates game in DB
	DB.getFoodGroups = function(complete){
		$.ajax({
			url: "php/getFoodGroups.php",
			type: "POST",
			dataTye : "json",
			success : function(groups) {
				complete(groups);
			}
		});
	};
}());