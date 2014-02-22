<?php
	require_once("establish.php");
	
	//$weeks = $_POST['weeks'];
	$weeks = 4;
	
	$sql = "SELECT MAX(gameid), gameweeks FROM gametbl WHERE userid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $userid);
	mysqli_stmt_bind_result($stmt, $gameid, $gameweeks)
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
		$sql = "INSERT INTO `gametbl` (`userid`, `gameweeks`) VALUES (?)";
		$stmt = mysqli_prepare($conn, $sql);
		mysqli_stmt_bind_param($stmt, 'i', $userid);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
		echo json_encode("1");
	}
	else if {
		echo json_encode($daysPlayed+1);
	}
	
	require_once("disconect.php");
?>