<?php 

mysql_connect("140.138.77.170", "pennytien", "penny8411")or die('Error with MySQL connection');
mysql_select_db("Typhoon");

$station_id = $_POST['id'];
$sql = "select * from station_info where id = '".$station_id."';";

$result=mysql_query($sql);
$row = mysql_fetch_array($result);

print($row['latitude']);
print(",");
print($row['longitude']);
$row = mysql_fetch_array($result);


?>