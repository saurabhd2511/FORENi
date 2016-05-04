function plot(){
	var common = "http://localhost:8090";
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
			    } else {
			        url = common + "/" + plota + "/" + plotb;
			    }
			    

}