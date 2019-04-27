// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  const dateString = req.params.date_string;
  if (dateString === undefined) {
    res.send({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    }); 
  } else {
    let date;
    if (dateIsNum(dateString)) {
      date = new Date(Number(dateString));
    } else {
      date = new Date(dateString); 
    }
    if (!isNaN(date)) {
      res.send({
        unix: date.getTime(),
        utc: date.toUTCString()
      }); 
    } else {
      res.send({
        error: "Invalid Date" 
      }); 
    }
  }
});

const dateIsNum = (dateString) => {
  for (let i = 0; i < dateString.length; i++) {
    if (isNaN(dateString[i])) {
      return false; 
    }
  }
  return true;
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});