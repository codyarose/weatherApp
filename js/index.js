
// Calculation for switching between F and C
var farenheit;
var celsius;

function calculateCelsius(){
  celsius = ((farenheit-32) * 5 / 9).toFixed();
}

function switchTempFormat() {
  if($("#switch").html() === "°C"){
    calculateCelsius();
    $(".value").html(celsius);
  } else {
    $(".value").html(farenheit);
  }
}

$(document).ready(function(){

    // Getting lat and long coords from user
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var long = position.coords.longitude;
			var lat = position.coords.latitude;
      
      // Getting weather data from Dark Sky API
      $.ajax({
        type:"GET", 
        url: "https://api.darksky.net/forecast/05036aaa2d103152305b40c978d10da9/"+lat+","+long+"?exclude=minutely,hourly,daily,flags?units=auto",
        dataType: "jsonp"
        }).done(function(data) {
          var obj= [data];     
          
          // Calling Skycons
          function skycons() {
            var skycons = new Skycons({"color": "white"});
          skycons.add(document.getElementById("icon"), obj[0].currently.icon);
          skycons.play();
        }
        skycons();
        
        farenheit = (obj[0].currently.temperature).toFixed();
        
        // Appending values to html class/id's
        $(".summary").append(obj[0].currently.summary);
        calculateCelsius();
        $("#switch").html("°C");
        $(".value").append(celsius);
        $("#switch").click(function(){
          if($("#switch").html() === "°F"){
            $("#switch").html("°C");
            switchTempFormat();
          } else {
            $("#switch").html("°F");
            switchTempFormat();
          }
        });
      });
		});
	};

});