var urlBase = 'http://lemoncode.club/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "contacts.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function registerUser()
{
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var firstName = document.getElementbyID("firstName").value;
	var lastName = document.getElementbyID("lastName").value;
	document.getElementById("registerUserResult").innerHTML = "";

	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '", "first name" : "' + firstName + '", "last name" : "' + lastName  + '"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("registerUserResult").innerHTML = "Invalid Username/Password";
			return;
		}

		saveCookie();
	}
	catch(err)
	{
		document.getElementById("registerUserResult").innerHTML = err.message;
	}
	
	userId = 0;
	firstName = "";
	lastName = "";
}

function openForm()
{
	document.getElementById("myForm").style.display = "block";
}
  
function closeForm()
{
	document.getElementById("myForm").style.display = "none";
}

function addContact()
{
	var myFirstName = document.getElementById("FirstName").value;
	var myLastName = document.getElementById("LastName").value;
	var email = document.getElementById("Email").value;
	var number = document.getElementById("PhoneNumber").value;
	var table = document.getElementById("myTableData").value;
	document.getElementByID("contactAddResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + myFirstName + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 201) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"userid" : "' + userID + '","search" : ' + srch + '}';
	var url = urlBase + '/SearchContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved:";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function deleteContact()
{
	var myFirstName = document.getElementById("FirstName").value;
	var myLastName = document.getElementById("LastName").value;
	var email = document.getElementById("Email").value;
	var number = document.getElementById("PhoneNumber").value;
	var table = document.getElementById("myTableData").value;
	document.getElementByID("contactDeleteResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + myFirstName + '", "userId" : ' + userId + '}';
	var url = urlBase + '/DeleteContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url+'/12', true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(null);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

function updateContact()
{
	var myFirstName = document.getElementById("FirstName").value;
	var myLastName = document.getElementById("LastName").value;
	var email = document.getElementById("Email").value;
	var number = document.getElementById("PhoneNumber").value;
	var table = document.getElementById("myTableData").value;
	document.getElementByID("contactUpdateResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + myFirstName + '", "userId" : ' + userId + '}';
	var url = urlBase + '/UpdateContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+'/12', true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}
}

function addRow(){
	//Grab data from form
	var myFirstName = document.getElementById("FirstName");
	var myLastName = document.getElementById("LastName");
	var email = document.getElementById("Email");
	var number = document.getElementById("PhoneNumber");
	var table = document.getElementById("myTableData");

	//Count the amount of rows in table and insert after
	var rowCount = table.rows.length;
	window.alert(rowCount);
	var row = table.insertRow(rowCount);

	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);

	cell0.innerHTML = myFirstName.value;
	cell1.innerHTML = myLastName.value;
	cell2.innerHTML = email.value;
	cell3.innerHTML = number.value;
}