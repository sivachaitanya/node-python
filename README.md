# Express + Python shell examples to execute AI/ML code

## How to use?
*  run `npm install`
* run `npm start` to start the dev server with nodemon
* change the directory path for python bin and python scripts as per your environment in lib/index.js in variables python_installation_path, python_scriptsfolder_path

## Pre-Req
* download Stanford NER [https://nlp.stanford.edu/software/CRF-NER.html#Download]
* install anaconda NLTK [https://anaconda.org/anaconda/nltk]
* system install tensorflow [https://www.tensorflow.org/install/pip]
* On ubuntu install apache-utils which will also have ab

## API links 
* [GET]http://localhost:3000/
* [POST]http://localhost:3000/callpythonscript   [input data - {'firstname':"xyz", 'lastname':"abc"}]
* [POST]http://localhost:3000/callpythonscript_return  [input data - any json]
* [POST]http://localhost:3000/callexample1  [input data - {"sentence" : ["abc","def"]}]
* [POST]http://localhost:3000/callexample2  [input data - {"sentence" : "Fred is studying at Stony Brook University in NY"}]
* [POST]http://localhost:3000/calltfexample  [input data - {"sentence" : "Fred is studying at Stony Brook University in NY"}]


## Curl
* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST http://localhost:3000/callpythonscript  -d '{"firstname":"test","lastname":"test"}'

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST http://localhost:3000/callexample1  -d '{"sentence":["abc","def"]}'

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST http://localhost:3000/callexample2  -d '{"sentence" : "Fred is studying at Stony Brook University in NY"}'

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST http://localhost:3000/calltfexample  -d '{"sentence" : "Fred is studying at Stony Brook University in NY"}'

## Apache Work Bench to load test the api end point

* navigate to jsondat folder and execute this command - 
ab -p tf.json -T application/json  -c 30 -n 30 http://localhost:3000/calltfexample

## AB metrics for 30 concurrent users accessing tensorflow model api end point 

```
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /calltfexample
Document Length:        398 bytes

Concurrency Level:      30
Time taken for tests:   12.702 seconds
Complete requests:      30
Failed requests:        0
Total transferred:      18210 bytes
Total body sent:        6600
HTML transferred:       11940 bytes
Requests per second:    2.36 [#/sec] (mean)
Time per request:       12702.000 [ms] (mean)
Time per request:       423.400 [ms] (mean, across all concurrent requests)
Transfer rate:          1.40 [Kbytes/sec] received
                        0.51 kb/s sent
                        1.91 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.1      1       1
Processing: 11282 12299 402.7  12490   12701
Waiting:    11282 12299 402.7  12490   12701
Total:      11283 12299 402.7  12490   12701

Percentage of the requests served within a certain time (ms)
  50%  12490
  66%  12504
  75%  12577
  80%  12605
  90%  12624
  95%  12642
  98%  12701
  99%  12701
 100%  12701 (longest request)
 ```
