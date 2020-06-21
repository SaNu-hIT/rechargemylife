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
  var access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEVXhNekExUlVKR016UXhSa0kyTlRGR05ETXlRalZCUmpZMFJqYzJSRFJEUVRrMU9EVXpNZyJ9.eyJodHRwczovL3JlbG9hZGx5LmNvbS9qdGkiOiI4YzExNzdiMy0yNGEwLTQxNTgtYjJmNC05Mzk5MDU0ZGZmODYiLCJodHRwczovL3JlbG9hZGx5LmNvbS9wcmVwYWlkVXNlcklkIjoiMzQ1NSIsImlzcyI6Imh0dHBzOi8vcmVsb2FkbHktc2FuZGJveC5hdXRoMC5jb20vIiwic3ViIjoieFh6SXZtNTYzTVFqSDliYlhpeDlOSVc0SExzVFBLaXZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdG9wdXBzLXNhbmRib3gucmVsb2FkbHkuY29tIiwiaWF0IjoxNTkyNzI2NTA1LCJleHAiOjE1OTI4MTI5MDUsImF6cCI6InhYekl2bTU2M01Rakg5YmJYaXg5TklXNEhMc1RQS2l2Iiwic2NvcGUiOiJzZW5kLXRvcHVwcyByZWFkLXRvcHVwcy1oaXN0b3J5IHJlYWQtb3BlcmF0b3JzIHJlYWQtcHJvbW90aW9ucyByZWFkLXByZXBhaWQtYmFsYW5jZSByZWFkLXByZXBhaWQtY29tbWlzc2lvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.oAyvQ2xeJBeVUza2H6cPPRbejsBIwUOLzIy6VfxZxTKo-gUzC_dz6ImLfXBCv-hp3Xdly69xaNnvcyEg8ENJ1raWBB8Ucf8UbZWgU_mZ7V7B4FNc-BLtj5QvmT8gqmnALJxbyTnU2LI42J8MVXLPOj8NVSe3SFAgdvLM6kNvGVS5f23Ehv3xBNJv4H9Z21nHM5VbxIHoNvaSOgsPVULmVcu_facHEfSIgvcAqf-GBMy-2oqD9AFLurOXjwmj4LyefM5hkXo30zEOsVVXZCfhr6nx4JqY0_0fN9M6kmK__mO2Xyfkgct6aibFHWWOTsoR_n3JqHEbl0N1PxvYBoaPKw"
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
