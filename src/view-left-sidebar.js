/*jshint esversion: 6 */

var Handlebars = Handlebars || require('handlebars');

class LeftSidebar {
    constructor() {
        this._closeSidebarHandler = (e) => {
            this.close();
        };
        this._resizeSidebarHandler = (e) => {
            var contentElement = document.getElementById('left-sidebar-content');
            if (contentElement) {
                contentElement.style.height = window.innerHeight - 60;
            }
        };
    }

    open(content, title, width) {
        var sidebarElement = document.getElementById('left-sidebar');
        var titleElement = document.getElementById('left-sidebar-title');
        var contentElement = document.getElementById('left-sidebar-content');
        var closeButtonElement = document.getElementById('left-sidebar-closebutton');
        if (sidebarElement && contentElement && closeButtonElement && titleElement) {
            titleElement.innerHTML = title ? title.toUpperCase() : '';
            window.addEventListener('resize', this._resizeSidebarHandler);
            closeButtonElement.addEventListener('click', this._closeSidebarHandler);
            closeButtonElement.style.color = '#818181';
            contentElement.style.height = window.innerHeight - 60;
            while (contentElement.firstChild) {
                contentElement.removeChild(contentElement.firstChild);
            }
            if (typeof content == 'string') {
                contentElement.innerHTML = content;
            }
            else if (content instanceof Array) {
                content.forEach((element) => {
                    contentElement.appendChild(element);
                });
            }
            else {
                contentElement.appendChild(content);
            }
            sidebarElement.style.width = width ? width : '500px';    
            if (width && width.endsWith('%')) {
                contentElement.style.width = '100%';
            }
            else {
                contentElement.style.width = 'calc(' + sidebarElement.style.width + ' - 40px)';
            }
        }
    }
  
    close() {
        var sidebarElement = document.getElementById('left-sidebar');
        var contentElement = document.getElementById('left-sidebar-content');
        var closeButtonElement = document.getElementById('left-sidebar-closebutton');
        if (sidebarElement && contentElement && closeButtonElement) {
            sidebarElement.removeEventListener('resize', this._resizeSidebarHandler);
            closeButtonElement.removeEventListener('click', this._closeSidebarHandler);
            closeButtonElement.style.color = '#f8f8f8';
            sidebarElement.style.width = '0';
        }
    }
}

class GroupModeSidebar {
    constructor(host, fileName, filePath, dag) {
        this._host = host;
        this._subgraphs = [];
        this._allNodes = [];
        this._fileName = fileName;
        this._filePath = filePath;
        this._dag = dag;
        this._selectedSubgraph = null;
        this._startOn = false;
        this._endOn = false;
        this._startNode = null;
        this._endNode = null;

        this._contentElement = document.createElement('div');
        this._contentElement.setAttribute('class', 'left-sidebar-view-group');

        this._fullListElement = document.createElement('ol');
        this._fullListElement.setAttribute('id', 'left-sidebar-full-list');
        this._fullListElement.addEventListener('click', (e) => {
            this.highlightHandler(e.target);
        });

        this._addButtons();

        var divider = document.createElement('div');
        divider.setAttribute('style', 'margin-bottom: 20px');

        this._contentElement.appendChild(this._buttonsElement);
        this._contentElement.appendChild(divider);
        this._contentElement.appendChild(this._fullListElement);

        this._readGroupingJSON();
    }

    _addButtons() {
        this._newSubgraphButtonElement = document.createElement('button');
        this._newSubgraphButtonElement.setAttribute('id', 'group-new-subgraph');
        this._newSubgraphButtonElement.innerHTML = 'New Subgraph';    // Add New Subgraph

        this._subgraphID = 1;
        this._newSubgraphButtonElement.addEventListener('click', () => {
            var name = 'default_subgraph_' + this._subgraphID.toString();
            this._subgraphID += 1;
            var subgraphID = 'subgraph-' + name;
            [name, subgraphID] = this.validate(name, subgraphID);
            this.addNewSubgraph(name, subgraphID, this._host);
        });

        this._startNodeButtomElement = document.createElement('button');
        this._startNodeButtomElement.setAttribute('id', 'start-group-new-subgraph');
        this._startNodeButtomElement.innerHTML = 'Start Node';
        this._startNodeButtomElement.addEventListener('click', () => {
            if (!document.getElementById('left-sidebar-start-value-id')) {
                this.startHandler();
            }
            this._startOn = true;
            this._endOn = false;
        });
        this._endNodeButtomElement = document.createElement('button');
        this._endNodeButtomElement.setAttribute('id', 'end-group-new-subgraph');
        this._endNodeButtomElement.innerHTML = 'End Node';
        this._endNodeButtomElement.addEventListener('click', () => {
            if (!document.getElementById('left-sidebar-end-value-id')) {
                this.endHandler();
            }
            this._endOn = true;
            this._startOn = false;
        });
        this._findNodeButtomElement = document.createElement('button');
        this._findNodeButtomElement.setAttribute('id', 'find-group-new-subgraph');
        this._findNodeButtomElement.innerHTML = 'Traverse';
        this._findNodeButtomElement.addEventListener('click', () => {
            this.traverseHandler();
        });
        this._exportButtomElement = document.createElement('button');
        this._exportButtomElement.setAttribute('id', 'export-group-new-subgraph');
        this._exportButtomElement.innerHTML = 'Export'; // Export Group Settings
        this._exportButtomElement.addEventListener('click', () => {
            this.exportHandler()
        });

        this._buttonsElement = document.createElement('div');
        this._buttonsElement.setAttribute('class', 'left-sidebar-buttons');
        this._buttonsElement.appendChild(this._newSubgraphButtonElement);
        this._buttonsElement.appendChild(this._startNodeButtomElement);
        this._buttonsElement.appendChild(this._endNodeButtomElement);
        this._buttonsElement.appendChild(this._findNodeButtomElement);
        this._buttonsElement.appendChild(this._exportButtomElement);
    }

