'use strict'
import express from 'express'
import * as Utils from './Utils'
let {PythonShell} = require('python-shell')
const util = require('util')

let app = express()
const { spawn } = require('child_process');
var bodyParser  =  require("body-parser");

var python_installation_path = '/home/ubuntu/anaconda3/bin/python';
var python_scriptsfolder_path = '/home/ubuntu/Documents/node-python/simple-express/python_scripts/';

//var python_installation_path = "C:\\Python27\\ArcGIS10.2\\python.exe";
//var python_scriptsfolder_path = "C:\\users\\joe\\file.txt\\node-python\\simple-express\\python_scripts";
//Here we are configuring express to use body-parser to read json data from the incoming req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API's 

// basic call to check the working on the node api server from postman or browser
app.get('/', (req, res) => {
  console.log(__dirname)
  let text = Utils.message()
  res.send(text)
})


 /*
     handles calling the python script hello.py and getting the stdout result from its execution using 
     python-shell library

     input - {"firstname":"XXXXX", "lastname" : "XXXXX"}
  */ 
app.post('/callpythonscript',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data - ',req.body)

   let options = {
    mode: 'text',
    pythonPath: python_installation_path,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: python_scriptsfolder_path,
    args: [req.body.firstname, req.body.lastname]
  };
  
  PythonShell.run('hello.py', options, function (err, results) {
    if (err) {
       console.log('****** Error/Warning from the Python shell - ',err)
       res.send({"error" : err})
    };
    // results is an array consisting of messages collected during execution
    console.log('<<<< stdout from py shell : %j', results);
    res.send(results)
  });

 

})


/*
     handles calling the python script echo_json.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"string1":"XXXXX", "string2" : "XXXXX"}
  */ 
app.post('/callpythonscript_return',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data - ',req.body)
   
   let options = {
    mode: 'json',
    pythonPath: python_installation_path,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: python_scriptsfolder_path,
   };

   let pyshell = new PythonShell('echo_json.py',options);
    
    pyshell.stdout.on('data', function (data) {
       console.log('<<<<<< stdout from py shell - ' + data)
       res.send(data)
    });
    pyshell.send(JSON.stringify(req.body)).end(function (err) {
      if (err) {
        console.log('****** Error/Warning from the Python shell - ',err)
        res.send({"error" : err})
     };
       
    });
      

})

/*
     handles calling the python script example1.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"sentence" : ["abc","def"]}
  */ 
 app.post('/callexample1',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data at Node - ',req.body)
   try {
   let options = {
    mode: 'json',
    pythonPath: python_installation_path,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: python_scriptsfolder_path,
   };

   
        let pyshell = new PythonShell('example1.py',options);
        
        pyshell.stdout.on('data', function (data) {
          console.log(' <<<<< stdout from py shell - ' + data)
          res.send(data)
        });
        pyshell.send(req.body).end(function (err) {
          if (err) {
            console.log('****** Error/Warning from the Python shell - ',err)
            res.send({"error":err})
          };
        });
    } catch (error) {
        console.log('***** ERROR from python shell -  '+ util.inspect(error))
        res.send({'error':error})
    }
      

})

/*
     handles calling the python script example2.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"sentence" : "Fred is studying at Stony Brook University in NY"}
  */ 
 app.post('/callexample2',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data at Node - ',req.body)
   try {
   let options = {
    mode: 'json',
    pythonPath: python_installation_path,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: python_scriptsfolder_path,
   };
 
   
      let pyshell = new PythonShell('example2.py',options);
      
      pyshell.stdout.on('data', function (data) {
        console.log(' <<<<< stdout from py shell - ' + data)
        res.send(data)
      });
      pyshell.send(req.body).end(function (err) {
        if (err) {
          console.log('****** Error/Warning from the Python shell - ',err)
          res.send({"error":err})
        };
      });
   } catch (error) {
      console.log('***** ERROR from python shell -  '+ util.inspect(error))
      res.send({'error':error})
   }
   
      

})

/*
     handles calling the python script tfexample.py and getting the stdout result from its execution using 
     python-shell library and return data from the python script

     input - {"sentence" : "Fred is studying at Stony Brook University in NY"}
  */ 
 app.post('/calltfexample',(req,res) => {
 
  // incoming request data can be accessed from req.body.XXXX and it has to be in JSON format
   console.log('Request data at Node - ',req.body)
   try {
   let options = {
    mode: 'text',
    pythonPath: python_installation_path,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: python_scriptsfolder_path,
    args: [req.body.sentence]
   };
   var out = {}
   
          let pyshell = new PythonShell('tfexample.py',options);
          pyshell.send({}).end(function (err) {
            if (err) {
              console.log('****** Error/Warning from the Python shell - ',err)
              res.send({"error":err})
            };
            res.send(out)
          }).on('message', function (data) {
            console.log(' <<<<< stdout from py shell - ' + data)
            if(data.includes('htmloutput',1)){
               out = JSON.parse(data);
            }
           // res.send(data)
          }).on('stderr', function (data) {
            console.log(' <<<<< stderr from py shell - ' + util.inspect(data))
            
           // res.send(data)
          }).on('error', function (data) {
            console.log(' <<<<< error from py shell - ' + util.inspect(data))
            
           // res.send(data)
          });
         
     
   } catch (error) {
       console.log('***** ERROR from python shell -  '+ util.inspect(error))
       res.send({'error':error})
   }
   
      

})


let server = app.listen(3000, () => {
  console.log(`Node server running at port http://localhost/${server.address().port}`)
})


