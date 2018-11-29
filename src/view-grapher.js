/*jshint esversion: 6 */

var grapher = grapher || {};

var dagre = dagre || require('dagre');

grapher.Renderer = class {

    constructor(svgElement) {
        this._svgElement = svgElement;
    }

    render(graph) {

        var svgClusterGroup = this.createElement('g');
        svgClusterGroup.setAttribute('id', 'clusters');
        svgClusterGroup.setAttribute('class', 'clusters');
        // svgClusterGroup.style.setProperty('fill', 'red');   // useless
        // svgClusterGroup.style.setProperty('stroke', 'green'); //    useless
        this._svgElement.appendChild(svgClusterGroup);

        var svgEdgePathGroup = this.createElement('g');
        svgEdgePathGroup.setAttribute('id', 'edge-paths');
        svgEdgePathGroup.setAttribute('class', 'edge-paths');
        // svgEdgePathGroup.style.setProperty('fill', 'red');  // useless
        // svgEdgePathGroup.style.setProperty('stroke', 'red');   // useless
        // svgEdgePathGroup.style.setProperty('stroke-width', '5');   // useless
        this._svgElement.appendChild(svgEdgePathGroup);

        var svgEdgeLabelGroup = this.createElement('g');
        svgEdgeLabelGroup.setAttribute('id', 'edge-labels');
        svgEdgeLabelGroup.setAttribute('class', 'edge-labels');
        // svgEdgeLabelGroup.style.setProperty('fill', 'red');  // change label color
        // svgEdgeLabelGroup.style.setProperty('stroke', 'green');  // change label color
        this._svgElement.appendChild(svgEdgeLabelGroup);

        var svgNodeGroup = this.createElement('g');
        svgNodeGroup.setAttribute('id', 'nodes');
        svgNodeGroup.setAttribute('class', 'nodes');
        // svgNodeGroup.style.setProperty('fill', 'red');
        // svgNodeGroup.style.setProperty('stroke', 'green'); This did the same thing as below (container) and will be overwrite as below
        this._svgElement.appendChild(svgNodeGroup);

        graph.nodes().forEach((nodeId) => {
            if (graph.children(nodeId).length == 0) {
                var node = graph.node(nodeId);
                var element = this.createElement('g');
                if (node.id) {
                    element.setAttribute('id', node.id);
                }
                element.setAttribute('class', node.hasOwnProperty('class') ? ('node ' + node.class) : 'node');
                element.style.setProperty('opacity', 0);
                // element.style.setProperty('fill', 'red');    // This did the same thing as below (container) and will be overwrite as below
                // element.style.setProperty('stroke', 'red');
                var container = this.createElement('g');
                container.appendChild(node.label);
                element.appendChild(container);
                svgNodeGroup.appendChild(element);
                var bbox = node.label.getBBox();
                var x = - bbox.width / 2;
                var y = - bbox.height / 2;
                container.setAttribute('transform', 'translate(' + x + ',' + y + ')');
                // container.style.setProperty('fill', 'red');     // This makes all text red, except the upper left part
                // container.style.setProperty('stroke', 'green');       // This makes all text red and super bold, hard to read (ok with following)
                // container.style.setProperty('stroke-width', '0.5');       // This set the width of the text
                node.width = bbox.width;
                node.height = bbox.height;
                node.element = element;
            }
        });

        graph.edges().forEach((edgeId) => {
            var edge = graph.edge(edgeId);
            var tspan = this.createElement('tspan');
            tspan.setAttribute('xml:space', 'preserve');
            tspan.setAttribute('dy', '1em');
            tspan.setAttribute('x', '1');
            tspan.appendChild(document.createTextNode(edge.label));
            var text = this.createElement('text');
            text.appendChild(tspan);
            var container = this.createElement('g');
            container.appendChild(text);
            var element = this.createElement('g');
            element.style.setProperty('opacity', 0);
            element.setAttribute('class', 'edge-label');
            element.appendChild(container);
            svgEdgeLabelGroup.appendChild(element);
            var bbox = container.getBBox();
            var x = - bbox.width / 2;
            var y = - bbox.height / 2;
            container.setAttribute('transform', 'translate(' + x + ',' + y + ')');
            edge.width = bbox.width;
            edge.height = bbox.height;
            edge.element = element;
        });

        dagre.layout(graph);

        graph.nodes().forEach((nodeId) => {
            if (graph.children(nodeId).length == 0) {
                var node = graph.node(nodeId);
                var element = node.element;
                element.setAttribute('transform', 'translate(' + node.x + ',' + node.y + ')');
                element.style.setProperty('opacity', 1);
                delete node.element;
            }
        });

        graph.edges().forEach((edgeId) => {
            var edge = graph.edge(edgeId);
            var element = edge.element;
            if (edge.x && edge.y) {
                element.setAttribute('transform', 'translate(' + edge.x + ',' + edge.y + ')');
                element.style.setProperty('opacity', 1);
            }
            delete edge.element;
        });

        var edgePathGroupDefs = this.createElement('defs');
        svgEdgePathGroup.appendChild(edgePathGroupDefs);
        var marker = this.createElement('marker');
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
        marker.setAttribute('id', 'arrowhead-vee');
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', 9);
        marker.setAttribute('refY', 5);
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', 8);
        marker.setAttribute('markerHeight', 6);
        marker.setAttribute('orient', 'auto');
        // marker.style.setProperty('fill`', 'red');    // useless
        edgePathGroupDefs.appendChild(marker);
        var markerPath = this.createElement('path');
        markerPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 L 4 5 z');
        // markerPath.style.setProperty('stroke-width', 1);    // useless
        markerPath.style.setProperty('stroke-dasharray', '1,0');
        // markerPath.style.setProperty('stroke', 'red');   // use-less
        // markerPath.style.setProperty('fill', 'red');    // this change the arrow color
        marker.appendChild(markerPath);

        graph.edges().forEach((edgeId) => {
            var edge = graph.edge(edgeId);
            var edgePath = grapher.Renderer._computeCurvePath(edge, graph.node(edgeId.v), graph.node(edgeId.w));
            var edgeElement = this.createElement('path');
            edgeElement.setAttribute('class', edge.hasOwnProperty('class') ? ('edge-path ' + edge.class) : 'edge-path');
            edgeElement.setAttribute('d', edgePath);
            edgeElement.setAttribute('marker-end', 'url(#arrowhead-vee)');
            if (edge.id) {
                edgeElement.setAttribute('id', edge.id);
            }
            svgEdgePathGroup.appendChild(edgeElement);
        });

        graph.nodes().forEach((nodeId) => {
            if (graph.children(nodeId).length > 0) {
                var node = graph.node(nodeId);
                var element = this.createElement('g');
                element.setAttribute('class', 'cluster');
                element.setAttribute('transform', 'translate(' + node.x + ',' + node.y + ')');
                // element.style.setProperty('fill', 'red');    // useless
                var rect = this.createElement('rect');
                // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
                rect.setAttribute('x', - node.width / 2);
                rect.setAttribute('y', - node.height / 2 );
                rect.setAttribute('width', node.width);
                rect.setAttribute('height', node.height);
                if (node.rx) { 
                    rect.setAttribute('rx', node.rx);
                }
                if (node.ry) { 
                    rect.setAttribute('ry', node.ry);
                }
                element.appendChild(rect);
                svgClusterGroup.appendChild(element);
            }
        });
    }

    createElement(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }

    static _computeCurvePath(edge, tail, head) {
        var points = edge.points.slice(1, edge.points.length - 1);
        points.unshift(grapher.Renderer.intersectRect(tail, points[0]));
        points.push(grapher.Renderer.intersectRect(head, points[points.length - 1]));

        var path = new Path();
        var curve = new Curve(path);
        points.forEach((point, index) => {
            if (index == 0) {
                curve.lineStart();
            }
            curve.point(point.x, point.y);
            if (index == points.length - 1) {
                curve.lineEnd();
            }
        });

        return path.data;
    }
    
    static intersectRect(node, point) {
        var x = node.x;
        var y = node.y;
        var dx = point.x - x;
        var dy = point.y - y;
        var w = node.width / 2;
        var h = node.height / 2;
        var sx;
        var sy;
        if (Math.abs(dy) * w > Math.abs(dx) * h) {
        if (dy < 0) {
            h = -h;
        }
        sx = dy === 0 ? 0 : h * dx / dy;
        sy = h;
        }
        else {
            if (dx < 0) {
                w = -w;
            }
            sx = w;
            sy = dx === 0 ? 0 : w * dy / dx;
        }      
        return {x: x + sx, y: y + sy};
      }    
};

