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
    //   Grabs user input
    //   Create local "temporary" object for holding train data
    //   Upload train data to the database
    //   Log everything to console
    //   Clear all of the input boxes
    
    
// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    // Store everything into a variable
    // Console log the train info
    // Chance train time to unix w/ moment
    // Calculate minutes until arrival
    // Create the new row
    // Append the new row to the table
    