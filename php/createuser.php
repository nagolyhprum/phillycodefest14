<?php
	require_once("establish.php");
	require_once("fbid.php");
	$height = $_POST["height"];
	$weight = $_POST["weight"];
	$gender = $_POST["gender"];
	$age = $_POST["age"];
	
	$sql = "SELECT userid FROM usertbl WHERE fbid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $fbid);
	mysqli_stmt_bind_results($userid);
	mysqli_stmt_execute($stmt);
	
	if(mysqli_stmt_fetch($stmt)){
		$_SESSION['id'];
		mysqli_stmt_close($stmt);
	} else($height && $weight && $gender && $age && $fbid){
		mysqli_stmt_close($stmt);
		$sql = "INSERT INTO `usertbl` (`height`, `weight`, `gender`, `age`, `fbid`) VALUES (?,?,?,?,?)";
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'iiiii', $height, $weight, $gender, $age, $fbid);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
		
		$_SESSION['id'] = mysqli_insert_id($conn);
	}
	
	require_once("disconect.php");
?>