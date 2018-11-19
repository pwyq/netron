import onnx
import onnxmltools


def dumpONNXToJSON(output_file_path, onnx_file_path):
  model = onnx.load(onnx_file_path)
  onnxmltools.utils.save_text(model, output_file_path)


if __name__ == '__main__':
    output_file_path = ""
    onnx_file_path = ""
    if _platform == "win32" or _platform == "win64":
        # TODO
        # test if work on path that contains spaces
        output_file_path = sys.argv[1].replace(os.path.sep, '\\')
        onnx_file_path = sys.argv[2].replace(os.path.sep, '\\')
    elif _platform == "darwin":
        pass  # TODO to test
    elif _platform == "linux" or _platform == "linux2":
        # TODO to test
        output_file_path = sys.argv[1]
        onnx_file_path = sys.argv[2]

    assert(os.path.isfile(onnx_file_path) is True)
    assert(os.path.isdir(os.path.dirname(output_file_path)) is True)

    dumpONNXToJSON(output_file_path, onnx_file_path)

    print("{} is done.".format(os.path.basename(__file__)))
