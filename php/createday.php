<?php
	require_once("establish.php");
	$calories = $_POST["calories"];
	$grains = $_POST["grains"];
	$protien = $_POST["protein"];
	$dairy = $_POST["dairy"];
	$fruit = $_POST["fruit"];
	$vegtables = $_POST["vegetables"];
	
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
		$sql("INSERT INTO `daytbl` (`gameid`, `calories`, `grains`, `protein`, `$dairy`, `fruit`, `vegetables`) VALUES (?,?,?,?,?,?,?)");
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'iiiiiii', $gameid, $caloricintake, $grains, $protein, $dairy, $fruit, $vegtables);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	echo json_encode($day === $week*7);

	
	require_once("disconect.php");