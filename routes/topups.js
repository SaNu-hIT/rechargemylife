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
const WalletSchema = require("../model/wallet");
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

      console.log(shopId);


      let wallet = await WalletSchema.findOne({
        shopId
      });


      if (wallet) {


        console.log(wallet.wallet_balance);

        if (amount < wallet.wallet_balance) {
          if (token) {
            var access_toke = "Bearer " + token.access_token
            var url = 'https://topups-sandbox.reloadly.com/topups';
            console.log(access_toke);
            var headers = {
              "Authorization": access_toke,
              "Accept": "application/com.reloadly.topups-v1+json",
              "Content-Type": "application/json"
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
              'useLocalAmount': 'false',
              'customIdentifier': customIdentifier
            });

            console.log(body);

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
                if (json.errorCode == "INVALID_TOKEN" || json.errorCode == "TOKEN_EXPIRED") {
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

                  var transactionId

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
                    success,
                    transactionId
                  });





                  recharge.success = true
                  recharge.discount = json.discount
                  recharge.transactionId = json.transactionId
                  console.log(recharge);
                  recharge.save();




                  if (wallet) {
                    // update wallet
                    console.log("" + wallet.wallet_balance);
                    var updatebalance = wallet.wallet_balance - json.requestedAmount
                    console.log("" + json.requestedAmount);
                    console.log(updatebalance);
                    wallet.wallet_balance = updatebalance
                    console.log(wallet.wallet_balance);

                    console.log(wallet);

                    wallet.remove();

                    // WalletSchema.updateOne({
                    //   shopId: shopId
                    // }, {
                    //   $set: {
                    //     wallet_balance: updatebalance
                    //   }
                    // });



                    let wallet_amount = wallet.wallet_amount
                    let wallet_balance = updatebalance
                    let phone = wallet.phone
                    let distributorId = wallet.distributorId

                    let upwallet = new WalletSchema({
                      shopId,
                      wallet_amount,
                      wallet_balance,
                      distributorId,
                      phone
                    });
                    console.log("SAVE");
                    upwallet.save();



                  }

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
            Status: "1002",
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