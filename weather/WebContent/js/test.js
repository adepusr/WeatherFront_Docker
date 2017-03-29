var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:8080/RestProject/Rest/forecast/20140303');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {	
	  var data=JSON.parse(ourRequest.responseText);
	console.log(data);
          createHTML(data)
	  
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(Data) {
  var Container = document.getElementById("handleb").innerHTML;
	var compiled=Handlebars.compile(Container);
	var generatedHTML=compiled(Data);
	var a= document.getElementById("location");
	a.innerHTML=generatedHTML;
}