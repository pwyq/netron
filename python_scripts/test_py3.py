
# this is for py3
"""
# TODO
1. load .pb file
	- 1. load it, then WHAT? convert to a new graph or graph_def?
2. add custom attributes to (proper) nodes
	- load op
	- add new attributes to old attributes list
	- create new op
	- delete old op
3. generate new .pb file
	- create new node (op); based upon that, generate new GraphDef object
	- generate .pb or .pbtxt using the GraphDef
"""

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
	opInputs = op.inputs 				# The list of Tensor objects representing the data inputs of this op.
	opInputTypes = [x.dtype.base_dtype for x in opInputs]
	opOutputs = op.outputs
	opOutputTypes = [x.dtype.base_dtype for x in opOutputs]
	opNativeOutputTypes = op._output_types		# this returns an Int, I guess it's a enum

	opControlInput = op.control_inputs
	# op._add_control_input(self, new_op)
	opDevice = op.device 				# cpu or gpu, can i put hardware target here??? Better not, it will conflict with cpu, gpu
	# op._set_device('APEX')	# work!
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
	# print("10. opNodeDef =\n\t{}".format(opNodeDef))		# Same Output as `print op`
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

def test2():
	new_node = input_graph_def.node.add()	# adds a new node
	new_node.name = "custom_node"
	op.get_operation_by_name(operationName)
	new_node.op = op.name
	new_node.input = op.input


	# new_node = node_def_pb2.NodeDef()
	# new_node.attr.add()


if __name__ == '__main__':
	# test1()

	graphName = "FREESPACE_graph.pb"
	operationName = "down1_1/maxpool/MaxPool"

	input_graph_def = fg._parse_input_graph_proto(graphName, True)	# input_binary: A Bool. True means input_graph is .pb, False indicates .pbtxt.
	graph = loadFrozenGraphByPB(input_graph_def)
	main()
	# test2()

	# op._set_attr('hardware_target', {'sss':'cao'})
	# op.op_def.attr.extend([['hardware_target'], ['string'], 0, ['no description'], False, 0, ['allow1', 'allow2']])

	for n in input_graph_def.node:
	# attr {
	#   name: "data_format"
	#   type: "string"
	#   default_value {
	#     s: "NHWC"
	#   }
	#   allowed_values {
	#     list {
	#       s: "NHWC"
	#       s: "NCHW"
	#       s: "NCHW_VECT_C"
	#     }
	#   }
	# }
		if (operationName in n.name):
			print('---')
			print(n.name)
			print(n.input)
			print(n.attr)
			print(n.device)
			printOperationInfo(graph, operationName)

	# 		for k in n.attr.keys():
	# 			print 'k={}\nv={}'.format(k, n.attr[k])
	# 		print '-------'
	# 		for k, v in six.iteritems(n.attr):
	# 			print 'k={}\nv={}'.format(k, v)
			# for k in six.iteritems(n.attr.keys()):xxx
			# 	print n.attr[k]xxx
	"""
			print n.attr.keys()	# [u'ksize', u'padding', u'T', u'data_format', u'strides']
			old_attr = n.attr
			print "type(old_attr) = \n{}".format(type(old_attr))
			print "type(old_attr['padding']) = \n{}".format(type(old_attr['padding']))
			print "type(op.node_def) = \n{}".format(type(op.node_def))

			print "-------------111"
			# attr_json = MessageToJson(old_attr)	# 'google.protobuf.pyext._message.MessageMapContainer' object has no attribute 'DESCRIPTOR'
			# print attr_json
			print "-------------222"
			attr_padding_json = MessageToJson(old_attr['padding'])
			print attr_padding_json
			print "-------------333"
			op_node_def_json = MessageToJson(op.node_def)
			print op_node_def_json
			print "-------------444"
	"""

	"""
			# print "old_attr = \n{}".format(old_attr)
			# print op.get_attr('data_format')

			# op._set_device('APEX')	# work! (if cannot add custom attr, use this as workaround?)

			# op._set_attr('hardware_target', {'sss':'cao'})
			op_node_def = op.node_def
			new_node_def = op_node_def
			if old_attr is not None:
				for k, v in six.iteritems(old_attr):
					print k
					print v
					new_node_def.attr[k].CopyFrom(v)	# CopyFrom is 
				# new_node_def.attr['hardware_target'].CopyFrom("APEX")
				# new_node_def.attr['padding'].list.type.extend([30])		# work
				# new_node_def.attr['padding'].str.type.extend(['sucklife'])
				# print new_node_def.attr['padding']
			jsoned_attr = MessageToJson(op_node_def)
			print "-------------111"
			# print jsoned_attr
			open('aaaaaaaaaa.json', 'w').close()
			with open('aaaaaaaaaa.json', 'a') as fout:
				# fout.write(op_node_def)
				print op_node_def
				print '-------------- convert to json format:'
				print jsoned_attr
				fout.write(jsoned_attr)
			print "--------------222"
			# print op_node_def
			# print "--------------"
			# print new_node_def
			# print "--------------"
	"""
			# >>> u'foo'
			# u'foo'
			# >>> unicode('foo')
			# u'foo'

"""
MAYBE useful??
https://www.tensorflow.org/api_docs/python/tf/Graph#create_op
https://www.tensorflow.org/api_docs/python/tf/Graph#finalize
get_operation_by_name
get_operations


  def _set_attr(self, attr_name, attr_value):
    # Private method used to set an attribute in the node_def.
    buf = c_api.TF_NewBufferFromString(
        compat.as_bytes(attr_value.SerializeToString()))
    try:
      # pylint: disable=protected-access
      c_api.SetAttr(self._graph._c_graph, self._c_op, attr_name, buf)
      # pylint: enable=protected-access
    finally:
      c_api.TF_DeleteBuffer(buf)
"""