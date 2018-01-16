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
          var year=data.getValue(row, 0);
          var typhoon_name=data.getValue(row, 1);

          var typhoon_chinese_N = get_C_name(typhoon_name);

          document.querySelector('#rain_title').innerHTML = typhoon_chinese_N+" "+typhoon_name+"累積雨量圖與路徑圖";
          typhoon_path(year,typhoon_name);

          var north= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=01A171&stno%5B%5D=01A211&stno%5B%5D=01A431&stno%5B%5D=01A441&stno%5B%5D=C0A510&stno%5B%5D=C0A520&stno%5B%5D=C0A530&stno%5B%5D=C0A540&stno%5B%5D=C0A550&stno%5B%5D=C0A560&stno%5B%5D=C0A570&stno%5B%5D=C0A580&stno%5B%5D=C0A590&stno%5B%5D=C0A640&stno%5B%5D=C0A650&stno%5B%5D=C0A660&stno%5B%5D=C0A680&stno%5B%5D=C0A710&stno%5B%5D=C0A760&stno%5B%5D=C0A860&stno%5B%5D=C0A870&stno%5B%5D=C0A880&stno%5B%5D=C0A890&stno%5B%5D=C0A920&stno%5B%5D=C0A930&stno%5B%5D=C0A940&stno%5B%5D=C0A950&stno%5B%5D=C0A970&stno%5B%5D=C0A9D0&stno%5B%5D=C0A9I0&stno%5B%5D=C0A9I1&stno%5B%5D=C0AC40&stno%5B%5D=C0AC60&stno%5B%5D=C0AC90&stno%5B%5D=C0ACA0&stno%5B%5D=C0AD00&stno%5B%5D=C0AD10&stno%5B%5D=C0AD20&stno%5B%5D=C0AD30&stno%5B%5D=C0AD40&stno%5B%5D=C0AD50&stno%5B%5D=C0AG90&stno%5B%5D=C0AH00&stno%5B%5D=C1A630&stno%5B%5D=C1A640&stno%5B%5D=C1A650&stno%5B%5D=C1A660&stno%5B%5D=C1A670&stno%5B%5D=C1A680&stno%5B%5D=C1A700&stno%5B%5D=C1A710&stno%5B%5D=C1A740&stno%5B%5D=C1A9N0&stno%5B%5D=C1AC90&stno%5B%5D=C1ACA0&stno%5B%5D=L1A791&stno%5B%5D=L1A801&stno%5B%5D=L1A811&stno%5B%5D=L1A821&stno%5B%5D=L1A831&stno%5B%5D=L1A841&stno%5B%5D=01A411&stno%5B%5D=01A421&stno%5B%5D=C0A980&stno%5B%5D=C0A990&stno%5B%5D=C0A9A0&stno%5B%5D=C0A9B0&stno%5B%5D=C0A9C0&stno%5B%5D=C0A9E0&stno%5B%5D=C0A9F0&stno%5B%5D=C0A9G0&stno%5B%5D=C0A9H0&stno%5B%5D=C0AC70&stno%5B%5D=C0AC80&stno%5B%5D=C1A690&stno%5B%5D=C1A720&stno%5B%5D=C1A730&stno%5B%5D=C1A970&stno%5B%5D=C1AC50&stno%5B%5D=C1AC80&stno%5B%5D=01B031&stno%5B%5D=01C401&stno%5B%5D=21C071&stno%5B%5D=21C081&stno%5B%5D=21C091&stno%5B%5D=21C141&stno%5B%5D=C0C450&stno%5B%5D=C0C460&stno%5B%5D=C0C480&stno%5B%5D=C0C490&stno%5B%5D=C0C500&stno%5B%5D=C0C520&stno%5B%5D=C0C540&stno%5B%5D=C0C570&stno%5B%5D=C0C590&stno%5B%5D=C0C610&stno%5B%5D=C0C620&stno%5B%5D=C0C630&stno%5B%5D=C0C640&stno%5B%5D=C0C650&stno%5B%5D=C0C660&stno%5B%5D=C1C460&stno%5B%5D=C1C470&stno%5B%5D=C1C480&stno%5B%5D=C1C490&stno%5B%5D=C1C500&stno%5B%5D=C1C510&stno%5B%5D=C1C520&stno%5B%5D=C1C540&stno%5B%5D=C1C570&stno%5B%5D=C1C620&stno%5B%5D=21D151&stno%5B%5D=21D161&stno%5B%5D=21D171&stno%5B%5D=21D351&stno%5B%5D=C0C580&stno%5B%5D=C0D360&stno%5B%5D=C0D370&stno%5B%5D=C0D390&stno%5B%5D=C0D430&stno%5B%5D=C0D470&stno%5B%5D=C0D480&stno%5B%5D=C0D540&stno%5B%5D=C0D550&stno%5B%5D=C0D560&stno%5B%5D=C0D580&stno%5B%5D=C0D590&stno%5B%5D=C0D650&stno%5B%5D=C0E410&stno%5B%5D=C1D370&stno%5B%5D=C1D380&stno%5B%5D=C1D390&stno%5B%5D=C1D400&stno%5B%5D=C1D410&stno%5B%5D=C1D420&stno%5B%5D=C1D430&stno%5B%5D=C1D480&stno%5B%5D=C1D560&stno%5B%5D=C1D630&stno%5B%5D=C1D640&stno%5B%5D=C0D570&stno%5B%5D=C1D440&stno%5B%5D=C0E420&stno%5B%5D=C0E430&stno%5B%5D=C0E440&stno%5B%5D=C0E520&stno%5B%5D=C0E530&stno%5B%5D=C0E531&stno%5B%5D=C0E540&stno%5B%5D=C0E550&stno%5B%5D=C0E580&stno%5B%5D=C0E590&stno%5B%5D=C0E610&stno%5B%5D=C0E730&stno%5B%5D=C0E740&stno%5B%5D=C0E750&stno%5B%5D=C0E760&stno%5B%5D=C0E780&stno%5B%5D=C0E790&stno%5B%5D=C0E810&stno%5B%5D=C0E820&stno%5B%5D=C1E440&stno%5B%5D=C1E450&stno%5B%5D=C1E451&stno%5B%5D=C1E460&stno%5B%5D=C1E461&stno%5B%5D=C1E470&stno%5B%5D=C1E480&stno%5B%5D=C1E490&stno%5B%5D=C1E500&stno%5B%5D=C1E510&stno%5B%5D=C1E511&stno%5B%5D=C1E520&stno%5B%5D=C1E540&stno%5B%5D=C1E550&stno%5B%5D=C1E560&stno%5B%5D=C1E570&stno%5B%5D=C1E590&stno%5B%5D=C1E600&stno%5B%5D=C1E601&stno%5B%5D=C1E670&stno%5B%5D=C1E680&stno%5B%5D=C1E681&stno%5B%5D=C1E690&stno%5B%5D=C1E691&stno%5B%5D=C1E700&stno%5B%5D=C1E701&stno%5B%5D=C1E710&stno%5B%5D=C1E711&stno%5B%5D=C1E720&stno%5B%5D=C1E721&stno%5B%5D=C1E770";
          rain_data('north',north);

          var west= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E4%B8%AD%E5%8D%80&stno%5B%5D=C0F000&stno%5B%5D=C0F850&stno%5B%5D=C0F860&stno%5B%5D=C0F861&stno%5B%5D=C0F900&stno%5B%5D=C0F901&stno%5B%5D=C0F920&stno%5B%5D=C0F930&stno%5B%5D=C0F970&stno%5B%5D=C0F990&stno%5B%5D=C0F991&stno%5B%5D=C0F9A0&stno%5B%5D=C0F9I0&stno%5B%5D=C0F9K0&stno%5B%5D=C0F9L0&stno%5B%5D=C0F9M0&stno%5B%5D=C0F9N0&stno%5B%5D=C0F9O0&stno%5B%5D=C0F9P0&stno%5B%5D=C0F9Q0&stno%5B%5D=C0F9R0&stno%5B%5D=C0F9S0&stno%5B%5D=C0F9T0&stno%5B%5D=C0F9U0&stno%5B%5D=C0F9V0&stno%5B%5D=C1F000&stno%5B%5D=C1F850&stno%5B%5D=C1F870&stno%5B%5D=C1F871&stno%5B%5D=C1F880&stno%5B%5D=C1F890&stno%5B%5D=C1F891&stno%5B%5D=C1F910&stno%5B%5D=C1F911&stno%5B%5D=C1F920&stno%5B%5D=C1F930&stno%5B%5D=C1F940&stno%5B%5D=C1F941&stno%5B%5D=C1F960&stno%5B%5D=C1F970&stno%5B%5D=C1F980&stno%5B%5D=C1F990&stno%5B%5D=C1F9A0&stno%5B%5D=C1F9B0&stno%5B%5D=C1F9B1&stno%5B%5D=C1F9C0&stno%5B%5D=C1F9C1&stno%5B%5D=C1F9D0&stno%5B%5D=C1F9D1&stno%5B%5D=C1F9E0&stno%5B%5D=C1F9E1&stno%5B%5D=C1F9F0&stno%5B%5D=C1F9F1&stno%5B%5D=C1F9G0&stno%5B%5D=C1F9G1&stno%5B%5D=C1F9H0&stno%5B%5D=C1F9H1&stno%5B%5D=C1F9I0&stno%5B%5D=C1F9J0&stno%5B%5D=C1F9J1&stno%5B%5D=C1F9W0&stno%5B%5D=C1I180&stno%5B%5D=C0F950&stno%5B%5D=C0H950&stno%5B%5D=C0H960&stno%5B%5D=C0H980&stno%5B%5D=C0H990&stno%5B%5D=C0H9A0&stno%5B%5D=C0H9C0&stno%5B%5D=C0H9C1&stno%5B%5D=C0I010&stno%5B%5D=C0I090&stno%5B%5D=C0I091&stno%5B%5D=C0I110&stno%5B%5D=C0I111&stno%5B%5D=C1H000&stno%5B%5D=C1H850&stno%5B%5D=C1H860&stno%5B%5D=C1H870&stno%5B%5D=C1H880&stno%5B%5D=C1H890&stno%5B%5D=C1H900&stno%5B%5D=C1H910&stno%5B%5D=C1H920&stno%5B%5D=C1H930&stno%5B%5D=C1H940&stno%5B%5D=C1H941&stno%5B%5D=C1H950&stno%5B%5D=C1H960&stno%5B%5D=C1H970&stno%5B%5D=C1H971&stno%5B%5D=C1H9B0&stno%5B%5D=C1H9B1&stno%5B%5D=C1I020&stno%5B%5D=C1I030&stno%5B%5D=C1I040&stno%5B%5D=C1I050&stno%5B%5D=C1I060&stno%5B%5D=C1I070&stno%5B%5D=C1I080&stno%5B%5D=C1I100&stno%5B%5D=C1I101&stno%5B%5D=C1I120&stno%5B%5D=C1I121&stno%5B%5D=C1I130&stno%5B%5D=C1I131&stno%5B%5D=C1I140&stno%5B%5D=C1I150&stno%5B%5D=C1I160&stno%5B%5D=C1I170&stno%5B%5D=C1I190&stno%5B%5D=C1I200&stno%5B%5D=C1I201&stno%5B%5D=C1I210&stno%5B%5D=C1I211&stno%5B%5D=C1I220&stno%5B%5D=C1I230&stno%5B%5D=C1I240&stno%5B%5D=C1I250&stno%5B%5D=C1I260&stno%5B%5D=C1I270&stno%5B%5D=C1I280&stno%5B%5D=C1I290&stno%5B%5D=C1I300&stno%5B%5D=C1I310&stno%5B%5D=C1I320&stno%5B%5D=C1I330&stno%5B%5D=C1I340&stno%5B%5D=C1I350&stno%5B%5D=C0G620&stno%5B%5D=C0G640&stno%5B%5D=C0G641&stno%5B%5D=C0G650&stno%5B%5D=C0G651&stno%5B%5D=C0G660&stno%5B%5D=C0G710&stno%5B%5D=C0G770&stno%5B%5D=C0G780&stno%5B%5D=C0G790&stno%5B%5D=C0G800&stno%5B%5D=C0G810&stno%5B%5D=C0G820&stno%5B%5D=C0G830&stno%5B%5D=C0G840&stno%5B%5D=C0G850&stno%5B%5D=C0G860&stno%5B%5D=C0G870&stno%5B%5D=C0G880&stno%5B%5D=C0G890&stno%5B%5D=C1G620&stno%5B%5D=C1G630&stno%5B%5D=C1G631&stno%5B%5D=C1G660&stno%5B%5D=C1G670&stno%5B%5D=C1G680&stno%5B%5D=C1G690&stno%5B%5D=C1G700&stno%5B%5D=C0K240&stno%5B%5D=C0K241&stno%5B%5D=C0K280&stno%5B%5D=C0K290&stno%5B%5D=C0K291&stno%5B%5D=C0K300&stno%5B%5D=C0K330&stno%5B%5D=C1K230&stno%5B%5D=C1K250&stno%5B%5D=C1K260&stno%5B%5D=C1K270&stno%5B%5D=C1K310&stno%5B%5D=C1K320&stno%5B%5D=C1K340&stno%5B%5D=C1K350&stno%5B%5D=C1K380&stno%5B%5D=C0M410&stno%5B%5D=C0M530&stno%5B%5D=C1M390&stno%5B%5D=C1M400&stno%5B%5D=C1M440&stno%5B%5D=C1M450&stno%5B%5D=C1M460&stno%5B%5D=C1M470&stno%5B%5D=C1M480&stno%5B%5D=C1M490&stno%5B%5D=C1M500&stno%5B%5D=C1M510&stno%5B%5D=C1M520&stno%5B%5D=C1M540&stno%5B%5D=C1M550&stno%5B%5D=C1M551&stno%5B%5D=C1M560&stno%5B%5D=C1M570&stno%5B%5D=C1M600&stno%5B%5D=C1M610&stno%5B%5D=C1M620&stno%5B%5D=C1M630&stno%5B%5D=H1M231&stno%5B%5D=H1M241&stno%5B%5D=H1M251&stno%5B%5D=H1M421&stno%5B%5D=H1M431";
          rain_data('west',west);

          var south= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E5%8D%97%E5%8D%80&stno%5B%5D=C0O810&stno%5B%5D=C0O811&stno%5B%5D=C0O830&stno%5B%5D=C0O860&stno%5B%5D=C0O890&stno%5B%5D=C0O900&stno%5B%5D=C0O910&stno%5B%5D=C0O930&stno%5B%5D=C0O931&stno%5B%5D=C0O950&stno%5B%5D=C0O960&stno%5B%5D=C0O970&stno%5B%5D=C0O980&stno%5B%5D=C0X020&stno%5B%5D=C0X080&stno%5B%5D=C0X100&stno%5B%5D=C0X110&stno%5B%5D=C0X120&stno%5B%5D=C0X130&stno%5B%5D=C0X140&stno%5B%5D=C0X150&stno%5B%5D=C0X160&stno%5B%5D=C0X170&stno%5B%5D=C0X180&stno%5B%5D=C0X190&stno%5B%5D=C0X200&stno%5B%5D=C1N000&stno%5B%5D=C1N001&stno%5B%5D=C1O820&stno%5B%5D=C1O830&stno%5B%5D=C1O840&stno%5B%5D=C1O850&stno%5B%5D=C1O860&stno%5B%5D=C1O870&stno%5B%5D=C1O880&stno%5B%5D=C1O920&stno%5B%5D=C1O921&stno%5B%5D=C1O950&stno%5B%5D=C1O960&stno%5B%5D=C1O970&stno%5B%5D=C1O980&stno%5B%5D=C1O990&stno%5B%5D=C1X010&stno%5B%5D=C1X030&stno%5B%5D=C1X040&stno%5B%5D=C1X050&stno%5B%5D=C1X060&stno%5B%5D=C1X070&stno%5B%5D=C1X090&stno%5B%5D=H1O941&stno%5B%5D=C0R100&stno%5B%5D=C0R130&stno%5B%5D=C0R140&stno%5B%5D=C0R150&stno%5B%5D=C0R220&stno%5B%5D=C0R270&stno%5B%5D=C0R280&stno%5B%5D=C0R340&stno%5B%5D=C0R350&stno%5B%5D=C0R360&stno%5B%5D=C0R370&stno%5B%5D=C0R380&stno%5B%5D=C0R400&stno%5B%5D=C0R420&stno%5B%5D=C0R430&stno%5B%5D=C0R470&stno%5B%5D=C0R480&stno%5B%5D=C0R490&stno%5B%5D=C0R500&stno%5B%5D=C0R510&stno%5B%5D=C0R520&stno%5B%5D=C0R530&stno%5B%5D=C0R540&stno%5B%5D=C0R550&stno%5B%5D=C0R560&stno%5B%5D=C0R580&stno%5B%5D=C0R590&stno%5B%5D=C1R090&stno%5B%5D=C1R110&stno%5B%5D=C1R120&stno%5B%5D=C1R130&stno%5B%5D=C1R140&stno%5B%5D=C1R160&stno%5B%5D=C1R170&stno%5B%5D=C1R190&stno%5B%5D=C1R200&stno%5B%5D=C1R201&stno%5B%5D=C1R210&stno%5B%5D=C1R230&stno%5B%5D=C1R240&stno%5B%5D=C1R250&stno%5B%5D=C1R260&stno%5B%5D=C1R290&stno%5B%5D=C1R300&stno%5B%5D=C1R310&stno%5B%5D=C1R320&stno%5B%5D=C1R330&stno%5B%5D=C1R340&stno%5B%5D=C1R440&stno%5B%5D=C0V150&stno%5B%5D=C0V210&stno%5B%5D=C0V250&stno%5B%5D=C0V260&stno%5B%5D=C0V310&stno%5B%5D=C0V370&stno%5B%5D=C0V490&stno%5B%5D=C0V500&stno%5B%5D=C0V530&stno%5B%5D=C0V720&stno%5B%5D=C0V730&stno%5B%5D=C0V740&stno%5B%5D=C1P9A0&stno%5B%5D=C1R180&stno%5B%5D=C1V160&stno%5B%5D=C1V170&stno%5B%5D=C1V180&stno%5B%5D=C1V190&stno%5B%5D=C1V200&stno%5B%5D=C1V210&stno%5B%5D=C1V220&stno%5B%5D=C1V230&stno%5B%5D=C1V231&stno%5B%5D=C1V240&stno%5B%5D=C1V260&stno%5B%5D=C1V270&stno%5B%5D=C1V280&stno%5B%5D=C1V290&stno%5B%5D=C1V300&stno%5B%5D=C1V320&stno%5B%5D=C1V330&stno%5B%5D=C1V340&stno%5B%5D=C1V350&stno%5B%5D=C1V360&stno%5B%5D=C1V380&stno%5B%5D=C1V390&stno%5B%5D=C1V400&stno%5B%5D=C1V410&stno%5B%5D=C1V420&stno%5B%5D=C1V430&stno%5B%5D=C1V440&stno%5B%5D=C1V450&stno%5B%5D=C1V451&stno%5B%5D=C1V460&stno%5B%5D=C1V530&stno%5B%5D=C1V570&stno%5B%5D=C1V580&stno%5B%5D=C1V600&stno%5B%5D=H1P971";
          rain_data('south',south);

          var east= "rain_average="+"precp_accu_warning"+"&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year="+year+"&typhoon_name="+year+typhoon_name+"+++++++++&station_selection_type=text&measure_type=AUTOPRECP&location_group=%E6%9D%B1%E5%8D%80&stno%5B%5D=21U111&stno%5B%5D=C0U520&stno%5B%5D=C0U600&stno%5B%5D=C0U620&stno%5B%5D=C0U640&stno%5B%5D=C0U650&stno%5B%5D=C0U680&stno%5B%5D=C0U710&stno%5B%5D=C0U730&stno%5B%5D=C0U750&stno%5B%5D=C0U760&stno%5B%5D=C0U770&stno%5B%5D=C0U780&stno%5B%5D=C1U501&stno%5B%5D=C1U511&stno%5B%5D=C1U521&stno%5B%5D=C1U580&stno%5B%5D=C1U590&stno%5B%5D=C1U610&stno%5B%5D=C1U620&stno%5B%5D=C1U630&stno%5B%5D=C1U660&stno%5B%5D=C1U670&stno%5B%5D=C1U680&stno%5B%5D=C1U690&stno%5B%5D=C1U700&stno%5B%5D=C1U720&stno%5B%5D=C1U830&stno%5B%5D=C1U840&stno%5B%5D=C1U850&stno%5B%5D=C0S680&stno%5B%5D=C0S690&stno%5B%5D=C0S700&stno%5B%5D=C0S710&stno%5B%5D=C0S730&stno%5B%5D=C0S740&stno%5B%5D=C0S750&stno%5B%5D=C0S760&stno%5B%5D=C0S770&stno%5B%5D=C0S790&stno%5B%5D=C0S810&stno%5B%5D=C0S830&stno%5B%5D=C0S840&stno%5B%5D=C1S620&stno%5B%5D=C1S630&stno%5B%5D=C1S640&stno%5B%5D=C1S650&stno%5B%5D=C1S660&stno%5B%5D=C1S670&stno%5B%5D=C1S800&stno%5B%5D=C1S820&stno%5B%5D=C1S860&stno%5B%5D=C1S870&stno%5B%5D=C0S720&stno%5B%5D=C0T790&stno%5B%5D=C0T791&stno%5B%5D=C0T820&stno%5B%5D=C0T840&stno%5B%5D=C0T841&stno%5B%5D=C0T870&stno%5B%5D=C0T900&stno%5B%5D=C0T960&stno%5B%5D=C0T9A0&stno%5B%5D=C0T9B0&stno%5B%5D=C0T9C0&stno%5B%5D=C0T9D0&stno%5B%5D=C0T9E0&stno%5B%5D=C0T9F0&stno%5B%5D=C0T9G0&stno%5B%5D=C0T9H0&stno%5B%5D=C0T9I0&stno%5B%5D=C0T9M0&stno%5B%5D=C0Z020&stno%5B%5D=C0Z050&stno%5B%5D=C0Z060&stno%5B%5D=C0Z061&stno%5B%5D=C0Z070&stno%5B%5D=C0Z080&stno%5B%5D=C1S850&stno%5B%5D=C1T800&stno%5B%5D=C1T810&stno%5B%5D=C1T830&stno%5B%5D=C1T850&stno%5B%5D=C1T860&stno%5B%5D=C1T880&stno%5B%5D=C1T890&stno%5B%5D=C1T900&stno%5B%5D=C1T910&stno%5B%5D=C1T920&stno%5B%5D=C1T930&stno%5B%5D=C1T940&stno%5B%5D=C1T950&stno%5B%5D=C1T970&stno%5B%5D=C1T980&stno%5B%5D=C1T990&stno%5B%5D=C1Z010&stno%5B%5D=C1Z020&stno%5B%5D=C1Z030&stno%5B%5D=C1Z040&stno%5B%5D=C1Z090";
          rain_data('east',east);
			
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

