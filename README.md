# lemoncode.club API documentation
## Table of contents:
* [Register.php](#registerphp)
* [Login.php](#loginphp)
* [AddContact.php](#addcontactphp)
* [DeleteContact.php](#deletecontactphp)
* [SearchContact.php](#searchcontactphp)
* [UpdateContact.php](#updatecontactphp)

## Register.php
Attempts to register a new user with a username, first name, last name, and password. If successful, returns their user id for use in other API calls.

### JSON input:
```
{ "username":<username>, "password":<password>, "firstName":<first name>, "lastName":<last name> }
```

`<username>` - string to use as username

`<password>` - string to use as password

`<first name>` - string representing the user's first name

`<last name>` - string representing the user's last name
<br>

### JSON output on success:
```
{ "error":"" }
```
<br>

### JSON output on failure:
```
{ "error":<error> }
```

`<error>` - string containing error information
<br><br><br><br>

## Login.php
Attempts to login with a given username and password. If successful, returns the first/last name of the user and their user id for use in other API calls.

### JSON input:
```
{ "username":<username>, "password":<password> }
```

`<username>` - string to use as username

`<password>` - string to use as password
<br>

### JSON output on success:
```
{ "userid":<user id>, "firstName":<first name>, "lastName":<last name>, "error":"" }
```

`<user id>` - integer representing the user's unique id

`<first name>` - string representing the user's first name

`<last name>` - string representing the user's last name
<br>

### JSON output on failure:
```
{ "userid":0, "firstName":"", "lastName":"", "error":"No Records Found" }
```
<br><br><br><br>

## AddContact.php
Attempts to add a contact to the database for a given user.

### JSON input:
```
{ "userid":<user id>, "firstName":<first name>, "lastName":<last name>, "email":<email>, "phoneNumber":<phone number> }
```

`<user id>` - integer representing the user's unique id

`<first name>` - string (max length 20) representing the contact's first name

`<last name>` - string (max length 20) representing the contact's last name

`<email>` - string (max length 320) representing the contacts email address (email#domain.com)

`<phone number>` - string (max length 12. 2 for country code, 3 for area code, 7 for phone number. Does not include hyphens) representing the contact's phone number
<br>

### JSON output on success:
```
{ "error":"" }
```
<br>

### JSON output on failure:
```
{ "error":<error> }
```

`<error>` - string containing error information
<br><br><br><br>

## DeleteContact.php
Attempts to delete a contact from the database for a given user.
### JSON input:
```
{ "userid":<user id>, "contactid":<contact id> }
```

`<user id>` - integer representing the user's unique id

`<contact id>` - integer representing the contact's unique id
<br>

### JSON output on success:
```
{ "error":"" }
```
<br>

### JSON output on failure:
```
{ "error":<error> }
```

`<error>` - string containing error information
<br><br><br><br>

## SearchContact.php
Searches for contacts based on a given search term and returns the results.

### JSON input
```
{ "userid":<user id>, "search":<search term> }
```

`<user id>` - id of user to search contacts of

`<search term>` - string to search for
<br>

### JSON output on success:
```
{ "results":[<first name 1>, <first name 2>, ..., <first name x>], "error":"" }
```

`<first name i>` - string representing contact's first name
<br>

### JSON output on failure:
```
{ "userid":0, "firstName":"", "lastName":"", "error":<error> }
```
`<error>` - string with error information
<br><br><br><br>

## UpdateContact.php
Updates contact information for a given contact for a given user.
### JSON input:
```
{ "userid":<user id>, "firstName":<first name>, "lastName":<last name>, "email":<email>, "phoneNumber":<phone number>, "contactid":<contact id> }
```

`<user id>` - integer representing the user's unique id

`<first name>` - string (max length 20) representing the contact's first name

`<last name>` - string (max length 20) representing the contact's last name

`<email>` - string (max length 320) representing the contacts email address (email#domain.com)

`<phone number>` - string (max length 15; 2 for country code, 3 for area code, 7 for phone number, and 3 for hyphens) representing the contact's phone number

`<contact id>` - integer representing the contact's unique id
<br>
### JSON output on success:
```
{ "error":"" }
```
<br>

### JSON output on failure:
```
{ "error":<error> }
```

`<error>` - string containing error information
<br><br><br><br>
