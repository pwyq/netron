/*jshint esversion: 6 */

var view = view || {};

var base = base || require('./base');
var zip = zip || require('./zip');
var gzip = gzip || require('./gzip');
var tar = tar || require('./tar');

var d3 = d3 || require('d3');
var dagre = dagre || require('dagre');

var assert = require('assert');
const jMan = require('./json-manipulate');

/*  Long-term TODO:
        - Since some models are really large and deep (its JSON file could over 500MB), may consider use database (SQL)
        - As discussed with Dong, may implement a command line version
        - rename user config's file
        - Optimization (huge optimization room)
*/
view.View = class {
    constructor(host) {
        this._host = host;
        this._model = null;
        this._selection = [];
        this._sidebar = new Sidebar();
        var events = require('events');
        this._eventEmitter = new events.EventEmitter();
        this._leftSidebar = new LeftSidebar(this._eventEmitter);
        this._host.initialize(this);
        this._showDetails = true;
        this._showNames = false;
        this._isSplit = false;
        this._searchText = '';
        this._modelFactoryService = new view.ModelFactoryService(this._host);
        this._node2idList = {};
        this._id2opList = {};
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = 'no';
        document.getElementById('model-properties-button').addEventListener('click', (e) => {
            this.showModelProperties();
        });
        document.getElementById('zoom-in-button').addEventListener('click', (e) => {
            this.zoomIn();
        });
        document.getElementById('zoom-out-button').addEventListener('click', (e) => {
            this.zoomOut();
        });

        var elementsArray = document.querySelectorAll('toolbar, sidebar, left-sidebar');
        elementsArray.forEach(function(elem) {
            elem.addEventListener("mousewheel", function(e) {
                this.preventZoom(e);
            });
        });
        document.addEventListener('keydown', (event) => {
            this.clearSelection();
        });

        // FOLLOWING is example of detecting keyboard event + click event	
        // this.addMultiListener(document, 'keydown keyup click', function(event) {	
        //     // were planning to use ctrl+right-click to implement the group element,	
        //     // but holding key for too long is not user-friendly... so abandon this plan	
        //     if (event.ctrlKey && event.which == 1) {	
        //         console.log("ctrl key + right-click");	
        //     }	
        // });

        if (this._host.environment('zoom') == 'scroll') {
            document.getElementById('graph-container').addEventListener('mousewheel', (e) => {
                this._mouseWheelHandler(e);
            });
            document.getElementById('graph').addEventListener('mousewheel', (e) => {
                this._mouseWheelHandler(e);
            });
        }
    }
    
    generateRandomColors() {
        var color = require('color');
        var ratio = 0.618033988749895;
        var colors = [];

        var hue = 0.1;
        var saturation = 0.99;
        var value = 0.99;
        var x = null;
        for (var i = 0; i < 100; i++) {
            hue += ratio;
            hue %= 1;
            x = color({
                h: hue * 360,
                s: saturation * 100,
                v: value * 100
            });
            colors.push(x.hex());
            hue += 0.2;
        }
        return colors;
    }

    addMultiListener(element, eventNames, listener) {
        eventNames.split(' ').forEach(e => element.addEventListener(e, listener, false));
    }
    
    show(page) {
        if (!page) {
            page = (!this._model && !this._activeGraph) ? 'Welcome' : 'Graph';
        }

        this._host.screen(page);

        this._sidebar.close();
        this._leftSidebar.close();

        var welcomeElement = document.getElementById('welcome');
        var openFileButton = document.getElementById('open-file-button');
        var spinnerElement = document.getElementById('spinner');
        var graphElement = document.getElementById('graph');
        var toolbarElement = document.getElementById('toolbar');
    
        if (page == 'Welcome') {
            document.body.style.cursor = 'default';
            welcomeElement.style.display = 'block';
            openFileButton.style.display = 'block';
            openFileButton.style.opacity = 1;
            spinnerElement.style.display = 'none';
            graphElement.style.display = 'none';
            graphElement.style.opacity = 0;
            toolbarElement.style.display = 'none';
        }

        if (page == 'Spinner') {
            document.body.style.cursor = 'wait';
            welcomeElement.style.display = 'block';
            spinnerElement.style.display = 'block';
            openFileButton.style.display = 'block';
            graphElement.style.display = 'block';
            graphElement.style.opacity = 0;
            toolbarElement.style.display = 'none';
        }

        if (page == 'Graph') {
            welcomeElement.style.display = 'none';
            openFileButton.style.display = 'none';
            openFileButton.style.opacity = 0;
            spinnerElement.style.display = 'none';
            graphElement.style.display = 'block';
            graphElement.style.opacity = 1;
            toolbarElement.style.display = 'block';
            document.body.style.cursor = 'default';
        }
    }

    cut() {
        document.execCommand('cut');
    }

    copy() {
        document.execCommand('copy');
    }

    paste() {
        document.execCommand('paste');
    }

    selectAll() {
        document.execCommand('selectall');
    }

    find() {
        if (this._activeGraph) {
            this.clearSelection();
            var graphElement = document.getElementById('graph');
            var view = new FindSidebar(graphElement, this._activeGraph);
            view.on('search-text-changed', (sender, text) => {
                this._searchText = text;
            });
            view.on('select-channel', (sender, selection) => {
                this._sidebar.close();
                this.select(selection);
            });
            var windowWidth = this.getSidebarWindowWidth();
            this._sidebar.open(view.content, 'Find', windowWidth.toString());
            view.focus(this._searchText);
        }
    }

    getClientWindowResolution() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return [x, y];
    }

    getSidebarWindowWidth() {
        var x = this.getClientWindowResolution()[0] * 0.3;
        if (x > 500) {
            x = 500;
        }
        return x;
    }

    groupNodeMode() {
        if (this._activeGraph) {
            var outputFileName = this._inputFileBaseName + '_subgraph_grouping.json';
            var filePath = this.getPath('user_json/graph_grouping_json', outputFileName);
            var dfAttrFileName = this._modelName + '_default_attributes.json';
            var modelPath = this.getPath('user_json/default_attr_json', dfAttrFileName);
            var cusFileName = this._inputFileBaseName + '_custom_attributes.json';
            var cusPath = this.getPath('user_json/custom_json', cusFileName);

            if (!this._leftSidebarView) {
                this._leftSidebarView = new GroupModeSidebar(this._host, this._inputFileBaseName, filePath, modelPath, cusPath, this._graph, this._loadedConfigFile);
                this._eventEmitter.on('share-node-id', (data) => {
                    this._leftSidebarView.appendNode(data);
                });
                this._eventEmitter.on('clean-group-node-mode', (data) => {
                    if (data) {
                        this._leftSidebarView.clean();
                    }
                });
            }
            else {
                this._leftSidebarView.showTop();
                if (this._loadedConfigFile) {
                    this._leftSidebarView.updateConfigName(this._loadedConfigFile);
                }
            }
            this._leftSidebar.open(this._leftSidebarView.content, 'Group Nodes Mode', 500);
        }
    }

    toggleDetails() {
        this._showDetails = !this._showDetails;
        this.show('Spinner');
        this.updateGraph(this._model, this._activeGraph, (err) => {
            if (err) {
                this.error('Graph update failed.', err);
            }
        });
    }

    get showDetails() {
        return this._showDetails;
    }

    toggleNames() {
        this._showNames = !this._showNames;
        this.show('Spinner');
        this.updateGraph(this._model, this._activeGraph, (err) => {
            if (err) {
                this.error('Graph update failed.', err);
            }
        });
    }

    get showNames() {
        return this._showNames;
    }

    zoomIn() {
        switch (this._host.environment('zoom')) {
            case 'scroll':
                if (this._zoom) {
                    this._zoom = this._zoom * 1.05;
                    if (this._zoom > 2) {
                        this._zoom = 2;
                    }
                    this.applyZoom();
                }
                break;
            default:
                if (this._zoom) {
                    this._zoom.scaleBy(d3.select(document.getElementById('graph')), 1.2);
                }
                break;
        }
    }

    zoomOut() {
        switch (this._host.environment('zoom')) {
            case 'scroll':
                if (this._zoom) {
                    this._zoom = this._zoom * 0.95;
                    if (this._zoom < 0.1) {
                        this._zoom = 0.1;
                    }
                    this.applyZoom();
                }
                break;
            default:
                if (this._zoom) {
                    this._zoom.scaleBy(d3.select(document.getElementById('graph')), 0.8);
                }
                break;
        }
    }

    resetZoom() { 
        switch (this._host.environment('zoom')) {
            case 'scroll':
                if (this._zoom) {
                    this._zoom = 1;
                    this.applyZoom();
                }
                break;
            default:
                if (this._zoom) {
                    this._zoom.scaleTo(d3.select(document.getElementById('graph')), 1);
                }
                break;
        }
    }

    preventZoom(e) {
        if (e.shiftKey || e.ctrlKey) {
            e.preventDefault();
        }
    }

    applyZoom() {
        var svgElement = document.getElementById('graph');
        svgElement.setAttribute('style', 'zoom: ' + this._zoom + ';');
        // svgElement.setAttribute('style', 'transform: scale(' + this._zoom + ',' + this._zoom + ')');
        // svgElement.setAttribute('width', this._width * this._zoom);
        // svgElement.setAttribute('height', this._height * this._zoom);
    }

    _mouseWheelHandler(e) {
        if (e.shiftKey || e.ctrlKey) {
            if (this._zoom) {
                var oldWidth = this._width * this._zoom;
                var oldHeight = this._height * this._zoom;
                this._zoom = this._zoom + (e.wheelDelta * 1.0 / 6000.0);
                if (this._zoom < 0.1) { this._zoom = 0.1; }
                if (this._zoom > 2) { this._zoom = 2; }
                this.applyZoom();

                /* var svgElement = document.getElementById('graph');
                va r newWidth = this._width * this._zoom;
                var newHeight = this._height * this._zoom;
                svgElement.setAttribute('width', newWidth);
                svgElement.setAttribute('height', newHeight); */

                // var dx = (oldWidth - newWidth) / 2;
                // var dy = (oldHeight - newHeight) / 2;
                // window.scrollBy(dx, dy);

                e.preventDefault();
            }
        }
    }
    
    select(selection) {
        this.clearSelection();
        if (selection && selection.length > 0) {
            var graphElement = document.getElementById('graph');
            var graphRect = graphElement.getBoundingClientRect();
            var x = 0;
            var y = 0;
            selection.forEach((element) => {
                element.classList.add('select');
                this._selection.push(element);
                var box = element.getBBox();
                var ex = box.x + (box.width / 2);
                var ey = box.y + (box.height / 2);
                var transform = element.transform.baseVal.consolidate();
                if (transform) {
                    ex = transform.matrix.e;
                    ey = transform.matrix.f;
                }
                x += ex;
                y += ey;
            });
            x = x / selection.length;
            y = y / selection.length;
            this._zoom.transform(d3.select(graphElement), d3.zoomIdentity.translate((graphRect.width / 2) - x, (graphRect.height / 2) - y));
        }
    }

    clearSelection() {
        while (this._selection.length > 0) {
            var element = this._selection.pop();
            element.classList.remove('select');
        }
    }

    error(message, err) {
        this._sidebar.close();
        this._leftSidebar.close();
        this._host.exception(err, false);
        this._host.error(message, err.toString());
        this.show('Welcome');
    }

    openContext(context, callback) {
        this._host.event('Model', 'Open', 'Size', context.buffer.length);
        this._sidebar.close();
        setTimeout(() => {
            this._modelFactoryService.open(context, (err, model) => {
                if (err) {
                    callback(err);
                }
                else {
                    var format = model.format;
                    if (format) {
                        format = format + (model.producer ? ' (' + model.producer + ')' : '');
                        this._host.event('Model', 'Format', format);
                    }

                    setTimeout(() => {
                        try {
                            var graph = model.graphs.length > 0 ? model.graphs[0] : null;
                            this.updateGraph(model, graph, (err, model) => {
                                callback(err, model);
                            });
                        }
                        catch (err) {
                            callback(err, null);
                            return;
                        }
                    }, 20);   
                }
            });    
        }, 2);
    }

    updateActiveGraph(name) {
        this._sidebar.close();
        this._leftSidebar.close();
        if (this._model) {
            var model = this._model;
            var graph = model.graphs.filter(graph => name == graph.name).shift();
            if (graph) {
                this.show('Spinner');
                setTimeout(() => {
                    this.updateGraph(model, graph, (err, model) => {
                        if (err) {
                            this.error('Graph update failed.', err);
                        }
                    });
                }, 200);
            }
        }
    }

    updateGraph(model, graph, callback) {
        setTimeout(() => {
            if (graph && graph != this._activeGraph) {
                var nodes = graph.nodes;
                if (nodes.length > 1500) {
                    if (!this._host.confirm('Large model detected.', 'This graph contains a large number of nodes and might take a long time to render. Do you want to continue?')) {
                        this._host.event('Graph', 'Render', 'Skip', nodes.length);
                        this.show(null);
                        callback(null, null);
                        return;
                    }  
                }
            }

            this.renderGraph(graph, (err) => {
                if (err) {
                    this.renderGraph(this._activeGraph, (nestedError) => {
                        if (nestedError) {
                            this._model = null;
                            this._activeGraph = null;
                            this.show('Welcome');
                        }
                        else {
                            this.show('Graph');
                        }
                        callback(err, this._model);
                    });
                }
                else {
                    this._model = model;
                    this._activeGraph = graph;
                    this.show('Graph');
                    callback(null, this._model);
                }
            });
        }, 100);
    }

    renderGraph(graph, callback) {
        try {
            if (!graph) {
                callback(null);
            }
            else {
                var graphElement = document.getElementById('graph');
                while (graphElement.lastChild) {
                    graphElement.removeChild(graphElement.lastChild);
                }

                this._inputFilePath     = this._host.getInputFilePath();
                this._inputFileName     = path.basename(this._inputFilePath);
                this._inputFileExtName  = path.extname(this._inputFileName);
                this._modelName = path.parse(this._inputFileName).name
                this._COLORS    = this.generateRandomColors();

                // JSON initialization
                if (!this._inputFileBaseName) {
                    this._inputFileBaseName = 'defaultNaming'
                }
                var outputFileName = this._inputFileBaseName + '_custom_attributes.json';
                var filePath = this.getPath('user_json/custom_json', outputFileName);
                var graphObj = this.initJSON(filePath);
    
                switch (this._host.environment('zoom')) {
                    case 'scroll':
                        this._zoom = 0;
                        graphElement.style.position = 'static';
                        graphElement.style.margin = 'auto';
                        break;
                    default:
                        this._zoom = null;
                        graphElement.style.position = 'absolute';
                        graphElement.style.margin = '0';
                        break;
                }
    
                var groups = graph.groups;
    
                var graphOptions = {};
                graphOptions.nodesep = 25;
                graphOptions.ranksep = 30;

                var g = new dagre.graphlib.Graph({ compound: groups });
                var dag = new dagre.graphlib.Graph({ directed: true, multigraph: false, compound: false });
                g.setGraph(graphOptions);
                g.setDefaultEdgeLabel(() => { return {}; });
            
                var nodeId = 0;
                var edgeMap = {};
            
                var clusterMap = {};
                var clusterParentMap = {};
    
                var id = new Date().getTime();
                var nodes = graph.nodes;

                if (nodes.length > 1500) {
                    graphOptions.ranker = 'longest-path';
                }

                this._host.event('Graph', 'Render', 'Size', nodes.length);

                if (groups) {
                    nodes.forEach((node) => {
                        if (node.group) {
                            var path = node.group.split('/');
                            while (path.length > 0) {
                                var name = path.join('/');
                                path.pop();
                                clusterParentMap[name] = path.join('/');
                            }
                        }
                    });
                }

                nodes.forEach((node) => {
                    var formatter = new grapher.NodeElement(this._host, this._inputFileBaseName, this._COLORS);

                    if (node.function) {
                        formatter.addItem('+', null, [ 'node-item-function' ], null, () => { 
                            debugger;
                        });
                    }

                    var dagNodeID = null;
                    var dagNodeOp = null;
                    switch (this._inputFileExtName) {
                        case '.pb': // TensorFlow
                            if (node._node) {
                                dagNodeID = node._node.name;
                                dagNodeOp = node._node.op;
                            }
                            else if (node._outputs[0]._connections) {
                                dagNodeID = node._outputs[0]._connections[0]._id;
                                dagNodeOp = node.operator;
                            }
                            else if (node._outputs[0] && !node._outputs[0]._connections) {  // for predict_net.pb
                                dagNodeID = node._outputs[0];
                                dagNodeOp = node.operator;
                            }
                            break;
                        case '.caffemodel':
                            dagNodeID = node._name;
                            dagNodeOp = node._type;
                            break;
                        case '.h5': // Keras
                            dagNodeID = node._config.name;
                            dagNodeOp = node._operator;
                            break;
                        case '.onnx':
                            dagNodeID = node._outputs[0]._connections[0]._id;
                            dagNodeOp = node._operator;
                            break;
                        default:
                            // console.log('NOT SUPPORTED YET');
                            var msg = this._inputFileExtName + " format is not supported yet.";
                            this._host.realError('Not Supported Model', msg);
                            break;
                    }

                    if (dagNodeID && dagNodeOp) {
                        this._node2idList[dagNodeID] = nodeId;
                        this._id2opList[nodeId] = dagNodeOp;
                        dag.setNode(dagNodeID, { op: dagNodeOp });
                        if (!this._isSplit) {
                            jMan.addNewNode(graphObj, this._inputFileBaseName, dagNodeID, '');
                        }
                    }

                    function addOperator(view, formatter, node, ext) {
                        if (node) {
                            var styles = [ 'node-item-operator' ];
                            var category = node.category;
                            if (category) {
                                styles.push('node-item-operator-' + category.toLowerCase());
                            }
                            var text = view.showNames && node.name ? node.name : (node.primitive ? node.primitive : node.operator);
                            var title = view.showNames && node.name ? node.operator : node.name;
                            if (title == null && ext === '.onnx') {
                                title = dagNodeID;
                            }
                            formatter.addItem(text, null, styles, title, (event) => {
                                var tempID = '';
                                if (!node.name) {
                                    tempID = view.getTempID(node);
                                }
                                var params = [node, null, tempID, "test 5"];
                                view.nodeElementClickHandler(event.button, params);
                            });
                        }
                    }
    
                    addOperator(this, formatter, node, this._inputFileExtName);
                    addOperator(this, formatter, node.inner, this._inputFileExtName);       // TODO: what's node.inner???
            
                    var primitive = node.primitive;
            
                    var hiddenInputs = false;
                    var hiddenInitializers = false;
            
                    node.inputs.forEach((input) => {
                        if (input.connections.length > 0) {
                            var initializers = input.connections.filter(connection => connection.initializer);
                            var inputId = null;
                            var inputClass = 'node-item-input';
                            if (initializers.length == 0) {
                                inputClass = 'node-item-input';
                                if (!input.visible) {
                                    hiddenInputs = true;
                                }
                            }
                            else {
                                if (initializers.length == 1) {
                                    inputId = 'initializer-' + initializers[0].initializer.name;
                                }
                                if (initializers.length == input.connections.length) {
                                    inputClass = 'node-item-constant';
                                    if (!input.visible) {
                                        hiddenInitializers = true;
                                    }
                                }
                                else {
                                    inputClass = 'node-item-constant';
                                    if (!input.visible) {
                                        hiddenInputs = true;
                                    }
                                }
                            }
            
                            if (this._showDetails) {
                                if (input.visible) {
                                    var initializer = input.connections.every(connection => connection.initializer != null);
                                    if (initializer) {
                                        var types = input.connections.map(connection => connection.type || '').join('\n');
                                        formatter.addItem(input.name, inputId, [ inputClass ], types, (event) => {
                                            var tempID = '';
                                            if (!node.name) {
                                                tempID = this.getTempID(node);
                                            }
                                            var params = [node, input, tempID, "test 4"];
                                            this.nodeElementClickHandler(event.button, params);
                                        });
                                    }
                                }
                            }

                            input.connections.forEach((connection) => {
                                if (dag.hasNode(dagNodeID)) {
                                    dag.setEdge(connection._id, dagNodeID);
                                }

                                if (!connection.initializer) {
                                    var tuple = edgeMap[connection.id];
                                    if (!tuple) {
                                        tuple = { from: null, to: [] };
                                        edgeMap[connection.id] = tuple;
                                    }
                                    tuple.to.push({ 
                                        node: nodeId, 
                                        name: input.name
                                    });
                                }
                            });
                        }
                    });
            
                    if (this._showDetails) {
                        if (hiddenInputs) {
                            formatter.addItem('...', null, [ 'node-item-input' ], '', (event) => {
                                var tempID = '';
                                if (!node.name) {
                                    tempID = this.getTempID(node);
                                }
                                var params = [node, null, tempID, "test 3"];
                                this.nodeElementClickHandler(event.button, params);
                            });
                        }
                        if (hiddenInitializers) {
                            formatter.addItem('...', null, [ 'node-item-constant' ], '', (event) => {
                                var tempID = '';
                                if (!node.name) {
                                    tempID = this.getTempID(node);
                                }
                                var params = [node, null, tempID, "test 2"];
                                this.nodeElementClickHandler(event.button, params);
                            });
                        }
                    }
            
                    node.outputs.forEach((output) => {
                        output.connections.forEach((connection) => {
                            var tuple = edgeMap[connection.id];
                            if (!tuple) {
                                tuple = { from: null, to: [] };
                                edgeMap[connection.id] = tuple;
                            }
                            tuple.from = { 
                                node: nodeId,
                                name: output.name,
                                type: connection.type
                            };
                        });
                    });
            
                    var dependencies = node.dependencies;
                    if (dependencies && dependencies.length > 0) {
                        formatter.setControlDependencies();
                    }
            
                    if (this._showDetails) {
                        var attributes = node.attributes; 
                        if (attributes && !primitive) {
                            formatter.setAttributeHandler((event) => {
                                var tempID = '';
                                if (!node.name) {
                                    tempID = this.getTempID(node);
                                }
                                var params = [node, null, tempID, "test 1"];
                                this.nodeElementClickHandler(event.button, params);
                            });
                            attributes.forEach((attribute) => {
                                if (attribute.visible) {
                                    var attributeValue = view.View.formatAttributeValue(attribute.value, attribute.type);
                                    if (attributeValue && attributeValue.length > 25) {
                                        attributeValue = attributeValue.substring(0, 25) + '...';
                                    }
                                    if (dagNodeID) {
                                        var defaultAttrObj = {};
                                        defaultAttrObj[attribute.name] = attributeValue;
                                        jMan.addDefaultAttribute(graphObj, this._inputFileBaseName, dagNodeID, defaultAttrObj); // TODO: to optimize; have redundant calls
                                    }

                                    formatter.addAttribute(attribute.name, attributeValue, attribute.type);
                                    // TODO: load custom attribute to formatter?
                                }
                            });
                        }
                    }
    
                    var name = node.name;
                    if (name) {
                        g.setNode(nodeId, { label: formatter.format(graphElement), id: 'node-' + name });
                    }
                    else {
                        g.setNode(nodeId, { label: formatter.format(graphElement), id: 'node-' + id.toString() });
                        id++;
                    }
            
                    function createCluster(name) {
                        if (!clusterMap[name]) {
                            g.setNode(name, { rx: 5, ry: 5});
                            clusterMap[name] = true;
                            var parent = clusterParentMap[name];
                            if (parent) {
                                createCluster(parent);
                                g.setParent(name, parent);
                            }
                        }
                    }
    
                    if (groups) {
                        var groupName = node.group;
                        if (groupName && groupName.length > 0) {
                            if (!clusterParentMap.hasOwnProperty(groupName)) {
                                var lastIndex = groupName.lastIndexOf('/');
                                if (lastIndex != -1) {
                                    groupName = groupName.substring(0, lastIndex);
                                    if (!clusterParentMap.hasOwnProperty(groupName)) {
                                        groupName = null;
                                    }
                                }
                                else {
                                    groupName = null;
                                }
                            }
                            if (groupName) {
                                createCluster(groupName);
                                g.setParent(nodeId, groupName);
                            }
                        }
                    }
                
                    nodeId++;
                });
            
                graph.inputs.forEach((input) => {
                    input.connections.forEach((connection) => {
                        var tuple = edgeMap[connection.id];
                        if (!tuple) {
                            tuple = { from: null, to: [] };
                            edgeMap[connection.id] = tuple;
                        }
                        tuple.from = { 
                            node: nodeId,
                            type: connection.type
                        };    
                    });
                    var types = input.connections.map(connection => connection.type || '').join('\n');
    
                    var formatter = new grapher.NodeElement(this._host, this._inputFileBaseName, this._COLORS);
                    formatter.addItem(input.name, null, [ 'graph-item-input' ], types, () => {
                        this.showModelProperties();
                    });
                    g.setNode(nodeId++, { label: formatter.format(graphElement), class: 'graph-input' } );
                });
            
                graph.outputs.forEach((output) => {
                    output.connections.forEach((connection) => {
                        var tuple = edgeMap[connection.id];
                        if (!tuple) {
                            tuple = { from: null, to: [] };
                            edgeMap[connection.id] = tuple;
                        }
                        tuple.to.push({ node: nodeId });
                    });
                    var types = output.connections.map(connection => connection.type || '').join('\n');
            
                    var formatter = new grapher.NodeElement(this._host, this._inputFileBaseName, this._COLORS);
                    formatter.addItem(output.name, null, [ 'graph-item-output' ], types, () => {
                        this.showModelProperties();
                    });
                    g.setNode(nodeId++, { label: formatter.format(graphElement) } );
                });
            
                Object.keys(edgeMap).forEach((edge) => {
                    var tuple = edgeMap[edge];
                    if (tuple.from != null) {
                        tuple.to.forEach((to) => {
                            var text = '';
                            var type = tuple.from.type;
                            if (type && type.shape && type.shape.dimensions && type.shape.dimensions.length > 0) {
                                text = type.shape.dimensions.join('\u00D7');
                            }
            
                            if (this._showNames) {
                                text = edge.split('\n').shift(); // custom connection id
                            }
                            if (!this._showDetails) {
                                text = '';
                            }
    
                            if (to.dependency) { 
                                g.setEdge(tuple.from.node, to.node, { label: text, id: 'edge-' + edge, arrowhead: 'vee', class: 'edge-path-control' } );
                            }
                            else {
                                g.setEdge(tuple.from.node, to.node, { label: text, id: 'edge-' + edge, arrowhead: 'vee' } );
                            }
                        });
                    }
                });
            
                // Workaround for Safari background drag/zoom issue:
                // https://stackoverflow.com/questions/40887193/d3-js-zoom-is-not-working-with-mousewheel-in-safari
                var backgroundElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                backgroundElement.setAttribute('id', 'background');
                if (this._host.environment('zoom') == 'scroll') {
                    backgroundElement.setAttribute('width', '100%');
                    backgroundElement.setAttribute('height', '100%');
                }
                backgroundElement.setAttribute('fill', 'none');
                backgroundElement.setAttribute('pointer-events', 'all');
                graphElement.appendChild(backgroundElement);
            
                var originElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                originElement.setAttribute('id', 'origin');
                graphElement.appendChild(originElement);
            
                if (this._host.environment('zoom') != 'scroll') {
                    // Set up zoom support
                    var svg = d3.select(graphElement);
                    this._zoom = d3.zoom();
                    this._zoom(svg);
                    this._zoom.scaleExtent([0.1, 2]);
                    this._zoom.on('zoom', (e) => {
                        originElement.setAttribute('transform', d3.event.transform.toString());
                    });
                    this._zoom.transform(svg, d3.zoomIdentity);
                }

                setTimeout(() => {
                    try {
                        var supportOp = this.getSupportedOperations();
                        var graphRenderer = new grapher.Renderer(this._host, originElement, this._node2idList, this._id2opList, supportOp);
                        graphRenderer.render(g);
            
                        var inputElements = graphElement.getElementsByClassName('graph-input');

                        switch (this._host.environment('zoom')) {
                            case 'scroll':
                                var size = graphElement.getBBox();
                                var graphMin = Math.min(size.width, size.height);
                                var windowMin = Math.min(window.innerWidth, window.innerHeight);
                                var delta = (Math.max(graphMin, windowMin) / 2.0) * 0.2;
                                var width = Math.ceil(delta + size.width + delta);
                                var height = Math.ceil(delta + size.height + delta);
                                originElement.setAttribute('transform', 'translate(' + delta.toString() + ', ' + delta.toString() + ') scale(1)');
                                backgroundElement.setAttribute('width', width);
                                backgroundElement.setAttribute('height', height);
                                this._width = width;
                                this._height = height;
                                this._zoom = 1;
                                graphElement.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
                                graphElement.setAttribute('width', width / this._zoom);
                                graphElement.setAttribute('height', height / this._zoom);        
                                if (inputElements && inputElements.length > 0) {
                                    // Center view based on input elements
                                    for (var j = 0; j < inputElements.length; j++) {
                                        inputElements[j].scrollIntoView({ behavior: 'instant' });
                                        break;
                                    }
                                }
                                else {
                                    // this._zoom.transform(svg, d3.zoomIdentity.translate((svgSize.width - g.graph().width) / 2, (svgSize.height - g.graph().height) / 2));
                                }
                                break;
                            default:
                                var svgSize = graphElement.getBoundingClientRect();
                                if (inputElements && inputElements.length > 0) {
                                    // Center view based on input elements
                                    var xs = [];
                                    var ys = [];
                                    for (var i = 0; i < inputElements.length; i++) {
                                        var inputTransform = inputElements[i].transform.baseVal.consolidate().matrix;
                                        xs.push(inputTransform.e);
                                        ys.push(inputTransform.f);
                                    }
                                    var x = xs[0];
                                    var y = ys[0];
                                    if (ys.every(y => y == ys[0])) {
                                        x = xs.reduce((a,b) => { return a + b; }) / xs.length;
                                    }
                                    this._zoom.transform(svg, d3.zoomIdentity.translate((svgSize.width / 2) - x, (svgSize.height / 4) - y));
                                }
                                else {
                                    this._zoom.transform(svg, d3.zoomIdentity.translate((svgSize.width - g.graph().width) / 2, (svgSize.height - g.graph().height) / 2));
                                }
                                break;
                        }
                        callback(null);
                    }
                    catch (err) {
                        console.log(err);
                        callback(err);
                    }
                }, 20);

                // post-processing of DAG; remove garbages
                for (var i = 0; i < dag.nodes().length; i++) {
                    var curr = dag.nodes()[i];
                    var exist = dag.node(curr);
                    if (!exist) {
                        dag.removeNode(curr);
                        i--;
                    }
                }
                this._graph = dag;

                // save JSON
                var json = JSON.stringify(graphObj, null , 2);
                fs.writeFileSync(filePath, json);
                if (!this._isSplit) {
                    // save default attributes json
                    var dfOutputFileName = this._modelName + '_default_attributes.json';
                    var dfFilePath = this.getPath('user_json/default_attr_json', dfOutputFileName);
                    fs.writeFileSync(dfFilePath, json)
                }
            }
        }
        catch (err) {
            console.log(err);
            callback(err);
        }
    }

    getTempID(node) {
        var _id = '';
        for (let [_key, _value] of Object.entries(node.outputs[0])) {
            for (var i = 0; i < _value.length; i++) {
                if (typeof(_value[i]) == 'object') {
                    for (let [k, v] of Object.entries(_value[i])) {
                        if (k == 'id' || k == '_id') {
                            _id = v;
                            break;
                        }
                    }
                }
            }
        }
        return _id;
    }

    getSupportedOperations() {
        var path = this.getPath('user_json/config_json', 'airunner_supported_operations.json');
        var raw = fs.readFileSync(path);
        var jsonObj = JSON.parse(raw);
        return jsonObj.support;
    }

    nodeElementClickHandler(button, params) {
        // params = [node, input, id, strs];
        var node = params[0];
        var input = params[1];
        var id = params[2];
        var strs = params[3];   // `strs` is for debugging
        var name = node.name;
        if (name) {
            var nodeName = name;
        }
        else {
            var nodeName = id.toString();
        }
        console.log("\n[nodeElementClickHandler] You clicked: " + nodeName);
        switch (button) {
            case 0:
                this._eventEmitter.emit('share-node-id', nodeName);
                // console.log(strs + " left click");
                this.showNodeProperties(node, input, id);
                break;
            case 1:
                // console.log(strs + " middle click");
                break;
            case 2:
                // console.log(strs + " right click");
                this.showCustomAttributes(node, id);
                break;
            default:
                this.showNodeProperties(node, input, id);
                break;
        }
    }

    _on(event, callback) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(callback);
    }

    _raise(event, data) {
        if (this._events && this._events[event]) {
            this._events[event].forEach((callback) => {
                callback(this, data);
            });
        }
    }

    _cleanCache() {
        // Delete everything in /graph_grouping_json and /custom_json
        var subPath = this.getPath('user_json/graph_grouping_json');
        fs.readdir(subPath, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(subPath, file), err => {
                    if (err) throw err;
                });
            }
        });

        var cusPath = this.getPath('user_json/custom_json');
        fs.readdir(cusPath, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(cusPath, file), err => {
                    if (err) throw err;
                });
            }
        });
        this._host.info('Cache Cleaned', 'Cache cleaned successfully.');
    }
    
    splitJSON(inputPath) {
        // THE CONFIGURATION FILE NAME MUST ENDED WITH '_config.json'
        // This method is called upon user `Load Configuration <Ctrl+L>`
        if (jMan.splitJSON(inputPath)) {
            this._isSplit = true;
            this._loadedConfigFile = path.basename(inputPath);
            this._inputFileBaseName = this._loadedConfigFile.replace('_config.json', '');
            var msg = inputPath + ' is loaded.\n\nPlease refresh <F5> the page.';
            this._host.info('Load Configuration', msg);
        }
        else {
            var msg = 'Failed to load configuration file.\nPlease ensure file naming is correct and file is not empty.'
            this._host.realError('Load Configuration Failed', msg);
        }
    }

    getPath(folder, file) {
        var filePath = '';
        var f = (file) ? file : '';
        if (this._host.getIsDev()) {
            filePath = path.join(__dirname, '..', folder, f);
        }
        else {
            // https://github.com/electron-userland/electron-builder/issues/751
            filePath = path.join(process.resourcesPath, folder, f);
        }
        return filePath;
    }

    initJSON(filePath) {
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath));
        }
        if (jMan.isGraphEmpty(filePath)) {
            var graphObj = jMan.createGraph(this._inputFileBaseName);
        }
        else {
            var raw = fs.readFileSync(filePath);
            var graphObj = JSON.parse(raw);
        }
        return graphObj;
    }

    showCustomAttributes(node, nodeID) {
        var outputFileName = this._inputFileBaseName + '_custom_attributes.json';
        var filePath = this.getPath('user_json/custom_json', outputFileName);
        if (node) {
            var view = new NodeCustomAttributeSidebar(node, nodeID, this._host, this._inputFileBaseName, filePath);
            view.on('custom-attr-sidebar', (sender, cb) => {
                this.saveCustomAttributes(cb, filePath);
            });
            var windowWidth = this.getSidebarWindowWidth();
            this._sidebar.open(view.elements, 'Node Custom Attributes', windowWidth.toString());
        }
    }
    
    saveCustomAttributes(item, filePath) {
        var strs = item.split('-');	
        var nodeId = strs[2];	
        var customAttr = strs[1];	
        var customVal = strs[3];
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath));
        }
        if (jMan.isGraphEmpty(filePath)) {
            var graphObj = jMan.createGraph(this._inputFileBaseName);
        }
        else {
            var raw = fs.readFileSync(filePath);
            var graphObj = JSON.parse(raw);
        }
        var customAttrObj = {};
        customAttrObj[customAttr] = customVal;
        if (!jMan.addNewNode(graphObj, this._inputFileBaseName, nodeId, customAttrObj)) {
            if (!jMan.addAttribute(graphObj, this._inputFileBaseName, nodeId, customAttrObj)) {
                assert(jMan.updateAttribute(graphObj, this._inputFileBaseName, nodeId, customAttrObj) === true);
            }
        }

        var json = JSON.stringify(graphObj, null , 2);
        fs.writeFileSync(filePath, json);
    }

    applyStyleSheet(element, name) {
        var rules = [];
        for (var i = 0; i < document.styleSheets.length; i++) {
            var styleSheet = document.styleSheets[i];
            if (styleSheet && styleSheet.href && styleSheet.href.endsWith('/' + name)) {
                rules = styleSheet.cssRules;
                break;
            }
        }
        var nodes = element.getElementsByTagName('*');
        for (var j = 0; j < nodes.length; j++) {
            var node = nodes[j];
            for (var k = 0; k < rules.length; k++) {
                var rule = rules[k];                
                if (node.matches(rule.selectorText)) {
                    for (var l = 0; l < rule.style.length; l++) {
                        var item = rule.style.item(l);
                        node.style[item] = rule.style[item];
                    }
                }
            }
        }
    }

    export(file) {
        var extension = '';
        var lastIndex = file.lastIndexOf('.');
        if (lastIndex != -1) {
            extension = file.substring(lastIndex + 1);
        }
        if (this._activeGraph && (extension == 'png' || extension == 'svg')) {
            var graphElement = document.getElementById('graph');
            var exportElement = graphElement.cloneNode(true);
            this.applyStyleSheet(exportElement, 'view-grapher.css');
            exportElement.setAttribute('id', 'export-pic');
            exportElement.removeAttribute('width');
            exportElement.removeAttribute('height');
            exportElement.style.removeProperty('opacity');
            exportElement.style.removeProperty('display');
            var backgroundElement = exportElement.querySelector('#background');
            var originElement = exportElement.querySelector('#origin');
            originElement.setAttribute('transform', 'translate(0,0) scale(1)');
            backgroundElement.removeAttribute('width');
            backgroundElement.removeAttribute('height');
    
            var parentElement = graphElement.parentElement;
            parentElement.insertBefore(exportElement, graphElement);
            var size = exportElement.getBBox();
            parentElement.removeChild(exportElement);
            parentElement.removeChild(graphElement);
            parentElement.appendChild(graphElement);

            var delta = (Math.min(size.width, size.height) / 2.0) * 0.1;
            var width = Math.ceil(delta + size.width + delta);
            var height = Math.ceil(delta + size.height + delta);
            originElement.setAttribute('transform', 'translate(' + delta.toString() + ', ' + delta.toString() + ') scale(1)');
            exportElement.setAttribute('width', width);
            exportElement.setAttribute('height', height);
            backgroundElement.setAttribute('width', width);
            backgroundElement.setAttribute('height', height);
            backgroundElement.setAttribute('fill', '#fff');
    
            var data = new XMLSerializer().serializeToString(exportElement);
    
            if (extension == 'svg') {
                this._host.export(file, new Blob([ data ], { type: 'image/svg' }));
            }
    
            if (extension == 'png') {
                var imageElement = new Image();
                imageElement.onload = () => {
                    var max = Math.max(width, height);
                    var scale = ((max * 2.0) > 24000) ? (24000.0 / max) : 2.0;
                    var canvas = document.createElement('canvas');
                    canvas.width = Math.ceil(width * scale);
                    canvas.height = Math.ceil(height * scale);    
                    var context = canvas.getContext('2d');
                    context.scale(scale, scale);
                    context.drawImage(imageElement, 0, 0);
                    document.body.removeChild(imageElement);
                    canvas.toBlob((blob) => {
                        this._host.export(file, blob);
                    }, 'image/png');
                };
                // TODO: show msg when export is done
                imageElement.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(data)));
                document.body.insertBefore(imageElement, document.body.firstChild);
            }
        }

        if (this._activeGraph && (extension == 'txt' || extension == 'json')) {
            var outputFilePath = file;
            var exeSubPath = '';
            switch (this._inputFileExtName) {
                case '.pb':
                    exeSubPath = 'dumpPB/dumpPB.exe';
                    break;
                case '.onnx':
                    exeSubPath = 'dumpONNX/dumpONNX.exe';
                    break;
                default:
                    break;
            }
            if (exeSubPath == '') {
                this._host.error('Invalid Error', 'Model Not Supported');
                return;
            }

            var execFile = require('child_process').execFile;
            var exe_path = this.getPath('python_scripts/dist', exeSubPath);

            if (extension == 'txt') {
                var parameters = [outputFilePath, this._inputFilePath, 'txt'];    // TODO: 3rd arg is redundant
                execFile(exe_path, parameters, function(err, data) {
                    if (err) {
                        this._host.error('Python Error', err);
                        return;
                    }
                    var msg = 'File has been exported to ' + outputFilePath;
                    alert(msg);
                });
            }
            if (extension == 'json') {
                var parameters = [outputFilePath, this._inputFilePath, 'json'];   // TODO: 3rd arg is redundant
                execFile(exe_path, parameters, function(err, data) {
                    if (err) {
                        this._host.error('Python Error', err);
                        return;
                    }
                    var msg = 'File has been exported to ' + outputFilePath;
                    alert(msg);
                });
            }
        }
    }

    showModelProperties() {
        if (this._model) {
            var view = new ModelSidebar(this._model, this._host);
            view.on('update-active-graph', (sender, name) => {
                this.updateActiveGraph(name);
            });
            var windowWidth = this.getSidebarWindowWidth();
            this._sidebar.open(view.elements, 'Model Properties', windowWidth.toString());
        }
    }
    
    showNodeProperties(node, input, id) {
        if (node) {
            var view = new NodeSidebar(node, this._host);
            view.on('show-documentation', (sender, e) => {
                this.showOperatorDocumentation(node);
            });
            view.on('export-tensor', (sender, tensor) => {
                this._host.require('./numpy', (err, numpy) => {
                    if (!err) {
                        var defaultPath = tensor.name ? tensor.name.split('/').join('_').split(':').join('_').split('.').join('_') : 'tensor';
                        this._host.save('NumPy Array', 'npy', defaultPath, (file) => {
                            try {
                                var array = new numpy.Array(tensor.value, tensor.type.dataType, tensor.type.shape.dimensions);
                                this._host.export(file, new Blob([ array.toBuffer() ], { type: 'application/octet-stream' }));
                            }
                            catch (error) {
                                this.error('Error saving NumPy tensor.', error);
                            }
                        });
                    }
                });
            });
            if (input) {
                view.toggleInput(input.name);
            }
            var windowWidth = this.getSidebarWindowWidth();
            this._sidebar.open(view.elements, 'Node Properties (constant)', windowWidth.toString());
        }
    }

    showOperatorDocumentation(node) {
        var documentation = node.documentation;
        if (documentation) {
            var view = new OperatorDocumentationSidebar(documentation);
            view.on('navigate', (sender, e) => {
                this._host.openURL(e.link);
            });
            var windowWidth = this.getSidebarWindowWidth();
            this._sidebar.open(view.elements, 'Documentation', windowWidth.toString());
        }
    }

    static formatAttributeValue(value, type) {
        if (typeof value === 'function') {
            return value();
        }
        if (typeof value === 'string' && type && type != 'string') {
            return value;
        }
        if (value && value.__isLong__) {
            return value.toString();
        }
        if (value && (value instanceof base.Int64 || value instanceof base.Uint64)) {
            return value.toString();
        }
        if (Number.isNaN(value)) {
            return 'NaN';
        }
        if (type == 'shape') {
            return value.toString();
        }
        if (type == 'shape[]') {
            return value.map((item) => item.toString()).join(', ');
        }
        if (type == 'graph') {
            return value.toString();
        }
        if (type == 'graph[]') {
            return value.map((item) => item.toString()).join(', ');
        }
        if (type == 'tensor') {
            return '[...]';
        }
        if (Array.isArray(value)) {
            return value.map((item) => {
                if (item && item.__isLong__) {
                    return item.toString();
                }
                if (Number.isNaN(item)) {
                    return 'NaN';
                }
                return JSON.stringify(item);
            }).join(', ');
        }
        return JSON.stringify(value);
    }
};

