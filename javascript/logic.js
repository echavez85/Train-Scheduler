// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCozKRv4wWm7K60tmjbIcGgj3nlqtKC3c",
    authDomain: "train-scheduler-e91a2.firebaseapp.com",
    databaseURL: "https://train-scheduler-e91a2.firebaseio.com",
    projectId: "train-scheduler-e91a2",
    storageBucket: "train-scheduler-e91a2.appspot.com",
    messagingSenderId: "285721104765"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Add button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //   Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format();
    var frequency = $("#frequency-input").val().trim();

    //   Create local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };
    //   Upload train data to the database
    database.ref().push(newTrain);

    //   Log everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train has been added to the scheduler");

    //   Clear all of the input boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});
        
// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Console log the train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // First Time with one year subtracted
    var convertedStartTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    //Current Time
    var currentTime = moment();
    
    // Difference between times
    var diffTime = moment().diff(moment(convertedStartTime), "minutes");

    // Time apart
    var timeRemainder = diffTime % frequency;

    // Minutes to next train
    var minutesToTrain = frequency - timeRemainder;

    // Calculate next arrival time by adding frequency to first train time
    var nextArrival = moment().add(minutesToTrain, "minutes");
    var nextTrainTime = moment(nextArrival).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minutesToTrain)
    );
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
});
