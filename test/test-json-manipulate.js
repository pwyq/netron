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