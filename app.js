const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const users = require('./routes/user.js');
const index = require('./routes/index.js');
const contact = require('./routes/contact.js');
const passForgot = require('./routes/passForgot.js');
const dashboard = require('./routes/dashboard.js');
const { blockHTMLRequests, requstTime } = require('./middleware/AllMiddleware.js');
const session = require('express-session');
const i18n = require('./i18n.js');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Aktualisieren Sie auf die Adresse Ihres Frontends
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
}));

app.use(requstTime);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Statischer Dateiserver für public-Ordner
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(i18n.init);
app.use(blockHTMLRequests);

// View Engine
app.set('view engine', 'ejs');

// Routen
app.use('/', index);
app.use('/', users);
app.use('/', contact);
app.use('/', passForgot);
app.use('/', dashboard);

// Fehlerseiten
app.use(function(req, res, next) {
    next(createError(404, 'Not Found'));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error'); // Ersetzen Sie 'error' durch Ihren tatsächlichen Fehlerseiten-View
});

module.exports = app;