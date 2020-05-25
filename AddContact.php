<?php
	$inData = getRequestInfo();

	$password = hash('sha256', $inData["password"]);
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$username = $inData["username"];

	$conn = new mysqli("107.180.58.62", "SEC_k5loNkSFPjD4", "Cop4331Data!@", "cop4331-contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "insert into Users (firstName,lastName,username,password) VALUES (" . $firstName . ",'" . $lastName .",'". $username .",'". $password . "')";
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
