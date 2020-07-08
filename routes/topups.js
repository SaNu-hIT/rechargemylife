// Filename : user.js

const express = require("express");
const {
  check,
  validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const RechargeSchema = require("../model/transactions");
const request = require('request');
const fetch = require('node-fetch');
const TokenSchema = require("../model/token");
const refreshToken = require("../config/refreshToken");
const Wallet = require("../model/wallet");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
  "/topups", [check("operatorId", "Please Enter a Valid operatorId")
    .not()
    .isEmpty()
  ],
  async (req, res) => {
    try {
      var access_ids = "recharge"
      var access_id = access_ids
      let token = await TokenSchema.findOne({
        access_id
      });
      const {
        operatorId,
        operatorName,
        shopId,
        discount,
        amount,
        customIdentifier,
        recipientPhone,
        recipientCountryCode,
        recipientNumber,
        senderPhone,
        senderCountryCode,
        senderNumber,
        logoUrl
      } = req.body;
      var success = false




      let wallet = await Wallet.findOne({
        shopId
      });



      if (!amount > wallet.wallet_balance) {

        // success = true
        var recharge = new RechargeSchema({
          operatorId,
          operatorName,
          shopId,
          discount,
          amount,
          customIdentifier,
          recipientPhone,
          recipientCountryCode,
          recipientNumber,
          senderPhone,
          senderCountryCode,
          senderNumber,
          logoUrl,
          success
        });
        recharge.save();



        if (token) {
          var access_toke = token.access_token
          var url = 'https://topups.reloadly.com/topups';
          var headers = {
            "Content-Type": "application/json",
            "Accept": "application/com.reloadly.topups-v1+json",
            "Authorization": "Bearer " + access_toke
          }
          var body = JSON.stringify({
            'recipientPhone': {
              'countryCode': 'IN',
              'number': recipientPhone
            },
            'senderPhone': {
              'countryCode': 'IN',
              'number': senderPhone

            },
            'operatorId': operatorId,
            'amount': amount,
            'customIdentifier': customIdentifier
          });
          fetch(url, {
              method: 'POST',
              headers: headers,
              body: body
            })
            .then((res) => {
              return res.json()
            })
            .then((json) => {
              console.log(json);
              if (json.errorCode == "INVALID_TOKEN") {
                refreshToken()
                res.status(200).json({
                  Data: {
                    json
                  },
                  Message: "Invalid token",
                  Status: "1100",
                  Token: "tokkens"
                });
              } else {
                success = true
                var recharge = new RechargeSchema({
                  operatorId,
                  operatorName,
                  shopId,
                  discount,
                  amount,
                  customIdentifier,
                  recipientPhone,
                  recipientCountryCode,
                  recipientNumber,
                  senderPhone,
                  senderCountryCode,
                  senderNumber,
                  logoUrl,
                  success
                });
                recharge.save();
                res.status(200).json({
                  Data: {
                    json
                  },
                  Message: "Topup success",
                  Status: "1000",
                  Token: "tokkens"
                });
              }
            });


        } else {
          refreshToken()
          res.status(200).json({
            Data: {},
            Message: "Token renewed try again",
            Status: "1100",
            Token: "tokkens"
          });
        }

      } else {

        res.status(200).json({
          Data: {},
          Message: "Please add moneny to wallet",
          Status: "1001",
          Token: "tokkens"
        });

      }




    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);



module.exports = router;