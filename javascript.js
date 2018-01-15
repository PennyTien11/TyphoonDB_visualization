// document.write("<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>");
function timeline(selectYear){
    document.querySelector('#timeLineTitle').innerHTML = selectYear+"年各颱風警報時間";
    var y = selectYear;
    var data = new google.visualization.DataTable();
    data.addColumn({ type: 'string', id: 'Year' });
    data.addColumn({ type: 'string', id: 'Typhoon' });
    data.addColumn({ type: 'date', id: 'Start' });
    data.addColumn({ type: 'date', id: 'End' });
    var options = {
    timeline: { showRowLabels: false },
    avoidOverlappingGridLines: false,
      width: 1100
    };
    var chart = new google.visualization.Timeline(document.getElementById('year_timeline'));

    google.visualization.events.addListener(chart, 'select',  function () {
        var selection = chart.getSelection();
        if (selection.length) {
            var row = selection[0].row;
            rain_data(data.getValue(row, 0),data.getValue(row, 1));
        }
    });

    var dateFormat = new google.visualization.DateFormat({pattern: 'M/d/yy hh:mm:ss'});
    $.getJSON( "get_data_timeline.php", function( out ) {
        var results = out;
        $.each(results,function(i,item){
          name = item["name"];
          var year = item["begin_y"];

          var beginM = Number(item["begin_mon"]);
          var beginD = Number(item["begin_d"]);
          var beginH = Number(item["begin_h"]);
          var beginm = Number(item["begin_min"]);
          var endM = Number(item["end_mon"]);
          var endD = Number(item["end_d"]);
          var endH = Number(item["end_h"]);
          var endm = Number(item["end_min"]);

          if(year==y){
            data.addRows([[year,name, new Date(year, beginM, beginD, beginH, beginm,0), new Date(year, endM, endD, endH, endm,0)]]);}
        });
        data.insertColumn(2, {type: 'string', role: 'tooltip', p: {html: true}});

        for (var i = 0; i < data.getNumberOfRows(); i++) 
        {
          var duration = (data.getValue(i, 4).getTime() - data.getValue(i, 3).getTime()) / 1000;
          var name = data.getValue(i,1);
          var hours = parseInt( duration / 3600 );
 
          var begin_date = data.getValue(i, 3).getMonth()+'/'+data.getValue(i, 3).getDate()+' '+data.getValue(i, 3).getHours()+':'+data.getValue(i, 3).getMinutes();
          var end_date = data.getValue(i, 4).getMonth()+'/'+data.getValue(i, 4).getDate()+' '+data.getValue(i, 4).getHours()+':'+data.getValue(i, 4).getMinutes();
          var tooltip = '<div class="ggl-tooltip"><span>' +name+ '</span></div>' +'<div class="ggl-tooltip"><span>' +begin_date+'-'+ end_date+ '</span></div>' +'<div class="ggl-tooltip"><span>Duration: </span>' +hours + 'h ';

          data.setValue(i, 2, tooltip);
        }
        chart.draw(data, options,{
          tooltip: {
            isHtml: true
          }
        });
    });
}

function num_year(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', '(個)');

    var d = new Date();
    var n = "1958 - " + d.getFullYear();

    var chart =  new google.visualization.ColumnChart(document.getElementById('num_year'));

    google.visualization.events.addListener(chart, 'select',  function () {
        var selection = chart.getSelection();
        if (selection.length) {
            var row = selection[0].row;
            var selectYear = data.getValue(row, 0);
            timeline(selectYear);

        }
    });

    var options = {
      chart: {
        title: '發警報颱風數量',
        subtitle: n
      }};
    $.getJSON( "get_data_num_year.php", function( out ) {
        var results = out;
        $.each(results,function(i,item){
          var year = item["year"];
          var value = item["value"];

          data.addRows([[year,value]]);
        });
        chart.draw(data, options);
    });

}

function path_type() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'type');
          data.addColumn('number', 'number');

          var options = {
            title: 'My Daily Activities'
          };            
          var chart = new google.visualization.PieChart(document.getElementById('path'));

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

