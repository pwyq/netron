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

function isObjectEmpty(obj) {
  var isEmpty = false;
  if (Object.keys(obj).length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}

function addNodeToSubgraph(data, graphName, subgraphName, node) {
  var isAdded = false;
  var _subgraph = findSubgraph(data, graphName, subgraphName);
  if (!isObjectEmpty(_subgraph)) {
      var subgraph = _subgraph[0];
      if (!subgraph.nodes.hasOwnProperty(node)) {
          subgraph.nodes.push(node);
          isAdded = true;
      }
  }
  return isAdded;
}

function findNode(data, graphName, nodeName) {
  var _node = [];
  var graph = data[graphName];
  // console.log(graphs);
  for (var i = 0; i < graph.length; i++) {
    console.log('graph[i] = ' + graph[i]);
    console.log('graph[i].nodes = ' + graph[i].nodes);
    if (graph[i].nodes) {
      _node = graph[i].nodes.filter(function (el) {
        return el.id == nodeName;
      });
    }
  }
  return _node;
}

function isNodeExist(data, graphName, nodeName) {
  var isExist = false;
  var _node = findNode(data, graphName, nodeName);
  if (_node.length === 1) {  // ensure identical nodes exist
    isExist = true;
  }
  return isExist;
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
  return isAdded;
}


// ================================================

function showObj(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    console.log(obj[keys[i]]);
  }
}

// ================================================
const path = require('path');
var fs = require('fs');
var inputFileName = 'model';
var subgraphGroupFile = inputFileName + '_subgraph_grouping.json';
var customAttrFile = inputFileName + '_custom_attributes.json';
var outputFileName = inputFileName + '_final.json';
var sgPath = path.join('test', subgraphGroupFile);
var caPath = path.join('test', customAttrFile);
var outPath = path.join('test', outputFileName);
// var sgPath = path.join('../user_json/graph_grouping_json', subgraphGroupFile);
// var caPath = path.join('../user_json/custom_json', customAttrFile);
// var outPath = path.join('../user_json/final_json', outputFileName);

if (!fs.existsSync(path.dirname(outPath))) {
  fs.mkdirSync(path.dirname(outPath));
}

if (isGraphEmpty(sgPath) && isGraphEmpty(caPath)) {         // tested
  console.log('Both files are empty');  // TODO, add warning?
  return;
}
else if (!isGraphEmpty(sgPath) && isGraphEmpty(caPath)) {   // tested
  fs.copyFile(sgPath, outPath, (err) => {
    if (err) throw err;
  });
}
else if (isGraphEmpty(sgPath) && !isGraphEmpty(caPath)) {
  var graphObj = createGraph(inputFileName);
  console.log(graphObj);
  // var t = { noGroup: [

  // ]};
  // var t = [];
  // graphObj[inputFileName].push(t);
  graphObj[inputFileName].noGroup = [];
  // graphObj.noGroup = [];
  var json  = JSON.stringify(graphObj, null , 2);
  fs.writeFileSync(outPath, json);
}
