/*jshint esversion: 6 */

var _createGraph = function createGraph(graphName) {
  var obj = {
    [graphName]: []
  };
  return obj;
}
  
var _isGraphEmpty = function isGraphEmpty(filePath) {
  var isEmpty = true;
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    isEmpty = false;
  }
  return isEmpty;
}
  
// TODO: some function can be combined
var _isNodeExist = function isNodeExist(data, graphName, nodeName) {
  var isExist = false;
  var _node = _findNode(data, graphName, nodeName);
  if (_node.length === 1) {  // ensure identical nodes exist
    isExist = true;
  }
  return isExist;
}

var _isSubgraphExist = function isSubgraphExist(data, graphName, subgraphName) {
  var isExist = false;
  var _subgraph = _findSubgraph(data, graphName, subgraphName);
  if (_subgraph.length === 1) {
      isExist = true;
  }
  return isExist;
}
  
var _findNode = function findNode(data, graphName, nodeName) {
  var _node = [];
  _node = data[graphName].filter(function (el) {
    return el.id == nodeName;
  });
  return _node;
}

var _findSubgraph = function findSubgraph(data, graphName, subgraphName) {
  var _subgraph = [];
  _subgraph = data[graphName].filter(function (el) {
      return el.subgraphName == subgraphName;
  });
  return _subgraph;
}
  
var _addNewNode = function addNewNode(data, graphName, nodeName, attributes) {
  var isAdded = false;
  if (!_isNodeExist(data, graphName, nodeName)) {
    var newNode = {
      id: nodeName,
      attrs: {}
    };
    var keys = Object.keys(attributes);

    for (var i = 0; i < keys.length; i++) {
      newNode.attrs[keys[i]] = attributes[keys[i]];
    }
    data[graphName].push(newNode);
    isAdded = true;
  }
  return isAdded;
}

/*
var _addNewConnection = function addNewConnection(data, graphName, connectionName, opName) {
  var isAdded = false;
  if (!_isNodeExist(data, graphName, connectionName)) {
    var newNode = {
      id: connectionName,
      op: opName,
      inputs: [],
      outputs: []
    };
    data[graphName].push(newNode);
    isAdded = true;
  }
  return isAdded;
}
*/

var _addNewSubgraph = function addNewSubgraph(data, graphName, subgraphName) {
  var isAdded = false;
  if (!_isSubgraphExist(data, graphName, subgraphName)) {
      var newSubgraph = {
          subgraphName: subgraphName,
          nodes: []
      };
      data[graphName].push(newSubgraph);
      isAdded = true;
  }
  return isAdded;
}

var _addNodeToSubgraph = function addNodeToSubgraph(data, graphName, subgraphName, node) {
  var isAdded = false;
  var _subgraph = _findSubgraph(data, graphName, subgraphName);
  if (!_isObjectEmpty(_subgraph)) {
      var subgraph = _subgraph[0];
      if (!subgraph.nodes.includes(node)) {
          subgraph.nodes.push(node);
          isAdded = true;
      }
  }
  return isAdded;
}

/*
var _addNodeToConnection = function addNodeToConnection(data, graphName, nodeName, connection, isInput) {
  var isUpdated = false;
  var _node = _findNode(data, graphName, nodeName);
  if (!_isObjectEmpty(_node)) {
    var node = _node[0];
    if (isInput) {
      if (node.inputs.indexOf(connection) == -1) {
        node.inputs.push(connection);
        isUpdated = true;
      }
    }
    else {
      if (node.outputs.indexOf(connection) == -1) {
        node.outputs.push(connection);
        isUpdated = true;
      }
    }
  }
  return isUpdated;
}
*/

