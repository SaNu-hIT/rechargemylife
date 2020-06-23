// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");
const TokenSchema = require("../model/token");
const PlansSchema = require("../model/plans");
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
  var access_token = "eyJraWQiOiI1N2JjZjNhNy01YmYwLTQ1M2QtODQ0Mi03ODhlMTA4OWI3MDIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDU1IiwiaXNzIjoiaHR0cHM6Ly9yZWxvYWRseS1zYW5kYm94LmF1dGgwLmNvbS8iLCJodHRwczovL3JlbG9hZGx5LmNvbS9zYW5kYm94Ijp0cnVlLCJodHRwczovL3JlbG9hZGx5LmNvbS9wcmVwYWlkVXNlcklkIjoiMzQ1NSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF1ZCI6Imh0dHBzOi8vdG9wdXBzLWhzMjU2LXNhbmRib3gucmVsb2FkbHkuY29tIiwibmJmIjoxNTkyOTM1NTE0LCJhenAiOiIzNDU1Iiwic2NvcGUiOiJzZW5kLXRvcHVwcyByZWFkLW9wZXJhdG9ycyByZWFkLXByb21vdGlvbnMgcmVhZC10b3B1cHMtaGlzdG9yeSByZWFkLXByZXBhaWQtYmFsYW5jZSByZWFkLXByZXBhaWQtY29tbWlzc2lvbnMiLCJleHAiOjE1OTMwMjE5MTQsImh0dHBzOi8vcmVsb2FkbHkuY29tL2p0aSI6ImI1NmY4ZmYwLWJlOGEtNGNkMS1iZjIzLTM3ZmYwZmUyYTNhZCIsImlhdCI6MTU5MjkzNTUxNCwianRpIjoiODM3MDdkODEtMGRiNC00ZTVkLTkxNDMtMzE0OWU4NjcyZGY5In0.tDX5DQwyrSmiTYV8L2aMJBSEtabDstWPAGHsk1qej40"
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


router.post(
    "/getPlans",
    [
        check("operator", "Please Enter operators")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
          const {
              operator
          } = req.body;

let plans = await PlansSchema.find({
  operator
});

res.status(200).json({
      Data : {plans},Message:"Recharge success",Status:"1000",Token:"tokkens"
});
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


router.post(
    "/addPlans",
    [

    ],
    async (req, res) => {
        try {

          const {
              Price,operator,Description,Validity,Talktime,Plan_type
          } = req.body;



var plans = new PlansSchema({
  Price,operator,Description,Validity,Talktime,Plan_type
});

await plans.save();


res.status(200).json({
      Data : {plans},Message:"operator added success",Status:"1000",Token:"tokkens"
});
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = router;
