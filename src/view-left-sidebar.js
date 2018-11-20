/*jshint esversion: 6 */

var Handlebars = Handlebars || require('handlebars');
// const jMan = require('./json-manipulate');

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
  constructor(host) {
      this._host = host;
      this._subgraphs = [];
      this._selectedSubgraphs = null;

      this._contentElement = document.createElement('div');
      this._contentElement.setAttribute('class', 'left-sidebar-view-group');

      this._newSubgraphButtonElement = document.createElement('button');
      this._newSubgraphButtonElement.setAttribute('id', 'group-new-subgraph');
      this._newSubgraphButtonElement.innerHTML = 'New Subgraph';    // Add New Subgraph

      this._subgraphID = 1;
      this._newSubgraphButtonElement.addEventListener('click', (event) => {
          var name = 'defaultSubgraph_' + this._subgraphID.toString();
          this._subgraphID += 1;
          var subgraphID = 'subgraph-' + name;
          this.addNewSubgraph(name, subgraphID, this._host);
      });

      this._exportButtomElement = document.createElement('button');
      this._exportButtomElement.setAttribute('id', 'export-group-new-subgraph');
      this._exportButtomElement.innerHTML = 'Export'; // Export Group Settings

      this._fullListElement = document.createElement('ol');
      this._fullListElement.addEventListener('click', (e) => {
          var tmp = e.target.id;
          console.log('[group mode sidebar] ' + tmp);
          if (tmp.split('-').shift() == 'list') {
              var idx = this.findObjectIndex(this._subgraphs, e.target.id);
              var target = this._subgraphs[idx];
              if (target == this._selectedSubgraphs || this._selectedSubgraphs == null) {
                  // same graph
                  if (!target.selected) {
                      target.selected = true;
                      this._selectedSubgraphs = target;
                      this.highlightOn(e.target);
                  }
                  else {
                      target.selected = false;
                      this._selectedSubgraphs = null;
                      this.highlightOff(e.target);
                  }
              }
              else {
                  // different graph
                  this._selectedSubgraphs.selected = false;
                  this.highlightOff(this._selectedSubgraphs.title);
                  target.selected = true;
                  this.highlightOn(e.target);
                  this._selectedSubgraphs = target;
              }

          }
      });

      var divider = document.createElement('div');
      divider.setAttribute('style', 'margin-bottom: 20px');

      this._buttonsElement = document.createElement('div');
      this._buttonsElement.setAttribute('class', 'left-sidebar-buttons');
      this._buttonsElement.appendChild(this._newSubgraphButtonElement);
      this._buttonsElement.appendChild(this._exportButtomElement);

      this._contentElement.appendChild(this._buttonsElement);
      this._contentElement.appendChild(divider);
      this._contentElement.appendChild(this._fullListElement);
  }

  highlightOn(target) {
      target.style.background = "#b3b3b3";
      target.style.color = "#ffffff";
  }

  highlightOff(target) {
      target.style.background = document.getElementById('sidebar').style.backgroundColor;
      target.style.color = document.getElementById('sidebar').style.color;
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

  removeSubgraph(itemID) {
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
      item.on('delete-me', (sender, cb) => {
          if (cb) {
              this.removeSubgraph(subgraphID)
          }
      });
      this._subgraphs.push(item);
      this._fullListElement.appendChild(item.content);
  }

  appendNode(nodeID) {
      var item1 = document.createElement('li');
      item1.innerText = '\u25A2 ' + nodeID;
      item1.id = 'test-' + nodeID;    // TODO: change id
      this._selectedSubgraphs.appendNode(item1);
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

      this._contentElement = document.createElement('ol');
      this._contentElement.id = 'object-' + this._id;
      this._contentElement.addEventListener('click', (e) => {
          var targetId = e.target.id;
          if (targetId) {
              // TODO: allow delete nodes;
              console.log('[subgraph] ' + targetId);
          }
      });
      
      this._subgraphNameElement = document.createElement('li');
      this._subgraphNameElement.innerText = 'Subgraph \u2192 ' + this._name;
      this._subgraphNameElement.id = 'list-' + this._id;

      this._updateNameButton = document.createElement('div');
      this._updateNameButton.className = 'sidebar-view-item-value-expander';
      this._updateNameButton.innerHTML = '<b>N</b>';
      this._isPopup = false;
      this._updateNameButton.addEventListener('click', (e) => {
          if (!this._isPopup) {
              this._isPopup = true;
              // TODO: fix height when change name
              var x = this.resizeHeight();
              this._contentElement.style.height = x;
              this.updateName();
          }
          else {
              this._isPopup = false;
              var x = this.resizeHeight();
              this._contentElement.style.height = x; // TODO: change according +/- nodes height
              this._contentElement.removeChild(this._contentElement.lastChild)
          }
      });

      this._expander = document.createElement('div');
      this._expander.className = 'sidebar-view-item-value-expander';
      this._expander.innerHTML = '<b>X</b>';
      this._expander.addEventListener('click', () => {
          this.deleteSelf();
      });

      this._subgraphElement = document.createElement('div');
      this._subgraphElement.appendChild(this._expander);
      this._subgraphElement.appendChild(this._updateNameButton);
      this._subgraphElement.appendChild(this._subgraphNameElement);
      this._contentElement.appendChild(this._subgraphElement);
  }

  updateName() {
      var popupElement = document.createElement('div');
      popupElement.setAttribute('class', 'popup');
      
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
              var x = this.resizeHeight();
              this._contentElement.style.height = x; // TODO: change according +/- nodes height
              this._contentElement.removeChild(this._contentElement.lastChild)
          }
      });

      textboxElement.appendChild(inputElement);
      popupElement.appendChild(textboxElement);
      this._contentElement.appendChild(popupElement);
  }

  resizeHeight() {
      var x = 23;     // default
      for (var i = 0; i < this._nodes.length; i++) {
          x += this._nodes[i].style.height;
      }
      return x;
  }

  appendNode(item) {
      this._nodes.push(item);
      this._contentElement.appendChild(item);
  }

  deleteSelf() {
      while (this._contentElement.childElementCount) {
          this._contentElement.removeChild(this._contentElement.lastChild);
      }
      this._raise('delete-me', true);
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