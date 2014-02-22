<?php
	require_once("establish.php");
	$caloricintake = $_POST["caloricintake"];
	
	$sql = "SELECT MAX(gameid), totalweek FROM gametbl WHERE userid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($conn, "i", $userid);
	mysqli_stmt_bind_result($gameid, $week)
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	$sql = "SELECT count(dayid) FROM daytbl WHERE gameid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($conn,"i", $gameid);
	mysqli_stmt_bind_result($currentDay);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	if($gameid && ($currentDay < (7*$week)){
		$sql("INSERT INTO `daytbl` (`gameid`, `caloricintake`) VALUES (?,?)");
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'ii', $gameid, $caloricintake);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	
	require_once("disconect.php");