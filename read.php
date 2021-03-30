<?php

/**
* Author : https://roytuts.com
*/

require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
	$sql = "SELECT * FROM gms_referral_management WHERE id = " . mysqli_real_escape_string($dbConn, $_GET['id']) . " LIMIT 1";
	$result = dbQuery($sql);
	
	$row = dbFetchAssoc($result);
	
	echo json_encode($row);
} else {
	$sql = "SELECT * FROM gms_referral_management";
	
	$results = dbQuery($sql);
	
	$rows = array();
	
	while($row = dbFetchAssoc($results)) {
		$rows[] = $row;
	}
	
	echo json_encode($rows);
}

//End of file