<?php
    //17990282
    //This php file is responsible for getting data and updating data in the MYSQL Database 'cabsOnline'
    //The file checks what action is passed through from the javascript file 'BookingManager' and either 
    //updates data in the database or retrieves data.

    
    $conn = mysqli_connect('cmslamp14.aut.ac.nz','hgr7255','', 'hgr7255');
    
    $action = $_GET["action"];
    $input = $_GET["refInput"];
    $resultDisplayBookings = mysqli_query($conn, "SELECT * FROM cabsOnline WHERE bookingstatus='Unassigned' AND (TIME_FORMAT(pickUpTime, '%h %i %p')) >= (TIME_FORMAT(pickUpTime, '%h %i %p')) AND (TIME_FORMAT(pickUpTime, '%h %i %p')) <= (TIME_FORMAT(CURTIME() + 20000, '%h %i %p')) AND (TIME_FORMAT(pickUpTime, '%p')) = (TIME_FORMAT(CURTIME() + 20000, '%p'))
                                            AND pickUpDate=CURDATE()");
    
    $rows = array();
    if(!$conn){
        echo "<label id=\"warning\">Could not connect to database</label><br>";
    }else{
        if($action == "show"){ 
            if(!empty($resultDisplayBookings)){
                while($r = mysqli_fetch_assoc($resultDisplayBookings)){
                    $rows[] = $r;
                }
                print json_encode($rows, JSON_PRETTY_PRINT);
            }else{
                unset($rows);
                print json_encode($rows, JSON_PRETTY_PRINT);
            }
        }else{
            if(!empty($input)){
                $resultUpdateBookings = mysqli_query($conn, "UPDATE cabsOnline SET bookingstatus='Assigned' WHERE refNum='$input'");
                $resultDisplayBookings = mysqli_query($conn, "SELECT * FROM cabsOnline WHERE bookingstatus='Unassigned' AND (TIME_FORMAT(pickUpTime, '%h %i %p')) >= (TIME_FORMAT(pickUpTime, '%h %i %p')) AND (TIME_FORMAT(pickUpTime, '%h %i %p')) <= (TIME_FORMAT(CURTIME() + 20000, '%h %i %p')) AND (TIME_FORMAT(pickUpTime, '%p')) = (TIME_FORMAT(CURTIME() + 20000, '%p'))
                                            AND pickUpDate=CURDATE()");
                if(!empty($resultDisplayBookings)){
                    while($r = mysqli_fetch_assoc($resultDisplayBookings)){
                        $rows[] = $r;
                    }
                    print json_encode($rows, JSON_PRETTY_PRINT);
                }else{
                    unset($rows);
                    print json_encode($rows, JSON_PRETTY_PRINT);
                }
            }else{
                echo "ERROR";
            }
        }
    }

?>