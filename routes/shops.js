// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Shops = require("../model/shops");

/**
 * @method - POST
 * @param - /signup
 * @description - create shops
 */
router.post(
    "/createshops",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("phone", "Please enter a valid phone").not().isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
          check("distributorId", "Please enter a valid distributorId").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            username,
            phone,
            password,distributorId
        } = req.body;
        try {
            let user = await Shops.findOne({
                phone
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new Shops({
                username,
                phone,
                password,distributorId
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                      token:token,message:"Shops create success"
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);
router.get(
    "/getshops",
    [

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        try {
            let shops = await Shops.find({});
            res.status(200).json({status:"success",
            data : shops});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error getting data ");
        }
    }
);


router.get(
    "/getshop",
    [
    check("shopId", "Please enter a valid id").not().isEmpty(),
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
            let shops = await Shops.findOne({shopId});
            res.status(200).json({status:"success",
            data : shops});

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error getting data ");
        }
    }
);
router.post(
    "/shoplogin",
    [
        check("phone", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),  check("phoneId", "Please enter a valid password").isLength({
              min: 6
          })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            phone,
            password,phoneId
        } = req.body;


        try {
            let user = await Shops.findOne({
                phone
            });
            if (!user) {
                return res.status(400).json({
                    msg: "User Not Exists"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
            const payload = {
                user: {
                    id: user.id
                }
            };

            user.phoneId = phoneId

            await user.update();

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({status:"success",toke:token,userId:user.id
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


module.exports = router;
