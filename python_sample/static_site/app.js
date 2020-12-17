var express = require('express');
var app = express();
var os = require('os');
var hostname = os.hostname();

//get port from an environment variable
const PORT = process.env.PORT || 3000;



app.get('/static', function(req,res){ 
         
    res.send("Static content from " + hostname );

});


var server = app.listen(PORT, function(){
    console.log('Server running on port %d', PORT);
});
