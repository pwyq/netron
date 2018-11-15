/*jshint esversion: 6 */

// TODO TODO: need to check if returned object is []

//return an array of objects according to key, value, or key and value matching
var _getObjects = function getObjects(obj, key, val) {
  // note: `obj` is `JSON.parse(json_string/file)`
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
      } else if (obj[i] == val && key == ''){
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }
  }
  return objects;
}

//return an array of values that match on a certain key
var _getValues = function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getValues(obj[i], key));
      } else if (i == key) {
          objects.push(obj[i]);
      }
  }
  return objects;
}

//return an array of keys that match on a certain value
var _getKeys = function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getKeys(obj[i], val));
      } else if (obj[i] == val) {
          objects.push(i);
      }
  }
  return objects;
}

// var _addKeyAndValue = function addKeyAndValue(obj, key, val) {
function addKeyAndValue(obj, key, val) {
  // let key stores graph id and node id?
  // and let val be another object like:
  // {
  //   'hw': 'hw111',
  //   'quant': 'quant111'
  // }
  // for (var i in obj) {
  //   if (i == undefined) {
  //     console.log("aaaaaaaaaa");
  //   }
  //   if (obj[i] == undefined) {
  //     console.log("abasdfasdfasdf");
  //   }
  //   console.log(i)
  //   console.log(obj[i])
  //   if (!obj.hasOwnProperty(i)) continue;
  //   if (i == key && obj[i].hw !== '') {
  //     console.log("not empty");
  //     // console.log(obj[i].GlossDiv);
  //   }
  //   else {
  //     console.log("going to add stuff");
  //     // console.log(obj[i].title);
  //   }
  // }
//   console.log("s" + typeof(obj));
//   for (var i in obj) {
//     for (var j in obj[i]) {
//         console.log(typeof(i))
//         console.log('-----------0');
//         console.log(typeof(j))
//     //   console.log("i = " + i);
//     //   console.log(obj[i]);
//     //   console.log('-----------1');
//     //   console.log(obj[i].node1);
//     //   console.log('-----------1.5');
//     //   console.log(obj[i].node1.hw);
//     //   console.log('-----------2');
//     //   console.log("j = " + j);
//     //   console.log('-----------3');
//     //   console.log(j.qt);
//     //   console.log('-----------4');
//     }
//   }
// }

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
  module.exports.getObjects = _getObjects;
  module.exports.getValues = _getValues;
  module.exports.getKeys = _getKeys;
}

// var json = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
// var json = '{"graph":{"node1":{"hw": "hw1","qt": "qt1"}}}';
var json = '{ "graph1": { "node1": { "hw": "hw1", "qt": "qt1" }, "node2": { "hw": "hw1", "qt": "qt1" } }, "graph2": { "node3": { "hw": "hw5", "qt": "qt9" } } }';
var js = JSON.parse(json);
// console.log(addKeyAndValue(js, 'quant', 'quant1'));
console.log(addKeyAndValue(js, 'node3', 'quant1'));


// console.log(js);
// var output = JSON.parse(json, null, "\t");
// console.log(output);

// /*
//example of grabbing objects that match some key and value in JSON
// console.log(getObjects(js,'ID','SGML'));
//returns 1 object where a key names ID has the value SGML

//example of grabbing objects that match some key in JSON
// console.log(getObjects(js,'ID',''));
//returns 2 objects since keys with name ID are found in 2 objects

//example of grabbing obejcts that match some value in JSON
// console.log(getObjects(js,'','SGML'));
// console.log(getObjects(js,'ID','SGML'));
// console.log(getObjects(js,'Abbrev','SGML'));
// console.log(getObjects(js,'str','SGML'));
//returns 2 object since 2 obects have keys with the value SGML

//example of grabbing objects that match some key in JSON
// console.log(getObjects(js,'ID',''));
//returns 2 objects since keys with name ID are found in 2 objects

//example of grabbing values from any key passed in JSON
// console.log(getValues(js,'ID'));
//returns array ["SGML", "44"] 

//example of grabbing keys by searching via values in JSON
// console.log(getKeys(js,'SGML'));
//returns array ["ID", "SortAs", "Acronym", "str"]

// */