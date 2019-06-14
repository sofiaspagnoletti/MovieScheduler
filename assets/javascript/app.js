


var firebaseConfig = {
    apiKey: "AIzaSyC1MS2fy7Dk82iBRo8ZO6EKOJnK9T7DzAA",
    authDomain: "movietime-7b8ed.firebaseapp.com",
    databaseURL: "https://movietime-7b8ed.firebaseio.com",
    projectId: "movietime-7b8ed",
    storageBucket: "movietime-7b8ed.appspot.com",
    messagingSenderId: "554224866555",
    appId: "1:554224866555:web:bfdf6d9fb38c86dc"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


$("#add-movie-btn").on("click", function(event) {
    event.preventDefault();
  
    var movieName = $("#input-movie-name").val().trim();
    var movieGenre = $("#input-movie-genre").val().trim();
    var movieFreq = $("#input-movie-frequency").val().trim();
    var movieTime = $("#input-first-showtime").val().trim();
  
    
    var newMovie = {
      name: movieName,
      genre: movieGenre,
      frequency: movieFreq,
      time: movieTime,
    };

    database.ref().push(newMovie);

  
  console.log(movieName);
  console.log(movieGenre);
  console.log(movieFreq);
  console.log(movieTime);

//   alert("Movie successfully added");

  $("#input-movie-name").val("");
  $("#input-movie-genre").val("");
  $("#input-movie-frequency").val("");
  $("#input-first-showtime").val("");
});
  
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var movieName = childSnapshot.val().name;
    var movieGenre = childSnapshot.val().genre;
    var movieFreq = childSnapshot.val().frequency;
    var movieTime = childSnapshot.val().time;
  
    console.log(movieName);
    console.log(movieGenre);
    console.log(movieFreq);
    console.log(movieTime);

    
    var nextShowTime = moment(movieTime, "HH:mm");
    var now = moment();

    // While movie already started
    while(now > nextShowTime) {
        // Calculate the next movie
        nextShowTime = nextShowTime.add(movieFreq, 'minutes');
    }

    // nextShowTime is in the future at this point
    var nextShowTimeIn = nextShowTime.diff(now, 'minutes');

    var newRow = $("<tr>").append(
        $("<td>").text(movieName),
        $("<td>").text(movieGenre),
        $("<td>").text(movieFreq + " min"),
        $("<td>").text(nextShowTime.format("HH:mm")),
        $("<td>").text(nextShowTimeIn + " min")
      );
    
      // Append the new row to the table
      $("#movie-table > tbody").append(newRow);
});