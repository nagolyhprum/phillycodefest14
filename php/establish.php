<?php
	ini_set('display_errors', 1);
	$conn = mysqli_connect("localhost", "root", "", "phillycodefest14");
	session_start();
	$userid = $_SESSION["id"];
	
	require_once("facebook.php");

	$fbid = 1;
	
	/*
	$facebook = new Facebook(array(
		"appId" => "752209814790277",
		"secret" => "***"
	));
	
	if(!($fbid = $facebook->getUser())) {
		header("Location: " .  $facebook->getLoginUrl());
	}
	*/
?>