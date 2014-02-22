<?php
	require_once("establish.php");
	$sql = "
SELECT 
	foodimage, 
	foodname, 
	foodgroupname,
	foodcalories
FROM 
	foodgrouptbl as fg
INNER JOIN
	foodtbl as f
ON
	fg.foodgroupid=f.foodgroupid;";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_result($stmt, $foodimage, $foodname, $foodgroupname, $foodcalories);
	mysqli_stmt_execute($stmt);
	while(mysqli_stmt_fetch($stmt)){
		$array[$foodgroupname][] = array(
			"name" => $foodname,
			"calories" => $foodcalories,
			"image" => $foodimage
		);
	}
	mysqli_stmt_close($stmt);
	echo json_encode($array);
	require_once("disconnect.php");
?>
