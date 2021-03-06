/*jshint esversion: 6 */

// To test or debug this file, please use netron/test/test-json-manipulate.js
// TODO: some function can be combined

// const path = require('path');
// var fs = require('fs');

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Manipulation methods
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var _createGraph = function createGraph(graphName) {
  var obj = {
    [graphName]: []
  };
  return obj;
}

var _addNewNode = function addNewNode(data, graphName, nodeName, attributes) {
  // TODO: now only supporting add to attrs, add supports for directly to add to default_attrs; after VSKY-1438
  var isAdded = false;
  if (!_isNodeExist(data, graphName, nodeName)) {
    var newNode = {
      id: nodeName,
      default_attrs: {},
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

var _addDefaultAttribute = function addDefaultAttribute(data, graphName, nodeName, newAttr) {
  var isAdded = false;
  var _node = _findNode(data, graphName, nodeName);
  if (!_isObjectEmpty(_node)) {
    var node = _node[0];
    var keys = Object.keys(newAttr);
    for (var i = 0; i < keys.length; i++) {
      if (!node.default_attrs.hasOwnProperty(keys[i])) {
        node.default_attrs[keys[i]] = newAttr[keys[i]];
        isAdded = true;
      }
    }
  }
  return isAdded;
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

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Boolean methods
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var _isObjectEmpty = function isObjectEmpty(obj) {
  var isEmpty = false;
  if (Object.keys(obj).length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}

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

var _isGraphEmpty = function isGraphEmpty(filePath) {
  var isEmpty = true;
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    isEmpty = false;
  }
  return isEmpty;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Merge & Split JSON
  - Supports user defined grouping json/custom attr json paths;
    - if those are undefined, will use default paths
    - config-json always stores in /user_json/model_config_json
  Merge: (subgraph grouping + custom attributes) -> config
  Split: config -> (subgraph grouping + custom attributes)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var _findNodeInSubgraph = function findNodeInSubgraph(subgraphList, nodeName) {
  for (var i = 0; i < subgraphList.length; i++) {
    var nodeList = subgraphList[i].nodes;
    if (nodeList.includes(nodeName)) {
      return subgraphList[i].subgraphName;
    }
  }
  return '';
}

var _findNodeInConfig = function findNodeInConfig(configList, nodeName) {
  // not including noGroup
  var _res = [];
  for (var i = 0; i < configList.length; i++) {
    var tmp = configList[i].nodes.filter(function (el) {
      return el.id == nodeName;
    });
    _res = _res.concat(tmp);
  }
  return _res;
}

var _mergeJSON = function mergeJSON(fileName, subFilePath, cusFilePath) {
  var subPath = '';
  if (typeof(subFilePath) !== 'string') {
    var subgraphGroupFile = fileName + '_subgraph_grouping.json';
    subPath = getPath('user_json/graph_grouping_json', subgraphGroupFile);
  }
  else {
    subPath = subFilePath;
  }

  var cusPath = '';
  if (typeof(cusFilePath) !== 'string') {
    var customAttrFile = fileName + '_custom_attributes.json';
    cusPath = getPath('user_json/custom_json', customAttrFile);
  }
  else {
    cusPath = cusFilePath;
  }

  var isSubEmpty = _isGraphEmpty(subPath);
  var isCusEmpty = _isGraphEmpty(cusPath);
  if (isSubEmpty && isCusEmpty) {
    return;
  }

  var outputFileName = fileName + '_config.json';
  var outPath = getPath('user_json/model_config_json', outputFileName);
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
    graphObj.customed = [];
    var cusRaw = fs.readFileSync(cusPath);
    var cusList = JSON.parse(cusRaw)[fileName];
  
    for (var i = 0; i < cusList.length; i++) {
      if (_isObjectEmpty(cusList[i].attrs)) {
        graphObj.noGroup.push(cusList[i]);
      }
      else {
        graphObj.customed.push(cusList[i]);
      }
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(outPath, json);
  }
  else if (!isSubEmpty && !isCusEmpty) {
    var graphObj = _createGraph(fileName);
    graphObj.noGroup = [];
    graphObj.customed = [];
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
        if (_isObjectEmpty(cusList[i].attrs)) {
          graphObj.noGroup.push(cusList[i]);
        }
        else {
          graphObj.customed.push(cusList[i]);
        }
      }
    }
  
    // may delete following (after VSKY-1438)
    for (var i = 0; i < subList.length; i++) {
      for (var j = 0; j < subList[i].nodes.length; j++) {
        if (!graphObj.noGroup.includes(subList[i].nodes[j])) {
          var res = _findNodeInConfig(graphObj[fileName], subList[i].nodes[j]);
          if (res.length == 0) {
            var newNode = { id: subList[i].nodes[j], default_attrs: {}, attrs: {} };
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

var _splitJSON = function splitJSON(filePath, subFilePath, cusFilePath) {
  var fileName = path.basename(filePath).replace('_config.json', '');
  // `fin` stands for `final`; same below
  var finPath = filePath;
  if (_isGraphEmpty(finPath)) {
    return false;
  }

  var subOutPath = '';
  if (typeof(subFilePath) !== 'string') {
    var subgraphGroupFile = fileName + '_subgraph_grouping.json';
    subOutPath = getPath('user_json/graph_grouping_json', subgraphGroupFile);
  }
  else {
    subOutPath = subFilePath;
  }
  if (!fs.existsSync(path.dirname(subOutPath))) {
    fs.mkdirSync(path.dirname(subOutPath));
  }

  var cusOutPath = '';
  if (typeof(cusFilePath) !== 'string') {
    var customAttrFile = fileName + '_custom_attributes.json';
    cusOutPath = getPath('user_json/custom_json', customAttrFile);
  }
  else {
    cusOutPath = cusFilePath;
  }
  if (!fs.existsSync(path.dirname(cusOutPath))) {
    fs.mkdirSync(path.dirname(cusOutPath));
  }
  
  // Start spliting JSON
  var finRaw = fs.readFileSync(finPath);
  var finObj = JSON.parse(finRaw);

  var graphLen = (finObj[fileName]) ? finObj[fileName].length: 0;
  var customedLen = (finObj.customed) ? finObj.customed.length : 0;
  var noGroupLen = (finObj.noGroup) ? finObj.noGroup.length : 0;
  if (graphLen === 0 && noGroupLen === 0 && customedLen == 0) {
    return false;
  }
  else if (graphLen === 0 && noGroupLen !== 0 || customedLen !== 0) {
    var graphObj = _createGraph(fileName);
    graphObj[fileName] = finObj.noGroup;  // fully copy noGroup section

    var cusNodeList = finObj.customed;
    for (var i = 0; i < cusNodeList.length; i++) {
      graphObj[fileName].push(cusNodeList[i]);
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(cusOutPath, json);
  }
  else if (graphLen !== 0) {
    // put everything in group to subJSON
    // put everything in group that has attributes AND customed node to cusJSON
    var subObj = _createGraph(fileName);
    var cusObj = _createGraph(fileName);
    cusObj[fileName] = finObj.customed;
    
    // Following are grouped nodes
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
  return true;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Helper methods
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

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

function isDev() {
  var res = ('ELECTRON_IS_DEV' in process.env) ?
  (parseInt(process.env.ELECTRON_IS_DEV, 10) === 1) :
  (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));
  return res;
}

function getPath(folder, file) {
  var res = '';
  if (isDev()) {
    res = path.join(__dirname, '..', folder, file);
  }
  else {
    res = path.join(process.resourcesPath, folder, file);
  }
  return res;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Export
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
  // Right-sidebar (custom attributes)
  module.exports.createGraph     = _createGraph;
  module.exports.isGraphEmpty    = _isGraphEmpty;
  module.exports.isNodeExist     = _isNodeExist;
  module.exports.findNode        = _findNode;
  module.exports.addNewNode      = _addNewNode;
  module.exports.isObjectEmpty   = _isObjectEmpty;
  module.exports.updateAttribute = _updateAttribute;
  module.exports.addAttribute    = _addAttribute;
  
  // Left-sidebar (group nodes mode)
  module.exports.isSubgraphExist   = _isSubgraphExist;
  module.exports.findSubgraph      = _findSubgraph;
  module.exports.addNewSubgraph    = _addNewSubgraph;
  module.exports.addNodeToSubgraph = _addNodeToSubgraph;
  
  module.exports.mergeJSON = _mergeJSON;
  module.exports.splitJSON = _splitJSON;
  module.exports.addDefaultAttribute    = _addDefaultAttribute;
}
