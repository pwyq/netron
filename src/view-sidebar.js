/*jshint esversion: 6 */

var Handlebars = Handlebars || require('handlebars');
const jMan = require('./json-manipulate');

class Sidebar {
    /*
     * Right Sidebar
     */
    constructor() {
        this._closeSidebarHandler = (e) => {
            this.close();
        };
        this._closeSidebarKeyDownHandler = (e) => {
            if (e.keyCode == 27) {
                e.preventDefault();
                this.close();
            }
        };
        this._resizeSidebarHandler = (e) => {
            var contentElement = document.getElementById('sidebar-content');
            if (contentElement) {
                contentElement.style.height = window.innerHeight - 60;
            }
        };
    }

    open(content, title, width) {
        var sidebarElement = document.getElementById('sidebar');
        var titleElement = document.getElementById('sidebar-title');
        var contentElement = document.getElementById('sidebar-content');
        var closeButtonElement = document.getElementById('sidebar-closebutton');
        if (sidebarElement && contentElement && closeButtonElement && titleElement) {
            titleElement.innerHTML = title ? title.toUpperCase() : '';
            window.addEventListener('resize', this._resizeSidebarHandler);
            document.addEventListener('keydown', this._closeSidebarKeyDownHandler);
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
        var sidebarElement = document.getElementById('sidebar');
        var contentElement = document.getElementById('sidebar-content');
        var closeButtonElement = document.getElementById('sidebar-closebutton');
        if (sidebarElement && contentElement && closeButtonElement) {
            document.removeEventListener('keydown', this._closeSidebarKeyDownHandler);
            sidebarElement.removeEventListener('resize', this._resizeSidebarHandler);
            closeButtonElement.removeEventListener('click', this._closeSidebarHandler);
            closeButtonElement.style.color = '#f8f8f8';
            sidebarElement.style.width = '0';
        }
    }
}

class NodeSidebar {
    constructor(node, host) {
        this._host = host;
        this._node = node;
        this._elements = [];
        this._attributes = [];
        this._inputs = [];
        this._outputs = [];

        var operatorElement = document.createElement('div');
        operatorElement.className = 'sidebar-view-title';
        operatorElement.innerText = node.operator;
        this._elements.push(operatorElement);

        if (node.documentation) {
            operatorElement.innerText += ' ';
            var documentationButton = document.createElement('a');
            documentationButton.className = 'sidebar-view-title-button';
            documentationButton.innerText = '?';
            documentationButton.addEventListener('click', (e) => {
                this._raise('show-documentation', null);
            });
            operatorElement.appendChild(documentationButton);
        }

        if (node.name) {
            this.addProperty('name', new ValueTextView(node.name));
        }

        if (node.domain) {
            this.addProperty('domain', new ValueTextView(node.domain));
        }

        if (node.description) {
            this.addProperty('description', new ValueTextView(node.description));
        }

        if (node.device) {
            this.addProperty('device', new ValueTextView(node.device));
        }
        
        var attributes = node.attributes;
        if (attributes && attributes.length > 0) {
            this.addHeader('Attributes');
            attributes.forEach((attribute) => {
                this.addAttribute(attribute.name, attribute);
            });
        }

        var inputs = node.inputs;
        if (inputs && inputs.length > 0) {
            this.addHeader('Inputs');
            inputs.forEach((input) => {
                this.addInput(input.name, input);
            });
        }

        var outputs = node.outputs;
        if (outputs && outputs.length > 0) {
            this.addHeader('Outputs');
            outputs.forEach((output) => {
                this.addOutput(output.name, output);
            });
        }

        var divider = document.createElement('div');
        divider.setAttribute('style', 'margin-bottom: 20px');
        this._elements.push(divider);

    }

    get elements() {
        return this._elements;
    }

    addHeader(title) {
        var headerElement = document.createElement('div');
        headerElement.className = 'sidebar-view-header';
        headerElement.innerText = title;
        this._elements.push(headerElement);
    }

    addProperty(name, value) {
        var item = new NameValueView(name, value);
        this._elements.push(item.element);
    }

    addAttribute(name, attribute) {
        var item = new NameValueView(name, new NodeAttributeView(attribute));
        this._attributes.push(item);
        this._elements.push(item.element);
    }

    addInput(name, input) {
        if (input.connections.length > 0) {
            var view = new ArgumentView(input, this._host);
            view.on('export-tensor', (sender, tensor) => {
                this._raise('export-tensor', tensor);
            });
            var item = new NameValueView(name, view);
            this._inputs.push(item);
            this._elements.push(item.element);
        }
    }

