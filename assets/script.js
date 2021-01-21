var APIKey="eba38d5202ab062097c0e84b133dc98e";
//moment js
var cityArray=["Austin"];

function oneday(city){
    //nested ajax call
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var url= "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
console.log(url)
//uv data (lon and lat)
//http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
}

function fiveday(city){
    //five day forfast every 3 hours (8)
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
}

//working moving app
function renderBtn(){
    //run a forloop dynamically append each btn from localstraoge
}
oneday("reno");

//1. oneday fx
//2. 5day fx
//3.create the input ..when user click on btn
    //grab city, 
        //call oneday(city) 
        //call fiveday(city)
        //push city into the array (cityArray)
        //set cityArray to local storage (json.stringify)
        //render out the btns