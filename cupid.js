
const axios = require("axios"); // Importing the Axios module to make API requests
const FormData = require('form-data');
const fs = require('fs');

const apiURL = "https://api.cupid.travel/api"

class Cupid {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }


    async uploadInventory(name, file, header_id, header_name, header_address, header_city, header_country_code, header_latitude, header_longitude){

        var result;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', fs.createReadStream(file));
        formData.append('header_id', header_id);
        formData.append('header_name', header_name);
        formData.append('header_address', header_address);
        formData.append('header_city', header_city);
        formData.append('header_country_code', header_country_code);
        formData.append('header_latitude', header_latitude);
        formData.append('header_longitude', header_longitude);


        var headers = formData.getHeaders()
        headers['x-api-key'] = this.apiKey

        await axios // Making a POST request using axios and requesting information from the API
            .post(
                apiURL+"/inventories/upload",
                formData,
                {
                    headers: headers
                }
            )
            .then((response) => { // If the GET request is successful, this block is executed
                return response; // The response of the API call is passed on to the next block
            })
            .then((contests) => { // In this block, we store the response data into a variable 'result'
                result = contests.data;
            })
            .catch((error) => {
                console.log(error); // Error handler
            });
        return result; // The contest data is returned
    }

    async listInventories(){
        var result;
        await axios // Making a GET request using axios and requesting information from the API
            .get(
                apiURL+"/inventories",
                {
                    headers: {'x-api-key': this.apiKey}
                }
            )
            .then((response) => { // If the GET request is successful, this block is executed
                return response; // The response of the API call is passed on to the next block
            })
            .then((contests) => { // In this block, we store the response data into a variable 'result'
                result = contests.data;
            })
            .catch((error) => {

                console.log(error); // Error handler
            });
        return result; // The contest data is returned
    }

    async inventoryDetails(inventory_id){
        var result;
        await axios // Making a GET request using axios and requesting information from the API
            .get(
                apiURL+"/inventories/"+inventory_id,
                {
                    headers: {'x-api-key': this.apiKey}
                }
            )
            .then((response) => { // If the GET request is successful, this block is executed
                return response; // The response of the API call is passed on to the next block
            })
            .then((contests) => { // In this block, we store the response data into a variable 'result'
                result = contests.data;
            })
            .catch((error) => {

                console.log(error); // Error handler
            });
        return result; // The contest data is returned
    }

    async mapHotelList(hotelLists = []){
        var result;
        await axios // Making a POST request using axios and requesting information from the API
            .post(
                apiURL+"/map-hotels", JSON.stringify(hotelLists),
                {
                    headers: {'x-api-key': this.apiKey}
                }
            )
            .then((response) => { // If the GET request is successful, this block is executed
                return response; // The response of the API call is passed on to the next block
            })
            .then((contests) => { // In this block, we store the response data into a variable 'result'
                result = contests.data;
            })
            .catch((error) => {
                console.log(error); // Error handler
            });
        return result; // The contest data is returned
    }
  }

module.exports = Cupid