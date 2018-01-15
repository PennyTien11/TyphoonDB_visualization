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

  $result = array();
  for($i = 1 ; $i < 11; $i ++)
  {
    $sql = "select * from typhoon_list where path = ".(string)$i.";";
    $table = mysql_query($sql);
    $num = mysql_num_rows($table);
    $temp = array("type" => (string)$i, "value" => $num);
    array_push($result, $temp);
  }
  $sql = "select * from typhoon_list where path = '---';";
  $table = mysql_query($sql);
  $num = mysql_num_rows($table);
  $temp = array("type" => "None", "value" => $num);
  array_push($result, $temp);

  echo json_encode($result);

 ?>