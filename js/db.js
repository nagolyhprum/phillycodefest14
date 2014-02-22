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
	DB.createDay = function(calories, grains, protein, vegetables, fruit, junk, dairy, success){
		$.ajax({
			dataType : "json",
			url: "php/createday.php",
			type: "POST",
			data:{
				calories: calories,
				grains: grains,
				protein: protein,
				vegetables: vegetables,
				fruit:fruit,
				junk:junk,
				dairy:dairy
			},
			success:function(bool){
				success(bool);
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