    startHandler() {
        var start = document.createElement('div');
        start.setAttribute('class', 'left-sidebar-name');
        start.setAttribute('id', 'left-sidebar-start-name-id');
        start.innerHTML = 'Start Node: ';
        var startText = document.createElement('div');
        startText.setAttribute('class', 'left-sidebar-value');
        startText.setAttribute('id', 'left-sidebar-start-value-id')
        startText.innerHTML = '<i>choose a node as start node...</i>';
        start.appendChild(startText);
        var ref = document.getElementById('left-sidebar-full-list');
        this._contentElement.insertBefore(start, ref);
    }

    endHandler() {
        var end = document.createElement('div');
        end.setAttribute('class', 'left-sidebar-name');
        end.setAttribute('id', 'left-sidebar-end-name-id');
        end.innerHTML = 'End Node: &nbsp;&nbsp;';
        var endText = document.createElement('div');
        endText.setAttribute('class', 'left-sidebar-value');
        endText.setAttribute('id', 'left-sidebar-end-value-id')
        endText.innerHTML = '<i>choose a node as end node...</i>';
        end.appendChild(endText);
        var ref = document.getElementById('left-sidebar-full-list');
        this._contentElement.insertBefore(end, ref);
    }

    traverseHandler() {
        var sortedArray = dagre.graphlib.alg.topsort(this._dag);
        var s = sortedArray.indexOf(this._startNode);
        var e = sortedArray.indexOf(this._endNode);
        for (s; s <= e; s++) {
            this.appendNode(sortedArray[s]);
        }
    }

    _readGroupingJSON() {
        if (jMan.isGraphEmpty(this._filePath)) {
            return;
        }
        else {
            var raw = fs.readFileSync(this._filePath);
            var graphObj = JSON.parse(raw);
        }
        var keys = Object.keys(graphObj);
        var obj = graphObj[keys[0]];
        for (var i = 0; i < obj.length; i++) {
            var sgName = obj[i].subgraphName;
            var sgID = 'subgraph-' + sgName;
            this.addNewSubgraph(sgName, sgID, this._host);
            this._selectedSubgraph = this._subgraphs.slice(-1)[0];
            var nodes = obj[i].nodes;
            for (var j = 0; j < nodes.length; j++) {
                this.appendNode(nodes[j]);
            }
        }
        this._selectedSubgraph = null;
        this._exportButtomElement.innerHTML = 'Save';
    }

    validate(name, id) {
        for (var i = 0; i < this._subgraphs.length; i++) {
            if (name == this._subgraphs[i].subgraphName) {
                name += '_new';
            }
            if (id == this._subgraphs[i].id) {
                id += '_new';
            }
        }
        return [name, id];
    }

    exportHandler() {
        if (!fs.existsSync(path.dirname(this._filePath))) {
            fs.mkdirSync(path.dirname(this._filePath));
        }
        if (!jMan.isGraphEmpty(this._filePath)) {
            fs.unlinkSync(this._filePath);
        }
        var graphObj = jMan.createGraph(this._fileName);

        for (var i = 0; i < this._subgraphs.length; i++) {
            var sg = this._subgraphs[i].subgraphName;
            jMan.addNewSubgraph(graphObj, this._fileName, sg);
            for (var j = 0; j < this._subgraphs[i]._nodes.length; j++) {
                var x = this._subgraphs[i]._nodes[j].id;
                var nodeName = x.split('-').pop();
                jMan.addNodeToSubgraph(graphObj, this._fileName, sg, nodeName);
            }
        }

        var json = JSON.stringify(graphObj, null , 2);
        fs.writeFileSync(this._filePath, json);
    }

