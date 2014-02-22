<?php
	require_once(establish.php)

	$sql("SELECT symbol FROM foodgrouptbl");
	$stmt = mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_results($symbol);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_stmt_fetch($stmt);

	
	require_once(disconect.php)
?>
