var express = require('express');
var app = express();
app.use(express.static('public'));
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const refreshToken = require("./config/refreshToken");

const shops = require("./routes/shops");

const recharge = require("./routes/recharge");
const operators = require("./routes/operators");
const topups = require("./routes/topups");
const transactions = require("./routes/transactions");
const distributor = require("./routes/distributor");
// Middleware
app.use(bodyParser.json());
// Initiate Mongo Server
InitiateMongoServer();

//for create shope with phone,name,password
app.use("/shop", shops);
//for login as shop username

app.use("/recharge", recharge);

app.use("/operators", operators);

app.use("/topups", topups);

app.use("/transactions", transactions);

app.use("/distributor", distributor);


// app.get('/', function (req, res) {
//   res.sendfile('index.html');
// });


app.listen(process.env.PORT || 3000, function() {
  console.log('listening on ports');
});