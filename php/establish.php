<?php
	$conn = mysqli_connect('localhost', 'petercha_fest', base64_decode("MTEyODMx"), 'petercha_codefesttest');
	session_start();
	$userid = $_SESSION['is'];
?>