var map;
var heatmapData = [];
var heatmap;
var obj=new Object;
var geo;
var arr = new Array();
var four_region = new Array();
function rain_data(region,form_serialized){
  //alert(year+"\n"+typhoon_name);
  console.log(form_serialized);
  //console.log(year);
  //console.log(typhoon_name);
  
  if(four_region.length==0)
  {
    $('#loading').css("display","block");
    map = new google.maps.Map(document.getElementById('map'), {
              zoom: 8,
              center: {lat: 23.5956500, lng:120.97388194  },
              mapTypeId: 'terrain'
            });
  }
  // var heatmapData = [];
  // var rain_average=document.getElementById("rain_average").value;
  
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
      // alert(region);
      $('#form').css("display","block");
      $('#color_sign').css("display","inline");
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
            url: "get_station_info.php",
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
        //-------heatmap------
        var latLng = new google.maps.LatLng(lat, lng);
        var magnitude = accu_value;
        console.log(magnitude);
        for(var i=0; i<magnitude; i++){
            heatmapData.push(latLng);
        }

        //-------geojson----------
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
        obj_properties = {
          "value":accu_value
        }
        obj_features.properties = obj_properties;
        obj_features.geometry = obj_geometry;
        obj_features.id=stno.toString();
        arr.push(obj_features);
        
      });

      four_region.push(region);
      if(four_region.length == 4){
        // alert("Finalluy");
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
        $('#loading').css("display","none");
        four_region = [];
      }
      obj.type="FeatureCollection";
      obj.features=arr;
      geo=JSON.parse(JSON.stringify(obj));
      map.data.addGeoJson(geo);

      map.data.setStyle(function(feature) {
          var rain = feature.getProperty('value');
          if (feature.getProperty('value')) {
            if(rain > 299){
              color = '#fec7f1';
            }
            else if (rain > 199 && rain < 300){
              color = '#fc20c7';
            }
            else if (rain > 149 && rain < 200){
              color = '#cf4597';
            }
            else if (rain > 129 && rain < 150){
              color = '#a20d9d';
            }
            else if (rain > 109 && rain < 130){
              color = '#862f17';
            }
            else if (rain > 89 && rain < 110){
              color = '#bd2409';
            }
            else if (rain > 69 && rain < 90){
              color = 'red';
            }
            else if (rain > 49 && rain < 70){
              color = '#e77a17';
            }
            else if (rain > 39 && rain < 50){
              color = '#ffa500'
            }
            else if (rain > 29 && rain < 40){
              color = '#ffff00';
            }
            else if (rain > 19 && rain < 30){
              color = '#7cfc00';
            }
            else if (rain > 14 && rain < 20){
              color = '#008000';
            }
            else if (rain > 9 && rain < 15){
              color = '#4169e1';
            }
            else if (rain > 5 && rain < 10){
              color = '#00bfff';
            }
            else if (rain > 0 && rain < 6){
              color = '#afeeee';
            }
            else{
              colro = '#c0c0c0';
            }
          }
          return /** @type {google.maps.Data.StyleOptions} */({
          fillColor: color,
          strokeColor: color,
          strokeWeight: 0,
          fillOpacity: 0.8
        });  
    });

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
}

window.addEventListener( "load", start, false );
function start() {

    var theheatmap = document.querySelector("input[name=mapHeat]");
    var geomap = document.querySelector("input[name=mapGeo]");
    theheatmap.addEventListener( "change", function(){
      if(this.checked){
        // alert("heatCheck");
         heatmap.setMap(map);
      }
      else{
        // alert("heatNotCheck");
         heatmap.setMap(null);
      }
    });
    geomap.addEventListener("change", function(){
      if(this.checked){
        // alert("geoMap check");
        map.data.addGeoJson(geo);
      }
      else{
        // alert("geoMap not chech");
        map.data.forEach(function(feature) {
          map.data.remove(feature);
        });
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
}

function get_C_name(eg_name){
  var chinese_name ; 
  $.ajax({
    type: 'POST',
    url: 'get_typhoon_ch_name.php',
    async: false,
    data: {
      "eg_name":eg_name
    },
    success: function (response) {
        chinese_name = response;
    }
  });
  return chinese_name;
}
