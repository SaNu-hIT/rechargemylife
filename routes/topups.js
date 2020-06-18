// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");
const request = require('request');
const fetch = require('node-fetch');
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/topups",
    [
        check("recipientPhone", "Please Enter recipient Phone Number")
        .not()
        .isEmpty()
        ,check("senderPhone", "Please Enter sender Phone Number")
        .not()
        .isEmpty()
        ,check("operatorId", "Please Enter operator Id")
        .not()
        .isEmpty()
        ,check("amount", "Please Enter amount")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {



          const {
              recipientPhone,senderPhone,operatorId,amount,customIdentifier
          } = req.body;


          var url ='https://topups.reloadly.com/topups';
          var headers = {
            "Content-Type": "application/json",
            "Accept": "application/com.reloadly.topups-v1+json", "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9UazNORGhDUXpFd1FUZ3hNVU14T0RkR1FUVTBNekEzT0RCRk1qZ3dNMEpHTTBNNVJrWkVPQSJ9"
          }
          var body = JSON.stringify({
  'recipientPhone': {
    'countryCode': 'IN',
    'number': recipientPhone //(Note the '+509' country dialing code for Haiti)
  },
  'senderPhone': {
    'countryCode': 'IN',
    'number': senderPhone //(Note the '+1' country dialing code for USA)
  },
  'operatorId': operatorId,
  'amount': amount,
  'customIdentifier': customIdentifier
});


          fetch(url, { method: 'POST', headers: headers, body: body})
            .then((res) => {
               return res.json()
          })
          .then((json) => {
            console.log("JSON"+json);
            // Do something with the returned data.
            res.status(200).json(json);

          });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = router;
