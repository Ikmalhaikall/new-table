<?php  
 //fetch_single.php  
 $connect = mysqli_connect("localhost", "root", "1234", "xplode_username");  
 if(isset($_POST["id"]))  
 {  
      $query = "SELECT * FROM gms_referral_management WHERE id = '".$_POST["id"]."'";  
      $result = mysqli_query($connect, $query);  
      $row = mysqli_fetch_array($result);  
      echo json_encode($row);  
 }  
 ?>