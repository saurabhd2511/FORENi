			function openFirewall(){
			 document.getElementById("details1").style.display = "block";
			 document.getElementById("details2").style.display = "none";
			}
			function openAuth(){
			document.getElementById("details1").style.display = "none";
			 document.getElementById("details2").style.display = "block";
			}
		
			var url;
			function myFunction() {
			    
			var common = "http://localhost:8090";
			var e = document.getElementById("dropdown1");
			var f = document.getElementById("dropdown2");
			
			if(document.getElementById("details1").style.display == "block"){
				plota = "firewall";
				var plotb = e.options[e.selectedIndex].value;
			}else{
				plota = "auth";
				var plotb = f.options[f.selectedIndex].value;
			}
			
			
			var protocol = document.getElementById("ip").value;
			
			
			if(protocol != ""){
			url = common + "/" +plota + "/" +plotb + "?ip=" + protocol ;
			}
			else{
			 url = common + "/" +plota + "/" +plotb; 
			}
			plotGraph();
				
				if(plotb == "userActivity"){
					document.getElementById("graph").style.display = "none";
					window.location.href = "userActivity_table.html";
				}else if(plotb == "destUserActivity"){
					document.getElementById("graph").style.display = "none";
					window.location.href = "destUserActivity_table.html";
				}else if(plotb == "destIPActivity"){
					document.getElementById("graph").style.display = "none";
					window.location.href = "destIPActivity_table.html";
				}else if(plotb == "sourceIPActivity"){
					document.getElementById("graph").style.display = "none";
					window.location.href = "sourceIPActivity_table.html";
				}
			}
			
			
			function plotGraph(){
				document.getElementById("graph").style.display = "block";
				document.getElementById("are").innerHTML="";
				var margin = { top : 20, right : 10, bottom : 100, left : 40},
			 width = 400 - margin.right - margin.left,
			 height = 500 - margin.top - margin.bottom;
			var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:yellow'>" + d.ratings + "</span>";
  })
			
			var svg = d3.select('#are')
			         .append('svg')
			         .attr({
			             "width" : width + margin.right + margin.left,
			             "height": height + margin.top + margin.bottom
			         })
			         .append('g')
			         .attr("transform", "translate(" + margin.left +',' + margin.right + ')');
			
				svg.call(tip);
				
			
			//degine x y scales
			
			
			var xScale = d3.scale.ordinal()
			         .rangeRoundBands([0,width], 0.2, 0.2);
			
			var yScale = d3.scale.linear()
			         .range([height, 0]);
			
			//define axis
			var xAxis = d3.svg.axis()
			         .scale(xScale)
			         .orient("bottom");
			
			var yAxis = d3.svg.axis()
			         .scale(yScale)
			         .orient("left");
				
			
				
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			JSONdata = xhr.responseText;
			var src  = JSON.parse(JSONdata);
			for(var i = 0; i < src.length; i++) {
    	delete src[i]['_id'];
		}
				
			
			var key;
			var data = [];
			
			for(key in src){
			 if(src.hasOwnProperty(key)){
			     data.push({'ip':key,'ratings':src[key]});
			 }
			}
			
				
		
			 data.forEach(function(d) {
			     d.ratings = +d.ratings;
			     d.ip = d.ip;
			     console.log(d.ratings);
			 });
			 
			 data.sort(function(a,b){
			     return b.ratings - a.ratings;
			 });
			 
			 
			 //specify domains for x and y scales
			 
			 xScale.domain(data.map(function(d) {return d.ip;}));
			 yScale.domain([0, d3.max(data, function(d){ return d.ratings;})]);
			 
			 //draw the bars
			 svg.selectAll('.bar')
			     .data(data)
			     .enter()
			     .append('rect')
			 	.attr("class", "bar")
			     .attr("height", 0)
			     .attr("y", height)
			     .transition().duration(2000)
			     .delay(function(d,i) { return i * 200;})
			     .attr({
			     "x": function(d){ return xScale(d.ip);},
			     "y": function(d){ return yScale(d.ratings);},
			     "width": xScale.rangeBand(),
			     "height": function(d){ return height - yScale(d.ratings); }
			 })
			 
			 
			 d3.selectAll(".bar").on("click", function(data) {
    		alert("Blocked");
			 });
			 
			 //label the bars
			 svg.selectAll('text')
			     .data(data)
			     .enter()
			     .append('text')
			     .text(function(d) { return d.ratings; })
			     .attr('x', function(d) { return xScale(d.ip) + xScale.rangeBand()/2; })
			     .attr('y', function(d) { return yScale(d.ratings) + 12; })
			     .style("fill","white")
			     .style("text-anchor","middle");
			 
			 //draw the axis
			 
			 svg.append("g")
			     .attr("class", "x axis")
			     .attr("transform", "translate(0," + height + ")")
			     .call(xAxis)
			     .selectAll('text')
			     .attr("transform","rotate(-60)")
			     .attr("dx","-.8em")
			     .attr("dy",".25em")
			     .style("text-anchor","end")
			     .style("font-size","12px");
			 
			 
			 
			 svg.append("g")
			     .attr("class", "y axis")
			     .call(yAxis)
			     .style("font-size","12px");
			}
			
			function BlockIP(){
				var ip = document.getElementById("block_ip").value;
				
				var xhr = new XMLHttpRequest();
			
				xhr.open("GET", "http://localhost:8090/blockIP?ip="+ip, false);
				xhr.send();
				var JSONdata = xhr.responseText;
				
				alert(JSONdata);
				
			}
			
	