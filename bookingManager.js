//17990282
//This javascript file handles all of the client server interactions and handles JSON objects
//This file contains 3 functions (explanation above the functions below)
var xhr = createRequest();

//processBooking function handles the user input data from booking.html form and opens an xhr request to send to the php file
//the function is also responsible of checking what stat the xhr request is in
//this function also updates the booking.html to send a message to the client of their reference number, pick up date, and pick up time information
function processBooking(
  processor,
  divID,
  custName,
  phone,
  unitNum,
  streetNum,
  streetName,
  suburbName,
  destination,
  pickUpDate,
  pickUpTime
) {
  if (xhr) {
    var xhrUrl =
      processor +
      "?custName=" +
      custName +
      "&phoneNum=" +
      phone +
      "&unit=" +
      unitNum +
      "&streetNum=" +
      streetNum +
      "&streetName=" +
      streetName +
      "&suburbName=" +
      suburbName +
      "&destination=" +
      destination +
      "&pickUpDate=" +
      pickUpDate +
      "&pickUpTime=" +
      pickUpTime;

    xhr.open("GET", xhrUrl, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var display = document.getElementById(divID);
        var serverResponse = JSON.parse(xhr.responseText);
        var keys = Object.keys(serverResponse);
        if (serverResponse != null) {
          display.innerHTML = "";

          if (window.ActiveXObject) {
            display.innerHTML +=
              "<p>Thank You! Your booking reference number is" +
              serverResponse[keys[0]].refNum +
              ". " +
              "You Will be picked up in front of your provided address at " +
              serverResponse[keys[0]].pickUpTime +
              " on " +
              serverResponse[keys[0]].pickUpDate +
              ".</p>";
          } else {
            display.innerHTML +=
              "<p>Thank You! Your booking reference number is " +
              serverResponse[keys[0]].refNum +
              ". " +
              "You Will be picked up in front of your provided address at " +
              serverResponse[keys[0]].pickUpTime +
              " on " +
              serverResponse[keys[0]].pickUpDate +
              ".</p>";
          }
        } else {
          display.innerHTML = "";
        }
      }
    };
    xhr.send(null);
  }
}

//displayBookings function is responsible for updating the admin.html page to show the details of the bookings stored in the database
//this function is also similar to the one above however is supposed to handle one or more object returns from the server
function displayBookings() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var divID1 = document.getElementById("Display");
    var serverResponse = JSON.parse(xhr.responseText);
    var keys = Object.keys(serverResponse);
    if (serverResponse != null) {
      divID1.innerHTML = "";
      if (window.ActiveXObject) {
        var string1 =
          "<table border = 1 align = center  cellpadding= 10><tr><td class = head>Reference Number</td>" +
          "<td class =head>Customer Name</td><td class =head>Phone Number</td><td class =head>Suburb Name</td>" +
          "<td class =head>Destination</td><td class =head>Pick-Up Date</td><td class =head>Pick-Up Time</td></tr>";
        for (var i = 0; i < keys.length; i++) {
          string1 +=
            "<br><tr><td>" +
            serverResponse[keys[i]].refNum +
            "</td><td>" +
            serverResponse[keys[i]].custName +
            "</td><td>" +
            serverResponse[keys[i]].phone +
            "</td><td>" +
            serverResponse[keys[i]].suburbName +
            "</td><td>" +
            serverResponse[keys[i]].destination +
            "</td><td>" +
            serverResponse[keys[i]].pickUpDate +
            "</td><td>" +
            serverResponse[keys[i]].pickUpTime +
            "</td></tr>";
        }
      } else {
        var string1 =
          "<table border = 1 align = center  cellpadding= 10><tr><td class = head>Reference Number</td>" +
          "<td class =head>Customer Name</td><td class =head>Phone Number</td><td class =head>Suburb Name</td>" +
          "<td class =head>Destination</td><td class =head>Pick-Up Date</td><td class =head>Pick-Up Time</td></tr>";
        for (var i = 0; i < keys.length; i++) {
          string1 +=
            "<br><tr><td>" +
            serverResponse[keys[i]].refNum +
            "</td><td>" +
            serverResponse[keys[i]].custName +
            "</td><td>" +
            serverResponse[keys[i]].phone +
            "</td><td>" +
            serverResponse[keys[i]].suburbName +
            "</td><td>" +
            serverResponse[keys[i]].destination +
            "</td><td>" +
            serverResponse[keys[i]].pickUpDate +
            "</td><td>" +
            serverResponse[keys[i]].pickUpTime +
            "</td></tr>";
        }

        if (keys.length === 0) {
          document.getElementById("refInput").disabled = true;
          document.getElementById("assignButton").disabled = true;
          document.getElementById("refInput").value = "";
          alert("No Bookings Found!");
        } else {
          document.getElementById("refInput").disabled = false;
          document.getElementById("assignButton").disabled = false;
        }
        divID1.innerHTML += string1;
      }
    } else {
      divID1.innerHTML = "";
    }
  }
}

//this function is responsible for calling the displayBooking function above for every state change that the xhr variable goes through until it reaches 4 (loaded)
//the function takes in 2 parameters, first being what action the user has clicked (show or assign a taxi) and the second parameter is what the client has entered in the
//text field which is a reference number. This is then passed in through the xhr variable request.
function buttonClicked(action, input) {
  if (action == "show") {
    xhr.open("GET", "fetchBookings.php?action=" + action, true);
  } else {
    if (input != null) {
      xhr.open(
        "GET",
        "fetchBookings.php?action =" + action + "&refInput=" + input,
        true
      );
      alert("The booking request " + input + " has been properly assigned.");
    }
  }
  xhr.onreadystatechange = displayBookings;
  xhr.send(null);
}
