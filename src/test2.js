const fs = require('fs');
const jq = require('jsonq');

var inputPath = '../custom_json/custom-attributes.json'
var strs = ["dpl", "Hardware_Target", "down1_1/maxpool/MaxPool", "APEX"]
var nodeId = strs[2];
var customAttr = strs[1];
var customVal = strs[3];
// var pbFileName = path.parse(path.basename(this._host.getFileName())).name;
var pbFileName = 'FREESPACE_graph';
// ======================================================================
// https://www.codementor.io/codementorteam/how-to-use-json-files-in-node-js-85hndqt32
var needStringify = false;
if (fs.existsSync(inputPath) && fs.statSync(inputPath).size > 0) {
    // Do something
    var rawData = fs.readFileSync(inputPath);
    var data = JSON.parse(rawData);
    var dataQ = jq(data);   // binding
    needStringify = true;
}
else {
    // we need to create the graph
    // var newGraph = new Object();
    // newGraph.push(pbFileName);
    var newGraph = {"Graph Name": pbFileName};
    var data = JSON.stringify(newGraph, null, 2);
    // console.log(data);
    // console.log('-----------');
    var dataQ = jq(data);
}
// console.log(data);
console.log(dataQ);
console.log(dataQ.find('Graph Name').value());
// var name = dataQ.find('aaa');
// console.log(name.value());


var targetGraphs = dataQ.find('Graph Name');
if (targetGraphs.length > 0 && targetGraphs.value().indexOf(pbFileName) > -1) {
    // exist
    console.log('graph exists')
}
else {
    var newGraph = {"Graph Name": pbFileName};
    dataQ.find('Graph Name').append(newGraph);
}

console.log(dataQ.value());

// if (dataQ.find(nodeId).length != 0) {
//     // update
// }
// else {
//     var newNode = new Object();
//     newNode.id = nodeId;
//     var newNodeAttr = new Object();
//     newNodeAttr[customAttr] = customVal;
//     dataQ.find(pbFileName).append(newNode);
//     dataQ.find(newNode.id).append(newNodeAttr);
// }

// console.log(dataQ.value());
        
// let res = JSON.stringify(data, null, 2);    // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
// fs.writeFileSync(inputPath, res);
if (needStringify) {
    data = JSON.stringify(data, null, 2);
}
fs.writeFileSync(inputPath, data);  