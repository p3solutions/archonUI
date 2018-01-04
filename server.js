let express = require('express');
let path = require('path');
let morgan = require('morgan');
let fs = require('fs');
let rfs = require('rotating-file-stream');
let bodyParser = require('body-parser');
let configs = require('./config');
const app = express();
let http = require('http');
let querystring = require('querystring');

// ensure log directory exists
if (fs.existsSync(configs.logDirectory))
  console.log(`Existing Log folder path: ${configs.logDirectory}`);
else {
  fs.mkdirSync(configs.logDirectory);
  console.log(`Created log file, path: ${configs.logDirectory}`);
}
// create a rotating write stream
let accessLogStream = rfs(configs.logFile, {
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

// http://13.58.89.64:9000/auth/key-validity?resetKey=b5042e6b041747fb86296c5447b31b8
const validateLinkFn = function (url, resetKey, pwdResetResponse) {
  console.log('url:', url);
  http.get(url, (response) => {
    // console.log('http responsep:', response);
    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', (chunk) => {
      // console.log('on data:', chunk);
      rawData += chunk;
    });
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log('parsedData:', parsedData);
        const redirectUrl =
          (!parsedData.success || !parsedData.data.keyExists) ? // for success=false or keyExists=false
          (configs.forgotPwdUrl + configs.showLinkError) : //redirect to forgotPwdUrl & show error
          configs.resetPwdUrl; // else redirect to resetPwdUrl
        console.log('redirecting to', redirectUrl);
        pwdResetResponse.redirect(redirectUrl + '?resetKey=' + resetKey);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

// localhost:8000/pwd-reset?resetKey=b5042e6b041747fb86296c5447b31b8e
app.get(configs.pwdResetUrl, function (req, res) {
  if (req.query && req.query.resetKey) {
    const resetKey = req.query.resetKey;
    const validateLinkUrl = configs.validateLinkUrl + 'resetKey=' + resetKey;
    console.log('received validateLinkUrl:', validateLinkUrl);
    validateLinkFn(validateLinkUrl, resetKey, res);
  } else {
    res.redirect(configs.forgotPwdUrl + configs.showLinkError);
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('catch 404 and forward to error handler');
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
  // res.sendFile(path.join(staticLocation, 'index.html'));
  res.redirect(configs.forgotPwdUrl + configs.showLinkError);
});

app.listen(configs.applicationPort, function () {
  console.log(`Listening on port ${configs.applicationPort}`);
});

module.exports = app;
