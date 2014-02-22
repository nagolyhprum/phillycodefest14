<?php
	require_once("establish.php");
	
	$sql = "SELECT MAX(gameid), totalweek FROM gametbl WHERE userid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $userid);
	mysqli_stmt_bind_result($stmt, $gameid, $totalweek)
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch_result($stmt);
	mysqli_stmt_close($stmt);
	
	$sql = "SELECT Count(gameid) FROM gametbl WHERE gameid = (?)"
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $gameid);
	mysqli_stmt_bind_result($stmt, $daysPlayed)
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch_result($stmt);
	mysqli_stmt_close($stmt);
	
	
	
	if($daysPlayed >= $totalweek){
		$sql = "INSERT INTO `gametbl` (`userid`) VALUES (?)";
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'i', $userid);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	else if {
		echo json_encode($totalweek);
	}
	
	require_once("disconect.php");
?>