grapher.NodeElement = class {
    constructor(host, inputFileName, colors) {
        this._host = host;
        this._items = [];
        this._attributes = [];
        this._colors = colors;

        var name = inputFileName + '_subgraph_grouping.json';
        if (this._host.getIsDev()) {
            this._filePath = path.join(__dirname, '../user_json/graph_grouping_json', name);
        }
        else {
            this._filePath = path.join(process.resourcesPath, 'user_json/graph_grouping_json', name);
        }
    }

    addItem(content, identifier, classes, title, handler) {
        var item = {};
        if (content) {
            item.content = content;
        }
        if (identifier) {
            item.identifier = identifier;
            // console.log(identifier);
        }
        if (classes) {
            item.classes = classes;
            // console.log(classes);
        }
        if (title) {
            item.title = title;
        }
        if (handler) {
            item.handler = handler;
        }
        this._items.push(item);
    }

    addAttribute(name, value, title) {
        this._attributes.push({ name: name, value: value, title: title });
    }

    setAttributeHandler(handler) {
        this._attributeHandler = handler;
    }

    setControlDependencies() {
        this._controlDependencies = true;
    }

    format(contextElement) {
        var rootElement = this.createElement('g');
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
        contextElement.appendChild(rootElement);
        var hasAttributes = this._attributes && this._attributes.length > 0;
        var x = 0;
        var y = 0;
        var maxWidth = 0;
        var itemHeight = 0;
        var itemBoxes = [];
        this._items.forEach((item, index) => {
            var yPadding = 4;
            var xPadding = 7;
            var itemGroupElement = this.createElement('g');
            var itemGroupClassList = [ 'node-item' ];
            rootElement.appendChild(itemGroupElement);
            var pathElement = this.createElement('path');
            var textElement = this.createElement('text');
            itemGroupElement.appendChild(pathElement);
            itemGroupElement.appendChild(textElement);
            var content = item.content;
            var handler = item.handler;
            var title = item.title;
            // console.log('content = ' + content + ', handler = ' + handler + ', title = ' + title);
            if (item.classes) {
                item.classes.forEach((className) => {
                    itemGroupClassList.push(className);
                });
            }
            itemGroupElement.setAttribute('class', itemGroupClassList.join(' '));
            if (item.identifier) {
                itemGroupElement.setAttribute('id', item.identifier);
            }
            if (handler) {
                itemGroupElement.addEventListener('mousedown', handler);
            }
            if (title) {
                // console.log(title);
                var titleElement = this.createElement('title');
                titleElement.textContent = title;
                itemGroupElement.appendChild(titleElement);
            }
            if (content) {
                textElement.textContent = content;
            }
            var boundingBox = textElement.getBBox();
            var width = boundingBox.width + xPadding + xPadding;
            var height = boundingBox.height + yPadding + yPadding;
            itemBoxes.push({
                'group': itemGroupElement, 'text': textElement, 'path': pathElement,
                'x': x, 'y': y,
                'width': width, 'height': height,
                'tx': xPadding, 'ty': yPadding - boundingBox.y
            });
            x += width;
            if (itemHeight < height) {
                itemHeight = height;
            }
            if (x > maxWidth) { 
                maxWidth = x;
            }
        });

        var itemWidth = maxWidth;

        x = 0;
        y += itemHeight;

        var attributesHeight = 0;
        var attributesPathElement = null;
        if (hasAttributes)
        {
            var attributeGroupElement = this.createElement('g');
            attributeGroupElement.setAttribute('class', 'node-attribute');
            // attributeGroupElement.setAttribute('id', 'testtttttttt');
            rootElement.appendChild(attributeGroupElement);
            if (this._attributeHandler) {
                attributeGroupElement.addEventListener('mousedown', this._attributeHandler);
            }
            attributesPathElement = this.createElement('path');
            attributeGroupElement.appendChild(attributesPathElement);
            attributeGroupElement.setAttribute('transform', 'translate(' + x + ',' + y + ')');

            attributesHeight += 4;
            this._attributes.forEach((attribute) => {
                var yPadding = 1;
                var xPadding = 4;
                var textElement = this.createElement('text');
                textElement.setAttribute('xml:space', 'preserve');
                attributeGroupElement.appendChild(textElement);
                if (attribute.title) {
                    var titleElement = this.createElement('title');
                    titleElement.textContent = attribute.title;
                    textElement.appendChild(titleElement);
                }
                var textNameElement = this.createElement('tspan');
                textNameElement.textContent = attribute.name;
                textNameElement.style.fontWeight = 'bold';
                textElement.appendChild(textNameElement);
                var textValueElement = this.createElement('tspan');
                textValueElement.textContent = ' = ' + attribute.value;
                textElement.appendChild(textValueElement);
                var size = textElement.getBBox();
                var width = xPadding + size.width + xPadding;
                if (maxWidth < width) {
                    maxWidth = width;
                }
                textElement.setAttribute('x', x + xPadding);
                textElement.setAttribute('y', attributesHeight + yPadding - size.y);
                // var t_h = textElement.clientHeight;
                // var t_w = textElement.clientWidth;
                // console.log('h = ' + t_h + ', w = ' + t_w);
                // textElement.style.setProperty('fill', 'red');   // this just changes text colors...
                attributesHeight += yPadding + size.height + yPadding;
            });
        }

        if (maxWidth > itemWidth) {
            var d = (maxWidth - itemWidth) / this._items.length;
            itemBoxes.forEach((itemBox, index) => {
                itemBox.x = itemBox.x + (index * d);
                itemBox.width = itemBox.width + d;
                itemBox.tx = itemBox.tx + (0.5 * d);
            });
        }

        itemBoxes.forEach((itemBox, index) => {
            itemBox.group.setAttribute('transform', 'translate(' + itemBox.x + ',' + itemBox.y + ')');        
            var r1 = index == 0;
            var r2 = index == itemBoxes.length - 1;
            var r3 = !hasAttributes && r2;
            var r4 = !hasAttributes && r1;
            itemBox.path.setAttribute('d', this.roundedRect(0, 0, itemBox.width, itemBox.height, r1, r2, r3, r4));
            itemBox.text.setAttribute('x', itemBox.tx);
            itemBox.text.setAttribute('y', itemBox.ty);
            // itemBox.group.setProperty('fill', 'yellow'); // error
            // itemBox.path.style.setProperty('stroke', 'yellow');     // the vertical and the horizontal line... (and still see a black line)
            // itemBox.path.style.setProperty('stroke-width', '5');
        });

        if (hasAttributes) {
            attributesPathElement.setAttribute('d', this.roundedRect(0, 0, maxWidth, attributesHeight, false, false, true, true));
        }

        itemBoxes.forEach((itemBox, index) => {
            if (index != 0) {
                var lineElement = this.createElement('line');    // the vertical line that separate the upper and bottom part
                // lineElement.style.setProperty('stroke', 'yellow');
                // lineElement.style.setProperty('stroke-width', '5');
                lineElement.setAttribute('class', 'node');
                lineElement.setAttribute('x1', itemBox.x);
                lineElement.setAttribute('y1', 0);
                lineElement.setAttribute('x2', itemBox.x);
                lineElement.setAttribute('y2', itemHeight);
                rootElement.appendChild(lineElement);
            }
        });
        if (hasAttributes) {
            var lineElement = this.createElement('line');       // the horizontal line that separate the upper and bottom part
            // lineElement.style.setProperty('stroke', 'yellow');
            // lineElement.style.setProperty('stroke-width', '5');
            lineElement.setAttribute('class', 'node');
            lineElement.setAttribute('x1', 0);
            lineElement.setAttribute('y1', itemHeight);
            lineElement.setAttribute('x2', maxWidth);
            lineElement.setAttribute('y2', itemHeight);
            rootElement.appendChild(lineElement);
        }
        // NOTE: try comment out and see; this just a boarder
        var borderElement = this.createElement('path');
        var borderClassList = [ 'node', 'border' ];
        if (this._controlDependencies) {
            borderClassList.push('node-control-dependency');
        }
        borderElement.setAttribute('class', borderClassList.join(' '));
        borderElement.setAttribute('d', this.roundedRect(0, 0, maxWidth, itemHeight + attributesHeight, true, true, true, true));

        if (!jMan.isGraphEmpty(this._filePath)) {
            var raw = fs.readFileSync(this._filePath);
            var groupingObj = JSON.parse(raw);
            var keys = Object.keys(groupingObj);
            var obj = groupingObj[keys[0]];
            // Supports (tested): .h5, .pb, .caffemodel, .onnx
            this._items.forEach((item) => {
                if (item.identifier) {
                    return;
                }
                for (var i = 0; i < obj.length; i++) {
                    var nodes = obj[i].nodes;
                    var x = this._colors[i];
                    for (var j = 0; j < nodes.length; j++) {
                        if (nodes[j] == item.title) {
                            borderElement.style.setProperty('stroke', x);
                            borderElement.style.setProperty('stroke-width', '5');
                        }
                    }
                }
            });
        }

        rootElement.appendChild(borderElement);

        contextElement.innerHTML = '';
        return rootElement;
    }

    roundedRect(x, y, width, height, r1, r2, r3, r4) {
        var radius = 5;    
        r1 = r1 ? radius : 0;
        r2 = r2 ? radius : 0;
        r3 = r3 ? radius : 0;
        r4 = r4 ? radius : 0;
        return "M" + (x + r1) + "," + y +
            "h" + (width - r1 - r2) +
            "a" + r2 + "," + r2 + " 0 0 1 " + r2 + "," + r2 +
            "v" + (height - r2 - r3) +
            "a" + r3 + "," + r3 + " 0 0 1 " + -r3 + "," + r3 +
            "h" + (r3 + r4 - width) +
            "a" + r4 + "," + r4 + " 0 0 1 " + -r4 + "," + -r4 +
            'v' + (-height + r4 + r1) +
            "a" + r1 + "," + r1 + " 0 0 1 " + r1 + "," + -r1 +
            "z";
    }

    createElement(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
};

class Path {

    constructor() {
        this._x0 = null;
        this._y0 = null;
        this._x1 = null;
        this._y1 = null;
        this._data = '';
    }

    moveTo(x, y) {
        this._data += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    }

    lineTo(x, y) {
        this._data += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    }

    bezierCurveTo(x1, y1, x2, y2, x, y) {
        this._data += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    }

    closePath() {
        if (this._x1 !== null) {
            this._x1 = this._x0; 
            this._y1 = this._y0;
            this._data += "Z";
        }
    }

    get data() {
        return this._data;
    }
}

class Curve {

    constructor(context) {
        this._context = context;
    }    

    lineStart() {
        this._x0 = NaN;
        this._x1 = NaN;
        this._y0 = NaN;
        this._y1 = NaN;
        this._point = 0;
    }

    lineEnd() {
        switch (this._point) {
          case 3: 
                this.curve(this._x1, this._y1);
                this._context.lineTo(this._x1, this._y1);
                break;
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
        }
        if (this._line || (this._line !== 0 && this._point === 1)) {
            this._context.closePath();
        }
        this._line = 1 - this._line;
    }
    
    point(x, y) {
        x = +x;
        y = +y;
        switch (this._point) {
            case 0: 
                this._point = 1;
                if (this._line) {
                    this._context.lineTo(x, y);
                }
                else {
                    this._context.moveTo(x, y);
                }
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
                this.curve(x, y);
                break;
            default:
                this.curve(x, y);
                break;
        }
        this._x0 = this._x1;
        this._x1 = x;
        this._y0 = this._y1;
        this._y1 = y;
    }

    curve(x, y) {
        this._context.bezierCurveTo(
            (2 * this._x0 + this._x1) / 3,
            (2 * this._y0 + this._y1) / 3,
            (this._x0 + 2 * this._x1) / 3,
            (this._y0 + 2 * this._y1) / 3,
            (this._x0 + 4 * this._x1 + x) / 6,
            (this._y0 + 4 * this._y1 + y) / 6
        );
    }
}

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.Renderer = grapher.Renderer;
    module.exports.NodeElement = grapher.NodeElement;
}