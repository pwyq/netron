// Merge and Separate

function createGraph(graphName) {
  var obj = {
    [graphName]: []
  };
  return obj;
}

function isGraphEmpty(filePath) {
  var isEmpty = true;
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    isEmpty = false;
  }
  return isEmpty;
}

function isSubgraphExist(data, graphName, subgraphName) {
  var isExist = false;
  var _subgraph = findSubgraph(data, graphName, subgraphName);
  if (_subgraph.length === 1) {
      isExist = true;
  }
  return isExist;
}

function findSubgraph(data, graphName, subgraphName) {
  var _subgraph = [];
  _subgraph = data[graphName].filter(function (el) {
    // console.log('find graph: ');
    // showObj(el);
    return el.subgraphName == subgraphName;
  });
  return _subgraph;
}

function addNewSubgraph(data, graphName, subgraphName) {
  var isAdded = false;
  if (!isSubgraphExist(data, graphName, subgraphName)) {
      var newSubgraph = {
          subgraphName: subgraphName,
          nodes: []
      };
      data[graphName].push(newSubgraph);
      isAdded = true;
  }
  // showObj(data);
  return isAdded;
}

// ================================================

function showObj(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    console.log(obj[keys[i]]);
  }
}

function findNodeInSubgraph(subgraphList, nodeName) {
  // console.log(subgraphList);
  for (var i = 0; i < subgraphList.length; i++) {
    var nodeList = subgraphList[i].nodes;
    // console.log('node list = ' + nodeList);
    if (nodeList.includes(nodeName)) {
      return subgraphList[i].subgraphName;
    }
  }
  return '';
}

function findNodeInFinal(finalList, nodeName) {
  // not including noGroup
  var _res = [];
  for (var i = 0; i < finalList.length; i++) {
    // console.log(finalList[i]);
    _res = finalList[i].nodes.filter(function (el) {
      return el.id == nodeName;
    });
  }
  return _res;
}

function mergeJSON(fileName) {
  var subgraphGroupFile = fileName + '_subgraph_grouping.json';
  var customAttrFile = fileName + '_custom_attributes.json';
  var outputFileName = fileName + '_final.json';
  // var subPath = path.join('test', subgraphGroupFile);
  // var cusPath = path.join('test', customAttrFile);
  // var outPath = path.join('test', outputFileName);
  var subPath = path.join('../user_json/graph_grouping_json', subgraphGroupFile);
  var cusPath = path.join('../user_json/custom_json', customAttrFile);
  var outPath = path.join('../user_json/final_json', outputFileName);
  
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath));
  }
  
  if (isGraphEmpty(subPath) && isGraphEmpty(cusPath)) {
    return;
  }
  else if (!isGraphEmpty(subPath) && isGraphEmpty(cusPath)) {
    fs.copyFile(subPath, outPath, (err) => {
      if (err) throw err;
    });
  }
  else if (isGraphEmpty(subPath) && !isGraphEmpty(cusPath)) {
    var graphObj = createGraph(fileName);
    graphObj.noGroup = [];
    var cusRaw = fs.readFileSync(cusPath);
    var cusList = JSON.parse(cusRaw)[fileName];
  
    for (var i = 0; i < cusList.length; i++) {
      graphObj.noGroup.push(cusList[i]);
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(outPath, json);
  }
  else if (!isGraphEmpty(subPath) && !isGraphEmpty(cusPath)) {
    var graphObj = createGraph(fileName);
    graphObj.noGroup = [];
    var cusRaw = fs.readFileSync(cusPath);
    var subRaw = fs.readFileSync(subPath);
    var cusList = JSON.parse(cusRaw)[fileName];
    var subList = JSON.parse(subRaw)[fileName];
  
    for (var i = 0; i < cusList.length; i++) {
      var res = findNodeInSubgraph(subList, cusList[i].id);
      if (res !== '') {
        addNewSubgraph(graphObj, fileName, res);
        var mysub = findSubgraph(graphObj, fileName, res)[0];
        mysub.nodes.push(cusList[i]);
      }
      else {
        graphObj.noGroup.push(cusList[i]);
      }
    }
  
    for (var i = 0; i < subList.length; i++) {
      for (var j = 0; j < subList[i].nodes.length; j++) {
        if (!graphObj.noGroup.includes(subList[i].nodes[j])) {
          var res = findNodeInFinal(graphObj[fileName], subList[i].nodes[j]);
          if (res.length == 0) {
            var newNode = { id: subList[i].nodes[j], attrs: {} };
            addNewSubgraph(graphObj, fileName, subList[i].subgraphName);
            var mysub = findSubgraph(graphObj, fileName, subList[i].subgraphName)[0];
            mysub.nodes.push(newNode);
          }
        }
      }
    }
    var json  = JSON.stringify(graphObj, null , 2);
    fs.writeFileSync(outPath, json);
  }
}

// ================================================

const path = require('path');
var fs = require('fs');
var inputFileName = 'model';

mergeJSON(inputFileName);
splitJSON(inputFileName);
// mergeJSON('model');
