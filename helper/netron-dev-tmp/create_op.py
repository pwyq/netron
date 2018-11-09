  def _create_op_from_tf_operation(self, c_op, compute_device=True):
    """Creates an `Operation` in this graph from the supplied TF_Operation.
    This method is like create_op() except the new Operation is constructed
    using `c_op`. The returned Operation will have `c_op` as its _c_op
    field. This is used to create Operation objects around TF_Operations created
    indirectly by the C API (e.g. by TF_ImportGraphDef, TF_FinishWhile).
    This function does not call Operation._control_flow_post_processing or
    Graph._control_dependencies_for_inputs (since the inputs may not be
    available yet). The caller is responsible for calling these methods.
    Args:
      c_op: a wrapped TF_Operation
      compute_device: (Optional.) If True, device functions will be executed
        to compute the device property of the Operation.
    Returns:
      An `Operation` object.
    """



  def create_op(
      self,
      op_type,
      inputs,
      dtypes,  # pylint: disable=redefined-outer-name
      input_types=None,
      name=None,
      attrs=None,
      op_def=None,
      compute_shapes=True,
      compute_device=True):
    """Creates an `Operation` in this graph.
    This is a low-level interface for creating an `Operation`. Most
    programs will not call this method directly, and instead use the
    Python op constructors, such as `tf.constant()`, which add ops to
    the default graph.
    Args:
      op_type: The `Operation` type to create. This corresponds to the
        `OpDef.name` field for the proto that defines the operation.
      inputs: A list of `Tensor` objects that will be inputs to the `Operation`.
      dtypes: A list of `DType` objects that will be the types of the tensors
        that the operation produces.
      input_types: (Optional.) A list of `DType`s that will be the types of
        the tensors that the operation consumes. By default, uses the base
        `DType` of each input in `inputs`. Operations that expect
        reference-typed inputs must specify `input_types` explicitly.
      name: (Optional.) A string name for the operation. If not specified, a
        name is generated based on `op_type`.
      attrs: (Optional.) A dictionary where the key is the attribute name (a
        string) and the value is the respective `attr` attribute of the
        `NodeDef` proto that will represent the operation (an `AttrValue`
        proto).
      op_def: (Optional.) The `OpDef` proto that describes the `op_type` that
        the operation will have.
      compute_shapes: (Optional.) Deprecated. Has no effect (shapes are always
        computed).
      compute_device: (Optional.) If True, device functions will be executed
        to compute the device property of the Operation.
    Raises:
      TypeError: if any of the inputs is not a `Tensor`.
      ValueError: if colocation conflicts with existing device assignment.
    Returns:
      An `Operation` object.
    """


def _create_c_op(graph, node_def, inputs, control_inputs):
  """Creates a TF_Operation.
  Args:
    graph: a `Graph`.
    node_def: `node_def_pb2.NodeDef` for the operation to create.
    inputs: A list of `Tensor`s (corresponding to scalar inputs) and lists of
      `Tensor`s (corresponding to sequence inputs, e.g. "int64 * N",
      "list(int64)"). The length of the list should be equal to the number of
      inputs specified by this operation's op def.
    control_inputs: A list of `Operation`s to set as control dependencies.
  Returns:
    A wrapped TF_Operation*.
  """


    def _create_op_helper(self, op, compute_device=True):
    """Common logic for creating an op in this graph."""


    def _NodeDef(op_type, name, device=None, attrs=None):  # pylint: disable=redefined-outer-name
  """Create a NodeDef proto.
  Args:
    op_type: Value for the "op" attribute of the NodeDef proto.
    name: Value for the "name" attribute of the NodeDef proto.
    device: string, device, or function from NodeDef to string.
      Value for the "device" attribute of the NodeDef proto.
    attrs: Optional dictionary where the key is the attribute name (a string)
      and the value is the respective "attr" attribute of the NodeDef proto (an
      AttrValue).
  Returns:
    A node_def_pb2.NodeDef protocol buffer.
  """


  def _attr_scope(self, attr_map):
    """EXPERIMENTAL: A context manager for setting attributes on operators.
    This context manager can be used to add additional
    attributes to operators within the scope of the context.
    """

    op._set_attr("_class", attr_value_pb2.AttrValue(
    list=attr_value_pb2.AttrValue.ListValue(s=all_colocation_groups)))