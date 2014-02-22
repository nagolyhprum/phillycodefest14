<script src="jquery.js"></script>
<script>

	//Creates a user in DB
	function createUser(h, w, g, a){
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
	function createDay(g, c){
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
	}
	
	//creates game in DB
	function createGame(){
		$.ajax({
			url: "creategame.php",
			type: "POST",
			data:{
				userid: u
			}
			success:function(data){
			
			}
		});
	}
	
</script>