class ArchiveContext {
    constructor(entries, rootFolder, identifier, buffer) {
        this._entries = {};
        if (entries) {
            entries.forEach((entry) => {
                if (entry.name.startsWith(rootFolder)) {
                    var name = entry.name.substring(rootFolder.length);
                    if (identifier.length > 0 && identifier.indexOf('/') < 0) {
                        this._entries[name] = entry.substring(rootFolder.length);
                    }
                }
            });
        }
        this._identifier = identifier.substring(rootFolder.length);
        this._buffer = buffer;
    }

    request(file, encoding, callback) {
        var entry = this._entries[file];
        if (!entry) {
            callback(new Error('File not found.'), null);
            return;
        }
        var data = entry.data;
        if (type != null) {
            data = new TextDecoder(encoding).decode(data);
        }
        callback(null, data);
    }

    get identifier() {
        return this._identifier;
    }

    get buffer() {
        return this._buffer;
    }

    get text() {
        if (!this._text) {
            var decoder = new TextDecoder('utf-8');
            this._text = decoder.decode(this._buffer);
        }
        return this._text;
    }

    get tags() {
        if (!this._tags) {
            this._tags = {};
            try {
                var reader = protobuf.TextReader.create(this.text);
                reader.start(false);
                while (!reader.end(false)) {
                    var tag = reader.tag();
                    this._tags[tag] = true;
                    reader.skip();
                }
            }
            catch (error) {
            }
        }
        return this._tags;
    }
}

