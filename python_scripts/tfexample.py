import sys,json,time
import tensorflow as tf
import numpy as np

def testfunc( jsondata ):
    print("Received JSON data at py - "+jsondata)
    try:
        data = jsondata
        input = tf.keras.layers.Input(shape=(20,))
        output = tf.keras.layers.Dense(2)(input)
        model = tf.keras.models.Model(inputs=input, outputs=output)
        model.compile(loss='mse', optimizer='sgd')
        model.fit(np.random.normal(0, 1, (200, 20)), np.random.normal(0, 1, (200, 2)))
        print(json.dumps({"htmloutput":"it works"}))
    except SyntaxError:
        print(json.dumps({"htmloutput":"a syntax error has occurred"}))
    

testfunc(sys.argv[1])