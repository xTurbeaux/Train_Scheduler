var config = {
    apiKey: "AIzaSyBi4q4G-vCrkCyf5SyfveH_XqHlcOyVv48",
    authDomain: "train-scheduler-74dbe.firebaseapp.com",
    databaseURL: "https://train-scheduler-74dbe.firebaseio.com",
    projectId: "train-scheduler-74dbe",
    storageBucket: "train-scheduler-74dbe.appspot.com",
    messagingSenderId: "24022195565"
};

firebase.initializeApp(config);
var database = firebase.database();


    database.ref().on('child_added', function(childSnapshot){

    var theChild = childSnapshot.val();
    var displayTrainName = childSnapshot.val().dbTrainName;
    var displayDestination = childSnapshot.val().dbDestination;
    var displayTrainTime = childSnapshot.val().dbTrainTime;
    var displayFrequency = childSnapshot.val().dbFrequency;
    var displayNextArrival = childSnapshot.val().dbNextArrival;
    var displayMinutesAway = childSnapshot.val().dbMinAway;

    var trainTimeConverted = moment(displayTrainTime, "hh:mm");
		var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
		var tRemainder = diffTime % displayFrequency;
		var minAway = displayFrequency - tRemainder;
        var nextArrival = moment().add(minAway, "minutes").format("hh:mm");

    $('#tbody').append('<tr><td>'+displayTrainName+'</td><td>'+displayDestination+'</td><td>'+displayFrequency+'</td><td>'+nextArrival+'</td><td>'+minAway+'</td></tr>');

});

$("#submit").on("click", function() {
    event.preventDefault();

    var subName = $('#name-form').val().trim();
    var subDestination = $('#dest-form').val().trim();
    var subTrainTime = moment($("#first-time-form").val().trim(), "H:mm").format("X");
    var subFreq = $('#freq-form').val().trim();

   
    $(this).closest('form').find("input[type=text], textarea").val("");

    
    database.ref().push({
        dbTrainName: subName,
        dbDestination: subDestination,
        dbTrainTime: subTrainTime,
        dbFrequency: subFreq
    });

});