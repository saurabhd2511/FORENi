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

function BlockIP() {
    var ip = document.getElementById("block_ip").value;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://52.39.5.137:8090/blockIP?ip=" + ip, false);
    xhr.send();
    var JSONdata = xhr.responseText;

    alert(JSONdata);

}

//*********************************** | Function to Display Graph | ****************************************************

function myFunction() {

	var url;	
    var chartTitle;
    var common = "http://52.39.5.137:8090";
    var e = document.getElementById("dropdown1");
    var f = document.getElementById("dropdown2");
    var protocol = document.getElementById("ip").value;

    if (document.getElementById("details1").style.display == "block") {
        plota = "firewall";
        var plotb = e.options[e.selectedIndex].value;
    } else {
        plota = "auth";
        var plotb = f.options[f.selectedIndex].value;
    }




    if (protocol != "") {
        url = common + "/" + plota + "/" + plotb + "?ip=" + protocol;
        sessionStorage.setItem("url", url);
    } else {
        url = common + "/" + plota + "/" + plotb;
        sessionStorage.setItem("url", url);
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
    } else if (plotb == "acceptedEvents") {
        document.getElementById("graph").style.display = "none";
        window.location.href = "acceptedEvents_table.html";
    } else if (plotb == "rejectedEvents") {
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

    if (plotb == "failedLogin" || plotb == "remoteLogin") {
        PieChart();
    } else {
        BarChart();

    }

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

	//*********************************** | Function to Display Pie Chart | ****************************************************

    function PieChart() {
        $('#GraphContainer').highcharts({
            chart: {
                type: 'pie',
                renderTo: 'GraphContainer',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: chartTitle
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                data: processed_json
            }]
        });
    }

}



