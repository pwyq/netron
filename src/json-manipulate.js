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
  
  var _isNodeExist = function isNodeExist(data, graphName, nodeName) {
    var isExist = false;
    var _node = _findNode(data, graphName, nodeName);
    if (_node.length === 1) {  // ensure identical nodes exist
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
  
  if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.createGraph     = _createGraph;
    module.exports.isGraphEmpty    = _isGraphEmpty;
    module.exports.isNodeExist     = _isNodeExist;
    module.exports.findNode        = _findNode;
    module.exports.addNewNode      = _addNewNode;
    module.exports.isObjectEmpty   = _isObjectEmpty;
    module.exports.updateAttribute = _updateAttribute;
    module.exports.addAttribute    = _addAttribute;
  }
  
  
  //========= TEST
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