<?php
	$inData = getRequestInfo(); //button?
	
	$userId = $inData["userId"];
	$contactid = $inData["contactid"]

	$conn = new mysqli("107.180.58.62", "xk5kfy582mtp", "cPan3131#!#!", "cop4331-contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "DELETE FROM contacts WHERE userid='" . $userid . "' AND contactid='" . $contactid . "'"; //alert box!!!
		
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
