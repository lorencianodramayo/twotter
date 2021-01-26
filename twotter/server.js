const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

//access points
app.use(enforce.HTTPS({ trustProtoHeader: true }));
//serve all files
app.use(serveStatic(__dirname + '/dist'));
//running history fix router history issues
app.use(history());

//ports
app.listen(process.env.PORT || 5000);