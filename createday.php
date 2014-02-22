<?php
	require_once(establish.php)
	$userid = $_SESSION["id"];
	$gameid = $_POST["gameid"];
	$caloricintake = $_POST["caloricintake"];
	
	if(isset($userid) && isset($_POST["gameid"]) && isset($_POST["caloricintake"])){
		$sql("INSERT INTO `usertbl` (`userid`, `gameid`, `caloricintake`) VALUES (?,?,?)");
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'iii', $userid, $gameid, $caloricintake);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	
	require_once(disconect.php)
?>