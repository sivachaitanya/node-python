'use strict'
import express from 'express'
import * as Utils from './Utils'
import {PythonShell} from 'python-shell';

let app = express()
const { spawn } = require('child_process');
var bodyParser  =  require("body-parser");

//Here we are configuring express to use body-parser to read json data from the incoming req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API's 

// basic call to check the working on the node api server from postman or browser
app.get('/', (req, res) => {
  let text = Utils.message()
  res.send(text)
})


 /*
     handles calling the python script hello.py and getting the stdout result from its execution using 
     python-shell library

     input - {"firstname":"XXXXX", "lastname" : "XXXXX"}
  */ 
app.get('/callpythonscript',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data - ',req.body)

   let options = {
    mode: 'text',
    pythonPath: '/home/ubuntu/anaconda3/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/home/ubuntu/Documents/node-python/simple-express/python_scripts/',
    args: [req.body.firstname, req.body.lastname]
  };
  
  PythonShell.run('hello.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    res.send(results)
  });

 

})


/*
     handles calling the python script echo_json.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"string1":"XXXXX", "string2" : "XXXXX"}
  */ 
app.get('/callpythonscript_return',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data - ',req.body)
   
   let options = {
    mode: 'json',
    pythonPath: '/home/ubuntu/anaconda3/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/home/ubuntu/Documents/node-python/simple-express/python_scripts/'
   };

   let pyshell = new PythonShell('echo_json.py',options);
    
    pyshell.stdout.on('data', function (data) {
       console.log('data from python - ' + data)
       res.send(data)
    });
    pyshell.send(JSON.stringify(req.body)).end(function (err) {
        if (err) return done(err);
       
    });
      

})

/*
     handles calling the python script example1.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"sentence" : ["abc","def"]}
  */ 
 app.get('/callexample1',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data at Node - ',req.body)
   
   let options = {
    mode: 'json',
    pythonPath: '/home/ubuntu/anaconda3/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/home/ubuntu/Documents/node-python/simple-express/python_scripts/'
   };

   let pyshell = new PythonShell('example1.py',options);
    
    pyshell.stdout.on('data', function (data) {
       console.log('data from python - ' + data)
       res.send(data)
    });
    pyshell.send(req.body).end(function (err) {
        if (err) return done(err);
       
    });
      

})

/*
     handles calling the python script example2.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"sentence" : "Fred is studying at Stony Brook University in NY"}
  */ 
 app.get('/callexample2',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data at Node - ',req.body)
   
   let options = {
    mode: 'json',
    pythonPath: '/home/ubuntu/anaconda3/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/home/ubuntu/Documents/node-python/simple-express/python_scripts/'
   };

   let pyshell = new PythonShell('example2.py',options);
    
    pyshell.stdout.on('data', function (data) {
       console.log('data from python - ' + data)
       res.send(data)
    });
    pyshell.send(req.body).end(function (err) {
        if (err) return done(err);
       
    });
      

})


let server = app.listen(3000, () => {
  console.log(`Node server running at port http://localhost/${server.address().port}`)
})

