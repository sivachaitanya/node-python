import sys,json,os
from nltk.tag.stanford import StanfordNERTagger


def nermodel( jsondata ):
    
    #download stanford NER from https://nlp.stanford.edu/software/CRF-NER.html#Download
    # go to stanford-ner.jar path in stanfordNER model
    ner_tagger = StanfordNERTagger("/home/ubuntu/Documents/node-python/simple-express/python_scripts/bcm-model.ser.gz",
         "/home/ubuntu/Documents/stanford-ner-2018-10-16/stanford-ner.jar", encoding='utf8')
    result = ner_tagger.tag(jsondata.split())
    print(json.dumps({"output":result}))



for line in sys.stdin:
    nermodel(json.loads(line)['sentence'])