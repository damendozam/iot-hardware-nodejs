import tsl2561
import veml6070
import bme280

import json

"""""
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
"""

if __name__ == '__main__':
    while True:
        veml = veml6070.Veml6070()
        uv_raw = veml.get_uva_light_intensity_raw()
        uv = veml.get_uva_light_intensity()
        temperature,pressure,humidity = bme280.readBME280All()
        (ch0,ch1)= tsl2561.readValues()

        x={
            "uv":uv,
            "temperature":temperature,
            "pressure":pressure,
            "humidity":humidity,
            "infrared":ch1,
            "visible":(ch0-ch1)
        }

        y = json.dumps(x)
        print(y)

    