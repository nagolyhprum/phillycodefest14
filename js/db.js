var DB = window.DB || {};

(function() {
	//Creates a user in DB
	DB.createUser = function(h, w, g, a, success){
		$.ajax({
			url : "php/createuser.php",
			dataType : "json",
			data : {
				height : h,
				weight : w,
				gender : g,
				age : a
			},
			type : "POST",
			success : function(bool){
				success(bool);
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
	DB.createGame = function(w, success){
		$.ajax({
			url: "php/creategame.php",
			type: "POST",
			dataTye : "json",
			data : {
				weeks : w
			},
			success:function(currentDay){
				success(currentDay);
			}
		});
	};
	
	//creates game in DB
	DB.getFoods = function(complete) {
		$.ajax({
			url: "php/getFoods.php",
			type: "POST",
			dataType : "json",
			success : function(foods) {
				complete(foods);
			}
		});
	};
}());