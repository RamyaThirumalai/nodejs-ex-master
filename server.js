//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

    const dishRouter = require('./router/dishRouter');
    const promoRouter = require('./router/promoRouter');
    const leaderRouter = require('./router/leaderRouter');
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
  res.send("Welcome to the Page")
});

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, "ip");
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