    addOutput(name, output) {
        if (output.connections.length > 0) {
            var item = new NameValueView(name, new ArgumentView(output));
            this._outputs.push(item);
            this._elements.push(item.element);
        }
    }

    toggleInput(name) {
        this._inputs.forEach((input) => {
            if (name == input.name) {
                input.toggle();
            }
        });
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

class customAttributes {
    constructor(node, attrList) {
        this._name = node.name;
        this._attrList = attrList;
        this._attributes = [];

        this._attrList.forEach((e) => {
            this.addAttribute(e, '');
        });
    }

    addAttribute(_key, _value) {
        // value is not in use
        this._attributes.push({
            key: _key,
            value: _value,
        });
    }

    get nodeName() {
        return this._name;
    }

    get attributeList() {
        return this._attributes;
    }
}

class NodeCustomAttributeSidebar {
    constructor(node, nodeID, host, fileName, filePath) {
        this._host = host;
        this._node = node;
        this._name = (node.name) ? (node.name) : nodeID;    // nodeID is for no-name nodes
        this._fileName = fileName;
        this._filePath = filePath;
        this._elements = [];
        this._attributes = [];
        this._attributeView = [];   // for listening
        
        this._airunnerConfigObj = null;
        this._airunnerConfigKeys = [];
        this.readJSON();
        this._forbigList = this.readForbidList();

        var operatorElement = document.createElement('div');
        operatorElement.className = 'sidebar-view-title';
        operatorElement.innerText = node.operator;
        this._elements.push(operatorElement);

        this.addProperty('name', new ValueTextView(this._name));

        var attributes = new customAttributes(this._node, this._airunnerConfigKeys);
        var attrList = attributes.attributeList;
        if (attributes && attrList.length > 0) {
            this.addHeader('Custom Attributes');
            attrList.forEach((attr) => {
                var l = this._airunnerConfigObj[attr.key];
                this.addCustomAttribute(this._name, attr.key, l, this._fileName, this._filePath, this._forbigList);
            });
        }

        var divider = document.createElement('div');
        divider.setAttribute('style', 'margin-bottom: 20px');
        this._elements.push(divider);

        if (this._attributeView && this._attributeView.length > 0) {
            // Listen to callback from custom attributes that user selected, and redirect to view
            this._attributeView.forEach((item) => {
                item.on('custom-attr-selected', (sender, cb) => {
                    this._raise('custom-attr-sidebar', cb);
                });
            });
        }
    }

    readForbidList() {
        var p = this.getPath('user_json/config_json',  'airunner_check_list.json');
        if (jMan.isGraphEmpty(p)) {
            return;
        }
        var raw = fs.readFileSync(p);
        var obj = JSON.parse(raw);
        return obj.forbid;
    }

    getPath(folder, file) {
        var res = '';
        if (this._host.getIsDev()) {
          res = path.join(__dirname, '..', folder, file);
        }
        else {
          res = path.join(process.resourcesPath, folder, file);
        }
        return res;
      }

    readJSON() {
        var cusConfigFilePath = this.getPath('user_json/config_json', 'airunner_custom_attributes.json');

        if (jMan.isGraphEmpty(cusConfigFilePath)) {
            this._host.realError('Invalid Error', '\"airunner_custom_attributes.json\" not exists!');
            return;
        }
        var raw = fs.readFileSync(cusConfigFilePath);
        this._airunnerConfigObj = JSON.parse(raw);
        this._airunnerConfigKeys = Object.keys(this._airunnerConfigObj);
    }

    get elements() {
        return this._elements;
    }

    addHeader(title) {
        var headerElement = document.createElement('div');
        headerElement.className = 'sidebar-view-header';
        headerElement.innerText = title;
        this._elements.push(headerElement);
    }

    addProperty(name, value) {
        var item = new NameValueView(name, value);
        this._elements.push(item.element);
    }

    addCustomAttribute(name, attribute, attrList, fileName, filePath, fbList) {
        var customAttrView = new NodeCustomAttributeView(name, attribute, attrList, fileName, filePath, fbList);
        this._attributeView.push(customAttrView);
        var item = new NameValueView(attribute, customAttrView);
        this._attributes.push(item);
        this._elements.push(item.element);
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

class NodeCustomAttributeView {
    constructor(name, attribute, attrList, fileName, filePath, fbList) {
        this._name = name;
        this._attribute = attribute;
        this._attrList = attrList;
        this._fileName = fileName;
        this._filePath = filePath;
        this._forbidList = fbList;
        this._element = document.createElement('div');
        this._element.className = 'sidebar-view-item-value';

        this._expander = document.createElement('div');
        this._expander.className = 'sidebar-view-item-value-expander';
        this._expander.innerText = '+';
        this._expander.addEventListener('click', (e) => {
            this.toggle();
        });
        this._element.appendChild(this._expander);
        
        var tmpValue = this.readJSON();
        this._value = (tmpValue == '') ? 'undefined' : tmpValue;
        this.valueLine = document.createElement('div');
        this.valueLine.className = 'sidebar-view-item-value-line';
        var valueID = 'value-' + this._attribute + this._name;
        this.valueLine.setAttribute('id', valueID);
        this.valueLine.innerHTML = (this._value ? this._value : '&nbsp;');
        this._element.appendChild(this.valueLine);

        this._dropdownListElement = document.createElement('ul');
        this._dropdownListElement.setAttribute('style', 'list-style: none;');
        this._dropdownListElement.setAttribute('style', 'padding-left: 0;');
        this._dropdownListElement.addEventListener('click', (e) => {
            this.updateValue(e.target.id);
            this._raise('custom-attr-selected', e.target.id);
        });
        this._element.appendChild(this._dropdownListElement);
    }

    readJSON() {
        var val = ''
        if (jMan.isGraphEmpty(this._filePath)) {
            return val;
        }

        var raw = fs.readFileSync(this._filePath);
        var graphObj = JSON.parse(raw);
        if (jMan.isNodeExist(graphObj, this._fileName, this._name)) {
            var targetNode = jMan.findNode(graphObj, this._fileName, this._name)[0];
            if (targetNode.attrs.hasOwnProperty(this._attribute)) {
                val = targetNode.attrs[this._attribute];
            }
        }
        return val;
    }

    updateValue(id) {
        this.valueLine.innerHTML = '';
        this.valueLine.innerHTML = id.split('-')[3];
        this.toggle();
    }

    get elements() {
        return [ this._element ];
    }

    getCurrConfig() {
        if (jMan.isGraphEmpty(this._filePath)) {
            return;
        }

        var raw = fs.readFileSync(this._filePath);
        var graphObj = JSON.parse(raw);
        if (jMan.isNodeExist(graphObj, this._fileName, this._name)) {
            return jMan.findNode(graphObj, this._fileName, this._name)[0].attrs;
        }
    }

    validateList(list) {
        var attrObj = this.getCurrConfig();
        if (!attrObj) {
            return list;
        }
        var keys = Object.keys(attrObj);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (k == this._attribute) {
                continue;
            }
            var itemToRemove = this.validateEachEntry(attrObj[k]);
            if (itemToRemove) {
                var idx = list.indexOf(itemToRemove.toString());
                if (idx > -1) {
                    list.splice(idx, 1);
                }
            }
        }
        return list;
    }

    validateEachEntry(v) {
        for (var i = 0; i < this._forbidList.length; i++) {
            var obj = this._forbidList[i];  // i-th objs
            var keys = Object.keys(obj);    // i-th objs' keys
            for (var j = 0; j < keys.length; j++) {
                var k = keys[j];            // i-th objs' j-th key
                if (k == this._attribute) {
                    continue;
                }
                // if the entry value is in the forbid list (i.e be matched with i-th objs' j-th key value(s))
                if (obj[k].includes(v)) {
                    return obj[this._attribute];
                }
            }
        }
    }

    toggle() {
        if (this._expander.innerText == '+') {
            this._expander.innerText = '-';

            var tmpList = this._attrList.slice(0);   // duplicate array value instead of reference
            var attrFullList = this.validateList(tmpList);

            for (var i = 0; i < attrFullList.length; i++) { 
                var attrLine = document.createElement('li');
                attrLine.className = 'sidebar-view-item-value-line-border attr-choose';
                var attrId = 'dpl-' + this._attribute + '-' + this._name + '-' + attrFullList[i]; 
                attrLine.setAttribute('id', attrId);
                attrLine.innerHTML = '<code><b>' + attrFullList[i] + '</b></code>';
                this._dropdownListElement.appendChild(attrLine);
            }
        }
        else {
            this._expander.innerText = '+';
            while (this._dropdownListElement.childElementCount) {
                this._dropdownListElement.removeChild(this._dropdownListElement.lastChild);
            }
        }
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

class NameValueView {
    constructor(name, value) {
        this._name = name;
        this._value = value;

        var nameElement = document.createElement('div');
        nameElement.className = 'sidebar-view-item-name';

        var nameInputElement = document.createElement('input');
        nameInputElement.setAttribute('type', 'text');
        nameInputElement.setAttribute('value', name);
        nameInputElement.setAttribute('title', name);
        nameInputElement.setAttribute('readonly', 'true');
        nameElement.appendChild(nameInputElement);

        var valueElement = document.createElement('div');
        valueElement.className = 'sidebar-view-item-value-list';

        value.elements.forEach((element) => {
            valueElement.appendChild(element);
        });

        this._element = document.createElement('div');
        this._element.className = 'sidebar-view-item';
        this._element.appendChild(nameElement);
        this._element.appendChild(valueElement);
    }

    get name() {
        return this._name;
    }

    get element() {
        return this._element;
    }

    toggle() {
        this._value.toggle();
    }
}

class ValueTextView {

    constructor(value) {
        this._elements = [];
        var element = document.createElement('div');
        element.className = 'sidebar-view-item-value';
        this._elements.push(element);
        var line = document.createElement('div');
        line.className = 'sidebar-view-item-value-line';
        line.innerHTML = value;
        element.appendChild(line);
    }

    get elements() {
        return this._elements;
    }

    toggle() {
    }
}

class NodeAttributeView {
    constructor(attribute) {
        this._attribute = attribute;
        this._element = document.createElement('div');
        this._element.className = 'sidebar-view-item-value';

        if (attribute.type) {
            this._expander = document.createElement('div');
            this._expander.className = 'sidebar-view-item-value-expander';
            this._expander.innerText = '+';
            this._expander.addEventListener('click', (e) => {
                this.toggle();
            });
            this._element.appendChild(this._expander);
        }
        var value = view.View.formatAttributeValue(this._attribute.value, this._attribute.type);
        if (value && value.length > 1000) {
            value = value.substring(0, 1000) + '...';
        }
        if (value && typeof value === 'string') {
            value = value.split('<').join('&lt;').split('>').join('&gt;');
        }
        var valueLine = document.createElement('div');
        valueLine.className = 'sidebar-view-item-value-line';
        valueLine.innerHTML = (value ? value : '&nbsp;');
        this._element.appendChild(valueLine);
    }

    get elements() {
        return [ this._element ];
    }

    toggle() {
        if (this._expander.innerText == '+') {
            this._expander.innerText = '-';

            var typeLine = document.createElement('div');
            typeLine.className = 'sidebar-view-item-value-line-border';
            var type = this._attribute.type;
            var value = this._attribute.value;
            if (type == 'tensor') {
                typeLine.innerHTML = 'type: ' + '<code><b>' + value.type.toString() + '</b></code>';
                this._element.appendChild(typeLine);
            }
            else {
                typeLine.innerHTML = 'type: ' + '<code><b>' + this._attribute.type + '</b></code>';
                this._element.appendChild(typeLine);
            }

            var description = this._attribute.description;
            if (description) {
                var descriptionLine = document.createElement('div');
                descriptionLine.className = 'sidebar-view-item-value-line-border';
                descriptionLine.innerHTML = description;
                this._element.appendChild(descriptionLine);
            }

            if (this._attribute.type == 'tensor') {
                var state = value.state;
                var valueLine = document.createElement('div');
                valueLine.className = 'sidebar-view-item-value-line-border';
                var contentLine = document.createElement('pre');
                contentLine.innerHTML = state || value.toString();
                valueLine.appendChild(contentLine);
                this._element.appendChild(valueLine);
            }
        }
        else {
            this._expander.innerText = '+';
            while (this._element.childElementCount > 2) {
                this._element.removeChild(this._element.lastChild);
            }
        }
    }
}

class ArgumentView {

    constructor(list, host) {
        this._list = list;
        this._elements = [];
        this._items = [];
        list.connections.forEach((connection) => {
            var item = new ConnectionView(connection, host);
            item.on('export-tensor', (sender, tensor) => {
                this._raise('export-tensor', tensor);
            });
            this._items.push(item);
            this._elements.push(item.element);
        });
    }

    get elements() {
        return this._elements;
    }

    toggle() {
        this._items.forEach((item) => {
            item.toggle();
        });
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

class ConnectionView {
    constructor(connection, host) {
        this._connection = connection;
        this._host = host;

        this._element = document.createElement('div');
        this._element.className = 'sidebar-view-item-value';

        var initializer = connection.initializer;
        if (initializer) {
            this._element.classList.add('sidebar-view-item-value-dark');
        }

        var quantization = connection.quantization;
        var type = connection.type;
        if (type || initializer || quantization) {
            this._expander = document.createElement('div');
            this._expander.className = 'sidebar-view-item-value-expander';
            this._expander.innerText = '+';
            this._expander.addEventListener('click', (e) => {
                this.toggle();
            });
            this._element.appendChild(this._expander);
        }

        var id = this._connection.id || '';
        this._hasId = id ? true : false;
        if (initializer && !this._hasId) {
            var kindLine = document.createElement('div');
            kindLine.className = 'sidebar-view-item-value-line';
            kindLine.innerHTML = 'kind: <b>' + initializer.kind + '</b>';
            this._element.appendChild(kindLine);
        }
        else {
            var idLine = document.createElement('div');
            idLine.className = 'sidebar-view-item-value-line';
            id = this._connection.id.split('\n').shift(); // custom connection id
            id = id || ' ';
            idLine.innerHTML = '<span class=\'sidebar-view-item-value-line-content\'>id: <b>' + id + '</b></span>';
            this._element.appendChild(idLine);
        }
    }

    get element() {
        return this._element;
    }

    toggle() {
        if (this._expander) {
            if (this._expander.innerText == '+') {
                this._expander.innerText = '-';
    
                var initializer = this._connection.initializer;
                if (initializer && this._hasId) {
                    var kind = initializer.kind;
                    if (kind) {
                        var kindLine = document.createElement('div');
                        kindLine.className = 'sidebar-view-item-value-line-border';
                        kindLine.innerHTML = 'kind: ' + '<b>' + kind + '</b>';
                        this._element.appendChild(kindLine);
                    }
                }
    
                var type = '?';
                var denotation = null;
                if (this._connection.type) {
                    if (typeof this._connection.type == 'string') {
                        debugger;
                    }
                    type = this._connection.type.toString();
                    denotation = this._connection.type.denotation || null;
                }
                
                if (type) {
                    var typeLine = document.createElement('div');
                    typeLine.className = 'sidebar-view-item-value-line-border';
                    typeLine.innerHTML = 'type: <code><b>' + type.split('<').join('&lt;').split('>').join('&gt;') + '</b></code>';
                    this._element.appendChild(typeLine);
                }
                if (denotation) {
                    var denotationLine = document.createElement('div');
                    denotationLine.className = 'sidebar-view-item-value-line-border';
                    denotationLine.innerHTML = 'denotation: <code><b>' + denotation + '</b></code>';
                    this._element.appendChild(denotationLine);
                }

                var description = this._connection.description;
                if (description) {
                    var descriptionLine = document.createElement('div');
                    descriptionLine.className = 'sidebar-view-item-value-line-border';
                    descriptionLine.innerHTML = description;
                    this._element.appendChild(descriptionLine);
                }

                var quantization = this._connection.quantization;
                if (quantization) {
                    var quantizationLine = document.createElement('div');
                    quantizationLine.className = 'sidebar-view-item-value-line-border';
                    quantizationLine.innerHTML = '<span class=\'sidebar-view-item-value-line-content\'>quantization: ' + '<b>' + quantization + '</b></span>';
                    this._element.appendChild(quantizationLine);
                }

                if (initializer) {
                    var reference = initializer.reference;
                    if (reference) {
                        var referenceLine = document.createElement('div');
                        referenceLine.className = 'sidebar-view-item-value-line-border';
                        referenceLine.innerHTML = 'reference: ' + '<b>' + reference + '</b>';
                        this._element.appendChild(referenceLine);   
                    }
                    var state = initializer.state;
                    if (state === null && this._host.save && 
                        initializer.type.dataType && initializer.type.dataType != '?' && 
                        initializer.type.shape && initializer.type.shape.dimensions && initializer.type.shape.dimensions.length > 0) {
                        this._saveButton = document.createElement('div');
                        this._saveButton.className = 'sidebar-view-item-value-expander';
                        this._saveButton.innerHTML = '&#x1F4BE;';
                        this._saveButton.addEventListener('click', (e) => {
                            this._raise('export-tensor', initializer);
                        });
                        this._element.appendChild(this._saveButton);
                    }

                    var valueLine = document.createElement('div');
                    valueLine.className = 'sidebar-view-item-value-line-border';
                    var contentLine = document.createElement('pre');
                    contentLine.innerHTML = state || initializer.toString();
                    valueLine.appendChild(contentLine);
                    this._element.appendChild(valueLine);
                }
            }
            else {
                this._expander.innerText = '+';
                while (this._element.childElementCount > 2) {
                    this._element.removeChild(this._element.lastChild);
                }
            }
        }
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

class ModelSidebar {

    constructor(model, host) {
        this._host = host;
        this._model = model;
        this._elements = [];

        if (this._model.format) {
            this.addProperty('format', new ValueTextView(this._model.format));
        }
        if (this._model.producer) {
            this.addProperty('producer', new ValueTextView(this._model.producer));
        }
        if (this._model.source) {
            this.addProperty('source', new ValueTextView(this._model.source));
        }
        if (this._model.name) {
            this.addProperty('name', new ValueTextView(this._model.name));
        }
        if (this._model.version) {
            this.addProperty('version', new ValueTextView(this._model.version));
        }
        if (this._model.description) {
            this.addProperty('description', new ValueTextView(this._model.description));
        }
        if (this._model.author) {
            this.addProperty('author', new ValueTextView(this._model.author));
        }
        if (this._model.company) {
            this.addProperty('company', new ValueTextView(this._model.company));
        }    
        if (this._model.license) {
            this.addProperty('license', new ValueTextView(this._model.license));
        }
        if (this._model.domain) {
            this.addProperty('domain', new ValueTextView(this._model.domain));
        }
        if (this._model.imports) {
            this.addProperty('imports', new ValueTextView(this._model.imports));
        }
        if (this._model.runtime) {
            this.addProperty('runtime', new ValueTextView(this._model.runtime));
        }

        var metadata = this._model.metadata;
        if (metadata) {
            this._model.metadata.forEach((property) => {
                this.addProperty(property.name, new ValueTextView(property.value));
            });
        }

        var graphs = this._model.graphs;
        graphs.forEach((graph, index) => {

            var name = graph.name ? ("'" + graph.name + "'") : ('(' + index.toString() + ')');

            var graphTitleElement = document.createElement('div');
            graphTitleElement.className = 'sidebar-view-title';
            graphTitleElement.style.marginTop = '16px';
            graphTitleElement.innerText = 'Graph';
            if (graphs.length > 1) {
                graphTitleElement.innerText += " " + name;
                graphTitleElement.innerText += ' ';
                var graphButton = document.createElement('a');
                graphButton.className = 'sidebar-view-title-button';
                graphButton.id = graph.name;
                graphButton.innerText = '\u21a9';
                graphButton.addEventListener('click', (e) => {
                    this._raise('update-active-graph', e.target.id);
                });
                graphTitleElement.appendChild(graphButton);
            }
            this._elements.push(graphTitleElement);
    
            if (graph.name) {
                this.addProperty('name', new ValueTextView(graph.name));
            }
            if (graph.version) {
                this.addProperty('version', new ValueTextView(graph.version));
            }
            if (graph.type) {
                this.addProperty('type', new ValueTextView(graph.type));                
            }
            if (graph.tags) {
                this.addProperty('tags', new ValueTextView(graph.tags));
            }
            if (graph.description) {
                this.addProperty('description', new ValueTextView(graph.description));                
            }

            if (graph.operators) {
                var item = new NameValueView('operators', new GraphOperatorListView(graph.operators));
                this._elements.push(item.element);
            }

            if (graph.inputs.length > 0) {
                this.addHeader('Inputs');
                graph.inputs.forEach((input) => {
                    this.addArgument(input.name, input);
                });
            }

            if (graph.outputs.length > 0) {
                this.addHeader('Outputs');
                graph.outputs.forEach((output) => {
                    this.addArgument(output.name, output);
                });
            }
        });
    }

    get elements() {
        return this._elements;
    }

    addHeader(title) {
        var headerElement = document.createElement('div');
        headerElement.className = 'sidebar-view-header';
        headerElement.innerText = title;
        this._elements.push(headerElement);
    }

    addProperty(name, value) {
        var item = new NameValueView(name, value);
        this._elements.push(item.element);
    }

    addArgument(name, argument) {
        var view = new ArgumentView(argument, this._host);
        view.toggle();
        var item = new NameValueView(name, view);
        this._elements.push(item.element);
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

class GraphOperatorListView {

    constructor(operators) {

        this._element = document.createElement('div');
        this._element.className = 'sidebar-view-item-value';

        var count = 0;
        this._list = [];
        Object.keys(operators).forEach((operator) => {
            this._list.push({ name: operator, count: operators[operator] });
            count += operators[operator];
        });
        this._list = this._list.sort((a, b) => { return (a.name > b.name) - (a.name < b.name); });
        this._list = this._list.map((item) => { return item.name + ': <b>' + item.count.toString() + '</b>'; });

        this._expander = document.createElement('div');
        this._expander.className = 'sidebar-view-item-value-expander';
        this._expander.innerText = '+';
        this._expander.addEventListener('click', (e) => {
            this.toggle();
        });

        this._element.appendChild(this._expander);

        var countLine = document.createElement('div');
        countLine.className = 'sidebar-view-item-value-line';
        countLine.innerHTML = 'Total: <b>' + count.toString() + '</b>';
        this._element.appendChild(countLine);
    }

    get elements() {
        return [ this._element ];
    }

    toggle() {
        if (this._expander) {
            if (this._expander.innerText == '+') {
                this._expander.innerText = '-';
    
                var valueLine = document.createElement('div');
                valueLine.className = 'sidebar-view-item-value-line-border';
                valueLine.innerHTML = this._list.join('<br/>');
                this._element.appendChild(valueLine);
            }
            else {
                this._expander.innerText = '+';
                while (this._element.childElementCount > 2) {
                    this._element.removeChild(this._element.lastChild);
                }
            }
        }
    }
}

class OperatorDocumentationSidebar {

    constructor(documentation) {
        this._elements = [];
        var template = `
<div id='documentation' class='sidebar-view-documentation'>

<h1>{{{name}}}</h1>
{{#if summary}}
<p>{{{summary}}}</p>
{{/if}}
{{#if description}}
<p>{{{description}}}</p>
{{/if}}

{{#if attributes}}
<h2>Attributes</h2>
<dl>
{{#attributes}}
<dt>{{{name}}}{{#if type}}: <tt>{{{type}}}</tt>{{/if}}</dt>
<dd>{{{description}}}</dd>
{{/attributes}}
</dl>
{{/if}}

{{#if inputs}}
<h2>Inputs{{#if inputs_range}} ({{{inputs_range}}}){{/if}}</h2>
<dl>
{{/if}}
{{#inputs}}
<dt>{{{name}}}{{#if type}}: <tt>{{{type}}}</tt>{{/if}} {{#if option}}({{{option}}}){{/if}}</dt>
<dd>{{{description}}}</dd>
{{/inputs}}
</dl>

{{#if outputs.length}}
<h2>Outputs{{#if outputs_range}} ({{{outputs_range}}}){{/if}}</h2>
<dl>
{{/if}}
{{#outputs}}
<dt>{{{name}}}{{#if type}}: <tt>{{{type}}}</tt>{{/if}} {{#if option}}({{{option}}}){{/if}}</dt>
<dd>{{{description}}}</dd>
{{/outputs}}
</dl>

{{#if type_constraints}}
<h2>Type Constraints</h2>
<dl>
{{#type_constraints}}
<dt>{{{type_param_str}}}: {{#allowed_type_strs}}<tt>{{this}}</tt>{{#unless @last}}, {{/unless}}{{/allowed_type_strs}}</dt>
<dd>{{{description}}}</dd>
{{/type_constraints}}
</dl>
{{/if}}

{{#if examples}}
<h2>Examples</h2>
{{#examples}}
<h3>{{{summary}}}</h3>
<pre>{{{code}}}</pre>
{{/examples}}
{{/if}}

{{#if references}}
<h2>References</h2>
<ul>
{{#references}}
<li>{{{description}}}</li>
{{/references}}
</ul>
{{/if}}

{{#if domain}}{{#if since_version}}{{#if support_level}}
<h2>Support</h2>
<dl>
In domain <tt>{{{domain}}}</tt> since version <tt>{{{since_version}}}</tt> at support level <tt>{{{support_level}}}</tt>.
</dl>
{{/if}}{{/if}}{{/if}}

</div>
`;
        var generator = Handlebars.compile(template, 'utf-8');
        var html = generator(documentation);
        var parser = new DOMParser();
        var document = parser.parseFromString(html, 'text/html');
        var element = document.firstChild;
        element.addEventListener('click', (e) => {
            if (e.target && e.target.href) {
                var link = e.target.href;
                if (link.startsWith('http://') || link.startsWith('https://')) {
                    e.preventDefault();
                    this._raise('navigate', { link: link });
                }
            }
        });
        this._elements.push(element);
    }

    get elements() {
        return this._elements;
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

class FindSidebar {
    constructor(graphElement, graph) {
        this._graphElement = graphElement;
        this._graph = graph;
        this._contentElement = document.createElement('div');
        this._contentElement.setAttribute('class', 'sidebar-view-find');

        this._searchElement = document.createElement('input');
        this._searchElement.setAttribute('id', 'search');
        this._searchElement.setAttribute('type', 'text');
        this._searchElement.setAttribute('placeholder', 'Search...');
        this._searchElement.setAttribute('style', 'width: 100%');
        this._searchElement.addEventListener('input', (e) => {
            this.update(e.target.value);
            this._raise('search-text-changed', e.target.value);
        });

        this._resultElement = document.createElement('ol');
        this._resultElement.addEventListener('click', (e) => {
            this.select(e);
        });

        this._contentElement.appendChild(this._searchElement);
        this._contentElement.appendChild(this._resultElement);
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

    select(e) {
        var selection = [];
        var id = e.target.id;

        var nodesElement = this._graphElement.getElementById('nodes');
        var nodeElement = nodesElement.firstChild;
        while (nodeElement) { 
            if (nodeElement.id == id) {
                selection.push(nodeElement);
            }
            nodeElement = nodeElement.nextSibling;
        }

        var edgePathsElement = this._graphElement.getElementById('edge-paths');
        var edgePathElement = edgePathsElement.firstChild; 
        while (edgePathElement) {
            if (edgePathElement.id == id) {
                selection.push(edgePathElement);
            }
            edgePathElement = edgePathElement.nextSibling;
        }

        var initializerElement = this._graphElement.getElementById(id);
        if (initializerElement) {
            while (initializerElement.parentElement) {
                initializerElement = initializerElement.parentElement;
                if (initializerElement.id && initializerElement.id.startsWith('node-')) {
                    selection.push(initializerElement);
                    break;
                }
            }
        }

        if (selection.length > 0) {
            this._raise('select-channel', selection);
        }
    }

    focus(searchText) {
        this._searchElement.focus();
        this._searchElement.value = '';
        this._searchElement.value = searchText;
        this.update(searchText);
    }

    update(searchText) {
        while (this._resultElement.lastChild) {
            this._resultElement.removeChild(this._resultElement.lastChild);
        }

        var text = searchText.toLowerCase();

        var nodeMatches = {};
        var edgeMatches = {};

        this._graph.nodes.forEach((node) => {

            var initializers = [];

            node.inputs.forEach((input) => {
                input.connections.forEach((connection) => {
                    if (connection.id && connection.id.toLowerCase().indexOf(text) != -1 && !edgeMatches[connection.id]) {
                        if (!connection.initializer) {
                            var item = document.createElement('li');
                            item.innerText = '\u2192 ' + connection.id.split('\n').shift(); // custom connection id
                            item.id = 'edge-' + connection.id;
                            this._resultElement.appendChild(item);
                            edgeMatches[connection.id] = true;
                        }
                        else {
                            initializers.push(connection.initializer);
                        }
                    }    
                });
            });

            var name = node.name;
            if (name && name.toLowerCase().indexOf(text) != -1 && !nodeMatches[name]) {
                var item = document.createElement('li');
                item.innerText = '\u25A2 ' + node.name;
                item.id = 'node-' + node.name;
                this._resultElement.appendChild(item);
                nodeMatches[node.name] = true;
            }

            initializers.forEach((initializer) => {
                var item = document.createElement('li');
                item.innerText = '\u25A0 ' + initializer.name;
                item.id = 'initializer-' + initializer.name;
                this._resultElement.appendChild(item);
            });
        });

        this._graph.nodes.forEach((node) => {
            node.outputs.forEach((output) => {
                output.connections.forEach((connection) => {
                    if (connection.id && connection.id.toLowerCase().indexOf(text) != -1 && !edgeMatches[connection.id]) {
                        var item = document.createElement('li');
                        item.innerText = '\u2192 ' + connection.id.split('\n').shift(); // custom connection id
                        item.id = 'edge-' + connection.id;
                        this._resultElement.appendChild(item);
                        edgeMatches[connection.id] = true;
                    }    
                });
            });
        });

        this._resultElement.style.display = this._resultElement.childNodes.length != 0 ? 'block' : 'none';
    }
    
    get content() {
        return this._contentElement;
    }
}

/* End of File */