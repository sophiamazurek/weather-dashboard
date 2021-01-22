var APIKey="eba38d5202ab062097c0e84b133dc98e";
//moment js
var cityArray=["Austin"];

function oneday(city){
    //nested ajax call
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var url= "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
console.log(url)
$.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {

 
/*
<div class="card">
    <div class="card-body">
        <h2>City Date Icon</h2>
        <p>temp</p>
        <p>hum</p>
        <p>wind</p>
        <p>uv index</p>
    </div>
</div>
*/ 

var div1= $("<div>");
div1.attr("class","card");
var div2=$("<div>");
div1.attr("class","card-body");
var h2=$("<h2>");
h2.text(city+" (" +moment().format('L')+") ")

var p1=$("<p>");
console.log(response.main.temp)
p1.text("Temperature: " + response.main.temp)
var p2=$("<p>");
console.log(response.main.humidity)
p2.text("Humidity: " + response.main.humidity)
var p3=$("<p>");
console.log(response.wind.speed)
p3.text("Wind Speed: " + response.wind.speed)
var p4=$("<p>");

div2.append(h2);
div2.append(p1);
div2.append(p2);
div2.append(p3);
div2.append(p4);

div1.append(div2);

$(".oneDay").append(div1);
var lon =response.coord.lon;
var lat= response.coord.lat;
//uv data (lon and lat)
//http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+APIKey;
console.log(uvURL);
$.ajax({
    url: uvURL,
    method: "GET"
  }).then(function(uvObj) {
    console.log(uvObj.value)  
    p4.text("UV Index: "+uvObj.value)
})

   


})
}

function fiveday(city){
    //five day forfast every 3 hours (8)
    var url ="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIKey;
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
      }).then(function(obj) {
          for(var i=0;i<5;i++){
            console.log(obj.list[i*8].main.temp) 

          }
     
   
    })
}

//working moving app
function renderBtn(){
    //run a forloop dynamically append each btn from localstraoge
}
oneday("reno");
// fiveday("reno")
//1. oneday fx
//2. 5day fx
//3.create the input ..when user click on btn
    //grab city, 
        //call oneday(city) 
        //call fiveday(city)
        //push city into the array (cityArray)
        //set cityArray to local storage (json.stringify)
        //render out the btns