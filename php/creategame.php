<?php
	require_once("establish.php");
	
	//$weeks = $_POST['weeks'];
	$weeks = 4;
	
	$sql = "SELECT MAX(gameid), gameweeks FROM gametbl WHERE userid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt, 'i', $userid);
	mysqli_stmt_bind_result($stmt, $gameid, $gameweeks);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	$sql = "SELECT Count(dayid) FROM daytbl WHERE gameid = (?)";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($stmt, 'i', $gameid);
	mysqli_stmt_bind_result($stmt, $daysPlayed);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	echo "$daysPlayed, $gameweeks, $gameid";
		
	if($daysPlayed >= $gameweeks || !$gameid) {
		$sql = "INSERT INTO `gametbl` (`userid`, `gameweeks`) VALUES (?, ?)";
		$stmt = mysqli_prepare($conn, $sql);
		echo mysqli_error($conn);
		mysqli_stmt_bind_param($stmt, 'ii', $userid, $weeks);
		echo mysqli_error($conn);
		mysqli_stmt_execute($stmt);
		echo mysqli_error($conn);
		mysqli_stmt_close($stmt);
		echo mysqli_error($conn);
		echo json_encode(1);
	} else {
		echo json_encode($daysPlayed + 1);
	}
	
	require_once("disconnect.php");
?>