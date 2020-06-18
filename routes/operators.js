// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");
const TokenSchema = require("../model/token");
const request = require('request');
const fetch = require('node-fetch');
const InitiateTokenServese = require("../config/getToken");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.get(
    "/operators",
    [
        check("phone", "Please Enter a Valid Username")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
          const {
              phone
          } = req.body;

InitiateTokenServese();


let token = await TokenSchema.find({
});

if(token)
{
  var access_token = token[0].access_token
  var url = 'https://topups-sandbox.reloadly.com/operators/auto-detect/phone/'+phone+'/countries/IN?&includeBundles=true';


    var headers = {
      "Authorization": "Bearer " + access_token,
      "Accept": "application/com.reloadly.topups-v1+json"
    }

      console.log(headers);

    fetch(url, { method: 'GET', headers: headers})
      .then((res) => {
         return res.json()
    })

    .then((json) => {
      console.log("JSON"+json);
      // Do something with the returned data.
      res.status(200).json(json);

    });

}





        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = router;
