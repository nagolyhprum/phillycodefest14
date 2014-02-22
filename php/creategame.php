<?php
	require_once("establish.php");
	$userid = $_SESSION["id"];
	
	if(isset($userid)){
		$sql("INSERT INTO `gametbl` (`userid`) VALUES (?)");
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'i', $userid);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	
	require_once("disconect.php");
?>