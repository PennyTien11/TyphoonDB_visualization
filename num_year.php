<!DOCTYPE html>
<html><head>
    <meta charset = "utf-8"><title>Line Charts</title>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(num_year);
    function num_year(){
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', '發警報颱風數量');

      var options = {
        chart: {
          title: '發警報颱風數量',
          subtitle: "f"
        },
        width: 1200,
        height: 550};

      $.getJSON( "get_data_num_year.php", function( out ) {
          var results = out;
          $.each(results,function(i,item){
            var year = item["year"];
            var value = item["value"];

            data.addRows([[year,value]]);
          });
          var chart = new google.charts.Bar(document.getElementById('out'));
          chart.draw(data, google.charts.Bar.convertOptions(options));
      });
  }
  </script>
</head>
<body>
   <h1>年度國際原油價格</h1>
<!--    <form method = "post" action = "#">
      <p>請選擇縣市:
         <select id = "year">
            <option selected>2017</option>
            <?php
              // for($i=2016; $i>1999; $i--)
              //   echo "<option>".$i."</option>";
            ?>
         </select>
      </p> -->
      <!-- <p><input id = "submit" type="button" value = "Send Query" onclick="progress()"></p> -->
   <!-- </form> -->
<!--    <div id="out"></div>
   <div id="out"></div> -->
   <div id="out"></div>
</body>
</html>
