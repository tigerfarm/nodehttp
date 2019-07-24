// From:
//  https://github.com/heroku/node-js-getting-started
//  https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment
// Sample:
//  https://github.com/expressjs/express/blob/master/examples/auth/index.js
//  
// To do:
//  Sample using: setHeaders
//

// -----------------------------------------------------------------------------
// $ npm install --save express
const express = require('express');
var app = express();

// $ npm install --save request
const request = require('request');
const url = require("url");

// -----------------------------------------------------------------------------
var path = require("path");

function runPhpProgram(theProgramName, theParameters, response) {
    console.log("+ Run: " + theProgramName + theParameters);
    const theProgram = '.heroku/php/bin/php ' + path.join(process.cwd(), theProgramName) + theParameters;
    const exec = require('child_process').exec;
    exec(theProgram, (error, stdout, stderr) => {
        theResponse = `${stdout}`;
        console.log('+ theResponse: ' + theResponse);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
        response.send(theResponse);
    });
}

// -----------------------------------------------------------------------------
function runProgram(theCommand, response) {
    const exec = require('child_process').exec;
    exec(theCommand, (error, stdout, stderr) => {
        theResponse = `${stdout}`;
        // console.log('+ theResponse: ');
        console.log(theResponse.substring(0, theResponse.length - 1));
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
        response.send(theResponse.substring(0, theResponse.length - 1));
    });
}

// -----------------------------------------------------------------------------
// Echo the request.

var theUrl = '';
var theQueryJson = '';
app.get('*', function (request, res, next) {
    console.log("------------------");
    console.log("+ HTTP headers:");
    var theHeaders = JSON.stringify(request.headers).split('","');
    for (var i = 0; i < theHeaders.length; i++) {
        if (i === 0) {
            console.log('++ ' + theHeaders[i].substring(1, theHeaders[i].length) + '"');
        } else if (i === theHeaders.length - 1) {
            console.log('++ "' + theHeaders[i] + '');
        } else {
            console.log('++ "' + theHeaders[i].substring(0, theHeaders[i].length - 1) + '"');
        }
    }
    console.log("---");
    theUrl = url.parse(request.url).pathname;
    theQueryJson = url.parse(request.url).query;
    var theQueryString = '';
    if (theQueryJson !== null) {
        theQueryString = " ? " + JSON.stringify(theQueryString);
    }
    var urlComponentMessage = '+ URL components : ' + request.method + ' ' + theUrl + theQueryString;
    console.log(urlComponentMessage);
    next();
});

// -----------------------------------------------------------------------------
app.get('/hello', function (req, res) {
    if (req.query.username) {
        res.send('Hello ' + req.query.username + '.');
    } else {
        res.send('Hello there.');
    }
});
app.post('/', function (req, res) {
    if (req.body.username) {
        res.send('Hello ' + req.body.username + '.');
    } else {
        res.send('Hello there.');
    }
});
// --------------------------------------
app.get('/redirect', function (req, res) {
    res.redirect('/redirected');
});
app.get('/redirected', function (req, res) {
    res.send('redirected.');
});

// -----------------------------------------------------------------------------
app.get('/show', function (req, res) {
    console.log("+ GET headers: " + JSON.stringify(req.headers));
    res.send('show get.');
});

app.use(express.urlencoded());
app.post('/show', function (req, res) {
    console.log("+ POST headers: " + JSON.stringify(req.headers));
    console.log("+ POST body: " + JSON.stringify(req.body));

    var data = '';
    req.on('data', function (chunk) {
        console.log('Received data:', chunk.toString());
        data += chunk.toString();
    });
    req.on('end', function () {
        console.log('Complete data:', data);
    });

    res.send('show post.');
});

// -----------------------------------------------------------------------------
app.get('/sayhello.php', function (req, res) {
    runPhpProgram('/docroot/sayhello.php', '', res);
});
app.get('/ls', function (req, res) {
    runProgram('ls', res);
});
app.get('/time', function (req, res) {
    runProgram('date', res);
});
app.get('/date', function (req, res) {
    runProgram('date', res);
});
app.get('/whereis', function (req, res) {
    runProgram('whereis php', res);
});

// -----------------------------------------------------------------------------
app.use(express.static('docroot'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('HTTP Error 500.');
});

// const path = require('path');
// export PORT=8080
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});