    nodeButtonsOn() {
        this._startNodeButtomElement.style.visibility = 'visible';
        this._endNodeButtomElement.style.visibility = 'visible';
    }

    nodeButtonsOff() {
        this._startNodeButtomElement.style.visibility = 'hidden';
        this._endNodeButtomElement.style.visibility = 'hidden';
        this._findNodeButtomElement.style.visibility = 'hidden';
        var x = document.getElementById('left-sidebar-start-name-id');
        if (x) {
            this._contentElement.removeChild(x);
        }
        var y = document.getElementById('left-sidebar-end-name-id');
        if (y) {
            this._contentElement.removeChild(y);
        }
    }

    highlightOn(target) {
        target.style.background = "#e6e6ff";
        //   target.style.color = "#ffffff";
        this.nodeButtonsOn();
    }

    highlightOff(target) {
        target.style.background = document.getElementById('sidebar').style.backgroundColor;
        target.style.color = document.getElementById('sidebar').style.color;
        this.nodeButtonsOff();
    }

    highlightHandler(target) {
        var tmp = target.id;
        if (tmp.split('-').shift() == 'list') {
            var idx = this.findObjectIndex(this._subgraphs, target.id);
            var t = this._subgraphs[idx];
            if (t == this._selectedSubgraph || this._selectedSubgraph == null) {
                // same graph
                if (!t.selected) {
                    t.selected = true;
                    this._selectedSubgraph = t;
                    this.highlightOn(target);
                }
                else {
                    t.selected = false;
                    this._selectedSubgraph = null;
                    this.highlightOff(target);
                }
            }
            else {
                // different graph
                this._selectedSubgraph.selected = false;
                this.highlightOff(this._selectedSubgraph.title);
                t.selected = true;
                this.highlightOn(target);
                this._selectedSubgraph = t;
            }
        }
    }

    findObjectIndex(array, subgraphID) {
        if (subgraphID == null) {
            return null;
        }
        var targetID = '';
        if (subgraphID.includes('list-')) {
            targetID = subgraphID.replace('list-', '');
        }
        else if (subgraphID.includes('object-')) {
            targetID = subgraphID.replace('object-', '');
        }
        else {
            targetID = subgraphID;
        }

        for (var i = 0; i < array.length; i++) {
            if (array[i].id == targetID) {
                return i;
            }
        }
        return null;
    }

    removeSubgraph(itemID, nodes) {
        if (itemID == this._selectedSubgraph.id) {
            this._selectedSubgraph = null;
            this.nodeButtonsOff();
        }
        for (var i = 0; i < nodes.length; i++) {
            this.removeNodelistItem(nodes[i].id);
        }
        for (var i = 0; i < this._fullListElement.childElementCount; i++) {
            var targetID = 'object-' + itemID.toString();
            var target = this._fullListElement.children[i];
            if (target.id == targetID) {
                this._fullListElement.removeChild(target);
            }
        }
        this._subgraphs.splice(this.findObjectIndex(this._subgraphs, itemID), 1);
    }

    addNewSubgraph(name, subgraphID, host) {
        var item = new GroupModelSubgraphView(name, subgraphID, host);
        item.on('delete-subgraph', (sender, cb) => {
            if (cb) {
                this.removeSubgraph(subgraphID, item.nodes);
            }
        });
        item.on('delete-node', (sender, cb) => {
            this.removeNodelistItem(cb);
        });
        this._subgraphs.push(item);
        this._fullListElement.appendChild(item.content);
    }

    removeNodelistItem(nodeID) {
        for (var i = 0; i < this._allNodes.length; i++) {
            if (this._allNodes[i].id == nodeID) {
                this._allNodes.splice(i, 1);
            }
        }
    }

    appendNode(nodeName) {
        if (this._selectedSubgraph != null) {
            if (this._startOn) {
                var x = document.getElementById('left-sidebar-start-value-id');
                this._startNode = nodeName;
                x.innerHTML = this._startNode;
                this._startOn = false;
            }
            else if (this._endOn) {
                var x = document.getElementById('left-sidebar-end-value-id');
                this._endNode = nodeName;
                x.innerHTML = this._endNode;
                this._endOn = false;
            }
            else {
                var itemID = 'nodelist-item-' + nodeName;
                for (var i = 0; i < this._allNodes.length; i++) {
                    if (this._allNodes[i].id == itemID) {
                        var errMsg = nodeName + ' has been selected';
                        this._host.realError('Invalid Error', errMsg);
                        return false;
                    }
                }
                var item = document.createElement('li');
                item.innerText = '\u25A2 ' + nodeName;
                item.id = itemID;
                this._allNodes.push(item);
                this._selectedSubgraph.appendNode(item);
                return true;
            }

            if (this._startNode && this._endNode) {
                this._findNodeButtomElement.style.visibility = 'visible';
            }
        }
        return false;
    }

