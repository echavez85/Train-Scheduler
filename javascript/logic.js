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

    // Change first train time to unix w/ moment
    var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

    // Calculate next arrival time by adding frequency to firs train time
    var nextArrival = moment.unix(firstTrain).add(frequency, "m");
    console.log(nextArrival);
    
    // Calculate minutes until arrival by calculating difference between nextArrivalTime and current time
    var minToArrive = moment().diff(moment(firstTrain, "X"), "HH:mm");
    console.log(minToArrive);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minToArrive)
    );
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
});
