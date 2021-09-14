import json

# a Python object (dict):
x = {
    "temp": 20,
    "hum": 8.6
}

# convert into JSON:
y = json.dumps(x)

# the result is a JSON string:
while True:
    print(y)