#!/usr/bin/python3
import os
import sys
import tensorflow as tf
# https://pypi.org/project/six/
import six
import json

from tensorflow.python.tools import freeze_graph as fg
from tensorflow.python.framework import ops
from google.protobuf.json_format import MessageToJson, Parse
# https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/tools/freeze_graph.py

from tensorflow.core.framework import attr_value_pb2
from tensorflow.core.framework import graph_pb2
from tensorflow.core.framework import node_def_pb2
from tensorflow.core.framework import op_def_pb2


# FOLLOWING IS FOR PYTHON3
def outputToFile(file_path, data):
  os.umask(0)
  with open(os.open(file_path, os.O_CREAT | os.O_WRONLY, 0o777), 'w') as f:
    f.write("hello from netron via python exe")
    f.write(data)

def loadFrozenGraphByPB(aPB):
  # Import graph_def into a new graph
  with tf.Graph().as_default() as lGraph:
    # op.name prefix will be `import/` if name=None
    tf.import_graph_def(aPB, input_map=None, return_elements=None, name="", producer_op_list=None)
  return lGraph

def loadFrozenGraphByFile(aFronzenFileName):
  # load the protobuf file from disk and parse it to retrieve the unserialized graph_def
  # following 3 lines do the exact thing same thing as `freeze_graph._parse_input_graph_proto(graph, True)`

  # use as_graph_def() to return a serialized GraphDef
  with tf.gfile.GFile(aFronzenFileName, 'rb') as f:
    lGraphDef = tf.GraphDef()
    lGraphDef.ParseFromString(f.read())

  lGraph = loadFrozenGraphByPB(lGraphDef)
  return lGraph

def printOperationInfo(aGraph, aOpName):
  op = aGraph.get_operation_by_name(aOpName)
  print("\n==== Operation (ie op.node_def) ====")
  print(op)
  print("====================================\n")

  opName = op.name

  opType = op.type
  opInputs = op.inputs        # The list of Tensor objects representing the data inputs of this op.
  opInputTypes = [x.dtype.base_dtype for x in opInputs]
  opOutputs = op.outputs
  opOutputTypes = [x.dtype.base_dtype for x in opOutputs]
  opNativeOutputTypes = op._output_types    # this returns an Int, I guess it's a enum

  opControlInput = op.control_inputs
  # op._add_control_input(self, new_op)
  opDevice = op.device        # cpu or gpu, can i put hardware target here??? Better not, it will conflict with cpu, gpu
  # op._set_device('APEX')  # work!
  opGraph = op.graph
  opNodeDef = op.node_def
  opDef = op.op_def
  opTraceback = op.traceback
  opTracebackWithStartLine = op.traceback_with_start_lines
  opColocationGroups = op.colocation_groups()

  print("1. opName =\n\t{}".format(opName))
  print("2. opType =\n\t{}".format(opType))
  print("3. opInputs =\n\t{}".format([x for x in opInputs]))
  print("4. opInputTypes =\n\t{}".format(opInputTypes))
  print("5. opOutputs =\n\t{}".format([x for x in opOutputs]))
  print("6. opOutputTypes =\n\t{}".format(opOutputTypes))
  print("6-1. opNativeOutputTypes =\n\t{}".format(opNativeOutputTypes))
  print("7. opControlInput =\n\t{}".format(opControlInput))
  print("8. opDevice =\n\t{}".format(opDevice))
  print("9. opGraph =\n\t{}".format(opGraph))
  # print("10. opNodeDef =\n\t{}".format(opNodeDef))    # Same Output as `print op`
  print("11. opDef =\n\t{}".format(opDef))
  # print("12. opTraceback =\n\t{}".format(opTraceback))
  # print("13. opTracebackWithStartLine =\n\t{}".format(opTracebackWithStartLine))
  print("14. opColocationGroups =\n\t{}".format(opColocationGroups))

  print("==== Attributes ====")
  for n in input_graph_def.node:
    if (aOpName in n.name):
      for k in n.attr.keys():
        print('key = {}\nv:\n{}'.format(k, n.attr[k]))
  print("====================")

def main():
  printOperationInfo(graph, operationName)
  # op = graph.get_operation_by_name(operationName)

def test1():
  import tensorflow as tf
  import sys
  from tensorflow.python.platform import gfile

  from tensorflow.core.protobuf import saved_model_pb2
  from tensorflow.python.util import compat

  # TODO: user arg as input
  fileIn = "FREESPACE_graph.pb"

  with tf.Session() as persisted_sess:
    with gfile.FastGFile(fileIn, 'rb') as f:
      graph_def = tf.GraphDef()
      graph_def.ParseFromString(f.read())
      persisted_sess.graph.as_default()
      tf.import_graph_def(graph_def, name='')
      # write = tf.summary.FileWriter("./tf_summary", graph=persisted_sess.graph)
      for op in persisted_sess.graph.get_operations():
        # print tf.Operation.get_attr(op.name)
        # print op.name
        # print op
        try:
          print(op.attr)
        except AttributeError:
          print("no attr for {}".format(op.name))

def test3():
  with open(FLAGS.dot_output, "wb") as f:
    print("digraph graphname {", file=f)
    for node in graph.node:
      output_name = node.name
      print("  \"" + output_name + "\" [label=\"" + node.op + "\"];", file=f)
      for input_full_name in node.input:
        parts = input_full_name.split(":")
        input_name = re.sub(r"^\^", "", parts[0])
        print("  \"" + input_name + "\" -> \"" + output_name + "\";", file=f)
    print("}", file=f)

if __name__ == '__main__':
  graphName = "FREESPACE_graph.pb"
  operationName = "down1_1/maxpool/MaxPool"

  # test1()

  output_file_path = sys.argv[1]
  pb_file_path = sys.argv[2]

  input_graph_def = fg._parse_input_graph_proto(pb_file_path, True)
  graph = loadFrozenGraphByPB(input_graph_def)


  # TODO:
  #   - goto specific directory, get the file
  #   - output to txt
  #   - output to JSON


  # input_graph_def = fg._parse_input_graph_proto(graphName, True)  # input_binary: A Bool. True means input_graph is .pb, False indicates .pbtxt.
  # graph = loadFrozenGraphByPB(input_graph_def)
  # main()


  # graph = graph_pb2.GraphDef()
  # with open(FLAGS.graph, "r") as f:
  #   if FLAGS.input_binary:
  #     graph.ParseFromString(f.read())
  #   else:
  #     text_format.Merge(f.read(), graph)

  # with open(FLAGS.dot_output, "wb") as f:
  #   print("digraph graphname {", file=f)
  #   for node in graph.node:
  #     output_name = node.name
  #     print("  \"" + output_name + "\" [label=\"" + node.op + "\"];", file=f)
  #     for input_full_name in node.input:
  #       parts = input_full_name.split(":")
  #       input_name = re.sub(r"^\^", "", parts[0])
  #       print("  \"" + input_name + "\" -> \"" + output_name + "\";", file=f)
  #   print("}", file=f)
  # print("Created DOT file '" + FLAGS.dot_output + "'.")