<?php
	require_once("establish.php");
	$sql = "
SELECT 
	foodimage, 
	foodname, 
	foodgroupname,
	nutname,
	nutvalmeasure,
	nutmeasure
FROM 
	foodgrouptbl as fg
INNER JOIN
	foodtbl as f
ON
	fg.foodgroupid=f.foodgroupid
INNER JOIN
	nutvaltbl as nv
ON
	nv.foodid=food.foodid
INNER JOIN
	nuttbl as n
ON
	n.nutid=nv.nutid;";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_result($stmt, $foodimage, $foodname, $foodgroupname, $nutname, $nutvalmeasure, $nutmeasure);
	mysqli_stmt_execute($stmt);
	while(mysqli_stmt_fetch($stmt)){
		$array[$foodgroupname][$foodname] = $array[$foodgroupname][$foodname] || array(
			"name" => $foodname,
			"image" => $foodimage,
			"foodgroupname" => $foodgroupname
		);
		$array[$foodgroupname][$foodname][$nutname] = $nutvalmeasure . $nutmeasure;
	}
	mysqli_stmt_close($stmt);
	echo json_encode($array);
	require_once("disconnect.php");
?>
