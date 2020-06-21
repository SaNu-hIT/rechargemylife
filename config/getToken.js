const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const TokenSchema = require("../model/token");
const request = require('request');
const fetch = require('node-fetch');
const InitiateTokenServese = async () => {
  try {

//
//     let token = await TokenSchema.find({
//     });
//
// if(token)
// {
//   var seconds = 1000;
//   var d = new Date();
//   var t= d.getTime();
//   console.log(""+token[0].expires_in);
//     console.log(token[0].expires_in);
// if(token[0].expires_in < Math.round(t / seconds))
// {
//
//   var url ='https://auth.reloadly.com/oauth/token';
//   var headers = {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
//    var raw = JSON.stringify(
//     {"client_id":"xXzIvm563MQjH9bbXix9NIW4HLsTPKiv",
//                        "client_secret":"nDEsFmHIhfNxicxA4w9E8RmPOq-fY5PzBRA2r02JKIBv9LR0GSCEf9nb0LysdxBx",
//                         "grant_type":"client_credentials","audience":"https://topups-sandbox.reloadly.com"}
//
//                    );
//   fetch(url, { method: 'POST', headers: headers, body: raw})
//     .then((res) => {
//           // console.log("JSON"+res.json());
//        return res.json()
//
//   })
//   .then((json) => {
//     // console.log("JSON"+json);
//        // console.log(json);
//        var access_token = json.access_token
//         var scope = json.scope
//          var expires_in = json.expires_in
//           var token_type = json.token_type
//             var id = json.id
//    console.log(scope);
//       let token = new TokenSchema({
//            access_token,
//            scope,
//            expires_in,token_type
//        });
//       token.update({id});
//     // Do something with the returned data.
//     // res.status(200).json(json);
//
//   });
//
// }else{
//      console.log("Token is valid");
// }
//
//
//
//
// }else{


      var url ='https://auth.reloadly.com/oauth/token';
      var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
       var raw = JSON.stringify(
        {"client_id":"xXzIvm563MQjH9bbXix9NIW4HLsTPKiv",
                           "client_secret":"nDEsFmHIhfNxicxA4w9E8RmPOq-fY5PzBRA2r02JKIBv9LR0GSCEf9nb0LysdxBx",
                            "grant_type":"client_credentials","audience":"https://topups-sandbox.reloadly.com"}

                       );
      fetch(url, { method: 'POST', headers: headers, body: raw})
        .then((res) => {
              // console.log("JSON"+res.json());
           return res.json()

      })
      .then((json) => {
        // console.log("JSON"+json);
           // console.log(json);
           var access_token = json.access_token
            var scope = json.scope
             var expires_in = json.expires_in
              var token_type = json.token_type
       console.log(access_token);
          let token = new TokenSchema({
               access_token,
               scope,
               expires_in,token_type
           });
          token.save();
        // Do something with the returned data.
        // res.status(200).json(json);

      });

// }


  } catch (err) {
      console.log(err.message);
      // res.status(500).send("Error in Saving");
  }


};
module.exports = InitiateTokenServese;
