<?php
	require_once("establish.php");
	
	$sql = "SELECT userid, username, userage, userweight, userheight, usergender FROM usertbl WHERE userfbid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $fbid);
	mysqli_stmt_bind_result($stmt, $userid, $name, $age, $weight, $height, $gender);
	mysqli_stmt_execute($stmt);
	
	//true - account created
	//false - account loaded
	//null - nothing happened
	if(mysqli_stmt_fetch($stmt)){
		$userid = $_SESSION['id'] = $userid; 
		mysqli_stmt_close($stmt);	
		$result = false;	
	} else {	
		$height = $_POST["height"];
		$weight = $_POST["weight"];
		$gender = $_POST["gender"];
		$age = $_POST["age"];
		$name = $_POST["name"];
		if($name && $height && $weight && $gender && $age && $fbid){
			mysqli_stmt_close($stmt);
			$sql = "INSERT INTO `usertbl` (`username`, `userheight`, `userweight`, `usergender`, `userage`, `userfbid`) VALUES (?,?,?,?,?,?)";		
			$stmt = mysqli_prepare($conn, $sql);
			mysqli_stmt_bind_param($stmt, 'siiiii', $name, $height, $weight, $gender, $age, $fbid);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_close($stmt);	
			$userid = $_SESSION['id'] = mysqli_insert_id($conn);
			$result = true;	
		} else {
			$result = null;	
		}
	}
	echo json_encode(array(
		"result" => $result, 
		"height" => $height, 
		"weight" => $weight, 
		"gender" => $gender, 
		"age" => $age, 
		"fbid" => $fbid,
		"id" => $userid,
		"name" => $name
	));
	require_once("disconnect.php");
?>