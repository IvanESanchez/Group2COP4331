var urlBase = 'http://lemoncode.club/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

var modRow = -1;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		if( jsonObject.error != "" )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		userId = jsonObject.userid;

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
		document.getElementById("contactstitle").innerHTML = firstName + "'s Contact List";
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
	var login = document.getElementById("Username").value;
	var password = document.getElementById("Password").value;
	var firstName = document.getElementById("FirstName").value;
	var lastName = document.getElementById("LastName").value;
	document.getElementById("registerUserSuccessful").innerHTML = "";

	if (login == "" || password == "" || firstName == "" || lastName == "")
	{
		return;
	}

	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '", "firstName" : "' + firstName + '", "lastName" : "' + lastName  + '"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		if( jsonObject.error != "" )
		{
			document.getElementById("registerUserSuccessful").innerHTML = "Invalid Username/Password";
			return;
		}

		userId = jsonObject.id;
		saveCookie();
	}
	catch(err)
	{
		document.getElementById("registerUserSuccessful").innerHTML = err.message;
	}

	document.getElementById("registerUserSuccessful").innerHTML = "User created. Please login.";
	
	userId = 0;
	firstName = "";
	lastName = "";
	
	closeForm();
}

function openForm()
{
	document.getElementById("myForm").style.display = "block";
}
  
function closeForm()
{
	document.getElementById("myForm").style.display = "none";
}
function updateForm(rowNumber)
{
	document.getElementById("updateForm").style.display="block";
	modRow = rowNumber;
}

function closeUpdateForm()
{
	document.getElementById("updateForm").style.display="none";
}

function addContact()
{
	var myFirstName = document.getElementById("FirstName").value;
	var myLastName = document.getElementById("LastName").value;
	var email = document.getElementById("Email").value;
	var number = document.getElementById("PhoneNumber").value;
	var table = document.getElementById("myTableData").value;
	document.getElementById("contactAddResult").innerHTML = "";
	document.getElementById("contactMessage").innterHTML = "";

	if (myFirstName == "" || myLastName == "" || email == "" || number == "")
	{
		return;
	}

	var jsonPayload = '{"userid":' + userId + ', "firstName": "' + myFirstName + '", "lastName": "' + myLastName + '", "email": "' + email + '", "phoneNumber": "' + number +  '"}';
	var url = urlBase + '/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
	    xhr.send(jsonPayload);
	    
		var jsonObject = JSON.parse( xhr.responseText );
		
		if( jsonObject.error != "" )
		{
		    document.getElementById("contactAddResult").innerHTML = err.message;
			return;
		}
		
		document.getElementById("contactMessage").innerHTML = "Contact has been added.";
		searchContact();
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
	closeForm();
}

function clearTable()
{
	var table = document.getElementById("myTableData");
	table.innerHTML = "<tbody><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone #</th><th>Update/Delete</th></tr></tbody>";
}
function searchContact()
{
    clearTable();
    
	var srch = document.getElementById("searchtext").value;
	//document.getElementById("contactSearchResult").innerHTML = "";
	document.getElementById("contactMessage").innterHTML = "";
	var contactList = "";
	var myFirstName;
	var contactId;
	var myLastName;
	var email;
	var number;
	
	var jsonPayload = '{"userid" : ' + userId + ',"search" : "' + srch + '"}';
	var url = urlBase + '/SearchContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved:";
				var jsonObject = JSON.parse( xhr.responseText );
				
				if (jsonObject.error != "") {
                	return;
                }
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					contactId = jsonObject.results[i].contactid;
					myFirstName = jsonObject.results[i].firstName;
					myLastName = jsonObject.results[i].lastName;
					email = jsonObject.results[i].email;
					number = jsonObject.results[i].phoneNumber;
					addRow(contactId,myFirstName,myLastName,email,number);
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}

				// document.getElementsByTagName("p")[0].innerHTML = contactList;
				// document.getElementById("contactSearch").innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	
	catch(err)
	{
		//document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}
function showAllContacts()
{
	document.getElementById("searchtext").value = "";
	searchContact();
}

function verifyDelete(rowNumber)
{
	var r = confirm("Press OK if you want to delete this contact.");
  if (r == true) {
    deleteContact(rowNumber)
  }
}

function deleteContact(rowNumber)
{
	var table = document.getElementById("myTableData");
	var contactid = table.rows[rowNumber].id;
	document.getElementById("contactDeleteResult").innerHTML = "";
	document.getElementById("contactMessage").innterHTML = "";

	var jsonPayload = '{"userId" : ' + userId + ', "contactid" : ' + contactid + '}';
	var url = urlBase + '/DeleteContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactMessage").innerHTML = "Contact has been deleted.";
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

function updateContact()
{
	var myFirstName = document.getElementById("newFirstName").value;
	var myLastName = document.getElementById("newLastName").value;
	var email = document.getElementById("newEmail").value;
	var number = document.getElementById("newPhoneNumber").value;
	var table = document.getElementById("myTableData");
	var contactid = table.rows[modRow].id;
	document.getElementById("contactUpdateResult").innerHTML = "";
	document.getElementById("contactMessage").innterHTML = "";

	if (myFirstName == "" || myLastName == "" || email == "" || number == "")
	{
		return;
	}

	var jsonPayload = '{ "userId" : ' + userId + ', "firstName" : "' + myFirstName + '", "lastName" : "' + myLastName + '", "email" : "' + email + '", "phoneNumber" : "' + number + '", "contactid" : ' + contactid + '}';
	var url = urlBase + '/UpdateContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactMessage").innerHTML = "Contact has been updated.";
				searchContact();
			}
		};
		xhr.send(jsonPayload);
		closeUpdateForm();
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}
}

function addRow(contactid,firstname,lastname,email,number){
	var table = document.getElementById("myTableData");
	
	//Count the amount of rows in table and insert after
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

    row.id = contactid;
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);

	cell0.innerHTML = firstname;
	cell1.innerHTML = lastname;
	cell2.innerHTML = email;
	cell3.innerHTML = number;
	cell4.innerHTML = '<button type="submit" onclick="updateForm(' + rowCount + ');"><i class="fa fa-refresh"></i></button>, <button type="submit" onclick="verifyDelete(' + rowCount + ');"><i class="fa fa-times"></i></button>';
}