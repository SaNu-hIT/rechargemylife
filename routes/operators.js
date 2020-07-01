const express = require("express");
const {
  check,
  validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");
const TokenSchema = require("../model/token");
const PlansSchema = require("../model/plans");
const OperatorsSchema = require("../model/operators");
const request = require('request');
const fetch = require('node-fetch');
const refreshToken = require("../config/refreshToken");
/**
 * @method - POST
 * @param - /operators
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

      var access_ids = "recharge"
      var access_id = access_ids
      let token = await TokenSchema.findOne({
        access_id
      });
      if (token) {
        var access_toke = token.access_token
        var url = 'https://topups-sandbox.reloadly.com/operators/auto-detect/phone/' + phone + '/countries/IN?&includeBundles=true';
        var headers = {
          "Authorization": "Bearer " + access_toke,
          "Accept": "application/com.reloadly.topups-v1+json"
        }
        console.log(headers);
        fetch(url, {
            method: 'GET',
            headers: headers
          })
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            console.log(json);
            // Do something with the returned data.
            if (json.errorCode == "INVALID_TOKEN") {
              //refreshToken
              refreshToken()
              res.status(200).json({
                Data: {},
                Message: "Please try again",
                Status: "1100",
                Token: "tokkens"
              });
            } else {
              res.status(200).json({
                Data: {
                  json
                },
                Message: "Operator api success",
                Status: "1000",
                Token: "tokkens"
              });
            }
          });
      } else {
        //refreshToken
        refreshToken()
        res.status(200).json({
          Data: {},
          Message: "Token renewed try again",
          Status: "1000",
          Token: "tokkens"
        });

      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/alloperators",
  [],
  async (req, res) => {
    try {
      const {
        phone
      } = req.body;

      let operators = await OperatorsSchema.find({});

      res.status(200).json({
        Data: {
          operators
        },
        Message: "success",
        Status: "1000",
        Token: "tokkens"
      });


    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/addOperators",
  [],
  async (req, res) => {
    try {

      const {
        name,
        operatorId,
        logoUrls
      } = req.body;



      var operator = new OperatorsSchema({
        name,
        operatorId,
        logoUrls
      });
      await operator.save();
      res.status(200).json({
        Data: {
          operator
        },
        Message: "operator added success",
        Status: "1000",
        Token: "tokkens"
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/getPlans",
  [],
  async (req, res) => {
    try {
      const {
        operator
      } = req.body;

      let plans = await PlansSchema.find({});
      // if (operator=="")
      // {
      //    plans = await PlansSchema.find({
      //   });
      // }else
      // {
      // let plans = await PlansSchema.find({
      //   operator
      // });
      // }

      if (plans) {
        res.status(200).json({
          Data: {
            plans
          },
          Message: "success",
          Status: "1000",
          Token: "tokkens"
        });

      } else {
        res.status(200).json({
          Data: {
            plans
          },
          Message: "No plans found",
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


router.post(
  "/addPlans",
  [],
  async (req, res) => {
    try {

      const {
        Price,
        operator,
        Description,
        Validity,
        Talktime,
        Plan_type
      } = req.body;



      var plans = new PlansSchema({
        Price,
        operator,
        Description,
        Validity,
        Talktime,
        Plan_type
      });
      await plans.save();
      res.status(200).json({
        Data: {
          plans
        },
        Message: "Plans added success",
        Status: "1000",
        Token: "tokkens"
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);



module.exports = router;