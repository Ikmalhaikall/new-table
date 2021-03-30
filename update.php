<?php

/**
* Author : https://roytuts.com
*/

require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
	// get posted data
	$data = json_decode(file_get_contents("php://input", true));
	
	$sql = "UPDATE gms_referral_management SET fullname = '" . mysqli_real_escape_string($dbConn, $data->fullname) . "', referral_code = '". mysqli_real_escape_string($dbConn, $data->referral_code) ."', prefix = '" . mysqli_real_escape_string($dbConn, $data->prefix) ."' WHERE id = " . $data->id;
	dbQuery($sql);
}

//End of file