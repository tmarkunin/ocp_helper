var express = require('express');
var app = express();


require('./node_modules/log-timestamp');
const client = require('./node_modules/prom-client');
const registry = new client.Registry();
var request = require('./node_modules/request');

//Prometheus metrics
const gauge = new client.Gauge({name: 'njs_health', help: 'Health status of nodejs app'});
const request_counter = new client.Counter({ name: 'request_counter', help: 'number of times healthz endpoint was requested' });

registry.registerMetric(gauge);
registry.registerMetric(request_counter);
gauge.set(0, new Date());

//Logging initialization
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
app.use(expressLogger);

//get port from an environment variable
const PORT = process.env.PORT || 3000;




app.get('/healthz', function(req,res){ 
       
     logger.debug('Calling healthz endpoint');  	
    //increment count metric
    request_counter.inc();
    
    res.send("Working!!!!!.");

});

app.get('/metrics', function(req,res){   
	res.set('Content-Type', registry.contentType);
	res.end(registry.metrics());
	logger.debug('Calling metrics endpoint');

});


var server = app.listen(PORT, function(){
    logger.info('Server running on port %d', PORT);
});
