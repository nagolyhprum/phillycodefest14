<?php
	require_once("establish.php");
	
	$calories = $_POST["calories"];
	$grains = $_POST["grains"];
	$protein = $_POST["protein"];
	$dairy = $_POST["dairy"];
	$fruit = $_POST["fruit"];
	$vegetables = $_POST["vegetables"];
	$junk = $_POST["junk"];
	
	$sql = "SELECT MAX(gameid), gameweeks FROM gametbl WHERE userid = (?)";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($stmt, "i", $userid);
	mysqli_stmt_bind_result($stmt, $gameid, $weeks);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	$sql = "SELECT count(dayid) FROM daytbl WHERE gameid = (?)";
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt,"i", $gameid);
	mysqli_stmt_bind_result($stmt, $currentDay);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);
	
	
	if($gameid && ($currentDay < (7 * $weeks))){
		$sql = "INSERT INTO `daytbl` (`gameid`, `daycalories`, `daygrain`, `dayprotein`, `daydairy`, `dayfruit`, `dayvegetables`, `dayjunk`) VALUES (?,?,?,?,?,?,?, ?)";
		$stmt = mysqli_prepare($conn,$sql);
		mysqli_stmt_bind_param($stmt, 'iiiiiiii', $gameid, $calories, $grains, $protein, $dairy, $fruit, $vegetables, $junk);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
	}
	
	echo json_encode($currentDay + 1 >= $weeks * 7);

	
	require_once("disconnect.php");