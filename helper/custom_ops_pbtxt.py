#! /usr/bin/python

# Add custom attributes to tensorflow core ops.pbtxt

fileIn = 'ops.pbtxt'
fileOut = 'custom_ops.pbtxt'

# erase content
open(fileOut, 'w').close()

CustomAttributes = """
  attr {
    name: "hardware_target"
    type: "string"
    allowed_values {
      list {
        s: "APEX"
        s: "CPU"
        s: "HW-Target-1"
        s: "HW-Target-2"
      }
    }
  }
  attr {
    name: "quantization_type"
    type: "string"
    allowed_values {
      list {
        s: "Floating-point"
        s: "Fixed-point"
        s: "quant-type-1"
        s: "quant-type-2"
      }
    }
  }
"""

with open(fileIn) as f1, open(fileOut, 'a') as f2:
    lines = f1.readlines()
    skipName = False;
    for line in lines:
        if ('op {' in line):
            skipName = True;
            f2.write(line)
        elif ('name:' in line and skipName is True):
            # Insert after name
            skipName = False;
            f2.write(line)
            f2.write(CustomAttributes)
        else:
            f2.write(line)
