<?php
	$inData = getRequestInfo();
	
	$userid = $inData["userid"]; //$row["id"];
	$firstName = $inData["firstName"]; 
	$lastName = $inData["lastName"];
	$email = $inData["email"]; 
	$phoneNumber = $inData["phoneNumber"]; 

	$conn = new mysqli("107.180.58.62", "xk5kfy582mtp", "cPan3131#!#!", "cop4331-contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT into contact (userid,firstName,lastName,email,phoneNumber) VALUES (" . $userid . ",'" . $firstName . "','" . $lastName . "','" . $email . "','" . $phoneNumber . "')";

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
