	var icons = new Skycons({"color":"white"}),list=["clear-day","clear-night","partly-cloudy-day","partly-cloudy-night","cloudy","rain","sleet","snow","wind",
            "fog"], i;	
			icons.set("clear-day", "clear-day");
			icons.set("clear-night", "clear-night");
			icons.set("partly-cloudy-day","partly-cloudy-day");
			icons.set("partly-cloudy-night", "partly-cloudy-night");
			icons.set("cloudy", "cloudy");
			icons.set("rain", "rain");
			icons.set("sleet", "sleet");
			icons.set("snow", "snow");
			icons.set("wind", "wind");
			icons.set("fog", "fog");
			icons.play();
	
function forecastweather(dt)
{
var ourRequest = new XMLHttpRequest();
var url='http://adepusr.xyz:8080/Resource/forecast/'+dt;
ourRequest.open('GET', url);
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {	
	  var data=JSON.parse(ourRequest.responseText);
	console.log(data);
      forecastHTML(data);
	  chartGen(data);    
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};
ourRequest.onerror = function() {
  console.log("Connection error");
};
ourRequest.send();
}

function forecastHTML(Data) {
  var Container = document.getElementById("handleb").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}



function forecast()
{
var generate=document.getElementById("datebox1");
generate.innerHTML='';
	generate=document.getElementById("chartContainer");
generate.innerHTML='';
	generate=document.getElementById("todayDisplay");
	generate.style.visibility='hidden';
generate=document.getElementById("datebox2");
generate.innerHTML='<br/><label>DATE: </lable><input type="text" id="dp" onclick="picker()"/><button id="datesubmit" onclick="submit()">Go...!</button>';
}
function picker()
{ $( "#dp" ).datepicker();}

function submit()
{
dateval=document.getElementById("dp").value;
if(dateval==null)
	alert("Enter valid date");
else
	{
		console.log(dateval);
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
		forecastweather(date);
	}
}


function chartGen(jsond){

	var jsondata=jsond;	
var date;
var month=[];	  
var year=[];
var day=[];
	  var i;  
	  for(i=0;i<7;i++)
		  {
			  date=jsondata[i].DATE;
			  year[i]=date.substring(0,4);
	  	      month[i]= date.substring(4,6)-1;
	  		  day[i]= date.substring(6,8);
			  
		  }
	  	  
    var chart = new CanvasJS.Chart("chartContainer",
    {	
      title:{
      text: "Min and Max Temperatures"  
      },
	axisX: {
			labelFormatter: function (e) {
				return CanvasJS.formatDate( e.value, "DD MMM");
			},
		labelAngle: -20
	},
		
      data: [
      {        
        type: "spline",
        dataPoints: [
			
        { x: new Date(year[0], month[0], day[0]), y: parseFloat(jsondata[0].TMIN) },
        { x: new Date(year[1], month[1], day[1]), y: parseFloat(jsondata[1].TMIN) },
        { x: new Date(year[2], month[2], day[2]), y: parseFloat(jsondata[2].TMIN) },
        { x: new Date(year[3], month[3], day[3]), y: parseFloat(jsondata[3].TMIN) },			
        { x: new Date(year[4], month[4], day[4]), y: parseFloat(jsondata[4].TMIN) },
        { x: new Date(year[5], month[5], day[5]), y: parseFloat(jsondata[5].TMIN) },
        { x: new Date(year[6], month[6], day[6]), y: parseFloat(jsondata[6].TMIN) },
        ]
      }, 
	  {        
        type: "spline",
        dataPoints: [
        { x: new Date(year[0], month[0], day[0]), y: parseFloat(jsondata[0].TMAX) },
        { x: new Date(year[1], month[1], day[1]), y: parseFloat(jsondata[1].TMAX) },
        { x: new Date(year[2], month[2], day[2]), y: parseFloat(jsondata[2].TMAX) },
        { x: new Date(year[3], month[3], day[3]), y: parseFloat(jsondata[3].TMAX) },			
        { x: new Date(year[4], month[4], day[4]), y: parseFloat(jsondata[4].TMAX) },
        { x: new Date(year[5], month[5], day[5]), y: parseFloat(jsondata[5].TMAX) },
        { x: new Date(year[6], month[6], day[6]), y: parseFloat(jsondata[6].TMAX) },
        ]
      } 
      ]
    });
    chart.render();
  }
Handlebars.registerHelper("changeDate",function(data)
{
	var y=data.substring(0,4);
	var m=data.substring(4,6);
	var d=data.substring(6,8);
	return (m+"-"+d+"-"+y);
});