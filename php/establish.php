<?php
	ini_set('display_errors', 1);
	$conn = mysqli_connect("localhost", "root", "", "phillycodefest14");
	session_start();
	$userid = $_SESSION["id"];
	$fbid = 1;
?>