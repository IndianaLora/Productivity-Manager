var timezonee = document.getElementById("timezone");
function weatherBalloon( cityID ) {
    var key = '{9f02a4611990fdeeaf6d0bf926b40983}';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    });
  }
  window.onload = function() {
    weatherBalloon( 6167865 );
  }