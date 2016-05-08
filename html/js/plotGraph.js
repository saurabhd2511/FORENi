			function openFirewall() {
			    document.getElementById("details1").style.display = "block";
			    document.getElementById("details2").style.display = "none";
			}

			function openAuth() {
			    document.getElementById("details1").style.display = "none";
			    document.getElementById("details2").style.display = "block";
			}

			var url;

			function myFunction() 
			{
				var chartTitle;
			    var common = "http://52.39.5.137:8090";
			    var e = document.getElementById("dropdown1");
			    var f = document.getElementById("dropdown2");

			    if (document.getElementById("details1").style.display == "block") {
			        plota = "firewall";
			        var plotb = e.options[e.selectedIndex].value;
			    } else {
			        plota = "auth";
			        var plotb = f.options[f.selectedIndex].value;
			    }


			    var protocol = document.getElementById("ip").value;


			    if (protocol != "") {
			        url = common + "/" + plota + "/" + plotb + "?ip=" + protocol;
					localStorage.setItem("url",url);
			    } else {
			        url = common + "/" + plota + "/" + plotb;
					localStorage.setItem("url",url);
			    }
			    

			    if (plotb == "userActivity") {
			        document.getElementById("graph").style.display = "none";
			        window.location.href = "userActivity_table.html";
			    } else if (plotb == "destUserActivity") {
			        document.getElementById("graph").style.display = "none";
			        window.location.href = "destUserActivity_table.html";
			    } else if (plotb == "destIPActivity") {
			        document.getElementById("graph").style.display = "none";
			        window.location.href = "destIPActivity_table.html";
			    } else if (plotb == "sourceIPActivity") {
			        document.getElementById("graph").style.display = "none";
			        window.location.href = "sourceIPActivity_table.html";
			    }else if(plotb == "acceptedEvents"){
					document.getElementById("graph").style.display = "none";
			        window.location.href = "acceptedEvents_table.html";
				}else if(plotb == "rejectedEvents"){
					document.getElementById("graph").style.display = "none";
			        window.location.href = "rejectedEvents_table.html";
				}

			    var xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);
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
						if(plotb == "multipledestinations"){
					chartTitle = "Multiple Destinations";
				}else if(plotb == "multipleSource"){
					chartTitle = "Multiple Sources";
				}else if(plotb == "topDestPorts"){
					chartTitle = "Top Destination Ports";
				}else if(plotb == "topSourcePorts"){
					chartTitle = "Top Source Ports";
				}else if(plotb == "topDestinations"){
					chartTitle = "Top Destination Ports";
				}else if(plotb == "acceptedEvents"){
					chartTitle = "Accepted Events";
				}else if(plotb == "rejectedEvents"){
					chartTitle = "Rejected Events";
				}
		
				var processed_json = new Array();


				var processed_json = new Array();
				$.map(doom, function(obj, i) {
			    processed_json.push([obj.ip, parseInt(obj.ratings)]);
				});


				BarChart();
				
			

				function BarChart() {
					
			    	var chart = new Highcharts.Chart({
			        	chart: {
			            type: 'column',
			            renderTo : 'are'
			        	},
						
						title:	{
							text: chartTitle
						},
			        	xAxis: {
			            	type: "category"
			        	},
			        	series: [{
			            	data: processed_json
			        		}]
			    		});



				}

			}

			


			


			// Blocking IP

			// function BlockIP() {
			//     var ip = document.getElementById("block_ip").value;

			//     var xhr = new XMLHttpRequest();

			//     xhr.open("GET", "http://localhost:8090/blockIP?ip=" + ip, false);
			//     xhr.send();
			//     var JSONdata = xhr.responseText;

			//     alert(JSONdata);

			// }