<?php

/**
* Author : https://roytuts.com
*/

require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// get posted data
	$data = json_decode(file_get_contents("php://input", true));
	
	$sql = "INSERT INTO gms_referral_management(fullname,referral_code,prefix) VALUES('" . mysqli_real_escape_string($dbConn, $data->fullname) . "','" . mysqli_real_escape_string($dbConn, $data->referral_code) . "','" . mysqli_real_escape_string($dbConn, $data->prefix) . "')";
	dbQuery($sql);

	


}

	
