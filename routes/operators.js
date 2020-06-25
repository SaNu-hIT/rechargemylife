const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");
const TokenSchema = require("../model/token");
const PlansSchema = require("../model/plans");
const OperatorsSchema = require("../model/operators");
const request = require('request');
const fetch = require('node-fetch');

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
let token = await TokenSchema.find({
});

if(token)
{
  var access_token = "eyJraWQiOiI1N2JjZjNhNy01YmYwLTQ1M2QtODQ0Mi03ODhlMTA4OWI3MDIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDU1IiwiaXNzIjoiaHR0cHM6Ly9yZWxvYWRseS1zYW5kYm94LmF1dGgwLmNvbS8iLCJodHRwczovL3JlbG9hZGx5LmNvbS9zYW5kYm94Ijp0cnVlLCJodHRwczovL3JlbG9hZGx5LmNvbS9wcmVwYWlkVXNlcklkIjoiMzQ1NSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF1ZCI6Imh0dHBzOi8vdG9wdXBzLWhzMjU2LXNhbmRib3gucmVsb2FkbHkuY29tIiwibmJmIjoxNTkzMDcyOTY5LCJhenAiOiIzNDU1Iiwic2NvcGUiOiJzZW5kLXRvcHVwcyByZWFkLW9wZXJhdG9ycyByZWFkLXByb21vdGlvbnMgcmVhZC10b3B1cHMtaGlzdG9yeSByZWFkLXByZXBhaWQtYmFsYW5jZSByZWFkLXByZXBhaWQtY29tbWlzc2lvbnMiLCJleHAiOjE1OTMxNTkzNjksImh0dHBzOi8vcmVsb2FkbHkuY29tL2p0aSI6IjBmNjE2NzRhLWY4NDAtNGUyMC04YzZkLTc3YjBiN2Y1MmQ1MCIsImlhdCI6MTU5MzA3Mjk2OSwianRpIjoiOGE2OGM0OWYtMGEyNy00MzE4LWIwMWQtOTBiN2M4Y2YxZTU3In0.b0o0nn0_9keBgof8u9Scy_7Ysec0hQu_K74SbVs112o"
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
    "/alloperators",
    [
    ],
    async (req, res) => {
        try {
          const {
              phone
          } = req.body;

              let operators = await OperatorsSchema.find({
              });

                  res.status(200).json({
                        Data : {operators},Message:"success",Status:"1000",Token:"tokkens"
                });


        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/addOperators",
    [
    ],
    async (req, res) => {
        try {

          const {
              name,operatorId,logoUrls
          } = req.body;



var operator = new OperatorsSchema({
      name,operatorId,logoUrls
});
await operator.save();
res.status(200).json({
      Data : {operator},Message:"operator added success",Status:"1000",Token:"tokkens"
});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/getPlans",
    [
    ],
    async (req, res) => {
        try {
          const {
              operator
          } = req.body;

let plans = await PlansSchema.find({
});
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

if(plans)
{
  res.status(200).json({
        Data : {plans},Message:"success",Status:"1000",Token:"tokkens"
  });

}
else{
  res.status(200).json({
        Data : {plans},Message:"No plans found",Status:"1001",Token:"tokkens"
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
      Data : {plans},Message:"Plans added success",Status:"1000",Token:"tokkens"
});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);



module.exports = router;
