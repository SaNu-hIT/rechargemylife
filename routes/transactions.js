// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const Transaction = require("../model/transactions");
const Wallet = require("../model/wallet");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.get(
    "/gettransactions",
    [
        check("shopId", "Please Enter a Valid shop Id")
        .not()
        .isEmpty()

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            shopId
        } = req.body;

        try {
            let user = await Transaction.find({
                shopId
            });
            if (!user) {
                return res.status(400).json({
                    msg: "User Not Exists"
                });
            }
            res.status(200).json({status:"success",
            data : user});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error getting data ");
        }
    }
);


router.get(
    "/getwallet",
    [
        check("shopId", "Please Enter a Valid shop Id")
        .not()
        .isEmpty()

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            shopId
        } = req.body;

        try {
            let wallet = await Wallet.find({
                shopId
            });

            res.status(200).json({status:"success",
            data : wallet});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error getting data ");
        }
    }
);


module.exports = router;
