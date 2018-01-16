<?php
  // // Initialize variable for database credentials
  $dbhost = '140.138.77.170';
  $dbuser = 'pennytien';
  $dbpass = 'penny8411';
  $dbname = 'Typhoon';

  
  mysql_connect($dbhost, $dbuser, $dbpass)or die('Error with MySQL connection');
  mysql_select_db($dbname);

  include('Net/SSH2.php');
  $ssh = new Net_SSH2('140.138.77.170');

  if (!$ssh->login('pennytien', 'penny8411')) {
      exit('Login Failed');
  }

  #updata the typhoon list
  $ssh->exec('python3.6 public_html/updata_year.py');

  date_default_timezone_set("Asia/Taipei");
  $thisyear = date("Y");

  $result = array();
  for($year = 1958 ; $year <= $thisyear; $year ++)
  {
    $sql = "select * from typhoon_list where year = ".$year.";";
    $table = mysql_query($sql);
    $num = mysql_num_rows($table);
    $temp = array("year" => (string)$year, "value" => $num);
    array_push($result, $temp);
  }
  echo json_encode($result);

 ?>