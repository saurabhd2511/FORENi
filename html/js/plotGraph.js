//***********************************Function to Display Firewall box****************************************************

function openFirewall() {
    document.getElementById("details1").style.display = "block";
    document.getElementById("details2").style.display = "none";
}

//*********************************** | Function to Display Authentication box | ****************************************************

function openAuth() {
    document.getElementById("details1").style.display = "none";
    document.getElementById("details2").style.display = "block";
}

//*********************************** | Function to Display Block IP | ****************************************************

function BlockIP(){
	var ipCompare = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ipVar = document.getElementById("block_ip").value;

	if(ipVar == "" || ipVar == " " || !ipVar.match(ipCompare)){
		alert("Enter Correct IP");
	}else{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://52.39.5.137:8090/blockIP?ip=" + ipVar, false);
    xhr.send();
    var JSONdata = xhr.responseText;
    alert(JSONdata);
	}
}
//*********************************** | Function to Display Graph | ****************************************************

function myFunction1() {

	var url1;	
    var chartTitle;
    var common = "http://52.39.5.137:8090";
    var e = document.getElementById("dropdown1");
	var ipCompare = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	var protocol1 = document.getElementById("ip1").value;
	if( protocol1 == " " || protocol1 == "" || !protocol1.match(ipCompare)){
		alert("Enter correct IP");
	}else{
    
        plota = "firewall";
        var plotb = e.options[e.selectedIndex].value;
        var url1 = common + "/" + plota + "/" + plotb + "?ip=" + protocol1;
        sessionStorage.setItem("url", url1);
  


    if (plotb == "acceptedEvents") {
        document.getElementById("graph").style.display = "none";
        window.location.href = "acceptedEvents_table.html";
    } else if (plotb == "rejectedEvents") {
        document.getElementById("graph").style.display = "none";
        window.location.href = "rejectedEvents_table.html";
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url1, false);
    xhr.send();
    JSONdata = xhr.responseText;
    var src = JSON.parse(JSONdata);
    var key;
    var doom = [];
    for (key in src) {
        if (src.hasOwnProperty(key)) {
            doom.push({
                'ip': key,
                'ratings': src[key]
            });
        }
    }

    document.getElementById("graph").style.display = "block";
    if (plotb == "multipledestinations") {
        chartTitle = "Multiple Destinations";
    } else if (plotb == "multipleSource") {
        chartTitle = "Multiple Sources";
    } else if (plotb == "topDestPorts") {
        chartTitle = "Top Destination Ports";
    } else if (plotb == "topSourcePorts") {
        chartTitle = "Top Source Ports";
    } else if (plotb == "topDestinations") {
        chartTitle = "Top Destination Ports";
    } else if (plotb == "acceptedEvents") {
        chartTitle = "Accepted Events";
    } else if (plotb == "rejectedEvents") {
        chartTitle = "Rejected Events";
    }

    var processed_json = new Array();
	
	
    $.map(doom, function(obj, i) {
        processed_json.push([obj.ip, parseInt(obj.ratings)]);
    });

  
		$(window).scrollTop($('#GraphContainer').offset().top-20);
        BarChart();

  

	//*********************************** | Function to Display Bar Chart | ****************************************************
	
    function BarChart() {
        var chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: 'GraphContainer'
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                type: "category",
                labels: {
                    align: "center",
                    enabled: true
                }
            },
            yAxis: {
                type: "linear",
                labels: {
                    enabled: true
                }
            },
            series: [{
                data: processed_json
            }],
            legend: {
                title: {
                    text: " IP values "
                }
            }
        });
    }


	}
}



//*********************************** | Authentication Graphs | ****************************************************

function myFunction2() 
{
	var url2;	
    var chartTitle;
	var middle;
    var common = "http://52.39.5.137:8090";
    var f = document.getElementById("dropdown2");
	var ipCompare = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	var nameCompare = /^[a-zA-Z]\{14}$/;
	var protocol2 = document.getElementById("ip2").value;
	var plota = "auth";
    var plotb = f.options[f.selectedIndex].value;
	
	if(plotb == "userActivity" || plotb == "destUserActivity")
	{
		middle = "?user=";
		if( protocol2 == " " || protocol2 == "")
		{
			alert("Enter username");
		}else
		{
			url2 = common + "/" + plota + "/" + plotb + middle + protocol2;
        	sessionStorage.setItem("url", url2);
				
			

    		var xhr = new XMLHttpRequest();
    		xhr.open("GET", url2, false);
    		xhr.send();
    		JSONdata = xhr.responseText;
    		var src = JSON.parse(JSONdata);
    		var key;
    		var doom = [];
    		for (key in src) 
			{
				if (src.hasOwnProperty(key)) 
				{
					doom.push(
						{
							'ip': key,
							'ratings': src[key]
						});
        		}
    		}

			var processed_json = new Array();
    		$.map(doom, function(obj, i) 
			{
				processed_json.push([obj.ip, parseInt(obj.ratings)]);
    		});
			if (plotb == "userActivity") 
			{
        		document.getElementById("graph").style.display = "none";
        		window.location.href = "userActivity_table.html";
    		} 
			else if (plotb == "destUserActivity") 
			{
        		document.getElementById("graph").style.display = "none";
        		window.location.href = "destUserActivity_table.html";
    		} 
			}	
		}else{
			
			// @nd 
			middle = "?ip=";
			if( protocol2 == " " || protocol2 == "" || !protocol2.match(ipCompare))
			{
				alert("Enter correct IP");
			}else
			{
				url2 = common + "/" + plota + "/" + plotb + middle + protocol2;
        		sessionStorage.setItem("url", url2);
				
				
				var xhr = new XMLHttpRequest();
				xhr.open("GET", url2, false);
				xhr.send();
				JSONdata = xhr.responseText;
				var src = JSON.parse(JSONdata);
				var key;
				var doom = [];
				for (key in src) 
				{
					if (src.hasOwnProperty(key)) 
					{
						doom.push(
							{
								'ip': key,
								'ratings': src[key]
							});
					}
				}

				var processed_json = new Array();
				$.map(doom, function(obj, i) 
				{
					processed_json.push([obj.ip, parseInt(obj.ratings)]);
				});

				if (plotb == "sourceIPActivity") 
				{
					document.getElementById("graph").style.display = "none";
        			window.location.href = "sourceIPActivity_table.html";
    			} 
				else if (plotb == "destIPActivity") 
				{
        			document.getElementById("graph").style.display = "none";
        			window.location.href = "destIPActivity_table.html";
    			} 
	
				}	
		}
	}








