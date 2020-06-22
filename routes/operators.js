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
router.post(
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
  var access_token = "eyJraWQiOiI1N2JjZjNhNy01YmYwLTQ1M2QtODQ0Mi03ODhlMTA4OWI3MDIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDU1IiwiaXNzIjoiaHR0cHM6Ly9yZWxvYWRseS1zYW5kYm94LmF1dGgwLmNvbS8iLCJodHRwczovL3JlbG9hZGx5LmNvbS9zYW5kYm94Ijp0cnVlLCJodHRwczovL3JlbG9hZGx5LmNvbS9wcmVwYWlkVXNlcklkIjoiMzQ1NSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF1ZCI6Imh0dHBzOi8vdG9wdXBzLWhzMjU2LXNhbmRib3gucmVsb2FkbHkuY29tIiwibmJmIjoxNTkyODQxNjY4LCJhenAiOiIzNDU1Iiwic2NvcGUiOiJzZW5kLXRvcHVwcyByZWFkLW9wZXJhdG9ycyByZWFkLXByb21vdGlvbnMgcmVhZC10b3B1cHMtaGlzdG9yeSByZWFkLXByZXBhaWQtYmFsYW5jZSByZWFkLXByZXBhaWQtY29tbWlzc2lvbnMiLCJleHAiOjE1OTI5MjgwNjgsImh0dHBzOi8vcmVsb2FkbHkuY29tL2p0aSI6IjdiOTFkODkzLTRkOGUtNGI3MC1iM2ZkLTIwZTljMWFlOGY2YiIsImlhdCI6MTU5Mjg0MTY2OCwianRpIjoiNTcyZDYwMjItM2YwNS00YmFiLWI3YmQtZWQ1NDZlZDQ4NDI5In0.PU-lvWGJuJ4pFFnCBv8cSWoD5ki7SIdZyiQR9uyx8gU"
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
