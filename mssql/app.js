var express = require('express');
var app = express();



//get port from an environment variable
const PORT = process.env.PORT || 3000;

//mssql
const sql = require('mssql')




app.get('/healthz', function(req,res){ 
        	
    res.send("Working!!!!!.");

});

app.get('/mssql', function(req,res){ 

    async () => {
        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect('mssql://test_openshift:')
            const result = await sql.query`select * from openshift`
            console.dir(result)
            res.send(result);
        } catch (err) {
            // ... error checks
        }
    }
        	

});

var server = app.listen(PORT, function(){
    console.log('Server running on port %d', PORT);
});

