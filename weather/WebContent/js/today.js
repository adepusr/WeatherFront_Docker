var dateval;

function today()
{
	var generate=document.getElementById("datebox1");
		generate.innerHTML='';
	generate=document.getElementById("datebox2");
		generate.innerHTML='';
	generate=document.getElementById("chartContainer");
		generate.innerHTML='';
	var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
   if (month.length < 2) 
		month = '0' + month;
   if (day.length < 2) 
		day = '0' + day;
	var date=[year, month, day].join('');
		todaydata(date);
}
function todaydata(dt)
{
	var ourRequest = new XMLHttpRequest();
	var url='http://adepusr.xyz:8080/Resource/forecast/'+dt;
	ourRequest.open('GET', url);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 500) {
			console.log(ourRequest.status);	
			var data=JSON.parse(ourRequest.responseText);
			console.log(data);
			todayHTML(data);
  	}else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};
ourRequest.send();
}
function todayHTML(Data) {
  	var Container = document.getElementById("todayd").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}

function todayweather(dt)
{

	var ourRequest = new XMLHttpRequest();
	var url='http://adepusr.xyz:8080/Resource/historical/'+dt;
		jQuery.ajaxSetup({async:false});
	$.getJSON(url, function(sp) {
	console.log(sp.length);
		if(sp.length<8)
		{
			var date;
			var tmin=[];
			var tmax=[];
			var	d=[];
			var i=7-sp.length;
			if(sp.length==0)
				var m= dt;
			else
				var m= sp[sp.length-1].DATE;			
			var year        = m.substring(0,4);
			var month       = m.substring(4,6);
			var day         = m.substring(6,8);
			var newdat      = new Date(year, month-1, day);
			for(var x=1;x<=i;x++)
			{
				month=''+(newdat.getMonth()+1);
				day = '' +(newdat.getDate()+1),
        		year = newdat.getFullYear();
				if (month.length < 2) 
					month = '0' + month;
    			if (day.length < 2) 
					day = '0' + day;
				date=[year, month, day].join('-');				
				d.push(date.substring(0,4)+date.substring(5,7)+date.substring(8,10));		
				var url="https://api.darksky.net/forecast/9f5783c9fabed19432e6b4f94e22dc02/39.113118,-84.522020,"+date+"T12:00:00";				
				$.getJSON(url, function(da) {
				tmax[x-1]=da.daily.data[0].temperatureMax;
				tmin[x-1]=da.daily.data[0].temperatureMin;						
				sp.push({"DATE":d[x-1], "TMAX":tmax[x-1], "TMIN":tmin[x-1]});
				});	
				newdat.setDate(newdat.getDate()+1);	
			}			
		}
		console.log(sp);
		createHTML(sp);
		chartGen(sp);
});
	
	
}
function createHTML(Data) {
  var Container = document.getElementById("handl_today").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}


function perticularday()
{
	var generate=document.getElementById("datebox2");
generate.innerHTML='';
	generate=document.getElementById("chartContainer");
generate.innerHTML='';
createDate();
}

function createDate()
{

var generate=document.getElementById("datebox1");
generate.innerHTML='<br/><label>DATE: </lable><input type="text" id="dp" onclick="picker()"/><button id="datesubmit" onclick="datesubmit()">Go...!</button>';
}

function picker()
{
	$("#dp").datepicker();
}

function datesubmit()
{

dateval=document.getElementById("dp").value;
if(dateval==null)
	alert("Enter valid date");
else
	{
		var d= new Date(dateval);
		console.log(d);
		month=''+(d.getMonth()+1);
		day = '' + d.getDate(),
        	year = d.getFullYear();
	    	if (month.length < 2) 
			month = '0' + month;
    		if (day.length < 2) 
			day = '0' + day;
		var date=[year, month, day].join('');
		todayweather(date);
	}
}

