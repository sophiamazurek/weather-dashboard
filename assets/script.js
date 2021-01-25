var APIKey="eba38d5202ab062097c0e84b133dc98e";
//moment js
var cityArray=["Austin"];
//get data from localstorage and store it into cityArray


function oneday(city){
    $(".oneDay").empty();
    //nested ajax call
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    var url= "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response) 
    {

        
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
    $(".fiveDay").empty();
    //five day forfast every 3 hours (8)
    var url ="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIKey;
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
      })
      .then(function(obj) 
      {
          for(var i=0;i<5;i++)
          {
            console.log(obj.list[i*8].main.temp);
            console.log(obj.list[i*8].main.humidity);
            console.log(obj.list[i*8].weather[0].icon);
            var iconurl = "http://openweathermap.org/img/w/" + obj.list[i*8].weather[0].icon + ".png";
            console.log(obj.list[i*8].dt_txt);
            var time=moment(obj.list[i*8].dt_txt).format('L');
            console.log(time)
            console.log(obj.list[i*8].wind.speed) ;

  
     
//dynamically build out the fiveday html
/* 
            <div class="card fiveday-card">
              <div class="card-body">
                <h2>Date</h2>
                <p>
                    <img src="">
                </p>
                <p>temperature</p>
                <p>humidity</p>
              </div>
            </div>
          </div>

} */
            var div11=$("<div>");
            div11.attr("class", "card fiveday-card");
            var div12=$("<div>");
            div12.attr("class", "card-body ");
            var h22=$("<h2>");
            h22.text(time);
            var p5=$("<p>");
             var iconimg=$("<img>");
             //<img src=>
             iconimg.attr("src", iconurl);
            var p6=$("<p>");
            p6.text(obj.list[i*8].main.temp);
            var p7=$("<p>");
            p7.text(obj.list[i*8].main.humidity);

            p5.append(iconimg);
            div12.append(h22);
            div12.append(p5);
            div12.append(p6);
            div12.append(p7);
            div11.append(div12);

            $(".fiveDay").append(div11);
        }

    });

}

 // This function handles events where a movie button is clicked
 $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    cityArray.push(movie);
    //set cityarray to local storage (json.stringify())
    oneday(movie);
    fiveday(movie)

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });


//working moving app
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < cityArray.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("movie-btn");
      // Adding a data-attribute
      a.attr("data-name", cityArray[i]);
      // Providing the initial button text
      a.text(cityArray[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
     // Adding a click event listener to all elements with a class of "movie-btn"

     $(".movie-btn").click(function(){
        console.log($(this).attr("data-name"));
        oneday($(this).attr("data-name"));
        fiveday($(this).attr("data-name"));
      
      });
  }

   
oneday("reno");
fiveday("reno");
renderButtons();
//1. oneday fx
//2. 5day fx
//3.create the input ..when user click on btn
    //grab city, 
        //call oneday(city) 
        //call fiveday(city)
        //push city into the array (cityArray)
        //set cityArray to local storage (json.stringify)
        //render out the btns