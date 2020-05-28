<?php
	$inData = getRequestInfo(); //button?
	
	$userId = $inData["userId"];
	$contactid = $inData["contactid"];

	$conn = new mysqli("localhost", ***, ***, "cop4331-contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "DELETE FROM contact WHERE contactid='" . $contactid . "'"; //alert box!!!
		
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
		
	    returnWithError("");
	}
	
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
