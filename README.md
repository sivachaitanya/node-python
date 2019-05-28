# Express + Python shell examples to execute AI/ML code

## How to use?
*  run `npm install`
* run `npm start` to start the dev server with nodemon
* change the directory path for python bin and python scripts as per your environment in lib/index.js in variables python_installation_path, python_scriptsfolder_path

## Pre-Req
* download Stanford NER [https://nlp.stanford.edu/software/CRF-NER.html#Download]
* install anaconda NLTK [https://anaconda.org/anaconda/nltk]
* system install tensorflow [https://www.tensorflow.org/install/pip]

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