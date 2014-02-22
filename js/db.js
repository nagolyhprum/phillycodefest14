var DB = window.DB || {};

(Function() {
	//Creates a user in DB
	DB.createUser = function(h, w, g, a){
		$.ajax({
			url: "createuser.php",
			data: {
				height:h,
				weight:w,
				gender:g,
				age: a
			}
			type: "POST",
			success:function(data){
			
			}
		});
	}
	
	//creates a day in DB
	DB.createDay = function(g, c){
		$.ajax({
			url: "createday.php",
			type: "POST",
			data:{
				userid: u,
				gameid: g,
				caloricintake: c
			}
			success:function(data){
			
			}
		});
	};
	
	//creates game in DB
	DB.createGame = function(){
		$.ajax({
			url: "creategame.php",
			type: "POST",
			data:{
				userid: u
			}
			success:function(data){
			
			}
		});
	};
}());