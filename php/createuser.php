<?php
	require_once("establish.php");
	$height = $_POST["height"];
	$weight = $_POST["weight"];
	$gender = $_POST["gender"];
	$age = $_POST["age"];
	
	$sql = "SELECT userid FROM usertbl WHERE userfbid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $fbid);
	mysqli_stmt_bind_result($userid);
	mysqli_stmt_execute($stmt);
	
	//true - account created
	//false - accound loaded
	//null - nothing happened
	if(mysqli_stmt_fetch($stmt)){
		$_SESSION['id'];
		mysqli_stmt_close($stmt);	
		$result = false;	
	} else if($height && $weight && $gender && $age && $fbid){
		mysqli_stmt_close($stmt);
		$sql = "INSERT INTO `usertbl` (`userheight`, `userweight`, `usergender`, `userage`, `userfbid`) VALUES (?,?,?,?,?)";
		$stmt = mysqli_prepare($conn, $sql);
		$error .= mysqli_error($conn);
		mysqli_stmt_bind_param($stmt, 'iiiii', $height, $weight, $gender, $age, $fbid);
		$error .= mysqli_error($conn);
		mysqli_stmt_execute($stmt);
		$error .= mysqli_error($conn);
		mysqli_stmt_close($stmt);		
		$_SESSION['id'] = mysqli_insert_id($conn);	
		$result = true;	
	} else {
		$result = null;	
	}
	echo json_encode(array($result, $error, $height, $weight, $gender, $age, $fbid));
	require_once("disconnect.php");
?>