function rain_data(year, typhoon_name){

  alert(year+"\n"+typhoon_name);
  console.log(year);
  console.log(typhoon_name);
  var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 23.5956500, lng:120.97388194  },
            mapTypeId: 'terrain'
          });
  var heatmapData = [];
  // var rain_average=document.getElementById("rain_average").value;
        var form_serialized= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=01A171&stno%5B%5D=01A211&stno%5B%5D=01A431&stno%5B%5D=01A441&stno%5B%5D=C0A510&stno%5B%5D=C0A520&stno%5B%5D=C0A530&stno%5B%5D=C0A540&stno%5B%5D=C0A550&stno%5B%5D=C0A560&stno%5B%5D=C0A570&stno%5B%5D=C0A580&stno%5B%5D=C0A590&stno%5B%5D=C0A640&stno%5B%5D=C0A650&stno%5B%5D=C0A660&stno%5B%5D=C0A680&stno%5B%5D=C0A710&stno%5B%5D=C0A760&stno%5B%5D=C0A860&stno%5B%5D=C0A870&stno%5B%5D=C0A880&stno%5B%5D=C0A890&stno%5B%5D=C0A920&stno%5B%5D=C0A930&stno%5B%5D=C0A940&stno%5B%5D=C0A950&stno%5B%5D=C0A970&stno%5B%5D=C0A9D0&stno%5B%5D=C0A9I0&stno%5B%5D=C0A9I1&stno%5B%5D=C0AC40&stno%5B%5D=C0AC60&stno%5B%5D=C0AC90&stno%5B%5D=C0ACA0&stno%5B%5D=C0AD00&stno%5B%5D=C0AD10&stno%5B%5D=C0AD20&stno%5B%5D=C0AD30&stno%5B%5D=C0AD40&stno%5B%5D=C0AD50&stno%5B%5D=C0AG90&stno%5B%5D=C0AH00&stno%5B%5D=C1A630&stno%5B%5D=C1A640&stno%5B%5D=C1A650&stno%5B%5D=C1A660&stno%5B%5D=C1A670&stno%5B%5D=C1A680&stno%5B%5D=C1A700&stno%5B%5D=C1A710&stno%5B%5D=C1A740&stno%5B%5D=C1A9N0&stno%5B%5D=C1AC90&stno%5B%5D=C1ACA0&stno%5B%5D=L1A791&stno%5B%5D=L1A801&stno%5B%5D=L1A811&stno%5B%5D=L1A821&stno%5B%5D=L1A831&stno%5B%5D=L1A841&stno%5B%5D=01A411&stno%5B%5D=01A421&stno%5B%5D=C0A980&stno%5B%5D=C0A990&stno%5B%5D=C0A9A0&stno%5B%5D=C0A9B0&stno%5B%5D=C0A9C0&stno%5B%5D=C0A9E0&stno%5B%5D=C0A9F0&stno%5B%5D=C0A9G0&stno%5B%5D=C0A9H0&stno%5B%5D=C0AC70&stno%5B%5D=C0AC80&stno%5B%5D=C1A690&stno%5B%5D=C1A720&stno%5B%5D=C1A730&stno%5B%5D=C1A970&stno%5B%5D=C1AC50&stno%5B%5D=C1AC80&stno%5B%5D=01B031&stno%5B%5D=01C401&stno%5B%5D=21C071&stno%5B%5D=21C081&stno%5B%5D=21C091&stno%5B%5D=21C141&stno%5B%5D=C0C450&stno%5B%5D=C0C460&stno%5B%5D=C0C480&stno%5B%5D=C0C490&stno%5B%5D=C0C500&stno%5B%5D=C0C520&stno%5B%5D=C0C540&stno%5B%5D=C0C570&stno%5B%5D=C0C590&stno%5B%5D=C0C610&stno%5B%5D=C0C620&stno%5B%5D=C0C630&stno%5B%5D=C0C640&stno%5B%5D=C0C650&stno%5B%5D=C0C660&stno%5B%5D=C1C460&stno%5B%5D=C1C470&stno%5B%5D=C1C480&stno%5B%5D=C1C490&stno%5B%5D=C1C500&stno%5B%5D=C1C510&stno%5B%5D=C1C520&stno%5B%5D=C1C540&stno%5B%5D=C1C570&stno%5B%5D=C1C620&stno%5B%5D=21D151&stno%5B%5D=21D161&stno%5B%5D=21D171&stno%5B%5D=21D351&stno%5B%5D=C0C580&stno%5B%5D=C0D360&stno%5B%5D=C0D370&stno%5B%5D=C0D390&stno%5B%5D=C0D430&stno%5B%5D=C0D470&stno%5B%5D=C0D480&stno%5B%5D=C0D540&stno%5B%5D=C0D550&stno%5B%5D=C0D560&stno%5B%5D=C0D580&stno%5B%5D=C0D590&stno%5B%5D=C0D650&stno%5B%5D=C0E410&stno%5B%5D=C1D370&stno%5B%5D=C1D380&stno%5B%5D=C1D390&stno%5B%5D=C1D400&stno%5B%5D=C1D410&stno%5B%5D=C1D420&stno%5B%5D=C1D430&stno%5B%5D=C1D480&stno%5B%5D=C1D560&stno%5B%5D=C1D630&stno%5B%5D=C1D640&stno%5B%5D=C0D570&stno%5B%5D=C1D440&stno%5B%5D=C0E420&stno%5B%5D=C0E430&stno%5B%5D=C0E440&stno%5B%5D=C0E520&stno%5B%5D=C0E530&stno%5B%5D=C0E531&stno%5B%5D=C0E540&stno%5B%5D=C0E550&stno%5B%5D=C0E580&stno%5B%5D=C0E590&stno%5B%5D=C0E610&stno%5B%5D=C0E730&stno%5B%5D=C0E740&stno%5B%5D=C0E750&stno%5B%5D=C0E760&stno%5B%5D=C0E780&stno%5B%5D=C0E790&stno%5B%5D=C0E810&stno%5B%5D=C0E820&stno%5B%5D=C1E440&stno%5B%5D=C1E450&stno%5B%5D=C1E451&stno%5B%5D=C1E460&stno%5B%5D=C1E461&stno%5B%5D=C1E470&stno%5B%5D=C1E480&stno%5B%5D=C1E490&stno%5B%5D=C1E500&stno%5B%5D=C1E510&stno%5B%5D=C1E511&stno%5B%5D=C1E520&stno%5B%5D=C1E540&stno%5B%5D=C1E550&stno%5B%5D=C1E560&stno%5B%5D=C1E570&stno%5B%5D=C1E590&stno%5B%5D=C1E600&stno%5B%5D=C1E601&stno%5B%5D=C1E670&stno%5B%5D=C1E680&stno%5B%5D=C1E681&stno%5B%5D=C1E690&stno%5B%5D=C1E691&stno%5B%5D=C1E700&stno%5B%5D=C1E701&stno%5B%5D=C1E710&stno%5B%5D=C1E711&stno%5B%5D=C1E720&stno%5B%5D=C1E721&stno%5B%5D=C1E770";
  $.ajax({
    url: 'http://rdc28.cwb.gov.tw/TDB/ntdb/create_rain_datatable',
    type: 'POST',
    headers: {
      "Accept":"text/plain, */*; q=0.01",
      "Accept-Language":"zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With":"XMLHttpRequest"
      },
    async: true,
    dataType: 'json',
    data: {
      'params_serialized': form_serialized
    },
    success: function (response)
    {
      alert("success");
       $.each(response.json_content,function(i,item){
        console.log(i);
        // console.log(item);
        var num = item["num"];
        var typhoon_cht_name = item["typhoon_cht_name"];
        var stno = (item["stno"]);
        var stntype = item["stntype"];
        var accu_end_time = item["accu_end_time"];
        var accu_value = item["accu_value"];
        var lat;
        var lng;
        $.ajax({
            type: "POST",
            url: "get_staion_info.php",
            data: { 
               id:stno 
            },
            async: false,
            datatype: "html", success: function(data){
              var row = data.split(',');
              lat = row[0];
              lng = row[1];
            }
        });
        var latLng = new google.maps.LatLng(lat, lng);
        var magnitude = accu_value;
        console.log(magnitude);
        for(var i=0; i<magnitude; i++){
            heatmapData.push(latLng);
        }
        
      });
      heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            // gradient: ['transparent', '#f00', '#0f0', '#00f'],
            opacity: 0.5, 
            // dissipating: false,
            map: map,
            radius: 25
       });
      // map.data.addGeoJson( geoJson );
      heatmap.setMap(map);
  },
  error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
      console.log(jqXHR.responseText);
      console.log(jqXHR.status);
      console.log(jqXHR.readyState);
      console.log(jqXHR.statusText);
      console.log(textStatus);
      console.log(errorThrown);
      return false;
      }

  });
  //console.log(result);
  // map = new google.maps.Map(document.getElementById('map'), {
  //           zoom: 8,
  //           center: {lat: 23.5956500, lng:120.97388194  },
  //           mapTypeId: 'terrain'
  //         });
  // var heatmapData = [];
  // var form_serialized= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+"2017"+"&typhoon_name="+"2017"+"HAITANG"+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=01A171&stno%5B%5D=01A211&stno%5B%5D=01A431&stno%5B%5D=01A441&stno%5B%5D=C0A510&stno%5B%5D=C0A520&stno%5B%5D=C0A530&stno%5B%5D=C0A540&stno%5B%5D=C0A550";
  //   // var form_serialized="rain_average=precp_accu&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=01A171&stno%5B%5D=01A211&stno%5B%5D=01A431&stno%5B%5D=01A441&stno%5B%5D=C0A510&stno%5B%5D=C0A520&stno%5B%5D=C0A530&stno%5B%5D=C0A540&stno%5B%5D=C0A550";

  // var result = $.ajax({
  //     url: 'http://rdc28.cwb.gov.tw/TDB/ntdb/create_rain_datatable',
  //     type: 'POST',
  //     headers: {
  //     "Accept":"text/plain, */*; q=0.01",
  //     "Accept-Language":"zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
  //     "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
  //     "X-Requested-With":"XMLHttpRequest"
  //     },
  //     async: true,
  //     dataType: 'json',
  //     data: {
  //     'params_serialized': form_serialized
  // },
  //   success: function (response)
  //   {
  //     alert("success");
  //       // var output = document.getElementById( "datatable" );
  //       // console.log(response);
  //       $.each(response.json_content,function(i,item){
  //         console.log(i);
  //         // console.log(item);
  //         var num = item["num"];
  //         var typhoon_cht_name = item["typhoon_cht_name"];
  //         var stno = (item["stno"]);
  //         var stntype = item["stntype"];
  //         var accu_end_time = item["accu_end_time"];
  //         var accu_value = item["accu_value"];
  //         var lat;
  //         var lng;
  //         $.ajax({
  //             type: "POST",
  //             url: "get_staion_info.php",
  //             data: { 
  //                id:stno 
  //             },
  //             async: false,
  //             datatype: "html", success: function(data){
  //               var row = data.split(',');
  //               lat = row[0];
  //               lng = row[1];
  //             }
  //         });
  //         var latLng = new google.maps.LatLng(lat, lng);
  //         var magnitude = accu_value;
  //         console.log(magnitude);
  //         for(var i=0; i<magnitude; i++){
  //             heatmapData.push(latLng);
  //         }
          
  //       });
  //       heatmap = new google.maps.visualization.HeatmapLayer({
  //             data: heatmapData,
  //             // gradient: ['transparent', '#f00', '#0f0', '#00f'],
  //             opacity: 0.5, 
  //             // dissipating: false,
  //             map: map,
  //             radius: 25
  //        });
  //       // map.data.addGeoJson( geoJson );
  //       heatmap.setMap(map);
  //   },
  //   error: function (jqXHR, textStatus, errorThrown) {
  //       alert(jqXHR.responseText);
  //       console.log(jqXHR.responseText);
  //       console.log(jqXHR.status);
  //       console.log(jqXHR.readyState);
  //       console.log(jqXHR.statusText);
  //       console.log(textStatus);
  //       console.log(errorThrown);
  //       return false;
  //       }
  // });
}