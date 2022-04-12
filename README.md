[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# cupid-node

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
    - [uploadInventory](#uploadInventory)
    - [listInventories](#listInventories)
    - [inventoryDetails](#inventoryDetails)
    - [mapHotelList](#mapHotelList)
- [Contact](#contact)

## Description
Performing mapping through the Cupid API is very straightforward. You'll first upload your properties inventory to be used as reference and then send a list of properties to be mapped to the API and get the results directly in the response.
## Installation
Requires at least Node.js 12.20.0.
```sh
npm i cupid --save
```
## Methods

NOTE: The documentation below is up-to-date with `3.x` releases, if you are using an older version, please check how to [upgrade](#upgrading).

### uploadInventory
This function can be used to upload an inventory with a provided CSV file.  
  
You will have to provide the inventory's name and for each column in your file, you'll need match its index with the standard field names provided below.

Let's assume you have a CSV file that looks like the following table:
<table><thead><tr><th>HotelID</th><th>Hotel_Name</th><th>Hotel_Address</th><th>Hotel_Lat</th><th>Hotel_Lon</th><th>Country</th><th>City</th><th>...</th></tr></thead><tbody><tr><td>1408</td><td>Smile Hotel</td><td>123 main st</td><td>5.419514</td><td>3.392694</td><td>AU</td><td>Adelaid</td><td>...</td></tr><tr><td>123</td><td>Cupid resort</td><td>456 north av</td><td>55.69254</td><td>37.3167887</td><td>MA</td><td>Zagoura</td><td>...</td></tr></tbody></table>

In this case the form data would be:
-   **file**: The csv file to be uploaded
-   **name**: Cupid inventory
-   **header_id**: 0
-   **header_name**: 1
-   **header_address**: 2
-   **header_city**: 6
-   **header_country_code**: 5
-   **header_latitude**: 3
-   **header_longitude**: 4
```js
var  Cupid = require('cupid');
var  cupid = new Cupid(*YOUR  API  KEY*);
var  uploadInventory = cupid.uploadInventory("my npm catalog", "./file.csv", 0, 1, 2, 3, 4, 5, 6)

uploadInventory
.then((res) => {
// If the function successfully retrieves the data, it enters this block
console.log(res); // Print the contest data on the console
})
.catch((err) => {
console.log(err); // Error handler
});
```
### listInventories

This function can be used to list the inventories uploaded to your workspace.  
You can check their status and other basic info.
```js
var  Cupid = require('cupid');
var  cupid = new Cupid(*YOUR  API  KEY*);
var  listInventories = cupid.listInventories()

listInventories
.then((res) => {
// If the function successfully retrieves the data, it enters this block
console.log(res); // Print the contest data on the console
})
.catch((err) => {
console.log(err); // Error handler
});
```
### inventoryDetails

This function can be used to check the requested inventory's details.

You can use it to get the inventory status  `mapping_process_status_id`  as outlined below. The status has to be 2 (Done) to start mapping.

**Possible values for the inventory's status  `mapping_process_status_id`:**

<table><thead><tr><th>value</th><th>Name</th><th>Description</th><th>Action</th></tr></thead><tbody><tr><td>-1</td><td><strong>Invalid</strong></td><td>The inventory doesn't contain any valid hotels</td><td>Correct your catalog and try again.</td></tr><tr><td>0</td><td><strong>Pending</strong></td><td>The inventory is being uploaded</td><td>Wait, no action required.</td></tr><tr><td>1</td><td><strong>Processing</strong></td><td>The inventory is being processed</td><td>Wait, no action required.</td></tr><tr><td>2</td><td><strong>Done</strong></td><td>The process is complete</td><td><strong>You can start mapping.</strong></td></tr><tr><td>3</td><td><strong>Failed</strong></td><td>There was an error while processing</td><td>Retry and if the error persists, feel free to contact us.</td></tr></tbody></table>

When you have an inventory with `active=true` and `mapping_process_status_id=2` you can use the following endpoint to perfom mapping:
```js
var  Cupid = require('cupid');
var  cupid = new Cupid(*YOUR  API  KEY*);
var  inventoryDetails = cupid.inventoryDetails()

inventoryDetails
.then((res) => {
// If the function successfully retrieves the data, it enters this block
console.log(res); // Print the contest data on the console
})
.catch((err) => {
console.log(err); // Error handler
});
```
### mapHotelList
This function allows you to send a list of properties and maps it against your active inventory. You will get the resulting mappings in the response.

**Limit**
<br>
You can send up to 1000 properties per request.
```js
var  Cupid = require('cupid');
var  cupid = new Cupid(*YOUR  API  KEY*);

const  data = [{
"address":  "123 main street",
"country_code":  "US",
"hotel_code":  "1256",
"latitude":  36.18743350322336,
"longitude": -115.15064193665704,
"name":  "hotel name"
}]
var  mapHotelList = cupid.mapHotelList(data)

mapHotelList
.then((res) => {
// If the function successfully retrieves the data, it enters this block
console.log(res); // Print the contest data on the console
})
.catch((err) => {
console.log(err); // Error handler
});
```

## Contact
- [ladnany](https://github.com/ladnany)
- [k.ladnany@nuitee.com](mailto:k.ladnany@nuitee.com)
