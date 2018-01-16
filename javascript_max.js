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
            rain_data(data.getValue(row, 0),data.getValue(row, 1))
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
	typhoon_path(year,typhoon_name);
  console.log(year);
  console.log(typhoon_name);
  var rain_average=document.getElementById("rain_average").value;
  var heatmapData = [];
  var form_serialized=		
	"rain_average="+rain_average+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"++++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=01A171&stno%5B%5D=01A211&stno%5B%5D=01A431&stno%5B%5D=01A441&stno%5B%5D=C0A510&stno%5B%5D=C0A520&stno%5B%5D=C0A530&stno%5B%5D=C0A540&stno%5B%5D=C0A550&stno%5B%5D=C0A560&stno%5B%5D=C0A570&stno%5B%5D=C0A580&stno%5B%5D=C0A590&stno%5B%5D=C0A640&stno%5B%5D=C0A650&stno%5B%5D=C0A660&stno%5B%5D=C0A680&stno%5B%5D=C0A710&stno%5B%5D=C0A760&stno%5B%5D=C0A860&stno%5B%5D=C0A870&stno%5B%5D=C0A880&stno%5B%5D=C0A890&stno%5B%5D=C0A920&stno%5B%5D=C0A930&stno%5B%5D=C0A940&stno%5B%5D=C0A950"

	var result = $.ajax({
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
			/*
			var output = document.getElementById( "datatable" );
			$.each(response.json_content,function(i,item){
			var row = document.createElement( "tr" );

			var num = document.createTextNode(item["num"]);
			var typhoon_cht_name = document.createTextNode(item["typhoon_cht_name"]);
			var stno = document.createTextNode(item["stno"]);
			var stntype = document.createTextNode(item["stntype"]);
			var accu_end_time = document.createTextNode(item["accu_end_time"]);
			var accu_value = document.createTextNode(item["accu_value"]);
			
			var c1 = document.createElement( "td");
			c1.appendChild(num);
			row.appendChild( c1);
			var c2 = document.createElement( "td");
			c2.appendChild(typhoon_cht_name);
			row.appendChild( c2);
			var c3 = document.createElement( "td");
			c3.appendChild(stno);
			row.appendChild( c3);
			var c4 = document.createElement( "td");
			c4.appendChild(stntype);
			row.appendChild( c4);
			var c5 = document.createElement( "td");
			c5.appendChild(accu_end_time);
			row.appendChild( c5);
			var c6 = document.createElement( "td");
			c6.appendChild(accu_value);
			row.appendChild( c6);
			output.appendChild( row );
			});*/
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
		return true;

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
}

var map;
var obj=new Object;
function initMap() {
	
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 8,
	  center: {lat: 23.7, lng: 121}
	});

	// Load GeoJSON.
	map_json();
	console.log(JSON.stringify(obj));
	var geo=JSON.parse(JSON.stringify(obj));
	map.data.addGeoJson(geo);
	//map.data.loadGeoJson('map.json');

	// Color each letter gray. Change the color when the isColorful property
	// is set to true.
	map.data.setStyle(function(feature) {
	  var color = 'gray';
	  if (feature.getProperty('isColorful')) {
		color = feature.getProperty('color');
	  }
	  return /** @type {google.maps.Data.StyleOptions} */({
		fillColor: color,
		strokeColor: color,
		strokeWeight: 2
	  });
	});

	// When the user clicks, set 'isColorful', changing the color of the letters.
	map.data.addListener('click', function(event) {
	  event.feature.setProperty('isColorful', true);
	});

	// When the user hovers, tempt them to click by outlining the letters.
	// Call revertStyle() to remove all overrides. This will use the style rules
	// defined in the function passed to setStyle()
	map.data.addListener('mouseover', function(event) {
	  map.data.revertStyle();
	  map.data.overrideStyle(event.feature, {strokeWeight: 8});
	});

	map.data.addListener('mouseout', function(event) {
	  map.data.revertStyle();
	});
}

