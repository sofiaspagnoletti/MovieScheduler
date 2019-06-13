


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
  
   
    var movName = $("#input-movie-name").val().trim();
    var movGenre = $("#input-movie-genre").val().trim();
    var movFreq = moment($("#input-movie-frequency").val().trim(), "MM/DD/YYYY").format("X");
    var movTime = $("#input-time-next").val().trim();
  
    
    var newMovie = {
      name: movName,
      genre: movGenre,
      frequency: movFreq,
      time: movTime,
    };

    database.ref().push(newMovie);

  
  console.log(movName);
  console.log(movGenre);
  console.log(movFreq);
  console.log(movTime);

  alert("Movie successfully added");

  $("#input-movie-name").val("");
  $("#input-movie-genre").val("");
  $("#input-movie-frequency").val("");
  $("#input-time-next").val("");
});
  
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var movName = childSnapshot.val().name;
    var movGenre = childSnapshot.val().genre;
    var movFreq = childSnapshot.val().freq;
    var movTime = childSnapshot.val().time;
  
    console.log(movName);
    console.log(movGenre);
    console.log(movFreq);
    console.log(movTime);

   

    var newRow = $("<tr>").append(
        $("<td>").text(movName),
        $("<td>").text(movGenre),
        $("<td>").text(movFreq),
        // $("<td>").text(empMonths),
        $("<td>").text(movTime)
      );
    
      // Append the new row to the table
      $("#movie-table > tbody").append(newRow);
});