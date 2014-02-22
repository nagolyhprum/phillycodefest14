<?php
	require_once("establish.php");

	$array = array();
	$sql("SELECT symbol FROM foodgrouptbl");
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_results($symbol);
	mysqli_stmt_execute($stmt);
	while(mysqli_stmt_fetch($stmt)){
		$array[] = $symbol;
	}
	mysqli_stmt_close($stmt);

	json_encode(echo $array);
	
	require_once("disconect.php");
?>