    get content() {
        return this._contentElement;
    }

    on(event, callback) {
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
}

class GroupModelSubgraphView {
    constructor(name, id, host) {
        this._name = name;
        this._id = id;
        this._host = host;
        this._isSelected = false;
        this._nodes = [];

        this._contentElement = document.createElement('div');
        this._contentElement.id = 'object-' + this._id;
        
        this._subgraphNameElement = document.createElement('li');
        this._subgraphNameElement.innerText = 'Subgraph \u2192 ' + this._name;
        this._subgraphNameElement.id = 'list-' + this._id;

        this._updateNameButton = document.createElement('div');
        this._updateNameButton.className = 'left-sidebar-view-item-title-button';
        this._updateNameButton.innerHTML = 'N';
        this._isPopup = false;
        this._updateNameButton.addEventListener('click', () => {
            if (!this._isPopup) {
                this._isPopup = true;
                this.updateName();
            }
            else {
                this._isPopup = false;
                var r = document.getElementById('div-popup');
                this._contentElement.removeChild(r)
            }
        });

        this._expander = document.createElement('div');
        this._expander.className = 'left-sidebar-view-item-title-button';
        this._expander.innerHTML = 'X';
        this._expander.addEventListener('click', () => {
            this.deleteSelf();
        });

        this._nodelistElement = document.createElement('ol');
        this._nodelistElement.id = 'nodelist-' + this._id;
        this._nodelistElement.addEventListener('click', (e) => {
            this.deleteNode(e.target.id);
        });

        this._subgraphElement = document.createElement('div');
        this._subgraphElement.appendChild(this._expander);
        this._subgraphElement.appendChild(this._updateNameButton);
        this._subgraphElement.appendChild(this._subgraphNameElement);

        this._contentElement.appendChild(this._subgraphElement);
        this._contentElement.appendChild(this._nodelistElement);
    }

    deleteNode(nodeID) {
        for (var i = 0; i < this._nodes.length; i++) {
            if (this._nodes[i].id == nodeID) {
                this._nodes.splice(i, 1);
            }
        }
        var x = document.getElementById(nodeID);
        this._nodelistElement.removeChild(x);
        this._raise('delete-node', nodeID);
    }

    updateName() {
        var popupElement = document.createElement('div');
        popupElement.setAttribute('class', 'popup');
        popupElement.setAttribute('id', 'div-popup');
        
        var textboxElement = document.createElement('span');
        textboxElement.setAttribute('class', 'popuptext');

        var inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('placeholder', this._name);

        var regex = /^[A-Za-z0-9\_]+$/;     // TODO: force user start with an letter?
        inputElement.addEventListener('input', (e) => {
            if (e.target.value.match(regex) !== null) {
                inputElement.setAttribute('style', 'background-color: #66ff66');
                this._name = e.target.value;
            }
            else {
                inputElement.setAttribute('style', 'background-color: #ff944d');
            }
            this._subgraphNameElement.innerText = 'Subgraph \u2192 ' + this._name;
        });
        inputElement.addEventListener('keyup', (e) => {
            if (e.keyCode == 13) {
                this._isPopup = false;
                var r = document.getElementById('div-popup');
                this._contentElement.removeChild(r)
            }
        });

        textboxElement.appendChild(inputElement);
        popupElement.appendChild(textboxElement);
        // TODO? if user tries to re-name the last empty (no node) subgraph, the height of the parent node is a bit short
        if (this._nodes.length == 0) {
            popupElement.setAttribute('style', 'top: -20px;');
            this._contentElement.appendChild(popupElement);
        }
        else {
            var ref = document.getElementById('nodelist-'+this._id);
            this._contentElement.insertBefore(popupElement, ref);
        }
    }

    appendNode(item) {
        this._nodes.push(item);
        this._nodelistElement.appendChild(item);
    }

    deleteSelf() {
        while (this._contentElement.childElementCount) {
            this._contentElement.removeChild(this._contentElement.lastChild);
        }
        this._raise('delete-subgraph', true);
    }

    get title() {
        return this._subgraphNameElement;
    }

    get content() {
        return this._contentElement;
    }

    get id() {
        return this._id;
    }

    set selected(bool) {
        this._isSelected = bool;
    }

    get selected() {
        return this._isSelected;
    }

    get nodes() {
        return this._nodes;
    }

    get subgraphName() {
        return this._name;
    }

    on(event, callback) {
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
}

/* End of File */