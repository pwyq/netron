#!/usr/bin/python3
# PEP8
import os
import re
import sys
import tensorflow as tf

from sys import platform as _platform
from tensorflow.python.tools import freeze_graph as fg


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
    opInputs = op.inputs                # The list of Tensor objects representing the data inputs of this op.
    opInputTypes = [x.dtype.base_dtype for x in opInputs]
    opOutputs = op.outputs
    opOutputTypes = [x.dtype.base_dtype for x in opOutputs]
    opNativeOutputTypes = op._output_types        # this returns an Int, I guess it's a enum

    opControlInput = op.control_inputs
    # op._add_control_input(self, new_op)
    opDevice = op.device                # cpu or gpu, can i put hardware target here??? Better not, it will conflict with cpu, gpu
    # op._set_device('APEX')    # work!
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
    # print("10. opNodeDef =\n\t{}".format(opNodeDef))        # Same Output as `print op`
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


def dumpToTXT(output_file, pb_file):
    os.umask(0)
    with open(os.open(output_file, os.O_CREAT | os.O_WRONLY, 0o777), 'w') as f:
        print("digraph graphname {", file=f)
        graph_def = fg._parse_input_graph_proto(pb_file, True)
        for node in graph_def.node:
            output_name = node.name
            print("  \"" + output_name + "\" [label=\"" + node.op + "\"];", file=f)
            for input_full_name in node.input:
                parts = input_full_name.split(":")
                input_name = re.sub(r"^\^", "", parts[0])
                print("  \"" + input_name + "\" -> \"" + output_name + "\";", file=f)
        print("}", file=f)

if __name__ == '__main__':
    # TODO
    # - output to JSON
    # - docstring
    output_file_path = ""
    pb_file_path = ""
    if _platform == "win32" or _platform == "win64":
        # TODO
        # test if work on path that contains spaces
        output_file_path = sys.argv[1].replace(os.path.sep, '\\')
        pb_file_path = sys.argv[2].replace(os.path.sep, '\\')
    elif _platform == "darwin":
        pass  # TODO to test
    elif _platform == "linux" or _platform == "linux2":
        pass  # TODO to test
    # print(pb_file_path)
    # print(os.path.isfile(pb_file_path))  # True from Netron debugger, when testing, need to pass as string (ie, 'C:\path\to\files')

    assert(os.path.isfile(pb_file_path) is True)

    print("==== test dumpToTXT ====")
    dumpToTXT(output_file_path, pb_file_path)
    print("==== test dumpToTXT ====")

    print("{} is done.".format(os.path.basename(__file__)))

# End Of File
