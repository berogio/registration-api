const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors')
const users = require('./routes/user.js');
const index = require('./routes/index.js');
const contact = require('./routes/contact.js');
var session = require('express-session')


const app = express();




let requstTime = function(req, res, next) {
    req.requesTime = Date.now()
    next()
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))

const blockHTMLRequests = (req, res, next) => {
    const requestPath = req.path;
    if (requestPath.endsWith('.html')) {
        res.status(403).send('Access to HTML files is not allowed');
    } else {
        next();
    }
};

app.use(blockHTMLRequests);

app.use(requstTime)
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use('/', contact);



app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send('<h1>Error</h1><p>' + err.message + '</p>');
});

module.exports = app;