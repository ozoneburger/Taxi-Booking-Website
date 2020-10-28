<?php 
    //17990282
    //This php file is responsible of inserting the user data entered from the booking.html form into the database.
    //The file uses JSON to send objects between server and client

    $conn = mysqli_connect('cmslamp14.aut.ac.nz','hgr7255','', 'hgr7255');

    //mysql table pre made in myadmin
    if(!$conn){
        echo "<label id=\"warning\">Could not connect to database</label><br>";
    }else{
        $custName = $_GET["custName"];
        $phoneNum = $_GET["phoneNum"];
        $unitNum = $_GET["unitNum"];
        $streetNum = $_GET["streetNum"];
        $streetName = $_GET["streetName"];
        $suburbName = $_GET["suburbName"];
        $destination = $_GET["destination"];
        $pickUpDate = $_GET["pickUpDate"];
        $pickUpTime = $_GET["pickUpTime"];

        $bookingStatus = "Unassigned";
        $currDate = date('Y-m-d');
        $currTime = date('H:i:s');
        
        $insertQuery = mysqli_query($conn, "INSERT INTO cabsOnline (custName, phone, unitNum, streetNum, streetName, suburbName,
                destination, pickUpDate, pickUpTime, bookingstatus, currDate, currTime) VALUES ('$custName', '$phoneNum', '$unitNum', '$streetNum',
                '$streetName', '$suburbName', '$destination', '$pickUpDate', '$pickUpTime', '$bookingStatus', '$currDate', '$currTime');");

        $getInsertedQuery = mysqli_query($conn, "SELECT refNum, pickUpTime, pickUpDate FROM cabsOnline WHERE currTime='$currTime'");
        $rows = array();
        if(!empty($getInsertedQuery)){
            while($r = mysqli_fetch_assoc($getInsertedQuery)){
                $rows[] = $r;
            }
            print json_encode($rows, JSON_PRETTY_PRINT);
        }else{
            unset($rows);
            print json_encode($rows, JSON_PRETTY_PRINT);
        }
    }
?>