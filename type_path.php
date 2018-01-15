<!DOCTYPE html>
<html><head>
    <meta charset = "utf-8"><title>Line Charts</title>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script type="text/javascript">
        google.charts.load("current", {packages:["corechart"]});
        function progress() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'type');
          data.addColumn('number', 'number');

          var options = {
            title: 'My Daily Activities',
            width: 1200,
            height: 550
          };            
          var chart = new google.visualization.PieChart(document.getElementById('out'));
          console.log("~");
          $.getJSON( "get_data_type_path.php", function( out ) {
              var results = out;
              $.each(results,function(i,item){
                  var type = item["type"];
                  var value = item["value"];
                  data.addRows([[type,value]]);
              });
              chart.draw(data, options);
          });
          

        }
  </script>
</head>
<body>
   <h1>警報颱風路線</h1>
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
      <p><input id = "submit" type="button" value = "Send Query" onclick="progress()"></p>
   <!-- </form> -->
   <div id="out"></div>
</body>
</html>