var _isObjectEmpty = function isObjectEmpty(obj) {
  var isEmpty = false;
  if (Object.keys(obj).length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}
  
var _updateAttribute = function updateAttribute(data, graphName, nodeName, newAttr) {
  var isUpdated = false;
  var _node = _findNode(data, graphName, nodeName);
  if (!_isObjectEmpty(_node)) {
    var node = _node[0];
    var keys = Object.keys(newAttr);
    if (node.attrs.hasOwnProperty(keys[0])) {
      node.attrs[keys[0]] = newAttr[keys[0]];
      isUpdated = true;
    }
  }
  return isUpdated;
}
  
var _addAttribute = function addAttribute(data, graphName, nodeName, newAttr) {
  var isAdded = false;
  var _node = _findNode(data, graphName, nodeName);
  if (!_isObjectEmpty(_node)) {
    var node = _node[0];
    var keys = Object.keys(newAttr);
    if (!node.attrs.hasOwnProperty(keys[0])) {
      node.attrs[keys[0]] = newAttr[keys[0]];
      isAdded = true;
    }
  }
  return isAdded;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Merge & Split JSON
// Merge: (subgraph grouping + custom attributes) -> final
// Split: final -> (subgraph grouping + custom attributes)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var _findNodeInSubgraph = function findNodeInSubgraph(subgraphList, nodeName) {
  for (var i = 0; i < subgraphList.length; i++) {
    var nodeList = subgraphList[i].nodes;
    if (nodeList.includes(nodeName)) {
      return subgraphList[i].subgraphName;
    }
  }
  return '';
}

var _findNodeInFinal = function findNodeInFinal(finalList, nodeName) {
  // not including noGroup
  var _res = [];
  for (var i = 0; i < finalList.length; i++) {
    _res = finalList[i].nodes.filter(function (el) {
      return el.id == nodeName;
    });
  }
  return _res;
}

var _mergeJSON = function mergeJSON(fileName) {
  var subgraphGroupFile = fileName + '_subgraph_grouping.json';
  var customAttrFile = fileName + '_custom_attributes.json';
  var subPath = path.join('../user_json/graph_grouping_json', subgraphGroupFile);
  var cusPath = path.join('../user_json/custom_json', customAttrFile);
  var isSubEmpty = _isGraphEmpty(subPath);
  var isCusEmpty = _isGraphEmpty(cusPath);
  if (isSubEmpty && isCusEmpty) {
    return;
  }

  var outputFileName = fileName + '_final.json';
  var outPath = path.join('../user_json/final_json', outputFileName);
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath));
  }

  if (!isSubEmpty && isCusEmpty) {
    fs.copyFile(subPath, outPath, (err) => {
      if (err) throw err;
    });
  }
  else if (isSubEmpty && !isCusEmpty) {
    var graphObj = _createGraph(fileName);
    graphObj.noGroup = [];
    var cusRaw = fs.readFileSync(cusPath);
    var cusList = JSON.parse(cusRaw)[fileName];
  
    for (var i = 0; i < cusList.length; i++) {
      graphObj.noGroup.push(cusList[i]);
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(outPath, json);
  }
  else if (!isSubEmpty && !isCusEmpty) {
    var graphObj = _createGraph(fileName);
    graphObj.noGroup = [];
    var cusRaw = fs.readFileSync(cusPath);
    var subRaw = fs.readFileSync(subPath);
    var cusList = JSON.parse(cusRaw)[fileName];
    var subList = JSON.parse(subRaw)[fileName];
  
    for (var i = 0; i < cusList.length; i++) {
      var res = _findNodeInSubgraph(subList, cusList[i].id);
      if (res !== '') {
        _addNewSubgraph(graphObj, fileName, res);
        var mysub = _findSubgraph(graphObj, fileName, res)[0];
        mysub.nodes.push(cusList[i]);
      }
      else {
        graphObj.noGroup.push(cusList[i]);
      }
    }
  
    for (var i = 0; i < subList.length; i++) {
      for (var j = 0; j < subList[i].nodes.length; j++) {
        if (!graphObj.noGroup.includes(subList[i].nodes[j])) {
          var res = _findNodeInFinal(graphObj[fileName], subList[i].nodes[j]);
          if (res.length == 0) {
            var newNode = { id: subList[i].nodes[j], attrs: {} };
            _addNewSubgraph(graphObj, fileName, subList[i].subgraphName);
            var mysub = _findSubgraph(graphObj, fileName, subList[i].subgraphName)[0];
            mysub.nodes.push(newNode);
          }
        }
      }
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(outPath, json);
  }
}

var _splitJSON = function splitJSON(fileName) {
  var finalFile = fileName + '_final.json';
  var finPath = path.join('../user_json/final_json', finalFile);
  if (_isGraphEmpty(finPath)) {
    return;
  }

  var subgraphGroupFile = fileName + '_subgraph_grouping.json';
  var subOutPath = path.join('../user_json/graph_grouping_json', subgraphGroupFile);
  if (!fs.existsSync(path.dirname(subOutPath))) {
    fs.mkdirSync(path.dirname(subOutPath));
  }

  var customAttrFile = fileName + '_custom_attributes.json';
  var cusOutPath = path.join('../user_json/custom_json', customAttrFile);
  if (!fs.existsSync(path.dirname(cusOutPath))) {
    fs.mkdirSync(path.dirname(cusOutPath));
  }
  
  // Start spliting JSON
  var finRaw = fs.readFileSync(finPath);
  var finObj = JSON.parse(finRaw);

  var graphLen = finObj[fileName].length;
  var noGroupLen = (finObj.noGroup) ? finObj.noGroup.length : 0;
  if (graphLen === 0 && noGroupLen === 0) {
    return;
  }
  else if (graphLen === 0 && noGroupLen !== 0) {
    var graphObj = _createGraph(fileName);
    graphObj[fileName] = finObj.noGroup;
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(cusOutPath, json);
  }
  else if (graphLen !== 0 && noGroupLen === 0) {
    var graphObj = _createGraph(fileName);
    var finList = finObj[fileName];
    for (var i = 0; i < finList.length; i++) {
      _addNewSubgraph(graphObj, fileName, finList[i].subgraphName);
      var nodeList = finList[i].nodes;
      for (var j = 0; j < nodeList.length; j++) {
        _addNodeToSubgraph(graphObj, fileName, finList[i].subgraphName, nodeList[j].id);
      }
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(subOutPath, json);
  }
  else if (graphLen !== 0 && noGroupLen !== 0) {
    // put everything in group to subJSON
    // put everything that has attributes AND noGroup's node to cusJSON
    var subObj = _createGraph(fileName);
    var cusObj = _createGraph(fileName);
    cusObj[fileName] = finObj.noGroup;
    
    var finList = finObj[fileName];
    for (var i = 0; i < finList.length; i++) {
      _addNewSubgraph(subObj, fileName, finList[i].subgraphName);
      var nodeList = finList[i].nodes;
      for (var j = 0; j < nodeList.length; j++) {
        _addNodeToSubgraph(subObj, fileName, finList[i].subgraphName, nodeList[j].id);
        if (!_isObjectEmpty(nodeList[j].attrs)) {
          cusObj[fileName].push(nodeList[j]);
        }
      }
    }
    var subJSON = JSON.stringify(subObj, null, 2);
    fs.writeFileSync(subOutPath, subJSON);
    var cusJSON = JSON.stringify(cusObj, null, 2);
    fs.writeFileSync(cusOutPath, cusJSON);
  }
}

  
if (typeof module !== 'undefined' && typeof module.exports === 'object') {
  module.exports.createGraph       = _createGraph;
  module.exports.isGraphEmpty      = _isGraphEmpty;
  module.exports.isNodeExist       = _isNodeExist;
  module.exports.findNode          = _findNode;
  module.exports.addNewNode        = _addNewNode;
  module.exports.isObjectEmpty     = _isObjectEmpty;
  module.exports.updateAttribute   = _updateAttribute;
  module.exports.addAttribute      = _addAttribute;

  module.exports.isSubgraphExist   = _isSubgraphExist;
  module.exports.findSubgraph      = _findSubgraph;
  module.exports.addNewSubgraph    = _addNewSubgraph;
  module.exports.addNodeToSubgraph = _addNodeToSubgraph;

  // module.exports.addNewConnection    = _addNewConnection;
  // module.exports.addNodeToConnection = _addNodeToConnection;

  module.exports.mergeJSON = _mergeJSON;
  module.exports.splitJSON = _splitJSON;
}
  
  
//========= TEST (custom attribute)
// const path = require('path');
// var fs = require('fs');
// var pbFileName = 'FREESPACE_graph';
// var outputFileName = pbFileName + '_custom_attributes.json';
// var inputPath = path.join('../custom_json', outputFileName)

// if (isGraphEmpty(inputPath)) {
//   var graphObj = createGraph(pbFileName);
// }
// else {
//   var raw = fs.readFileSync(inputPath);
//   var graphObj = JSON.parse(raw);
// }
// addNewNode(graphObj, pbFileName, 'nodexxx', {hw: 'hw100', qt: 'qt100'});
// addNewNode(graphObj, pbFileName, 'nodexxx2', {hw: 'aptx4869', qt: 'qt6172'});

// var x = updateAttribute(graphObj, pbFileName, 'node1', '');
// x = addAttribute(graphObj, pbFileName, 'nodexxx', {bi: 'li'});
// x = updateAttribute(graphObj, pbFileName, 'nodexxx', {hw: 'liiiii'});


// var strs = ["dpl", "Hardware_Target", "down1_1/maxpool/MaxPool", "APEX"]
// var nodeId = strs[2];
// var customAttr = strs[1];
// var customVal = strs[3];
// var customAttrObj = {};
// customAttrObj[customAttr] = customVal;
// addNewNode(graphObj, pbFileName, nodeId, customAttrObj);

// var json  = JSON.stringify(graphObj, null , 2);
// fs.writeFileSync(inputPath, json);

// // ========= TEST (layer grouping)
// const path = require('path');
// var fs = require('fs');
// var inputFileName = 'tttttttt';
// var outputFileName = inputFileName + '_subgraph_grouping.json';
// var inputPath = path.join('test', outputFileName);

// if (_isGraphEmpty(inputPath)) {
//     var graphObj = _createGraph(inputFileName);
// }
// else {
//     var raw = fs.readFileSync(inputPath);
//     var graphObj = JSON.parse(raw);
// }

// _addNewSubgraph(graphObj, inputFileName, 'defaultSubgraph_1');
// _addNewSubgraph(graphObj, inputFileName, 'defaultSubgraph_2');
// _addNewSubgraph(graphObj, inputFileName, 'defaultSubgraph_3');
// _addNewSubgraph(graphObj, inputFileName, 'defaultSubgraph_3');

// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/conv/BatchNorm/FusedBatchNorm/conv');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/conv/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/conv/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/conv/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/conv/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_1', 'down1_1/maxpool/MaxPool');

// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_2', 'down1_1/concat');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_2', 'nbottleneck1_2/conv_a_3x1/BiasAdd/conv');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_2', 'nbottleneck1_2/conv_a_3x1/BiasAdd/conv');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_2', 'nbottleneck1_2/conv_a_3x1/BiasAdd');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_2', 'nbottleneck1_2/conv_a_3x1/BiasAdd');

// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_3', 'nbottleneck1_2/conv_a_1x3/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_3', 'nbottleneck1_2/conv_a_1x3/BatchNorm/FusedBatchNorm');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_3', 'nbottleneck1_2/conv_a_1x3/BatchNorm/FusedBatchNorm/conv');
// _addNodeToSubgraph(graphObj, inputFileName, 'defaultSubgraph_3', 'nbottleneck1_2/conv_b_3x1/BiasAdd/conv');

// var json = JSON.stringify(graphObj, null , 2);
// fs.writeFileSync(inputPath, json);

// // ================================================ TEST
// const path = require('path');
// var fs = require('fs');
// var inputFileName = 'model';
// // _mergeJSON(inputFileName);
// // mergeJSON('model');
// _splitJSON('model');
