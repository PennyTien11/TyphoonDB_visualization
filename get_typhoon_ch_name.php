<?php
  // // Initialize variable for database credentials
  header("Content-Type:text/html; charset=utf-8");
  mb_internal_encoding('UTF-8');
  mb_http_output('UTF-8');
  $eg_name = $_POST['eg_name'];
  $dbhost = '140.138.77.170';
  $dbuser = 'pennytien';
  $dbpass = 'penny8411';
  $dbname = 'Typhoon';

  
  $db = mysql_connect($dbhost, $dbuser, $dbpass)or die('Error with MySQL connection');
  // $db->exec("set names utf8");
  mysql_select_db($dbname);
  mysql_query ("set names utf8" );

  $result = array();

  $sql = "select chinese from typhoon_list where english ='".$eg_name."';";

  // print($sql);
  $result=mysql_query($sql);
  $row = mysql_fetch_array($result);

  echo $row[0];
  
  // echo 

 ?>