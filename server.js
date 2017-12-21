var express = require('express');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');
var rfs = require('rotating-file-stream');
var bodyParser = require('body-parser');
var configs = require('./config');
const app = express();

// ensure log directory exists
if (fs.existsSync(configs.logDirectory))
  console.log(`Existing Log folder path: ${configs.logDirectory}`);
else {
  fs.mkdirSync(configs.logDirectory);
  console.log(`Created log file, path: ${configs.logDirectory}`);
}
// create a rotating write stream
var accessLogStream = rfs(configs.logFile, {
  size: '5M', // rotate every 5 MegaBytes written
  interval: '1d', // rotate daily
  // compress: 'gzip', // compress rotated files
  path: configs.logDirectory
});
// setup the logger
app.use(morgan('combined', {
  stream: accessLogStream
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/pwd', function (req, res) {
  console.log('req', req.query);
  // var query = req.query;
  // var userEmail = req.email;
  // validate the link
  res.redirect(configs.redirectUrl);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  res.sendFile(path.join(staticLocation, 'index.html'));
});

app.listen(configs.applicationPort, function () {
  console.log(`Listening on port ${configs.applicationPort}`);
});

module.exports = app;
