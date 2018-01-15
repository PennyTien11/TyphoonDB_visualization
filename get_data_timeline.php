<?php
  // // Initialize variable for database credentials
  $dbhost = '140.138.77.170';
  $dbuser = 'pennytien';
  $dbpass = 'penny8411';
  $dbname = 'Typhoon';

  // //Create database connection
  // $dblink = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

  // //Check connection was successful
  // if ($dblink->connect_errno) {
  //    printf("Failed to connect to database");
  //    exit();
  // }

  // //Fetch 3 rows from actor table
  // $result = $dblink->query("SELECT year FROM Typhoon_list LIMIT 3");

  // //Initialize array variable
  // $dbdata = array();

  // //Fetch into associative array
  // while ( $row = $result->fetch_assoc())  {
  // $dbdata[]=$row;
  // }

  // //Print array in JSON format
  // echo json_encode($dbdata);
  mysql_connect($dbhost, $dbuser, $dbpass)or die('Error with MySQL connection');
  mysql_select_db($dbname);

  $sql = "select * from typhoon_list;";
  $table = mysql_query($sql);

  $result = array();

  while($row = mysql_fetch_array($table))
  {
    $name = $row['english'];
    $begin = $row['begin_time'];
    $end = $row['end_time'];
    $begin_mon=substr($begin,5,-9);
    $begin_d=substr($begin,8,-6);
    $begin_h=substr($begin,11,-3);
    $begin_min=substr($begin,14,2);
    $end_mon=substr($end,5,-9);
    $end_d=substr($end,8,-6);
    $end_h=substr($end,11,-3);
    $end_min=substr($end,14,2);

    $temp = array("name" => $name, "begin_y" => $row['year'], "begin_mon"=>$begin_mon, "begin_d"=>$begin_d, "begin_h"=>$begin_h, "begin_min"=>$begin_min, "end_mon"=>$end_mon, "end_d"=>$end_d, "end_h"=>$end_h, "end_min"=>$end_min);
    array_push($result, $temp);
  }

  
// print_r($result);
  echo json_encode($result);












 ?>