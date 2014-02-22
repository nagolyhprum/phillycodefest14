<?php
	require_once("establish.php");
	$sql = "SELECT symbol FROM foodgrouptbl";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_result($stmt, $symbol);
	mysqli_stmt_execute($stmt);
	while(mysqli_stmt_fetch($stmt)){
		$array[] = $symbol;
	}
	mysqli_stmt_close($stmt);
	echo json_encode($array);
	require_once("disconnect.php");
?>
