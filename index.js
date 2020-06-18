var express = require('express');
var app = express();
app.use(express.static('public'));
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const InitiateTokenServese = require("./config/getToken");
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

InitiateTokenServese();

//for create shope with phone,name,password
app.use("/shop", shops);
//for login as shop username
//get
app.use("/recharge", recharge);

app.use("/operators", operators);

app.use("/topups", topups);

app.use("/transactions", transactions);

app.use("/distributor", distributor);


// app.get('/', function (req, res) {
//   res.sendfile('index.html');
// });


app.listen(3000, function(){
  console.log("Listening on port 3000!")
});
