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



app.get('/healthz', function(req,res){ 
       
    //increment count metric
    request_counter.inc();
    
    res.send("working.....");

});

app.get('/metrics', function(req,res){   
	res.set('Content-Type', registry.contentType);
	res.end(registry.metrics());
	console.log("Metrics ")

});


var server = app.listen(3000, function(){
    console.log('Listen om port 3000');
});
