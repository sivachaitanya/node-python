import sys,json,time


def testfunc( jsondata ):
    data = json.loads(jsondata)['sentence']
    if type(data[0])==str:
        if type(data[1])==str:
            # Wait for 5 seconds
            time.sleep(5)
            print(json.dumps({"output":"Call sucessfull"}))
            


for line in sys.stdin:
    testfunc(line)