<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("107.180.58.62", "xk5kfy582mtp", "cPan3131#!#!", "cop4331-contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT * FROM contact WHERE (firstName like '%" . $inData["search"] . "%' OR lastName like '%" . $inData["search"] . "%' OR phoneNumber like '%" . $inData["search"] . "%' OR email like '%" . $inData["search"] . "%') AND userid=" . $inData["userid"];
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '{';
				$searchResults .= '"contactid":' . $row["contactid"] . ',';
				$searchResults .= '"firstName":"' . $row["firstName"] . '",';
				$searchResults .= '"lastName":"' . $row["lastName"] . '",';
				$searchResults .= '"email":"' . $row["email"] . '",';
				$searchResults .= '"phoneNumber":"' . $row["phoneNumber"] . '"';
				$searchResults .= '}';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
		$retValue = '{"userid":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
