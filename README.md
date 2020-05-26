# lemoncode.club API documentation
## Table of contents:
* [Login.php](#loginphp)
* [AddContact.php](#addcontactphp)
* [DeleteContact.php](#deletecontactphp)

## Login.php
Attempts to login with a given username and password. If successful, returns the first/last name of the user and their user id for use in other API calls.

### JSON Input:
```
{ "username":<username>, "password":<password> }
```

`<username>` - string

`<password>` - string
<br><br>

### JSON Output on success:
```
{ "userid":<user id>, "firstName":<first name>, "lastName":<last name>, "error":"" }
```

`<user id>` - integer

`<first name>` - string

`<last name>` - string
<br><br>

### JSON Output on failure:
```
{ "userid":0, "firstName":"", "lastName":"", "error":"No Records Found" }
```
<br><br><br><br>

## AddContact.php
Attempts to add a contact to the database for a given user

### JSON Input:
```
{ "userId":<user id>, "firstName":<first name>, "lastName":<last name>, "email":<email>, "phoneNumber":<phone number> }
```

`<user id>` - integer

`<first name>` - string (max length 20)

`<last name>` - string (max length 20)

`<email>` - string (max length 320)

`<phone number>` - string (max length 12)
<br><br>

### JSON Output on success:
```
{ "error":"" }
```
<br><br>

### JSON Output on failure:
```
{ "error":<error> }
```

`<error>` - string