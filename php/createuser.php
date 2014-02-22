<?php
	require_once(establish.php)
	$height = $_POST["height"];
	$weight = $_POST["weight"];
	$gender = $_POST["gender"];
	$age = $_POST["age"];
	
	if(isset($_POST["height"]) && isset($_POST["weight"]) && isset($_POST["gender"] && isset($_POST["age"])){
		$sql("INSERT INTO `usertbl` (`height`, `weight`, `gender`, `age`) VALUES (?,?,?,?)");
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'iii', $height, $weight, $gender, $age);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	
	require_once(disconect.php)
?>