function map_json(){

  $.ajax({
  type: "POST",
  url: "data.php",
  async: false,
  datatype: "html", 
  success: function(data){
	  alert("Ya");
		// console.log(data);
	  var rows = data.split('|');
	  
	  
	  var arr = new Array();			  
					 
	  for(var i = 1; i < rows.length-1; i++){ 		  
		var row = rows[i].split(',');

		var id = row[0];
		console.log(id);
		var city = row[1];
		var name = row[2];
		var lat = row[3];
		var lng = row[4];
		var type = row[5];    
		
		//structure of geojson
		var obj_features = new Object;
		var obj_properties=new Object;
		var obj_geometry=new Object;
		var arr_coordinates=new Array();  
		arr_coordinates[i]=new Array();
		arr_coordinates[i][0]=new Array();
		arr_coordinates[i][0][0]=new Array();
		arr_coordinates[i][0][1]=new Array();
		arr_coordinates[i][0][2]=new Array();
		arr_coordinates[i][0][3]=new Array();
		arr_coordinates[i][0][4]=new Array();
		arr_coordinates[i][0][5]=new Array();

		//Geographic block coordinates
		var r=0.02;
		arr_coordinates[i][0][0][0]=parseFloat(lng);
		arr_coordinates[i][0][0][1]=parseFloat(lat)+r;	
		
		arr_coordinates[i][0][1][0]=parseFloat(lng)-(r*Math.cos(18*2*Math.PI/360));
		arr_coordinates[i][0][1][1]=parseFloat(lat)+(r*Math.sin(18*2*Math.PI/360));
		
		arr_coordinates[i][0][2][0]=parseFloat(lng)-(r*Math.cos(54*2*Math.PI/360));
		arr_coordinates[i][0][2][1]=parseFloat(lat)-(r*Math.sin(54*2*Math.PI/360));
		
		arr_coordinates[i][0][3][0]=parseFloat(lng)+(r*Math.cos(54*2*Math.PI/360));
		arr_coordinates[i][0][3][1]=parseFloat(lat)-(r*Math.sin(54*2*Math.PI/360));
		
		arr_coordinates[i][0][4][0]=parseFloat(lng)+(r*Math.cos(18*2*Math.PI/360));
		arr_coordinates[i][0][4][1]=parseFloat(lat)+(r*Math.sin(18*2*Math.PI/360));
		
		arr_coordinates[i][0][5][0]=parseFloat(lng);
		arr_coordinates[i][0][5][1]=parseFloat(lat)+r;
		
		//Geographic block information
		obj_geometry.type="Polygon"
		obj_geometry.coordinates=arr_coordinates[i];
		
		obj_features.type = "Feature";
		obj_features.properties = obj_properties;
		obj_features.geometry = obj_geometry;
		obj_features.id=id.toString();
		arr.push(obj_features);
	}
	obj.type="FeatureCollection";
	obj.features=arr;
	//console.log(JSON.stringify(obj));
  }
});
}

function typhoon_path(year,typhoon_eName){
	
	$.ajax({
		type: 'GET',
		data: {
			"warning_status":"all",
			"lon_start":105,
			"lon_end":180,
			"lat_start":0,
			"lat_end":55,
			"year[]":year
		},
		url: 'http://rdc28.cwb.gov.tw/TDB/ctrl_advanced_search/typh_path',
		dataType: 'json',
		async: true,
		success: function (json) {
			if (typeof (json.error_message) !== "undefined") {
				alert(json.error_message);
				return;
			}
			for (var i = 0; i < json.length; i++) {
				if(json[i].eName==typhoon_eName){
					json.splice(0,i);	
					json.splice(1,json.length-1);	
					break;
				}	
			}
			drawTyphoonTrack(json);
		}
	});
 }
  
  

 function drawTyphoonTrack(json) {
  var gmap_obj = new googleMap('map_path');
  var mapTyPaths = null;

	var tyPathsPoints = [];
	for (var i = 0; i < json.length; i++) {
		var points = [];
		for (var j = 0; j < json[i].path.length; j++) {
			points.push([json[i].path[j].lat, json[i].path[j].lon]);
		}
		tyPathsPoints.push(points);
	}

	var pathOption = {
		direction: true,
		randomColor: true
	};	
	

	mapTyPaths = gmap_obj.drawing.pointLines(tyPathsPoints, pathOption, {
		points: function (point) {
			var thisTyphoon = json[point.lineIndex];
			var thisPoint = thisTyphoon.path[point.index];

			point.num = thisTyphoon.num;

			var hour = parseInt(thisPoint.datetime.substr(11, 2), 10);
			if (hour % 6 !== 0) {
				point.hide();
				return;
			}

			if (point.index === thisTyphoon.path.length - 1) {
				line_icon = 'http://rdc28.cwb.gov.tw/TDB/css/images/advance_search/taumi.png';
			} else {
				if (thisPoint.intensity < 10) {
					line_icon = 'http://rdc28.cwb.gov.tw/TDB/css/images/advance_search/light.png';
				} else if (thisPoint.intensity >= 10 && thisPoint.intensity <= 20) {
					line_icon = 'http://rdc28.cwb.gov.tw/TDB/css/images/advance_search/middle.png';
				} else {
					line_icon = 'http://rdc28.cwb.gov.tw/TDB/css/images/advance_search/strong.png';
				}
			}

			point.setOptions({
				title: 'name : ' + thisTyphoon.cName + ' (' + thisTyphoon.eName + ')' + "\n" +
						'instensity : ' + thisPoint.intensity + "\n" +
						'datetime : ' + thisPoint.datetime,
				icon: line_icon
			});
		},
		pointLines: function (pointsLine) {
			var thisTyphoon = json[pointsLine.index];

			pointsLine.line.num = thisTyphoon.num;

			$('.' + thisTyphoon.num).find('span').css({
				'background-color': pointsLine.line.strokeColor
			});
		}
	});

	mapTyPaths.bind('mouseover', function (gObj) {
		$('li.' + gObj.num, 'div#searchResult').addClass('highlight');
	});

	mapTyPaths.bind('mouseout', function (gObj) {
		$('li.' + gObj.num, 'div#searchResult').removeClass('highlight');
	});
}

