#! /usr/bin/python

# Add custom attributes to tensorflow core ops.pbtxt @ https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/ops/ops.pbtxt
# After generating a new .pbtxt file, run `./tf-update` in tools/metadata

fileIn = '../third_party/tensorflow/tensorflow/core/ops/ops.pbtxt'
fileOut = 'custom_ops.pbtxt'

# erase content
open(fileOut, 'w').close()

# Note:
#   To add default_values:
#``` 
#       default_value {
#         s: "your_default_value_here"
#       }
#```
CustomAttributes = """
  attr {
    name: "hardware_target"
    type: "string"
    default_value {
      s: "test123"
    }
    allowed_values {
      list {
        s: "APEX"
        s: "CPU"
        s: "HW-Target-1"
        s: "HW-Target-2"
        s: "test123"
      }
    }
  }
  attr {
    name: "quantization_type"
    type: "string"
    default_value {
      s: "test456"
    }
    allowed_values {
      list {
        s: "Floating-point"
        s: "Fixed-point"
        s: "quant-type-1"
        s: "quant-type-2"
        s: "test456"
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
