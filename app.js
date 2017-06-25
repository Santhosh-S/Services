'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
var fs = require('fs');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});


var sys = require('sys');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


app.post('/save/file',function(req,res){
    if(!fs.existsSync('./tmp/santhosh')){
        fs.mkdirSync('./tmp/santhosh');
    }
    var stream = fs.createWriteStream("tmp/santhosh/test.c");
    stream.once('open',function(fd){
        stream.write(req.body.file);
        stream.end();
        res.json('saved');
    })

}); 

app.post('/compile/file',function(req,res){
var child = exec("gcc -o tmp/santhosh/test tmp/santhosh/test.c", function(error, stdout, stderr){
 

 if(stderr){
     console.log("stderr",stderr);
res.json(stderr);
 }else{
     res.json(stdout);
 }
 
 });
});



app.post('/output/file',function(req,res){
    console.log("waiting for outpput");
   var child = spawn("./tmp/santhosh/test", function(error, stdout, stderr){
 console.log("output", stdout);
  console.log("outputerr", error);

 console.log("output stderr", stderr);

 res.json(stdout);
 });

}); 



app.listen(3000, function(){
    console.log("server strated")
})
