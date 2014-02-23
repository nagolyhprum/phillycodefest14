<?php
	require_once("establish.php");
	$sql = "
SELECT 
	foodimage, 
	foodname, 
	foodgroupname,
	nutname,
	nutmeasure,
	nutvalmeasure
FROM 
	foodtbl as f, 
	foodgrouptbl as fg, 
	nutvaltbl as nv,
	nuttbl as n
WHERE
	fg.foodgroupid=f.foodgroupid
		AND
	f.foodid=nv.foodid
		AND
	nv.nutid=n.nutid;
";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_result($stmt, $foodimage, $foodname, $foodgroupname, $nutname, $nutvalmeasure, $nutmeasure);
	mysqli_stmt_execute($stmt);
	while(mysqli_stmt_fetch($stmt)){
		$array[$foodgroupname][$foodname] = $array[$foodgroupname][$foodname] ?  $array[$foodgroupname][$foodname] : array(
			"name" => $foodname,
			"image" => $foodimage,
			"foodgroupname" => $foodgroupname
		);
		$array[$foodgroupname][$foodname]["nutrition"][$nutname] = "$nutmeasure$nutvalmeasure";
	}
	mysqli_stmt_close($stmt);
	echo json_encode($array);
	require_once("disconnect.php");
?>