class ArchiveError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error loading archive.';
    }
}

class ModelError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error loading model.'; 
    }
}

view.ModelFactoryService = class {
    constructor(host) {
        this._host = host;
        this._extensions = [];
        this.register('./onnx', [ '.onnx', '.pb', '.pbtxt', '.prototxt' ]);
        this.register('./mxnet', [ '.model', '.json' ]);
        this.register('./keras', [ '.h5', '.keras', '.hdf5', '.json' ]);
        this.register('./coreml', [ '.mlmodel' ]);
        this.register('./caffe', [ '.caffemodel', '.pbtxt', '.prototxt' ]);
        this.register('./caffe2', [ '.pb', '.pbtxt', '.prototxt' ]);
        this.register('./pytorch', [ '.pt', '.pth', '.pkl', '.h5', '.model', '.dms' ]);
        this.register('./torch', [ '.t7' ]);
        this.register('./tflite', [ '.tflite', '.lite' ]);
        this.register('./tf', [ '.pb', '.meta', '.pbtxt', '.prototxt' ]);
        this.register('./sklearn', [ '.pkl', '.joblib' ]);
        this.register('./cntk', [ '.model', '.cntk', '.cmf', '.dnn' ]);
        this.register('./openvino', [ '.xml', '.dot' ]);
        this.register('./darknet', [ '.cfg' ]);
        this.register('./paddle', [ '.paddle', '__model__' ]);
    }

    register(id, extensions) {
        extensions.forEach((extension) => {
            this._extensions.push({ extension: extension, id: id });
        });
    }

    open(context, callback) {
        this._openArchive(context, (err, context) => {
            if (err) {
                callback(err, null);
                return;
            }
            var extension = context.identifier.split('.').pop().toLowerCase();
            var modules = this._filter(context);
            if (modules.length == 0) {
                callback(new ModelError("Unsupported file extension '." + extension + "'."), null);
                return;
            }
            var errors = [];
            var matches = 0;
            var nextModule = () => {
                if (modules.length > 0) {
                    var id = modules.shift();
                    this._host.require(id, (err, module) => {
                        if (err) {
                            callback(err, null);
                            return;
                        }
                        if (!module.ModelFactory) {
                            callback(new ModelError("Failed to load module '" + id + "'."), null);
                            return;
                        }
                        var modelFactory = new module.ModelFactory(); 
                        if (!modelFactory.match(context, this._host)) {
                            nextModule();
                            return;
                        }
                        matches++;
                        modelFactory.open(context, this._host, (err, model) => {
                            if (err) {
                                errors.push(err);
                                nextModule();
                                return;
                            }
                            callback(null, model);
                            return;
                        });
                    });
                }
                else {
                    if (matches > 0) {
                        if (errors.length == 1) {
                            callback(errors[0], null);
                            return;
                        }
                        callback(new ModelError(errors.map((err) => err.message).join('\n')), null);
                        return;
                    }
                    callback(new ModelError("Unsupported file content for extension '." + extension + "' in '" + context.identifier + "'."), null);
                    return;
                }
            };
            nextModule();
        });
    }

    _openArchive(context, callback) {
        try {
            var extension;
            var archive;
            var entry;
    
            var identifier = context.identifier;
            var buffer = context.buffer;

            extension = identifier.split('.').pop().toLowerCase();
            if (extension == 'gz' || extension == 'tgz') {
                archive = new gzip.Archive(buffer);
                if (archive.entries.length == 1) {
                    entry = archive.entries[0];
                    if (entry.name) {
                          
                        identifier = entry.name;
                    }
                    else {
                        identifier = identifier.substring(0, identifier.lastIndexOf('.'));
                        if (extension == 'tgz') {
                            identifier += '.tar';
                        }
                    }
                    buffer = entry.data;
                    archive = null;
                }
            }

            switch (identifier.split('.').pop().toLowerCase()) {
                case 'tar':
                    archive = new tar.Archive(buffer);
                    break;
                case 'zip':
                    archive = new zip.Archive(buffer);
                    break;
            }

            if (archive) {
                var folders = {};
                archive.entries.forEach((entry) => {
                    if (entry.name.indexOf('/') != -1) {
                        folders[entry.name.split('/').shift() + '/'] = true;
                    }
                    else {
                        folders['/'] = true;
                    }
                });
                var rootFolder = Object.keys(folders).length == 1 ? Object.keys(folders)[0] : '';
                rootFolder = rootFolder == '/' ? '' : rootFolder;
                var matches = [];
                var entries = archive.entries.slice();
                var nextEntry = () => {
                    if (entries.length > 0) {
                        var entry = entries.shift();
                        if (entry.name.startsWith(rootFolder)) {
                            var identifier = entry.name.substring(rootFolder.length);
                            if (identifier.length > 0 && identifier.indexOf('/') < 0) {
                                var context = new ArchiveContext(null, rootFolder, entry.name, entry.data);
                                var modules = this._filter(context);
                                var nextModule = () => {
                                    if (modules.length > 0) {
                                        var id = modules.shift();
                                        this._host.require(id, (err, module) => {
                                            if (err) {
                                                callback(err, null);
                                                return;
                                            }
                                            if (!module.ModelFactory) {
                                                callback(new ArchiveError("Failed to load module '" + id + "'.", null), null);
                                            }
                                            var factory = new module.ModelFactory();
                                            if (factory.match(context, this._host)) {
                                                matches.push(entry);
                                                modules = [];
                                            }
                                            nextModule();
                                            return;
                                        });
                                    }
                                    else {
                                        nextEntry();
                                        return;
                                    }
                                };
                                nextModule();
                                return;
                            }
                        }
                        nextEntry();
                    }
                    else {
                        if (matches.length == 0) {
                            callback(new ArchiveError('Root does not contain model file.'), null);
                            return;
                        }
                        else if (matches.length > 1) {
                            callback(new ArchiveError('Root contains multiple model files.'), null);
                            return;
                        }
                        var match = matches[0];
                        callback(null, new ArchiveContext(entries, rootFolder, match.name, match.data));
                        return;
                    }
                };
                nextEntry();
                return;
            }
            callback(null, context);
            return;
        }
        catch (err) {
            callback(new ArchiveError(err.message), null);
            return;
        }
    }

    _filter(context) {
        var moduleList = [];
        var moduleMap = {};
        var identifier = context.identifier.toLowerCase();
        this._extensions.forEach((extension) => {
            if (identifier.endsWith(extension.extension)) {
                if (!moduleMap[extension.id]) {
                    moduleList.push(extension.id);
                    moduleMap[extension.id] = true;
                }
            }
        });
        return moduleList;
    }
};

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.View = view.View;
    module.exports.ModelFactoryService = view.ModelFactoryService;
}

/* EoF */