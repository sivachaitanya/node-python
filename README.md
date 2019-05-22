# Express + Babel Server

## How to use?
*  run `npm install`
* run `npm start` to start the dev server with nodemon

## Pre-Req
* download Stanford NER [https://nlp.stanford.edu/software/CRF-NER.html#Download]
* install anaconda NLTK [https://anaconda.org/anaconda/nltk]

## API links 
* [GET]http://localhost:3000/
* [GET]http://localhost:3000/callpythonscript   [input data - {'firstname':"xyz", 'lastname':"abc"}]
* [GET]http://localhost:3000/callpythonscript_return  [input data - any json]
* [GET]http://localhost:3000/callexample1  [input data - {"sentence" : ["abc","def"]}]
* [GET]http://localhost:3000/callexample2  [input data - {"sentence" : "Fred is studying at Stony Brook University in NY"}]



## Curl
* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/callpythonscript  -d '{"firstname":"test","lastname":"test"}'

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/callexample1  -d '{"sentence":["abc","def"]}'

* curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/callexample2  -d '{"sentence" : "Fred is studying at Stony Brook University in NY"}'