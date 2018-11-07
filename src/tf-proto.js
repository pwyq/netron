/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $TextReader = $protobuf.TextReader, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots.tf || ($protobuf.roots.tf = {});
    
    $root.tensorflow = (function() {
    
        /**
         * Namespace tensorflow.
         * @exports tensorflow
         * @namespace
         */
        var tensorflow = {};
    
        tensorflow.SavedModel = (function() {
    
            /**
             * Properties of a SavedModel.
             * @memberof tensorflow
             * @interface ISavedModel
             * @property {number|Long|null} [saved_model_schema_version] SavedModel saved_model_schema_version
             * @property {Array.<tensorflow.IMetaGraphDef>|null} [meta_graphs] SavedModel meta_graphs
             */
    
            /**
             * Constructs a new SavedModel.
             * @memberof tensorflow
             * @classdesc Represents a SavedModel.
             * @implements ISavedModel
             * @constructor
             * @param {tensorflow.ISavedModel=} [properties] Properties to set
             */
            function SavedModel(properties) {
                this.meta_graphs = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SavedModel saved_model_schema_version.
             * @member {number|Long} saved_model_schema_version
             * @memberof tensorflow.SavedModel
             * @instance
             */
            SavedModel.prototype.saved_model_schema_version = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * SavedModel meta_graphs.
             * @member {Array.<tensorflow.IMetaGraphDef>} meta_graphs
             * @memberof tensorflow.SavedModel
             * @instance
             */
            SavedModel.prototype.meta_graphs = $util.emptyArray;
    
            /**
             * Creates a new SavedModel instance using the specified properties.
             * @function create
             * @memberof tensorflow.SavedModel
             * @static
             * @param {tensorflow.ISavedModel=} [properties] Properties to set
             * @returns {tensorflow.SavedModel} SavedModel instance
             */
            SavedModel.create = function create(properties) {
                return new SavedModel(properties);
            };
    
            /**
             * Decodes a SavedModel message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.SavedModel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.SavedModel} SavedModel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SavedModel.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.SavedModel();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.saved_model_schema_version = reader.int64();
                        break;
                    case 2:
                        if (!(message.meta_graphs && message.meta_graphs.length))
                            message.meta_graphs = [];
                        message.meta_graphs.push($root.tensorflow.MetaGraphDef.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SavedModel message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.SavedModel
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.SavedModel} SavedModel
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SavedModel.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.SavedModel();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "saved_model_schema_version":
                        message.saved_model_schema_version = reader.int64();
                        break;
                    case "meta_graphs":
                        if (!(message.meta_graphs && message.meta_graphs.length))
                            message.meta_graphs = [];
                        message.meta_graphs.push($root.tensorflow.MetaGraphDef.decodeText(reader, true));
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a SavedModel message.
             * @function verify
             * @memberof tensorflow.SavedModel
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SavedModel.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.saved_model_schema_version != null && message.hasOwnProperty("saved_model_schema_version"))
                    if (!$util.isInteger(message.saved_model_schema_version) && !(message.saved_model_schema_version && $util.isInteger(message.saved_model_schema_version.low) && $util.isInteger(message.saved_model_schema_version.high)))
                        return "saved_model_schema_version: integer|Long expected";
                if (message.meta_graphs != null && message.hasOwnProperty("meta_graphs")) {
                    if (!Array.isArray(message.meta_graphs))
                        return "meta_graphs: array expected";
                    for (var i = 0; i < message.meta_graphs.length; ++i) {
                        var error = $root.tensorflow.MetaGraphDef.verify(message.meta_graphs[i]);
                        if (error)
                            return "meta_graphs." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a SavedModel message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.SavedModel
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.SavedModel} SavedModel
             */
            SavedModel.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.SavedModel)
                    return object;
                var message = new $root.tensorflow.SavedModel();
                if (object.saved_model_schema_version != null)
                    if ($util.Long)
                        (message.saved_model_schema_version = $util.Long.fromValue(object.saved_model_schema_version)).unsigned = false;
                    else if (typeof object.saved_model_schema_version === "string")
                        message.saved_model_schema_version = parseInt(object.saved_model_schema_version, 10);
                    else if (typeof object.saved_model_schema_version === "number")
                        message.saved_model_schema_version = object.saved_model_schema_version;
                    else if (typeof object.saved_model_schema_version === "object")
                        message.saved_model_schema_version = new $util.LongBits(object.saved_model_schema_version.low >>> 0, object.saved_model_schema_version.high >>> 0).toNumber();
                if (object.meta_graphs) {
                    if (!Array.isArray(object.meta_graphs))
                        throw TypeError(".tensorflow.SavedModel.meta_graphs: array expected");
                    message.meta_graphs = [];
                    for (var i = 0; i < object.meta_graphs.length; ++i) {
                        if (typeof object.meta_graphs[i] !== "object")
                            throw TypeError(".tensorflow.SavedModel.meta_graphs: object expected");
                        message.meta_graphs[i] = $root.tensorflow.MetaGraphDef.fromObject(object.meta_graphs[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SavedModel message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.SavedModel
             * @static
             * @param {tensorflow.SavedModel} message SavedModel
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SavedModel.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.meta_graphs = [];
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.saved_model_schema_version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.saved_model_schema_version = options.longs === String ? "0" : 0;
                if (message.saved_model_schema_version != null && message.hasOwnProperty("saved_model_schema_version"))
                    if (typeof message.saved_model_schema_version === "number")
                        object.saved_model_schema_version = options.longs === String ? String(message.saved_model_schema_version) : message.saved_model_schema_version;
                    else
                        object.saved_model_schema_version = options.longs === String ? $util.Long.prototype.toString.call(message.saved_model_schema_version) : options.longs === Number ? new $util.LongBits(message.saved_model_schema_version.low >>> 0, message.saved_model_schema_version.high >>> 0).toNumber() : message.saved_model_schema_version;
                if (message.meta_graphs && message.meta_graphs.length) {
                    object.meta_graphs = [];
                    for (var j = 0; j < message.meta_graphs.length; ++j)
                        object.meta_graphs[j] = $root.tensorflow.MetaGraphDef.toObject(message.meta_graphs[j], options);
                }
                return object;
            };
    
            /**
             * Converts this SavedModel to JSON.
             * @function toJSON
             * @memberof tensorflow.SavedModel
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SavedModel.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SavedModel;
        })();
    
        tensorflow.MetaGraphDef = (function() {
    
            /**
             * Properties of a MetaGraphDef.
             * @memberof tensorflow
             * @interface IMetaGraphDef
             * @property {tensorflow.MetaGraphDef.IMetaInfoDef|null} [meta_info_def] MetaGraphDef meta_info_def
             * @property {tensorflow.IGraphDef|null} [graph_def] MetaGraphDef graph_def
             * @property {tensorflow.ISaverDef|null} [saver_def] MetaGraphDef saver_def
             * @property {Object.<string,tensorflow.ICollectionDef>|null} [collection_def] MetaGraphDef collection_def
             * @property {Object.<string,tensorflow.ISignatureDef>|null} [signature_def] MetaGraphDef signature_def
             * @property {Array.<tensorflow.IAssetFileDef>|null} [asset_file_def] MetaGraphDef asset_file_def
             */
    
            /**
             * Constructs a new MetaGraphDef.
             * @memberof tensorflow
             * @classdesc Represents a MetaGraphDef.
             * @implements IMetaGraphDef
             * @constructor
             * @param {tensorflow.IMetaGraphDef=} [properties] Properties to set
             */
            function MetaGraphDef(properties) {
                this.collection_def = {};
                this.signature_def = {};
                this.asset_file_def = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MetaGraphDef meta_info_def.
             * @member {tensorflow.MetaGraphDef.IMetaInfoDef|null|undefined} meta_info_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.meta_info_def = null;
    
            /**
             * MetaGraphDef graph_def.
             * @member {tensorflow.IGraphDef|null|undefined} graph_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.graph_def = null;
    
            /**
             * MetaGraphDef saver_def.
             * @member {tensorflow.ISaverDef|null|undefined} saver_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.saver_def = null;
    
            /**
             * MetaGraphDef collection_def.
             * @member {Object.<string,tensorflow.ICollectionDef>} collection_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.collection_def = $util.emptyObject;
    
            /**
             * MetaGraphDef signature_def.
             * @member {Object.<string,tensorflow.ISignatureDef>} signature_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.signature_def = $util.emptyObject;
    
            /**
             * MetaGraphDef asset_file_def.
             * @member {Array.<tensorflow.IAssetFileDef>} asset_file_def
             * @memberof tensorflow.MetaGraphDef
             * @instance
             */
            MetaGraphDef.prototype.asset_file_def = $util.emptyArray;
    
            /**
             * Creates a new MetaGraphDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {tensorflow.IMetaGraphDef=} [properties] Properties to set
             * @returns {tensorflow.MetaGraphDef} MetaGraphDef instance
             */
            MetaGraphDef.create = function create(properties) {
                return new MetaGraphDef(properties);
            };
    
            /**
             * Decodes a MetaGraphDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.MetaGraphDef} MetaGraphDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetaGraphDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.MetaGraphDef(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.meta_info_def = $root.tensorflow.MetaGraphDef.MetaInfoDef.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.graph_def = $root.tensorflow.GraphDef.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.saver_def = $root.tensorflow.SaverDef.decode(reader, reader.uint32());
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.collection_def === $util.emptyObject)
                            message.collection_def = {};
                        key = reader.string();
                        reader.pos++;
                        message.collection_def[key] = $root.tensorflow.CollectionDef.decode(reader, reader.uint32());
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.signature_def === $util.emptyObject)
                            message.signature_def = {};
                        key = reader.string();
                        reader.pos++;
                        message.signature_def[key] = $root.tensorflow.SignatureDef.decode(reader, reader.uint32());
                        break;
                    case 6:
                        if (!(message.asset_file_def && message.asset_file_def.length))
                            message.asset_file_def = [];
                        message.asset_file_def.push($root.tensorflow.AssetFileDef.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MetaGraphDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.MetaGraphDef} MetaGraphDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetaGraphDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.MetaGraphDef(), key;
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "meta_info_def":
                        message.meta_info_def = $root.tensorflow.MetaGraphDef.MetaInfoDef.decodeText(reader, true);
                        break;
                    case "graph_def":
                        message.graph_def = $root.tensorflow.GraphDef.decodeText(reader, true);
                        break;
                    case "saver_def":
                        message.saver_def = $root.tensorflow.SaverDef.decodeText(reader, true);
                        break;
                    case "collection_def":
                        reader.assert("{");
                        if (message.collection_def === $util.emptyObject)
                            message.collection_def = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.collection_def[key] = $root.tensorflow.CollectionDef.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    case "signature_def":
                        reader.assert("{");
                        if (message.signature_def === $util.emptyObject)
                            message.signature_def = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.signature_def[key] = $root.tensorflow.SignatureDef.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    case "asset_file_def":
                        if (!(message.asset_file_def && message.asset_file_def.length))
                            message.asset_file_def = [];
                        message.asset_file_def.push($root.tensorflow.AssetFileDef.decodeText(reader, true));
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a MetaGraphDef message.
             * @function verify
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MetaGraphDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.meta_info_def != null && message.hasOwnProperty("meta_info_def")) {
                    var error = $root.tensorflow.MetaGraphDef.MetaInfoDef.verify(message.meta_info_def);
                    if (error)
                        return "meta_info_def." + error;
                }
                if (message.graph_def != null && message.hasOwnProperty("graph_def")) {
                    var error = $root.tensorflow.GraphDef.verify(message.graph_def);
                    if (error)
                        return "graph_def." + error;
                }
                if (message.saver_def != null && message.hasOwnProperty("saver_def")) {
                    var error = $root.tensorflow.SaverDef.verify(message.saver_def);
                    if (error)
                        return "saver_def." + error;
                }
                if (message.collection_def != null && message.hasOwnProperty("collection_def")) {
                    if (!$util.isObject(message.collection_def))
                        return "collection_def: object expected";
                    var key = Object.keys(message.collection_def);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.CollectionDef.verify(message.collection_def[key[i]]);
                        if (error)
                            return "collection_def." + error;
                    }
                }
                if (message.signature_def != null && message.hasOwnProperty("signature_def")) {
                    if (!$util.isObject(message.signature_def))
                        return "signature_def: object expected";
                    var key = Object.keys(message.signature_def);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.SignatureDef.verify(message.signature_def[key[i]]);
                        if (error)
                            return "signature_def." + error;
                    }
                }
                if (message.asset_file_def != null && message.hasOwnProperty("asset_file_def")) {
                    if (!Array.isArray(message.asset_file_def))
                        return "asset_file_def: array expected";
                    for (var i = 0; i < message.asset_file_def.length; ++i) {
                        var error = $root.tensorflow.AssetFileDef.verify(message.asset_file_def[i]);
                        if (error)
                            return "asset_file_def." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a MetaGraphDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.MetaGraphDef} MetaGraphDef
             */
            MetaGraphDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.MetaGraphDef)
                    return object;
                var message = new $root.tensorflow.MetaGraphDef();
                if (object.meta_info_def != null) {
                    if (typeof object.meta_info_def !== "object")
                        throw TypeError(".tensorflow.MetaGraphDef.meta_info_def: object expected");
                    message.meta_info_def = $root.tensorflow.MetaGraphDef.MetaInfoDef.fromObject(object.meta_info_def);
                }
                if (object.graph_def != null) {
                    if (typeof object.graph_def !== "object")
                        throw TypeError(".tensorflow.MetaGraphDef.graph_def: object expected");
                    message.graph_def = $root.tensorflow.GraphDef.fromObject(object.graph_def);
                }
                if (object.saver_def != null) {
                    if (typeof object.saver_def !== "object")
                        throw TypeError(".tensorflow.MetaGraphDef.saver_def: object expected");
                    message.saver_def = $root.tensorflow.SaverDef.fromObject(object.saver_def);
                }
                if (object.collection_def) {
                    if (typeof object.collection_def !== "object")
                        throw TypeError(".tensorflow.MetaGraphDef.collection_def: object expected");
                    message.collection_def = {};
                    for (var keys = Object.keys(object.collection_def), i = 0; i < keys.length; ++i) {
                        if (typeof object.collection_def[keys[i]] !== "object")
                            throw TypeError(".tensorflow.MetaGraphDef.collection_def: object expected");
                        message.collection_def[keys[i]] = $root.tensorflow.CollectionDef.fromObject(object.collection_def[keys[i]]);
                    }
                }
                if (object.signature_def) {
                    if (typeof object.signature_def !== "object")
                        throw TypeError(".tensorflow.MetaGraphDef.signature_def: object expected");
                    message.signature_def = {};
                    for (var keys = Object.keys(object.signature_def), i = 0; i < keys.length; ++i) {
                        if (typeof object.signature_def[keys[i]] !== "object")
                            throw TypeError(".tensorflow.MetaGraphDef.signature_def: object expected");
                        message.signature_def[keys[i]] = $root.tensorflow.SignatureDef.fromObject(object.signature_def[keys[i]]);
                    }
                }
                if (object.asset_file_def) {
                    if (!Array.isArray(object.asset_file_def))
                        throw TypeError(".tensorflow.MetaGraphDef.asset_file_def: array expected");
                    message.asset_file_def = [];
                    for (var i = 0; i < object.asset_file_def.length; ++i) {
                        if (typeof object.asset_file_def[i] !== "object")
                            throw TypeError(".tensorflow.MetaGraphDef.asset_file_def: object expected");
                        message.asset_file_def[i] = $root.tensorflow.AssetFileDef.fromObject(object.asset_file_def[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a MetaGraphDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.MetaGraphDef
             * @static
             * @param {tensorflow.MetaGraphDef} message MetaGraphDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MetaGraphDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.asset_file_def = [];
                if (options.objects || options.defaults) {
                    object.collection_def = {};
                    object.signature_def = {};
                }
                if (options.defaults) {
                    object.meta_info_def = null;
                    object.graph_def = null;
                    object.saver_def = null;
                }
                if (message.meta_info_def != null && message.hasOwnProperty("meta_info_def"))
                    object.meta_info_def = $root.tensorflow.MetaGraphDef.MetaInfoDef.toObject(message.meta_info_def, options);
                if (message.graph_def != null && message.hasOwnProperty("graph_def"))
                    object.graph_def = $root.tensorflow.GraphDef.toObject(message.graph_def, options);
                if (message.saver_def != null && message.hasOwnProperty("saver_def"))
                    object.saver_def = $root.tensorflow.SaverDef.toObject(message.saver_def, options);
                var keys2;
                if (message.collection_def && (keys2 = Object.keys(message.collection_def)).length) {
                    object.collection_def = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.collection_def[keys2[j]] = $root.tensorflow.CollectionDef.toObject(message.collection_def[keys2[j]], options);
                }
                if (message.signature_def && (keys2 = Object.keys(message.signature_def)).length) {
                    object.signature_def = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.signature_def[keys2[j]] = $root.tensorflow.SignatureDef.toObject(message.signature_def[keys2[j]], options);
                }
                if (message.asset_file_def && message.asset_file_def.length) {
                    object.asset_file_def = [];
                    for (var j = 0; j < message.asset_file_def.length; ++j)
                        object.asset_file_def[j] = $root.tensorflow.AssetFileDef.toObject(message.asset_file_def[j], options);
                }
                return object;
            };
    
            /**
             * Converts this MetaGraphDef to JSON.
             * @function toJSON
             * @memberof tensorflow.MetaGraphDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MetaGraphDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            MetaGraphDef.MetaInfoDef = (function() {
    
                /**
                 * Properties of a MetaInfoDef.
                 * @memberof tensorflow.MetaGraphDef
                 * @interface IMetaInfoDef
                 * @property {string|null} [meta_graph_version] MetaInfoDef meta_graph_version
                 * @property {tensorflow.IOpList|null} [stripped_op_list] MetaInfoDef stripped_op_list
                 * @property {google.protobuf.IAny|null} [any_info] MetaInfoDef any_info
                 * @property {Array.<string>|null} [tags] MetaInfoDef tags
                 * @property {string|null} [tensorflow_version] MetaInfoDef tensorflow_version
                 * @property {string|null} [tensorflow_git_version] MetaInfoDef tensorflow_git_version
                 * @property {boolean|null} [stripped_default_attrs] MetaInfoDef stripped_default_attrs
                 */
    
                /**
                 * Constructs a new MetaInfoDef.
                 * @memberof tensorflow.MetaGraphDef
                 * @classdesc Represents a MetaInfoDef.
                 * @implements IMetaInfoDef
                 * @constructor
                 * @param {tensorflow.MetaGraphDef.IMetaInfoDef=} [properties] Properties to set
                 */
                function MetaInfoDef(properties) {
                    this.tags = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * MetaInfoDef meta_graph_version.
                 * @member {string} meta_graph_version
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.meta_graph_version = "";
    
                /**
                 * MetaInfoDef stripped_op_list.
                 * @member {tensorflow.IOpList|null|undefined} stripped_op_list
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.stripped_op_list = null;
    
                /**
                 * MetaInfoDef any_info.
                 * @member {google.protobuf.IAny|null|undefined} any_info
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.any_info = null;
    
                /**
                 * MetaInfoDef tags.
                 * @member {Array.<string>} tags
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.tags = $util.emptyArray;
    
                /**
                 * MetaInfoDef tensorflow_version.
                 * @member {string} tensorflow_version
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.tensorflow_version = "";
    
                /**
                 * MetaInfoDef tensorflow_git_version.
                 * @member {string} tensorflow_git_version
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.tensorflow_git_version = "";
    
                /**
                 * MetaInfoDef stripped_default_attrs.
                 * @member {boolean} stripped_default_attrs
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 */
                MetaInfoDef.prototype.stripped_default_attrs = false;
    
                /**
                 * Creates a new MetaInfoDef instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {tensorflow.MetaGraphDef.IMetaInfoDef=} [properties] Properties to set
                 * @returns {tensorflow.MetaGraphDef.MetaInfoDef} MetaInfoDef instance
                 */
                MetaInfoDef.create = function create(properties) {
                    return new MetaInfoDef(properties);
                };
    
                /**
                 * Decodes a MetaInfoDef message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.MetaGraphDef.MetaInfoDef} MetaInfoDef
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MetaInfoDef.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.MetaGraphDef.MetaInfoDef();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.meta_graph_version = reader.string();
                            break;
                        case 2:
                            message.stripped_op_list = $root.tensorflow.OpList.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.any_info = $root.google.protobuf.Any.decode(reader, reader.uint32());
                            break;
                        case 4:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push(reader.string());
                            break;
                        case 5:
                            message.tensorflow_version = reader.string();
                            break;
                        case 6:
                            message.tensorflow_git_version = reader.string();
                            break;
                        case 7:
                            message.stripped_default_attrs = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a MetaInfoDef message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.MetaGraphDef.MetaInfoDef} MetaInfoDef
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MetaInfoDef.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.MetaGraphDef.MetaInfoDef();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "meta_graph_version":
                            message.meta_graph_version = reader.string();
                            break;
                        case "stripped_op_list":
                            message.stripped_op_list = $root.tensorflow.OpList.decodeText(reader, true);
                            break;
                        case "any_info":
                            message.any_info = $root.google.protobuf.Any.decodeText(reader, true);
                            break;
                        case "tags":
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push(reader.string());
                            break;
                        case "tensorflow_version":
                            message.tensorflow_version = reader.string();
                            break;
                        case "tensorflow_git_version":
                            message.tensorflow_git_version = reader.string();
                            break;
                        case "stripped_default_attrs":
                            message.stripped_default_attrs = reader.bool();
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a MetaInfoDef message.
                 * @function verify
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MetaInfoDef.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.meta_graph_version != null && message.hasOwnProperty("meta_graph_version"))
                        if (!$util.isString(message.meta_graph_version))
                            return "meta_graph_version: string expected";
                    if (message.stripped_op_list != null && message.hasOwnProperty("stripped_op_list")) {
                        var error = $root.tensorflow.OpList.verify(message.stripped_op_list);
                        if (error)
                            return "stripped_op_list." + error;
                    }
                    if (message.any_info != null && message.hasOwnProperty("any_info")) {
                        var error = $root.google.protobuf.Any.verify(message.any_info);
                        if (error)
                            return "any_info." + error;
                    }
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i)
                            if (!$util.isString(message.tags[i]))
                                return "tags: string[] expected";
                    }
                    if (message.tensorflow_version != null && message.hasOwnProperty("tensorflow_version"))
                        if (!$util.isString(message.tensorflow_version))
                            return "tensorflow_version: string expected";
                    if (message.tensorflow_git_version != null && message.hasOwnProperty("tensorflow_git_version"))
                        if (!$util.isString(message.tensorflow_git_version))
                            return "tensorflow_git_version: string expected";
                    if (message.stripped_default_attrs != null && message.hasOwnProperty("stripped_default_attrs"))
                        if (typeof message.stripped_default_attrs !== "boolean")
                            return "stripped_default_attrs: boolean expected";
                    return null;
                };
    
                /**
                 * Creates a MetaInfoDef message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.MetaGraphDef.MetaInfoDef} MetaInfoDef
                 */
                MetaInfoDef.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.MetaGraphDef.MetaInfoDef)
                        return object;
                    var message = new $root.tensorflow.MetaGraphDef.MetaInfoDef();
                    if (object.meta_graph_version != null)
                        message.meta_graph_version = String(object.meta_graph_version);
                    if (object.stripped_op_list != null) {
                        if (typeof object.stripped_op_list !== "object")
                            throw TypeError(".tensorflow.MetaGraphDef.MetaInfoDef.stripped_op_list: object expected");
                        message.stripped_op_list = $root.tensorflow.OpList.fromObject(object.stripped_op_list);
                    }
                    if (object.any_info != null) {
                        if (typeof object.any_info !== "object")
                            throw TypeError(".tensorflow.MetaGraphDef.MetaInfoDef.any_info: object expected");
                        message.any_info = $root.google.protobuf.Any.fromObject(object.any_info);
                    }
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".tensorflow.MetaGraphDef.MetaInfoDef.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i)
                            message.tags[i] = String(object.tags[i]);
                    }
                    if (object.tensorflow_version != null)
                        message.tensorflow_version = String(object.tensorflow_version);
                    if (object.tensorflow_git_version != null)
                        message.tensorflow_git_version = String(object.tensorflow_git_version);
                    if (object.stripped_default_attrs != null)
                        message.stripped_default_attrs = Boolean(object.stripped_default_attrs);
                    return message;
                };
    
                /**
                 * Creates a plain object from a MetaInfoDef message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @static
                 * @param {tensorflow.MetaGraphDef.MetaInfoDef} message MetaInfoDef
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MetaInfoDef.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.tags = [];
                    if (options.defaults) {
                        object.meta_graph_version = "";
                        object.stripped_op_list = null;
                        object.any_info = null;
                        object.tensorflow_version = "";
                        object.tensorflow_git_version = "";
                        object.stripped_default_attrs = false;
                    }
                    if (message.meta_graph_version != null && message.hasOwnProperty("meta_graph_version"))
                        object.meta_graph_version = message.meta_graph_version;
                    if (message.stripped_op_list != null && message.hasOwnProperty("stripped_op_list"))
                        object.stripped_op_list = $root.tensorflow.OpList.toObject(message.stripped_op_list, options);
                    if (message.any_info != null && message.hasOwnProperty("any_info"))
                        object.any_info = $root.google.protobuf.Any.toObject(message.any_info, options);
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = message.tags[j];
                    }
                    if (message.tensorflow_version != null && message.hasOwnProperty("tensorflow_version"))
                        object.tensorflow_version = message.tensorflow_version;
                    if (message.tensorflow_git_version != null && message.hasOwnProperty("tensorflow_git_version"))
                        object.tensorflow_git_version = message.tensorflow_git_version;
                    if (message.stripped_default_attrs != null && message.hasOwnProperty("stripped_default_attrs"))
                        object.stripped_default_attrs = message.stripped_default_attrs;
                    return object;
                };
    
                /**
                 * Converts this MetaInfoDef to JSON.
                 * @function toJSON
                 * @memberof tensorflow.MetaGraphDef.MetaInfoDef
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MetaInfoDef.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return MetaInfoDef;
            })();
    
            return MetaGraphDef;
        })();
    
        tensorflow.CollectionDef = (function() {
    
            /**
             * Properties of a CollectionDef.
             * @memberof tensorflow
             * @interface ICollectionDef
             * @property {tensorflow.CollectionDef.INodeList|null} [node_list] CollectionDef node_list
             * @property {tensorflow.CollectionDef.IBytesList|null} [bytes_list] CollectionDef bytes_list
             * @property {tensorflow.CollectionDef.IInt64List|null} [int64_list] CollectionDef int64_list
             * @property {tensorflow.CollectionDef.IFloatList|null} [float_list] CollectionDef float_list
             * @property {tensorflow.CollectionDef.IAnyList|null} [any_list] CollectionDef any_list
             */
    
            /**
             * Constructs a new CollectionDef.
             * @memberof tensorflow
             * @classdesc Represents a CollectionDef.
             * @implements ICollectionDef
             * @constructor
             * @param {tensorflow.ICollectionDef=} [properties] Properties to set
             */
            function CollectionDef(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CollectionDef node_list.
             * @member {tensorflow.CollectionDef.INodeList|null|undefined} node_list
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            CollectionDef.prototype.node_list = null;
    
            /**
             * CollectionDef bytes_list.
             * @member {tensorflow.CollectionDef.IBytesList|null|undefined} bytes_list
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            CollectionDef.prototype.bytes_list = null;
    
            /**
             * CollectionDef int64_list.
             * @member {tensorflow.CollectionDef.IInt64List|null|undefined} int64_list
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            CollectionDef.prototype.int64_list = null;
    
            /**
             * CollectionDef float_list.
             * @member {tensorflow.CollectionDef.IFloatList|null|undefined} float_list
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            CollectionDef.prototype.float_list = null;
    
            /**
             * CollectionDef any_list.
             * @member {tensorflow.CollectionDef.IAnyList|null|undefined} any_list
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            CollectionDef.prototype.any_list = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * CollectionDef kind.
             * @member {"node_list"|"bytes_list"|"int64_list"|"float_list"|"any_list"|undefined} kind
             * @memberof tensorflow.CollectionDef
             * @instance
             */
            Object.defineProperty(CollectionDef.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["node_list", "bytes_list", "int64_list", "float_list", "any_list"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new CollectionDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {tensorflow.ICollectionDef=} [properties] Properties to set
             * @returns {tensorflow.CollectionDef} CollectionDef instance
             */
            CollectionDef.create = function create(properties) {
                return new CollectionDef(properties);
            };
    
            /**
             * Decodes a CollectionDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.CollectionDef} CollectionDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CollectionDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.node_list = $root.tensorflow.CollectionDef.NodeList.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.bytes_list = $root.tensorflow.CollectionDef.BytesList.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.int64_list = $root.tensorflow.CollectionDef.Int64List.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.float_list = $root.tensorflow.CollectionDef.FloatList.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.any_list = $root.tensorflow.CollectionDef.AnyList.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CollectionDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.CollectionDef} CollectionDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CollectionDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.CollectionDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "node_list":
                        message.node_list = $root.tensorflow.CollectionDef.NodeList.decodeText(reader, true);
                        break;
                    case "bytes_list":
                        message.bytes_list = $root.tensorflow.CollectionDef.BytesList.decodeText(reader, true);
                        break;
                    case "int64_list":
                        message.int64_list = $root.tensorflow.CollectionDef.Int64List.decodeText(reader, true);
                        break;
                    case "float_list":
                        message.float_list = $root.tensorflow.CollectionDef.FloatList.decodeText(reader, true);
                        break;
                    case "any_list":
                        message.any_list = $root.tensorflow.CollectionDef.AnyList.decodeText(reader, true);
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a CollectionDef message.
             * @function verify
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CollectionDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.node_list != null && message.hasOwnProperty("node_list")) {
                    properties.kind = 1;
                    {
                        var error = $root.tensorflow.CollectionDef.NodeList.verify(message.node_list);
                        if (error)
                            return "node_list." + error;
                    }
                }
                if (message.bytes_list != null && message.hasOwnProperty("bytes_list")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.tensorflow.CollectionDef.BytesList.verify(message.bytes_list);
                        if (error)
                            return "bytes_list." + error;
                    }
                }
                if (message.int64_list != null && message.hasOwnProperty("int64_list")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.tensorflow.CollectionDef.Int64List.verify(message.int64_list);
                        if (error)
                            return "int64_list." + error;
                    }
                }
                if (message.float_list != null && message.hasOwnProperty("float_list")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.tensorflow.CollectionDef.FloatList.verify(message.float_list);
                        if (error)
                            return "float_list." + error;
                    }
                }
                if (message.any_list != null && message.hasOwnProperty("any_list")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.tensorflow.CollectionDef.AnyList.verify(message.any_list);
                        if (error)
                            return "any_list." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CollectionDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.CollectionDef} CollectionDef
             */
            CollectionDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.CollectionDef)
                    return object;
                var message = new $root.tensorflow.CollectionDef();
                if (object.node_list != null) {
                    if (typeof object.node_list !== "object")
                        throw TypeError(".tensorflow.CollectionDef.node_list: object expected");
                    message.node_list = $root.tensorflow.CollectionDef.NodeList.fromObject(object.node_list);
                }
                if (object.bytes_list != null) {
                    if (typeof object.bytes_list !== "object")
                        throw TypeError(".tensorflow.CollectionDef.bytes_list: object expected");
                    message.bytes_list = $root.tensorflow.CollectionDef.BytesList.fromObject(object.bytes_list);
                }
                if (object.int64_list != null) {
                    if (typeof object.int64_list !== "object")
                        throw TypeError(".tensorflow.CollectionDef.int64_list: object expected");
                    message.int64_list = $root.tensorflow.CollectionDef.Int64List.fromObject(object.int64_list);
                }
                if (object.float_list != null) {
                    if (typeof object.float_list !== "object")
                        throw TypeError(".tensorflow.CollectionDef.float_list: object expected");
                    message.float_list = $root.tensorflow.CollectionDef.FloatList.fromObject(object.float_list);
                }
                if (object.any_list != null) {
                    if (typeof object.any_list !== "object")
                        throw TypeError(".tensorflow.CollectionDef.any_list: object expected");
                    message.any_list = $root.tensorflow.CollectionDef.AnyList.fromObject(object.any_list);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CollectionDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.CollectionDef
             * @static
             * @param {tensorflow.CollectionDef} message CollectionDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CollectionDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.node_list != null && message.hasOwnProperty("node_list")) {
                    object.node_list = $root.tensorflow.CollectionDef.NodeList.toObject(message.node_list, options);
                    if (options.oneofs)
                        object.kind = "node_list";
                }
                if (message.bytes_list != null && message.hasOwnProperty("bytes_list")) {
                    object.bytes_list = $root.tensorflow.CollectionDef.BytesList.toObject(message.bytes_list, options);
                    if (options.oneofs)
                        object.kind = "bytes_list";
                }
                if (message.int64_list != null && message.hasOwnProperty("int64_list")) {
                    object.int64_list = $root.tensorflow.CollectionDef.Int64List.toObject(message.int64_list, options);
                    if (options.oneofs)
                        object.kind = "int64_list";
                }
                if (message.float_list != null && message.hasOwnProperty("float_list")) {
                    object.float_list = $root.tensorflow.CollectionDef.FloatList.toObject(message.float_list, options);
                    if (options.oneofs)
                        object.kind = "float_list";
                }
                if (message.any_list != null && message.hasOwnProperty("any_list")) {
                    object.any_list = $root.tensorflow.CollectionDef.AnyList.toObject(message.any_list, options);
                    if (options.oneofs)
                        object.kind = "any_list";
                }
                return object;
            };
    
            /**
             * Converts this CollectionDef to JSON.
             * @function toJSON
             * @memberof tensorflow.CollectionDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CollectionDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            CollectionDef.NodeList = (function() {
    
                /**
                 * Properties of a NodeList.
                 * @memberof tensorflow.CollectionDef
                 * @interface INodeList
                 * @property {Array.<string>|null} [value] NodeList value
                 */
    
                /**
                 * Constructs a new NodeList.
                 * @memberof tensorflow.CollectionDef
                 * @classdesc Represents a NodeList.
                 * @implements INodeList
                 * @constructor
                 * @param {tensorflow.CollectionDef.INodeList=} [properties] Properties to set
                 */
                function NodeList(properties) {
                    this.value = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * NodeList value.
                 * @member {Array.<string>} value
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @instance
                 */
                NodeList.prototype.value = $util.emptyArray;
    
                /**
                 * Creates a new NodeList instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {tensorflow.CollectionDef.INodeList=} [properties] Properties to set
                 * @returns {tensorflow.CollectionDef.NodeList} NodeList instance
                 */
                NodeList.create = function create(properties) {
                    return new NodeList(properties);
                };
    
                /**
                 * Decodes a NodeList message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.CollectionDef.NodeList} NodeList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NodeList.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef.NodeList();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.string());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a NodeList message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.CollectionDef.NodeList} NodeList
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NodeList.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.CollectionDef.NodeList();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "value":
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.string());
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a NodeList message.
                 * @function verify
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NodeList.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        if (!Array.isArray(message.value))
                            return "value: array expected";
                        for (var i = 0; i < message.value.length; ++i)
                            if (!$util.isString(message.value[i]))
                                return "value: string[] expected";
                    }
                    return null;
                };
    
                /**
                 * Creates a NodeList message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.CollectionDef.NodeList} NodeList
                 */
                NodeList.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.CollectionDef.NodeList)
                        return object;
                    var message = new $root.tensorflow.CollectionDef.NodeList();
                    if (object.value) {
                        if (!Array.isArray(object.value))
                            throw TypeError(".tensorflow.CollectionDef.NodeList.value: array expected");
                        message.value = [];
                        for (var i = 0; i < object.value.length; ++i)
                            message.value[i] = String(object.value[i]);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a NodeList message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @static
                 * @param {tensorflow.CollectionDef.NodeList} message NodeList
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NodeList.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.value = [];
                    if (message.value && message.value.length) {
                        object.value = [];
                        for (var j = 0; j < message.value.length; ++j)
                            object.value[j] = message.value[j];
                    }
                    return object;
                };
    
                /**
                 * Converts this NodeList to JSON.
                 * @function toJSON
                 * @memberof tensorflow.CollectionDef.NodeList
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NodeList.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return NodeList;
            })();
    
            CollectionDef.BytesList = (function() {
    
                /**
                 * Properties of a BytesList.
                 * @memberof tensorflow.CollectionDef
                 * @interface IBytesList
                 * @property {Array.<Uint8Array>|null} [value] BytesList value
                 */
    
                /**
                 * Constructs a new BytesList.
                 * @memberof tensorflow.CollectionDef
                 * @classdesc Represents a BytesList.
                 * @implements IBytesList
                 * @constructor
                 * @param {tensorflow.CollectionDef.IBytesList=} [properties] Properties to set
                 */
                function BytesList(properties) {
                    this.value = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * BytesList value.
                 * @member {Array.<Uint8Array>} value
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @instance
                 */
                BytesList.prototype.value = $util.emptyArray;
    
                /**
                 * Creates a new BytesList instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {tensorflow.CollectionDef.IBytesList=} [properties] Properties to set
                 * @returns {tensorflow.CollectionDef.BytesList} BytesList instance
                 */
                BytesList.create = function create(properties) {
                    return new BytesList(properties);
                };
    
                /**
                 * Decodes a BytesList message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.CollectionDef.BytesList} BytesList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BytesList.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef.BytesList();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.bytes());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a BytesList message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.CollectionDef.BytesList} BytesList
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BytesList.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.CollectionDef.BytesList();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "value":
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.bytes());
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a BytesList message.
                 * @function verify
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BytesList.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        if (!Array.isArray(message.value))
                            return "value: array expected";
                        for (var i = 0; i < message.value.length; ++i)
                            if (!(message.value[i] && typeof message.value[i].length === "number" || $util.isString(message.value[i])))
                                return "value: buffer[] expected";
                    }
                    return null;
                };
    
                /**
                 * Creates a BytesList message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.CollectionDef.BytesList} BytesList
                 */
                BytesList.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.CollectionDef.BytesList)
                        return object;
                    var message = new $root.tensorflow.CollectionDef.BytesList();
                    if (object.value) {
                        if (!Array.isArray(object.value))
                            throw TypeError(".tensorflow.CollectionDef.BytesList.value: array expected");
                        message.value = [];
                        for (var i = 0; i < object.value.length; ++i)
                            if (typeof object.value[i] === "string")
                                $util.base64.decode(object.value[i], message.value[i] = $util.newBuffer($util.base64.length(object.value[i])), 0);
                            else if (object.value[i].length)
                                message.value[i] = object.value[i];
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a BytesList message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @static
                 * @param {tensorflow.CollectionDef.BytesList} message BytesList
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BytesList.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.value = [];
                    if (message.value && message.value.length) {
                        object.value = [];
                        for (var j = 0; j < message.value.length; ++j)
                            object.value[j] = options.bytes === String ? $util.base64.encode(message.value[j], 0, message.value[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.value[j]) : message.value[j];
                    }
                    return object;
                };
    
                /**
                 * Converts this BytesList to JSON.
                 * @function toJSON
                 * @memberof tensorflow.CollectionDef.BytesList
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BytesList.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return BytesList;
            })();
    
            CollectionDef.Int64List = (function() {
    
                /**
                 * Properties of an Int64List.
                 * @memberof tensorflow.CollectionDef
                 * @interface IInt64List
                 * @property {Array.<number|Long>|null} [value] Int64List value
                 */
    
                /**
                 * Constructs a new Int64List.
                 * @memberof tensorflow.CollectionDef
                 * @classdesc Represents an Int64List.
                 * @implements IInt64List
                 * @constructor
                 * @param {tensorflow.CollectionDef.IInt64List=} [properties] Properties to set
                 */
                function Int64List(properties) {
                    this.value = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Int64List value.
                 * @member {Array.<number|Long>} value
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @instance
                 */
                Int64List.prototype.value = $util.emptyArray;
    
                /**
                 * Creates a new Int64List instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {tensorflow.CollectionDef.IInt64List=} [properties] Properties to set
                 * @returns {tensorflow.CollectionDef.Int64List} Int64List instance
                 */
                Int64List.create = function create(properties) {
                    return new Int64List(properties);
                };
    
                /**
                 * Decodes an Int64List message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.CollectionDef.Int64List} Int64List
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int64List.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef.Int64List();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.value && message.value.length))
                                message.value = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.value.push(reader.int64());
                            } else
                                message.value.push(reader.int64());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Int64List message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.CollectionDef.Int64List} Int64List
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int64List.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.CollectionDef.Int64List();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "value":
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.int64());
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies an Int64List message.
                 * @function verify
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Int64List.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        if (!Array.isArray(message.value))
                            return "value: array expected";
                        for (var i = 0; i < message.value.length; ++i)
                            if (!$util.isInteger(message.value[i]) && !(message.value[i] && $util.isInteger(message.value[i].low) && $util.isInteger(message.value[i].high)))
                                return "value: integer|Long[] expected";
                    }
                    return null;
                };
    
                /**
                 * Creates an Int64List message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.CollectionDef.Int64List} Int64List
                 */
                Int64List.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.CollectionDef.Int64List)
                        return object;
                    var message = new $root.tensorflow.CollectionDef.Int64List();
                    if (object.value) {
                        if (!Array.isArray(object.value))
                            throw TypeError(".tensorflow.CollectionDef.Int64List.value: array expected");
                        message.value = [];
                        for (var i = 0; i < object.value.length; ++i)
                            if ($util.Long)
                                (message.value[i] = $util.Long.fromValue(object.value[i])).unsigned = false;
                            else if (typeof object.value[i] === "string")
                                message.value[i] = parseInt(object.value[i], 10);
                            else if (typeof object.value[i] === "number")
                                message.value[i] = object.value[i];
                            else if (typeof object.value[i] === "object")
                                message.value[i] = new $util.LongBits(object.value[i].low >>> 0, object.value[i].high >>> 0).toNumber();
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an Int64List message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @static
                 * @param {tensorflow.CollectionDef.Int64List} message Int64List
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Int64List.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.value = [];
                    if (message.value && message.value.length) {
                        object.value = [];
                        for (var j = 0; j < message.value.length; ++j)
                            if (typeof message.value[j] === "number")
                                object.value[j] = options.longs === String ? String(message.value[j]) : message.value[j];
                            else
                                object.value[j] = options.longs === String ? $util.Long.prototype.toString.call(message.value[j]) : options.longs === Number ? new $util.LongBits(message.value[j].low >>> 0, message.value[j].high >>> 0).toNumber() : message.value[j];
                    }
                    return object;
                };
    
                /**
                 * Converts this Int64List to JSON.
                 * @function toJSON
                 * @memberof tensorflow.CollectionDef.Int64List
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Int64List.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Int64List;
            })();
    
            CollectionDef.FloatList = (function() {
    
                /**
                 * Properties of a FloatList.
                 * @memberof tensorflow.CollectionDef
                 * @interface IFloatList
                 * @property {Array.<number>|null} [value] FloatList value
                 */
    
                /**
                 * Constructs a new FloatList.
                 * @memberof tensorflow.CollectionDef
                 * @classdesc Represents a FloatList.
                 * @implements IFloatList
                 * @constructor
                 * @param {tensorflow.CollectionDef.IFloatList=} [properties] Properties to set
                 */
                function FloatList(properties) {
                    this.value = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * FloatList value.
                 * @member {Array.<number>} value
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @instance
                 */
                FloatList.prototype.value = $util.emptyArray;
    
                /**
                 * Creates a new FloatList instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {tensorflow.CollectionDef.IFloatList=} [properties] Properties to set
                 * @returns {tensorflow.CollectionDef.FloatList} FloatList instance
                 */
                FloatList.create = function create(properties) {
                    return new FloatList(properties);
                };
    
                /**
                 * Decodes a FloatList message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.CollectionDef.FloatList} FloatList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FloatList.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef.FloatList();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.value && message.value.length))
                                message.value = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.value.push(reader.float());
                            } else
                                message.value.push(reader.float());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a FloatList message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.CollectionDef.FloatList} FloatList
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FloatList.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.CollectionDef.FloatList();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "value":
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push(reader.float());
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a FloatList message.
                 * @function verify
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FloatList.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        if (!Array.isArray(message.value))
                            return "value: array expected";
                        for (var i = 0; i < message.value.length; ++i)
                            if (typeof message.value[i] !== "number")
                                return "value: number[] expected";
                    }
                    return null;
                };
    
                /**
                 * Creates a FloatList message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.CollectionDef.FloatList} FloatList
                 */
                FloatList.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.CollectionDef.FloatList)
                        return object;
                    var message = new $root.tensorflow.CollectionDef.FloatList();
                    if (object.value) {
                        if (!Array.isArray(object.value))
                            throw TypeError(".tensorflow.CollectionDef.FloatList.value: array expected");
                        message.value = [];
                        for (var i = 0; i < object.value.length; ++i)
                            message.value[i] = Number(object.value[i]);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a FloatList message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @static
                 * @param {tensorflow.CollectionDef.FloatList} message FloatList
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FloatList.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.value = [];
                    if (message.value && message.value.length) {
                        object.value = [];
                        for (var j = 0; j < message.value.length; ++j)
                            object.value[j] = options.json && !isFinite(message.value[j]) ? String(message.value[j]) : message.value[j];
                    }
                    return object;
                };
    
                /**
                 * Converts this FloatList to JSON.
                 * @function toJSON
                 * @memberof tensorflow.CollectionDef.FloatList
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FloatList.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return FloatList;
            })();
    
            CollectionDef.AnyList = (function() {
    
                /**
                 * Properties of an AnyList.
                 * @memberof tensorflow.CollectionDef
                 * @interface IAnyList
                 * @property {Array.<google.protobuf.IAny>|null} [value] AnyList value
                 */
    
                /**
                 * Constructs a new AnyList.
                 * @memberof tensorflow.CollectionDef
                 * @classdesc Represents an AnyList.
                 * @implements IAnyList
                 * @constructor
                 * @param {tensorflow.CollectionDef.IAnyList=} [properties] Properties to set
                 */
                function AnyList(properties) {
                    this.value = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * AnyList value.
                 * @member {Array.<google.protobuf.IAny>} value
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @instance
                 */
                AnyList.prototype.value = $util.emptyArray;
    
                /**
                 * Creates a new AnyList instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {tensorflow.CollectionDef.IAnyList=} [properties] Properties to set
                 * @returns {tensorflow.CollectionDef.AnyList} AnyList instance
                 */
                AnyList.create = function create(properties) {
                    return new AnyList(properties);
                };
    
                /**
                 * Decodes an AnyList message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.CollectionDef.AnyList} AnyList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnyList.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.CollectionDef.AnyList();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push($root.google.protobuf.Any.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an AnyList message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.CollectionDef.AnyList} AnyList
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnyList.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.CollectionDef.AnyList();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "value":
                            if (!(message.value && message.value.length))
                                message.value = [];
                            message.value.push($root.google.protobuf.Any.decodeText(reader, true));
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies an AnyList message.
                 * @function verify
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AnyList.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        if (!Array.isArray(message.value))
                            return "value: array expected";
                        for (var i = 0; i < message.value.length; ++i) {
                            var error = $root.google.protobuf.Any.verify(message.value[i]);
                            if (error)
                                return "value." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates an AnyList message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.CollectionDef.AnyList} AnyList
                 */
                AnyList.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.CollectionDef.AnyList)
                        return object;
                    var message = new $root.tensorflow.CollectionDef.AnyList();
                    if (object.value) {
                        if (!Array.isArray(object.value))
                            throw TypeError(".tensorflow.CollectionDef.AnyList.value: array expected");
                        message.value = [];
                        for (var i = 0; i < object.value.length; ++i) {
                            if (typeof object.value[i] !== "object")
                                throw TypeError(".tensorflow.CollectionDef.AnyList.value: object expected");
                            message.value[i] = $root.google.protobuf.Any.fromObject(object.value[i]);
                        }
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an AnyList message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @static
                 * @param {tensorflow.CollectionDef.AnyList} message AnyList
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AnyList.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.value = [];
                    if (message.value && message.value.length) {
                        object.value = [];
                        for (var j = 0; j < message.value.length; ++j)
                            object.value[j] = $root.google.protobuf.Any.toObject(message.value[j], options);
                    }
                    return object;
                };
    
                /**
                 * Converts this AnyList to JSON.
                 * @function toJSON
                 * @memberof tensorflow.CollectionDef.AnyList
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AnyList.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return AnyList;
            })();
    
            return CollectionDef;
        })();
    
        tensorflow.TensorInfo = (function() {
    
            /**
             * Properties of a TensorInfo.
             * @memberof tensorflow
             * @interface ITensorInfo
             * @property {string|null} [name] TensorInfo name
             * @property {tensorflow.TensorInfo.ICooSparse|null} [coo_sparse] TensorInfo coo_sparse
             * @property {tensorflow.DataType|null} [dtype] TensorInfo dtype
             * @property {tensorflow.ITensorShapeProto|null} [tensor_shape] TensorInfo tensor_shape
             */
    
            /**
             * Constructs a new TensorInfo.
             * @memberof tensorflow
             * @classdesc Represents a TensorInfo.
             * @implements ITensorInfo
             * @constructor
             * @param {tensorflow.ITensorInfo=} [properties] Properties to set
             */
            function TensorInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TensorInfo name.
             * @member {string} name
             * @memberof tensorflow.TensorInfo
             * @instance
             */
            TensorInfo.prototype.name = "";
    
            /**
             * TensorInfo coo_sparse.
             * @member {tensorflow.TensorInfo.ICooSparse|null|undefined} coo_sparse
             * @memberof tensorflow.TensorInfo
             * @instance
             */
            TensorInfo.prototype.coo_sparse = null;
    
            /**
             * TensorInfo dtype.
             * @member {tensorflow.DataType} dtype
             * @memberof tensorflow.TensorInfo
             * @instance
             */
            TensorInfo.prototype.dtype = 0;
    
            /**
             * TensorInfo tensor_shape.
             * @member {tensorflow.ITensorShapeProto|null|undefined} tensor_shape
             * @memberof tensorflow.TensorInfo
             * @instance
             */
            TensorInfo.prototype.tensor_shape = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * TensorInfo encoding.
             * @member {"name"|"coo_sparse"|undefined} encoding
             * @memberof tensorflow.TensorInfo
             * @instance
             */
            Object.defineProperty(TensorInfo.prototype, "encoding", {
                get: $util.oneOfGetter($oneOfFields = ["name", "coo_sparse"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new TensorInfo instance using the specified properties.
             * @function create
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {tensorflow.ITensorInfo=} [properties] Properties to set
             * @returns {tensorflow.TensorInfo} TensorInfo instance
             */
            TensorInfo.create = function create(properties) {
                return new TensorInfo(properties);
            };
    
            /**
             * Decodes a TensorInfo message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.TensorInfo} TensorInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.TensorInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.coo_sparse = $root.tensorflow.TensorInfo.CooSparse.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.dtype = reader.int32();
                        break;
                    case 3:
                        message.tensor_shape = $root.tensorflow.TensorShapeProto.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TensorInfo message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.TensorInfo} TensorInfo
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorInfo.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.TensorInfo();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "name":
                        message.name = reader.string();
                        break;
                    case "coo_sparse":
                        message.coo_sparse = $root.tensorflow.TensorInfo.CooSparse.decodeText(reader, true);
                        break;
                    case "dtype":
                        message.dtype = reader.enum($root.tensorflow.DataType);
                        break;
                    case "tensor_shape":
                        message.tensor_shape = $root.tensorflow.TensorShapeProto.decodeText(reader, true);
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a TensorInfo message.
             * @function verify
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties.encoding = 1;
                    if (!$util.isString(message.name))
                        return "name: string expected";
                }
                if (message.coo_sparse != null && message.hasOwnProperty("coo_sparse")) {
                    if (properties.encoding === 1)
                        return "encoding: multiple values";
                    properties.encoding = 1;
                    {
                        var error = $root.tensorflow.TensorInfo.CooSparse.verify(message.coo_sparse);
                        if (error)
                            return "coo_sparse." + error;
                    }
                }
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    switch (message.dtype) {
                    default:
                        return "dtype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                    case 123:
                        break;
                    }
                if (message.tensor_shape != null && message.hasOwnProperty("tensor_shape")) {
                    var error = $root.tensorflow.TensorShapeProto.verify(message.tensor_shape);
                    if (error)
                        return "tensor_shape." + error;
                }
                return null;
            };
    
            /**
             * Creates a TensorInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.TensorInfo} TensorInfo
             */
            TensorInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.TensorInfo)
                    return object;
                var message = new $root.tensorflow.TensorInfo();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.coo_sparse != null) {
                    if (typeof object.coo_sparse !== "object")
                        throw TypeError(".tensorflow.TensorInfo.coo_sparse: object expected");
                    message.coo_sparse = $root.tensorflow.TensorInfo.CooSparse.fromObject(object.coo_sparse);
                }
                switch (object.dtype) {
                case "DT_INVALID":
                case 0:
                    message.dtype = 0;
                    break;
                case "DT_FLOAT":
                case 1:
                    message.dtype = 1;
                    break;
                case "DT_DOUBLE":
                case 2:
                    message.dtype = 2;
                    break;
                case "DT_INT32":
                case 3:
                    message.dtype = 3;
                    break;
                case "DT_UINT8":
                case 4:
                    message.dtype = 4;
                    break;
                case "DT_INT16":
                case 5:
                    message.dtype = 5;
                    break;
                case "DT_INT8":
                case 6:
                    message.dtype = 6;
                    break;
                case "DT_STRING":
                case 7:
                    message.dtype = 7;
                    break;
                case "DT_COMPLEX64":
                case 8:
                    message.dtype = 8;
                    break;
                case "DT_INT64":
                case 9:
                    message.dtype = 9;
                    break;
                case "DT_BOOL":
                case 10:
                    message.dtype = 10;
                    break;
                case "DT_QINT8":
                case 11:
                    message.dtype = 11;
                    break;
                case "DT_QUINT8":
                case 12:
                    message.dtype = 12;
                    break;
                case "DT_QINT32":
                case 13:
                    message.dtype = 13;
                    break;
                case "DT_BFLOAT16":
                case 14:
                    message.dtype = 14;
                    break;
                case "DT_QINT16":
                case 15:
                    message.dtype = 15;
                    break;
                case "DT_QUINT16":
                case 16:
                    message.dtype = 16;
                    break;
                case "DT_UINT16":
                case 17:
                    message.dtype = 17;
                    break;
                case "DT_COMPLEX128":
                case 18:
                    message.dtype = 18;
                    break;
                case "DT_HALF":
                case 19:
                    message.dtype = 19;
                    break;
                case "DT_RESOURCE":
                case 20:
                    message.dtype = 20;
                    break;
                case "DT_VARIANT":
                case 21:
                    message.dtype = 21;
                    break;
                case "DT_UINT32":
                case 22:
                    message.dtype = 22;
                    break;
                case "DT_UINT64":
                case 23:
                    message.dtype = 23;
                    break;
                case "DT_FLOAT_REF":
                case 101:
                    message.dtype = 101;
                    break;
                case "DT_DOUBLE_REF":
                case 102:
                    message.dtype = 102;
                    break;
                case "DT_INT32_REF":
                case 103:
                    message.dtype = 103;
                    break;
                case "DT_UINT8_REF":
                case 104:
                    message.dtype = 104;
                    break;
                case "DT_INT16_REF":
                case 105:
                    message.dtype = 105;
                    break;
                case "DT_INT8_REF":
                case 106:
                    message.dtype = 106;
                    break;
                case "DT_STRING_REF":
                case 107:
                    message.dtype = 107;
                    break;
                case "DT_COMPLEX64_REF":
                case 108:
                    message.dtype = 108;
                    break;
                case "DT_INT64_REF":
                case 109:
                    message.dtype = 109;
                    break;
                case "DT_BOOL_REF":
                case 110:
                    message.dtype = 110;
                    break;
                case "DT_QINT8_REF":
                case 111:
                    message.dtype = 111;
                    break;
                case "DT_QUINT8_REF":
                case 112:
                    message.dtype = 112;
                    break;
                case "DT_QINT32_REF":
                case 113:
                    message.dtype = 113;
                    break;
                case "DT_BFLOAT16_REF":
                case 114:
                    message.dtype = 114;
                    break;
                case "DT_QINT16_REF":
                case 115:
                    message.dtype = 115;
                    break;
                case "DT_QUINT16_REF":
                case 116:
                    message.dtype = 116;
                    break;
                case "DT_UINT16_REF":
                case 117:
                    message.dtype = 117;
                    break;
                case "DT_COMPLEX128_REF":
                case 118:
                    message.dtype = 118;
                    break;
                case "DT_HALF_REF":
                case 119:
                    message.dtype = 119;
                    break;
                case "DT_RESOURCE_REF":
                case 120:
                    message.dtype = 120;
                    break;
                case "DT_VARIANT_REF":
                case 121:
                    message.dtype = 121;
                    break;
                case "DT_UINT32_REF":
                case 122:
                    message.dtype = 122;
                    break;
                case "DT_UINT64_REF":
                case 123:
                    message.dtype = 123;
                    break;
                }
                if (object.tensor_shape != null) {
                    if (typeof object.tensor_shape !== "object")
                        throw TypeError(".tensorflow.TensorInfo.tensor_shape: object expected");
                    message.tensor_shape = $root.tensorflow.TensorShapeProto.fromObject(object.tensor_shape);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TensorInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.TensorInfo
             * @static
             * @param {tensorflow.TensorInfo} message TensorInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.dtype = options.enums === String ? "DT_INVALID" : 0;
                    object.tensor_shape = null;
                }
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs)
                        object.encoding = "name";
                }
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    object.dtype = options.enums === String ? $root.tensorflow.DataType[message.dtype] : message.dtype;
                if (message.tensor_shape != null && message.hasOwnProperty("tensor_shape"))
                    object.tensor_shape = $root.tensorflow.TensorShapeProto.toObject(message.tensor_shape, options);
                if (message.coo_sparse != null && message.hasOwnProperty("coo_sparse")) {
                    object.coo_sparse = $root.tensorflow.TensorInfo.CooSparse.toObject(message.coo_sparse, options);
                    if (options.oneofs)
                        object.encoding = "coo_sparse";
                }
                return object;
            };
    
            /**
             * Converts this TensorInfo to JSON.
             * @function toJSON
             * @memberof tensorflow.TensorInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            TensorInfo.CooSparse = (function() {
    
                /**
                 * Properties of a CooSparse.
                 * @memberof tensorflow.TensorInfo
                 * @interface ICooSparse
                 * @property {string|null} [values_tensor_name] CooSparse values_tensor_name
                 * @property {string|null} [indices_tensor_name] CooSparse indices_tensor_name
                 * @property {string|null} [dense_shape_tensor_name] CooSparse dense_shape_tensor_name
                 */
    
                /**
                 * Constructs a new CooSparse.
                 * @memberof tensorflow.TensorInfo
                 * @classdesc Represents a CooSparse.
                 * @implements ICooSparse
                 * @constructor
                 * @param {tensorflow.TensorInfo.ICooSparse=} [properties] Properties to set
                 */
                function CooSparse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * CooSparse values_tensor_name.
                 * @member {string} values_tensor_name
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @instance
                 */
                CooSparse.prototype.values_tensor_name = "";
    
                /**
                 * CooSparse indices_tensor_name.
                 * @member {string} indices_tensor_name
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @instance
                 */
                CooSparse.prototype.indices_tensor_name = "";
    
                /**
                 * CooSparse dense_shape_tensor_name.
                 * @member {string} dense_shape_tensor_name
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @instance
                 */
                CooSparse.prototype.dense_shape_tensor_name = "";
    
                /**
                 * Creates a new CooSparse instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {tensorflow.TensorInfo.ICooSparse=} [properties] Properties to set
                 * @returns {tensorflow.TensorInfo.CooSparse} CooSparse instance
                 */
                CooSparse.create = function create(properties) {
                    return new CooSparse(properties);
                };
    
                /**
                 * Decodes a CooSparse message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.TensorInfo.CooSparse} CooSparse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CooSparse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.TensorInfo.CooSparse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.values_tensor_name = reader.string();
                            break;
                        case 2:
                            message.indices_tensor_name = reader.string();
                            break;
                        case 3:
                            message.dense_shape_tensor_name = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a CooSparse message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.TensorInfo.CooSparse} CooSparse
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CooSparse.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.TensorInfo.CooSparse();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "values_tensor_name":
                            message.values_tensor_name = reader.string();
                            break;
                        case "indices_tensor_name":
                            message.indices_tensor_name = reader.string();
                            break;
                        case "dense_shape_tensor_name":
                            message.dense_shape_tensor_name = reader.string();
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a CooSparse message.
                 * @function verify
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CooSparse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.values_tensor_name != null && message.hasOwnProperty("values_tensor_name"))
                        if (!$util.isString(message.values_tensor_name))
                            return "values_tensor_name: string expected";
                    if (message.indices_tensor_name != null && message.hasOwnProperty("indices_tensor_name"))
                        if (!$util.isString(message.indices_tensor_name))
                            return "indices_tensor_name: string expected";
                    if (message.dense_shape_tensor_name != null && message.hasOwnProperty("dense_shape_tensor_name"))
                        if (!$util.isString(message.dense_shape_tensor_name))
                            return "dense_shape_tensor_name: string expected";
                    return null;
                };
    
                /**
                 * Creates a CooSparse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.TensorInfo.CooSparse} CooSparse
                 */
                CooSparse.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.TensorInfo.CooSparse)
                        return object;
                    var message = new $root.tensorflow.TensorInfo.CooSparse();
                    if (object.values_tensor_name != null)
                        message.values_tensor_name = String(object.values_tensor_name);
                    if (object.indices_tensor_name != null)
                        message.indices_tensor_name = String(object.indices_tensor_name);
                    if (object.dense_shape_tensor_name != null)
                        message.dense_shape_tensor_name = String(object.dense_shape_tensor_name);
                    return message;
                };
    
                /**
                 * Creates a plain object from a CooSparse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @static
                 * @param {tensorflow.TensorInfo.CooSparse} message CooSparse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CooSparse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.values_tensor_name = "";
                        object.indices_tensor_name = "";
                        object.dense_shape_tensor_name = "";
                    }
                    if (message.values_tensor_name != null && message.hasOwnProperty("values_tensor_name"))
                        object.values_tensor_name = message.values_tensor_name;
                    if (message.indices_tensor_name != null && message.hasOwnProperty("indices_tensor_name"))
                        object.indices_tensor_name = message.indices_tensor_name;
                    if (message.dense_shape_tensor_name != null && message.hasOwnProperty("dense_shape_tensor_name"))
                        object.dense_shape_tensor_name = message.dense_shape_tensor_name;
                    return object;
                };
    
                /**
                 * Converts this CooSparse to JSON.
                 * @function toJSON
                 * @memberof tensorflow.TensorInfo.CooSparse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CooSparse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return CooSparse;
            })();
    
            return TensorInfo;
        })();
    
        tensorflow.SignatureDef = (function() {
    
            /**
             * Properties of a SignatureDef.
             * @memberof tensorflow
             * @interface ISignatureDef
             * @property {Object.<string,tensorflow.ITensorInfo>|null} [inputs] SignatureDef inputs
             * @property {Object.<string,tensorflow.ITensorInfo>|null} [outputs] SignatureDef outputs
             * @property {string|null} [method_name] SignatureDef method_name
             */
    
            /**
             * Constructs a new SignatureDef.
             * @memberof tensorflow
             * @classdesc Represents a SignatureDef.
             * @implements ISignatureDef
             * @constructor
             * @param {tensorflow.ISignatureDef=} [properties] Properties to set
             */
            function SignatureDef(properties) {
                this.inputs = {};
                this.outputs = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SignatureDef inputs.
             * @member {Object.<string,tensorflow.ITensorInfo>} inputs
             * @memberof tensorflow.SignatureDef
             * @instance
             */
            SignatureDef.prototype.inputs = $util.emptyObject;
    
            /**
             * SignatureDef outputs.
             * @member {Object.<string,tensorflow.ITensorInfo>} outputs
             * @memberof tensorflow.SignatureDef
             * @instance
             */
            SignatureDef.prototype.outputs = $util.emptyObject;
    
            /**
             * SignatureDef method_name.
             * @member {string} method_name
             * @memberof tensorflow.SignatureDef
             * @instance
             */
            SignatureDef.prototype.method_name = "";
    
            /**
             * Creates a new SignatureDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {tensorflow.ISignatureDef=} [properties] Properties to set
             * @returns {tensorflow.SignatureDef} SignatureDef instance
             */
            SignatureDef.create = function create(properties) {
                return new SignatureDef(properties);
            };
    
            /**
             * Decodes a SignatureDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.SignatureDef} SignatureDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignatureDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.SignatureDef(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.inputs === $util.emptyObject)
                            message.inputs = {};
                        key = reader.string();
                        reader.pos++;
                        message.inputs[key] = $root.tensorflow.TensorInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.outputs === $util.emptyObject)
                            message.outputs = {};
                        key = reader.string();
                        reader.pos++;
                        message.outputs[key] = $root.tensorflow.TensorInfo.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.method_name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SignatureDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.SignatureDef} SignatureDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignatureDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.SignatureDef(), key;
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "inputs":
                        reader.assert("{");
                        if (message.inputs === $util.emptyObject)
                            message.inputs = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.inputs[key] = $root.tensorflow.TensorInfo.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    case "outputs":
                        reader.assert("{");
                        if (message.outputs === $util.emptyObject)
                            message.outputs = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.outputs[key] = $root.tensorflow.TensorInfo.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    case "method_name":
                        message.method_name = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a SignatureDef message.
             * @function verify
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SignatureDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.inputs != null && message.hasOwnProperty("inputs")) {
                    if (!$util.isObject(message.inputs))
                        return "inputs: object expected";
                    var key = Object.keys(message.inputs);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.TensorInfo.verify(message.inputs[key[i]]);
                        if (error)
                            return "inputs." + error;
                    }
                }
                if (message.outputs != null && message.hasOwnProperty("outputs")) {
                    if (!$util.isObject(message.outputs))
                        return "outputs: object expected";
                    var key = Object.keys(message.outputs);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.TensorInfo.verify(message.outputs[key[i]]);
                        if (error)
                            return "outputs." + error;
                    }
                }
                if (message.method_name != null && message.hasOwnProperty("method_name"))
                    if (!$util.isString(message.method_name))
                        return "method_name: string expected";
                return null;
            };
    
            /**
             * Creates a SignatureDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.SignatureDef} SignatureDef
             */
            SignatureDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.SignatureDef)
                    return object;
                var message = new $root.tensorflow.SignatureDef();
                if (object.inputs) {
                    if (typeof object.inputs !== "object")
                        throw TypeError(".tensorflow.SignatureDef.inputs: object expected");
                    message.inputs = {};
                    for (var keys = Object.keys(object.inputs), i = 0; i < keys.length; ++i) {
                        if (typeof object.inputs[keys[i]] !== "object")
                            throw TypeError(".tensorflow.SignatureDef.inputs: object expected");
                        message.inputs[keys[i]] = $root.tensorflow.TensorInfo.fromObject(object.inputs[keys[i]]);
                    }
                }
                if (object.outputs) {
                    if (typeof object.outputs !== "object")
                        throw TypeError(".tensorflow.SignatureDef.outputs: object expected");
                    message.outputs = {};
                    for (var keys = Object.keys(object.outputs), i = 0; i < keys.length; ++i) {
                        if (typeof object.outputs[keys[i]] !== "object")
                            throw TypeError(".tensorflow.SignatureDef.outputs: object expected");
                        message.outputs[keys[i]] = $root.tensorflow.TensorInfo.fromObject(object.outputs[keys[i]]);
                    }
                }
                if (object.method_name != null)
                    message.method_name = String(object.method_name);
                return message;
            };
    
            /**
             * Creates a plain object from a SignatureDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.SignatureDef
             * @static
             * @param {tensorflow.SignatureDef} message SignatureDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SignatureDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.inputs = {};
                    object.outputs = {};
                }
                if (options.defaults)
                    object.method_name = "";
                var keys2;
                if (message.inputs && (keys2 = Object.keys(message.inputs)).length) {
                    object.inputs = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.inputs[keys2[j]] = $root.tensorflow.TensorInfo.toObject(message.inputs[keys2[j]], options);
                }
                if (message.outputs && (keys2 = Object.keys(message.outputs)).length) {
                    object.outputs = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.outputs[keys2[j]] = $root.tensorflow.TensorInfo.toObject(message.outputs[keys2[j]], options);
                }
                if (message.method_name != null && message.hasOwnProperty("method_name"))
                    object.method_name = message.method_name;
                return object;
            };
    
            /**
             * Converts this SignatureDef to JSON.
             * @function toJSON
             * @memberof tensorflow.SignatureDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SignatureDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SignatureDef;
        })();
    
        tensorflow.AssetFileDef = (function() {
    
            /**
             * Properties of an AssetFileDef.
             * @memberof tensorflow
             * @interface IAssetFileDef
             * @property {tensorflow.ITensorInfo|null} [tensor_info] AssetFileDef tensor_info
             * @property {string|null} [filename] AssetFileDef filename
             */
    
            /**
             * Constructs a new AssetFileDef.
             * @memberof tensorflow
             * @classdesc Represents an AssetFileDef.
             * @implements IAssetFileDef
             * @constructor
             * @param {tensorflow.IAssetFileDef=} [properties] Properties to set
             */
            function AssetFileDef(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * AssetFileDef tensor_info.
             * @member {tensorflow.ITensorInfo|null|undefined} tensor_info
             * @memberof tensorflow.AssetFileDef
             * @instance
             */
            AssetFileDef.prototype.tensor_info = null;
    
            /**
             * AssetFileDef filename.
             * @member {string} filename
             * @memberof tensorflow.AssetFileDef
             * @instance
             */
            AssetFileDef.prototype.filename = "";
    
            /**
             * Creates a new AssetFileDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {tensorflow.IAssetFileDef=} [properties] Properties to set
             * @returns {tensorflow.AssetFileDef} AssetFileDef instance
             */
            AssetFileDef.create = function create(properties) {
                return new AssetFileDef(properties);
            };
    
            /**
             * Decodes an AssetFileDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.AssetFileDef} AssetFileDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AssetFileDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.AssetFileDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tensor_info = $root.tensorflow.TensorInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.filename = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an AssetFileDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.AssetFileDef} AssetFileDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AssetFileDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.AssetFileDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "tensor_info":
                        message.tensor_info = $root.tensorflow.TensorInfo.decodeText(reader, true);
                        break;
                    case "filename":
                        message.filename = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies an AssetFileDef message.
             * @function verify
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AssetFileDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tensor_info != null && message.hasOwnProperty("tensor_info")) {
                    var error = $root.tensorflow.TensorInfo.verify(message.tensor_info);
                    if (error)
                        return "tensor_info." + error;
                }
                if (message.filename != null && message.hasOwnProperty("filename"))
                    if (!$util.isString(message.filename))
                        return "filename: string expected";
                return null;
            };
    
            /**
             * Creates an AssetFileDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.AssetFileDef} AssetFileDef
             */
            AssetFileDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.AssetFileDef)
                    return object;
                var message = new $root.tensorflow.AssetFileDef();
                if (object.tensor_info != null) {
                    if (typeof object.tensor_info !== "object")
                        throw TypeError(".tensorflow.AssetFileDef.tensor_info: object expected");
                    message.tensor_info = $root.tensorflow.TensorInfo.fromObject(object.tensor_info);
                }
                if (object.filename != null)
                    message.filename = String(object.filename);
                return message;
            };
    
            /**
             * Creates a plain object from an AssetFileDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.AssetFileDef
             * @static
             * @param {tensorflow.AssetFileDef} message AssetFileDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AssetFileDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.tensor_info = null;
                    object.filename = "";
                }
                if (message.tensor_info != null && message.hasOwnProperty("tensor_info"))
                    object.tensor_info = $root.tensorflow.TensorInfo.toObject(message.tensor_info, options);
                if (message.filename != null && message.hasOwnProperty("filename"))
                    object.filename = message.filename;
                return object;
            };
    
            /**
             * Converts this AssetFileDef to JSON.
             * @function toJSON
             * @memberof tensorflow.AssetFileDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AssetFileDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return AssetFileDef;
        })();
    
        tensorflow.SaverDef = (function() {
    
            /**
             * Properties of a SaverDef.
             * @memberof tensorflow
             * @interface ISaverDef
             * @property {string|null} [filename_tensor_name] SaverDef filename_tensor_name
             * @property {string|null} [save_tensor_name] SaverDef save_tensor_name
             * @property {string|null} [restore_op_name] SaverDef restore_op_name
             * @property {number|null} [max_to_keep] SaverDef max_to_keep
             * @property {boolean|null} [sharded] SaverDef sharded
             * @property {number|null} [keep_checkpoint_every_n_hours] SaverDef keep_checkpoint_every_n_hours
             * @property {tensorflow.SaverDef.CheckpointFormatVersion|null} [version] SaverDef version
             */
    
            /**
             * Constructs a new SaverDef.
             * @memberof tensorflow
             * @classdesc Represents a SaverDef.
             * @implements ISaverDef
             * @constructor
             * @param {tensorflow.ISaverDef=} [properties] Properties to set
             */
            function SaverDef(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SaverDef filename_tensor_name.
             * @member {string} filename_tensor_name
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.filename_tensor_name = "";
    
            /**
             * SaverDef save_tensor_name.
             * @member {string} save_tensor_name
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.save_tensor_name = "";
    
            /**
             * SaverDef restore_op_name.
             * @member {string} restore_op_name
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.restore_op_name = "";
    
            /**
             * SaverDef max_to_keep.
             * @member {number} max_to_keep
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.max_to_keep = 0;
    
            /**
             * SaverDef sharded.
             * @member {boolean} sharded
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.sharded = false;
    
            /**
             * SaverDef keep_checkpoint_every_n_hours.
             * @member {number} keep_checkpoint_every_n_hours
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.keep_checkpoint_every_n_hours = 0;
    
            /**
             * SaverDef version.
             * @member {tensorflow.SaverDef.CheckpointFormatVersion} version
             * @memberof tensorflow.SaverDef
             * @instance
             */
            SaverDef.prototype.version = 0;
    
            /**
             * Creates a new SaverDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.SaverDef
             * @static
             * @param {tensorflow.ISaverDef=} [properties] Properties to set
             * @returns {tensorflow.SaverDef} SaverDef instance
             */
            SaverDef.create = function create(properties) {
                return new SaverDef(properties);
            };
    
            /**
             * Decodes a SaverDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.SaverDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.SaverDef} SaverDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SaverDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.SaverDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.filename_tensor_name = reader.string();
                        break;
                    case 2:
                        message.save_tensor_name = reader.string();
                        break;
                    case 3:
                        message.restore_op_name = reader.string();
                        break;
                    case 4:
                        message.max_to_keep = reader.int32();
                        break;
                    case 5:
                        message.sharded = reader.bool();
                        break;
                    case 6:
                        message.keep_checkpoint_every_n_hours = reader.float();
                        break;
                    case 7:
                        message.version = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SaverDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.SaverDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.SaverDef} SaverDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SaverDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.SaverDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "filename_tensor_name":
                        message.filename_tensor_name = reader.string();
                        break;
                    case "save_tensor_name":
                        message.save_tensor_name = reader.string();
                        break;
                    case "restore_op_name":
                        message.restore_op_name = reader.string();
                        break;
                    case "max_to_keep":
                        message.max_to_keep = reader.int32();
                        break;
                    case "sharded":
                        message.sharded = reader.bool();
                        break;
                    case "keep_checkpoint_every_n_hours":
                        message.keep_checkpoint_every_n_hours = reader.float();
                        break;
                    case "version":
                        message.version = reader.enum($root.tensorflow.SaverDef.CheckpointFormatVersion);
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a SaverDef message.
             * @function verify
             * @memberof tensorflow.SaverDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SaverDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.filename_tensor_name != null && message.hasOwnProperty("filename_tensor_name"))
                    if (!$util.isString(message.filename_tensor_name))
                        return "filename_tensor_name: string expected";
                if (message.save_tensor_name != null && message.hasOwnProperty("save_tensor_name"))
                    if (!$util.isString(message.save_tensor_name))
                        return "save_tensor_name: string expected";
                if (message.restore_op_name != null && message.hasOwnProperty("restore_op_name"))
                    if (!$util.isString(message.restore_op_name))
                        return "restore_op_name: string expected";
                if (message.max_to_keep != null && message.hasOwnProperty("max_to_keep"))
                    if (!$util.isInteger(message.max_to_keep))
                        return "max_to_keep: integer expected";
                if (message.sharded != null && message.hasOwnProperty("sharded"))
                    if (typeof message.sharded !== "boolean")
                        return "sharded: boolean expected";
                if (message.keep_checkpoint_every_n_hours != null && message.hasOwnProperty("keep_checkpoint_every_n_hours"))
                    if (typeof message.keep_checkpoint_every_n_hours !== "number")
                        return "keep_checkpoint_every_n_hours: number expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    switch (message.version) {
                    default:
                        return "version: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a SaverDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.SaverDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.SaverDef} SaverDef
             */
            SaverDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.SaverDef)
                    return object;
                var message = new $root.tensorflow.SaverDef();
                if (object.filename_tensor_name != null)
                    message.filename_tensor_name = String(object.filename_tensor_name);
                if (object.save_tensor_name != null)
                    message.save_tensor_name = String(object.save_tensor_name);
                if (object.restore_op_name != null)
                    message.restore_op_name = String(object.restore_op_name);
                if (object.max_to_keep != null)
                    message.max_to_keep = object.max_to_keep | 0;
                if (object.sharded != null)
                    message.sharded = Boolean(object.sharded);
                if (object.keep_checkpoint_every_n_hours != null)
                    message.keep_checkpoint_every_n_hours = Number(object.keep_checkpoint_every_n_hours);
                switch (object.version) {
                case "LEGACY":
                case 0:
                    message.version = 0;
                    break;
                case "V1":
                case 1:
                    message.version = 1;
                    break;
                case "V2":
                case 2:
                    message.version = 2;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SaverDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.SaverDef
             * @static
             * @param {tensorflow.SaverDef} message SaverDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SaverDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.filename_tensor_name = "";
                    object.save_tensor_name = "";
                    object.restore_op_name = "";
                    object.max_to_keep = 0;
                    object.sharded = false;
                    object.keep_checkpoint_every_n_hours = 0;
                    object.version = options.enums === String ? "LEGACY" : 0;
                }
                if (message.filename_tensor_name != null && message.hasOwnProperty("filename_tensor_name"))
                    object.filename_tensor_name = message.filename_tensor_name;
                if (message.save_tensor_name != null && message.hasOwnProperty("save_tensor_name"))
                    object.save_tensor_name = message.save_tensor_name;
                if (message.restore_op_name != null && message.hasOwnProperty("restore_op_name"))
                    object.restore_op_name = message.restore_op_name;
                if (message.max_to_keep != null && message.hasOwnProperty("max_to_keep"))
                    object.max_to_keep = message.max_to_keep;
                if (message.sharded != null && message.hasOwnProperty("sharded"))
                    object.sharded = message.sharded;
                if (message.keep_checkpoint_every_n_hours != null && message.hasOwnProperty("keep_checkpoint_every_n_hours"))
                    object.keep_checkpoint_every_n_hours = options.json && !isFinite(message.keep_checkpoint_every_n_hours) ? String(message.keep_checkpoint_every_n_hours) : message.keep_checkpoint_every_n_hours;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = options.enums === String ? $root.tensorflow.SaverDef.CheckpointFormatVersion[message.version] : message.version;
                return object;
            };
    
            /**
             * Converts this SaverDef to JSON.
             * @function toJSON
             * @memberof tensorflow.SaverDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SaverDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * CheckpointFormatVersion enum.
             * @name tensorflow.SaverDef.CheckpointFormatVersion
             * @enum {string}
             * @property {number} LEGACY=0 LEGACY value
             * @property {number} V1=1 V1 value
             * @property {number} V2=2 V2 value
             */
            SaverDef.CheckpointFormatVersion = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "LEGACY"] = 0;
                values[valuesById[1] = "V1"] = 1;
                values[valuesById[2] = "V2"] = 2;
                return values;
            })();
    
            return SaverDef;
        })();
    
        tensorflow.GraphDef = (function() {
    
            /**
             * Properties of a GraphDef.
             * @memberof tensorflow
             * @interface IGraphDef
             * @property {Array.<tensorflow.INodeDef>|null} [node] GraphDef node
             * @property {tensorflow.IVersionDef|null} [versions] GraphDef versions
             * @property {number|null} [version] GraphDef version
             * @property {tensorflow.IFunctionDefLibrary|null} [library] GraphDef library
             */
    
            /**
             * Constructs a new GraphDef.
             * @memberof tensorflow
             * @classdesc Represents a GraphDef.
             * @implements IGraphDef
             * @constructor
             * @param {tensorflow.IGraphDef=} [properties] Properties to set
             */
            function GraphDef(properties) {
                this.node = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GraphDef node.
             * @member {Array.<tensorflow.INodeDef>} node
             * @memberof tensorflow.GraphDef
             * @instance
             */
            GraphDef.prototype.node = $util.emptyArray;
    
            /**
             * GraphDef versions.
             * @member {tensorflow.IVersionDef|null|undefined} versions
             * @memberof tensorflow.GraphDef
             * @instance
             */
            GraphDef.prototype.versions = null;
    
            /**
             * GraphDef version.
             * @member {number} version
             * @memberof tensorflow.GraphDef
             * @instance
             */
            GraphDef.prototype.version = 0;
    
            /**
             * GraphDef library.
             * @member {tensorflow.IFunctionDefLibrary|null|undefined} library
             * @memberof tensorflow.GraphDef
             * @instance
             */
            GraphDef.prototype.library = null;
    
            /**
             * Creates a new GraphDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.GraphDef
             * @static
             * @param {tensorflow.IGraphDef=} [properties] Properties to set
             * @returns {tensorflow.GraphDef} GraphDef instance
             */
            GraphDef.create = function create(properties) {
                return new GraphDef(properties);
            };
    
            /**
             * Decodes a GraphDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.GraphDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.GraphDef} GraphDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.GraphDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.node && message.node.length))
                            message.node = [];
                        message.node.push($root.tensorflow.NodeDef.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.versions = $root.tensorflow.VersionDef.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.version = reader.int32();
                        break;
                    case 2:
                        message.library = $root.tensorflow.FunctionDefLibrary.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GraphDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.GraphDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.GraphDef} GraphDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.GraphDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "node":
                        if (!(message.node && message.node.length))
                            message.node = [];
                        message.node.push($root.tensorflow.NodeDef.decodeText(reader, true));
                        break;
                    case "versions":
                        message.versions = $root.tensorflow.VersionDef.decodeText(reader, true);
                        break;
                    case "version":
                        message.version = reader.int32();
                        break;
                    case "library":
                        message.library = $root.tensorflow.FunctionDefLibrary.decodeText(reader, true);
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a GraphDef message.
             * @function verify
             * @memberof tensorflow.GraphDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GraphDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.node != null && message.hasOwnProperty("node")) {
                    if (!Array.isArray(message.node))
                        return "node: array expected";
                    for (var i = 0; i < message.node.length; ++i) {
                        var error = $root.tensorflow.NodeDef.verify(message.node[i]);
                        if (error)
                            return "node." + error;
                    }
                }
                if (message.versions != null && message.hasOwnProperty("versions")) {
                    var error = $root.tensorflow.VersionDef.verify(message.versions);
                    if (error)
                        return "versions." + error;
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                if (message.library != null && message.hasOwnProperty("library")) {
                    var error = $root.tensorflow.FunctionDefLibrary.verify(message.library);
                    if (error)
                        return "library." + error;
                }
                return null;
            };
    
            /**
             * Creates a GraphDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.GraphDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.GraphDef} GraphDef
             */
            GraphDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.GraphDef)
                    return object;
                var message = new $root.tensorflow.GraphDef();
                if (object.node) {
                    if (!Array.isArray(object.node))
                        throw TypeError(".tensorflow.GraphDef.node: array expected");
                    message.node = [];
                    for (var i = 0; i < object.node.length; ++i) {
                        if (typeof object.node[i] !== "object")
                            throw TypeError(".tensorflow.GraphDef.node: object expected");
                        message.node[i] = $root.tensorflow.NodeDef.fromObject(object.node[i]);
                    }
                }
                if (object.versions != null) {
                    if (typeof object.versions !== "object")
                        throw TypeError(".tensorflow.GraphDef.versions: object expected");
                    message.versions = $root.tensorflow.VersionDef.fromObject(object.versions);
                }
                if (object.version != null)
                    message.version = object.version | 0;
                if (object.library != null) {
                    if (typeof object.library !== "object")
                        throw TypeError(".tensorflow.GraphDef.library: object expected");
                    message.library = $root.tensorflow.FunctionDefLibrary.fromObject(object.library);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GraphDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.GraphDef
             * @static
             * @param {tensorflow.GraphDef} message GraphDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GraphDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.node = [];
                if (options.defaults) {
                    object.library = null;
                    object.version = 0;
                    object.versions = null;
                }
                if (message.node && message.node.length) {
                    object.node = [];
                    for (var j = 0; j < message.node.length; ++j)
                        object.node[j] = $root.tensorflow.NodeDef.toObject(message.node[j], options);
                }
                if (message.library != null && message.hasOwnProperty("library"))
                    object.library = $root.tensorflow.FunctionDefLibrary.toObject(message.library, options);
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.versions != null && message.hasOwnProperty("versions"))
                    object.versions = $root.tensorflow.VersionDef.toObject(message.versions, options);
                return object;
            };
    
            /**
             * Converts this GraphDef to JSON.
             * @function toJSON
             * @memberof tensorflow.GraphDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GraphDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GraphDef;
        })();
    
        tensorflow.OpDef = (function() {
    
            /**
             * Properties of an OpDef.
             * @memberof tensorflow
             * @interface IOpDef
             * @property {string|null} [name] OpDef name
             * @property {Array.<tensorflow.OpDef.IArgDef>|null} [input_arg] OpDef input_arg
             * @property {Array.<tensorflow.OpDef.IArgDef>|null} [output_arg] OpDef output_arg
             * @property {Array.<tensorflow.OpDef.IAttrDef>|null} [attr] OpDef attr
             * @property {tensorflow.IOpDeprecation|null} [deprecation] OpDef deprecation
             * @property {string|null} [summary] OpDef summary
             * @property {string|null} [description] OpDef description
             * @property {boolean|null} [is_commutative] OpDef is_commutative
             * @property {boolean|null} [is_aggregate] OpDef is_aggregate
             * @property {boolean|null} [is_stateful] OpDef is_stateful
             * @property {boolean|null} [allows_uninitialized_input] OpDef allows_uninitialized_input
             */
    
            /**
             * Constructs a new OpDef.
             * @memberof tensorflow
             * @classdesc Represents an OpDef.
             * @implements IOpDef
             * @constructor
             * @param {tensorflow.IOpDef=} [properties] Properties to set
             */
            function OpDef(properties) {
                this.input_arg = [];
                this.output_arg = [];
                this.attr = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * OpDef name.
             * @member {string} name
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.name = "";
    
            /**
             * OpDef input_arg.
             * @member {Array.<tensorflow.OpDef.IArgDef>} input_arg
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.input_arg = $util.emptyArray;
    
            /**
             * OpDef output_arg.
             * @member {Array.<tensorflow.OpDef.IArgDef>} output_arg
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.output_arg = $util.emptyArray;
    
            /**
             * OpDef attr.
             * @member {Array.<tensorflow.OpDef.IAttrDef>} attr
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.attr = $util.emptyArray;
    
            /**
             * OpDef deprecation.
             * @member {tensorflow.IOpDeprecation|null|undefined} deprecation
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.deprecation = null;
    
            /**
             * OpDef summary.
             * @member {string} summary
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.summary = "";
    
            /**
             * OpDef description.
             * @member {string} description
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.description = "";
    
            /**
             * OpDef is_commutative.
             * @member {boolean} is_commutative
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.is_commutative = false;
    
            /**
             * OpDef is_aggregate.
             * @member {boolean} is_aggregate
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.is_aggregate = false;
    
            /**
             * OpDef is_stateful.
             * @member {boolean} is_stateful
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.is_stateful = false;
    
            /**
             * OpDef allows_uninitialized_input.
             * @member {boolean} allows_uninitialized_input
             * @memberof tensorflow.OpDef
             * @instance
             */
            OpDef.prototype.allows_uninitialized_input = false;
    
            /**
             * Creates a new OpDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.OpDef
             * @static
             * @param {tensorflow.IOpDef=} [properties] Properties to set
             * @returns {tensorflow.OpDef} OpDef instance
             */
            OpDef.create = function create(properties) {
                return new OpDef(properties);
            };
    
            /**
             * Decodes an OpDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.OpDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.OpDef} OpDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.OpDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        if (!(message.input_arg && message.input_arg.length))
                            message.input_arg = [];
                        message.input_arg.push($root.tensorflow.OpDef.ArgDef.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        if (!(message.output_arg && message.output_arg.length))
                            message.output_arg = [];
                        message.output_arg.push($root.tensorflow.OpDef.ArgDef.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        if (!(message.attr && message.attr.length))
                            message.attr = [];
                        message.attr.push($root.tensorflow.OpDef.AttrDef.decode(reader, reader.uint32()));
                        break;
                    case 8:
                        message.deprecation = $root.tensorflow.OpDeprecation.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.summary = reader.string();
                        break;
                    case 6:
                        message.description = reader.string();
                        break;
                    case 18:
                        message.is_commutative = reader.bool();
                        break;
                    case 16:
                        message.is_aggregate = reader.bool();
                        break;
                    case 17:
                        message.is_stateful = reader.bool();
                        break;
                    case 19:
                        message.allows_uninitialized_input = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an OpDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.OpDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.OpDef} OpDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.OpDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "name":
                        message.name = reader.string();
                        break;
                    case "input_arg":
                        if (!(message.input_arg && message.input_arg.length))
                            message.input_arg = [];
                        message.input_arg.push($root.tensorflow.OpDef.ArgDef.decodeText(reader, true));
                        break;
                    case "output_arg":
                        if (!(message.output_arg && message.output_arg.length))
                            message.output_arg = [];
                        message.output_arg.push($root.tensorflow.OpDef.ArgDef.decodeText(reader, true));
                        break;
                    case "attr":
                        if (!(message.attr && message.attr.length))
                            message.attr = [];
                        message.attr.push($root.tensorflow.OpDef.AttrDef.decodeText(reader, true));
                        break;
                    case "deprecation":
                        message.deprecation = $root.tensorflow.OpDeprecation.decodeText(reader, true);
                        break;
                    case "summary":
                        message.summary = reader.string();
                        break;
                    case "description":
                        message.description = reader.string();
                        break;
                    case "is_commutative":
                        message.is_commutative = reader.bool();
                        break;
                    case "is_aggregate":
                        message.is_aggregate = reader.bool();
                        break;
                    case "is_stateful":
                        message.is_stateful = reader.bool();
                        break;
                    case "allows_uninitialized_input":
                        message.allows_uninitialized_input = reader.bool();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies an OpDef message.
             * @function verify
             * @memberof tensorflow.OpDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OpDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.input_arg != null && message.hasOwnProperty("input_arg")) {
                    if (!Array.isArray(message.input_arg))
                        return "input_arg: array expected";
                    for (var i = 0; i < message.input_arg.length; ++i) {
                        var error = $root.tensorflow.OpDef.ArgDef.verify(message.input_arg[i]);
                        if (error)
                            return "input_arg." + error;
                    }
                }
                if (message.output_arg != null && message.hasOwnProperty("output_arg")) {
                    if (!Array.isArray(message.output_arg))
                        return "output_arg: array expected";
                    for (var i = 0; i < message.output_arg.length; ++i) {
                        var error = $root.tensorflow.OpDef.ArgDef.verify(message.output_arg[i]);
                        if (error)
                            return "output_arg." + error;
                    }
                }
                if (message.attr != null && message.hasOwnProperty("attr")) {
                    if (!Array.isArray(message.attr))
                        return "attr: array expected";
                    for (var i = 0; i < message.attr.length; ++i) {
                        var error = $root.tensorflow.OpDef.AttrDef.verify(message.attr[i]);
                        if (error)
                            return "attr." + error;
                    }
                }
                if (message.deprecation != null && message.hasOwnProperty("deprecation")) {
                    var error = $root.tensorflow.OpDeprecation.verify(message.deprecation);
                    if (error)
                        return "deprecation." + error;
                }
                if (message.summary != null && message.hasOwnProperty("summary"))
                    if (!$util.isString(message.summary))
                        return "summary: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.is_commutative != null && message.hasOwnProperty("is_commutative"))
                    if (typeof message.is_commutative !== "boolean")
                        return "is_commutative: boolean expected";
                if (message.is_aggregate != null && message.hasOwnProperty("is_aggregate"))
                    if (typeof message.is_aggregate !== "boolean")
                        return "is_aggregate: boolean expected";
                if (message.is_stateful != null && message.hasOwnProperty("is_stateful"))
                    if (typeof message.is_stateful !== "boolean")
                        return "is_stateful: boolean expected";
                if (message.allows_uninitialized_input != null && message.hasOwnProperty("allows_uninitialized_input"))
                    if (typeof message.allows_uninitialized_input !== "boolean")
                        return "allows_uninitialized_input: boolean expected";
                return null;
            };
    
            /**
             * Creates an OpDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.OpDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.OpDef} OpDef
             */
            OpDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.OpDef)
                    return object;
                var message = new $root.tensorflow.OpDef();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.input_arg) {
                    if (!Array.isArray(object.input_arg))
                        throw TypeError(".tensorflow.OpDef.input_arg: array expected");
                    message.input_arg = [];
                    for (var i = 0; i < object.input_arg.length; ++i) {
                        if (typeof object.input_arg[i] !== "object")
                            throw TypeError(".tensorflow.OpDef.input_arg: object expected");
                        message.input_arg[i] = $root.tensorflow.OpDef.ArgDef.fromObject(object.input_arg[i]);
                    }
                }
                if (object.output_arg) {
                    if (!Array.isArray(object.output_arg))
                        throw TypeError(".tensorflow.OpDef.output_arg: array expected");
                    message.output_arg = [];
                    for (var i = 0; i < object.output_arg.length; ++i) {
                        if (typeof object.output_arg[i] !== "object")
                            throw TypeError(".tensorflow.OpDef.output_arg: object expected");
                        message.output_arg[i] = $root.tensorflow.OpDef.ArgDef.fromObject(object.output_arg[i]);
                    }
                }
                if (object.attr) {
                    if (!Array.isArray(object.attr))
                        throw TypeError(".tensorflow.OpDef.attr: array expected");
                    message.attr = [];
                    for (var i = 0; i < object.attr.length; ++i) {
                        if (typeof object.attr[i] !== "object")
                            throw TypeError(".tensorflow.OpDef.attr: object expected");
                        message.attr[i] = $root.tensorflow.OpDef.AttrDef.fromObject(object.attr[i]);
                    }
                }
                if (object.deprecation != null) {
                    if (typeof object.deprecation !== "object")
                        throw TypeError(".tensorflow.OpDef.deprecation: object expected");
                    message.deprecation = $root.tensorflow.OpDeprecation.fromObject(object.deprecation);
                }
                if (object.summary != null)
                    message.summary = String(object.summary);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.is_commutative != null)
                    message.is_commutative = Boolean(object.is_commutative);
                if (object.is_aggregate != null)
                    message.is_aggregate = Boolean(object.is_aggregate);
                if (object.is_stateful != null)
                    message.is_stateful = Boolean(object.is_stateful);
                if (object.allows_uninitialized_input != null)
                    message.allows_uninitialized_input = Boolean(object.allows_uninitialized_input);
                return message;
            };
    
            /**
             * Creates a plain object from an OpDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.OpDef
             * @static
             * @param {tensorflow.OpDef} message OpDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OpDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.input_arg = [];
                    object.output_arg = [];
                    object.attr = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.summary = "";
                    object.description = "";
                    object.deprecation = null;
                    object.is_aggregate = false;
                    object.is_stateful = false;
                    object.is_commutative = false;
                    object.allows_uninitialized_input = false;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.input_arg && message.input_arg.length) {
                    object.input_arg = [];
                    for (var j = 0; j < message.input_arg.length; ++j)
                        object.input_arg[j] = $root.tensorflow.OpDef.ArgDef.toObject(message.input_arg[j], options);
                }
                if (message.output_arg && message.output_arg.length) {
                    object.output_arg = [];
                    for (var j = 0; j < message.output_arg.length; ++j)
                        object.output_arg[j] = $root.tensorflow.OpDef.ArgDef.toObject(message.output_arg[j], options);
                }
                if (message.attr && message.attr.length) {
                    object.attr = [];
                    for (var j = 0; j < message.attr.length; ++j)
                        object.attr[j] = $root.tensorflow.OpDef.AttrDef.toObject(message.attr[j], options);
                }
                if (message.summary != null && message.hasOwnProperty("summary"))
                    object.summary = message.summary;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.deprecation != null && message.hasOwnProperty("deprecation"))
                    object.deprecation = $root.tensorflow.OpDeprecation.toObject(message.deprecation, options);
                if (message.is_aggregate != null && message.hasOwnProperty("is_aggregate"))
                    object.is_aggregate = message.is_aggregate;
                if (message.is_stateful != null && message.hasOwnProperty("is_stateful"))
                    object.is_stateful = message.is_stateful;
                if (message.is_commutative != null && message.hasOwnProperty("is_commutative"))
                    object.is_commutative = message.is_commutative;
                if (message.allows_uninitialized_input != null && message.hasOwnProperty("allows_uninitialized_input"))
                    object.allows_uninitialized_input = message.allows_uninitialized_input;
                return object;
            };
    
            /**
             * Converts this OpDef to JSON.
             * @function toJSON
             * @memberof tensorflow.OpDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OpDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            OpDef.ArgDef = (function() {
    
                /**
                 * Properties of an ArgDef.
                 * @memberof tensorflow.OpDef
                 * @interface IArgDef
                 * @property {string|null} [name] ArgDef name
                 * @property {string|null} [description] ArgDef description
                 * @property {tensorflow.DataType|null} [type] ArgDef type
                 * @property {string|null} [type_attr] ArgDef type_attr
                 * @property {string|null} [number_attr] ArgDef number_attr
                 * @property {string|null} [type_list_attr] ArgDef type_list_attr
                 * @property {boolean|null} [is_ref] ArgDef is_ref
                 */
    
                /**
                 * Constructs a new ArgDef.
                 * @memberof tensorflow.OpDef
                 * @classdesc Represents an ArgDef.
                 * @implements IArgDef
                 * @constructor
                 * @param {tensorflow.OpDef.IArgDef=} [properties] Properties to set
                 */
                function ArgDef(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ArgDef name.
                 * @member {string} name
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.name = "";
    
                /**
                 * ArgDef description.
                 * @member {string} description
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.description = "";
    
                /**
                 * ArgDef type.
                 * @member {tensorflow.DataType} type
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.type = 0;
    
                /**
                 * ArgDef type_attr.
                 * @member {string} type_attr
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.type_attr = "";
    
                /**
                 * ArgDef number_attr.
                 * @member {string} number_attr
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.number_attr = "";
    
                /**
                 * ArgDef type_list_attr.
                 * @member {string} type_list_attr
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.type_list_attr = "";
    
                /**
                 * ArgDef is_ref.
                 * @member {boolean} is_ref
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 */
                ArgDef.prototype.is_ref = false;
    
                /**
                 * Creates a new ArgDef instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {tensorflow.OpDef.IArgDef=} [properties] Properties to set
                 * @returns {tensorflow.OpDef.ArgDef} ArgDef instance
                 */
                ArgDef.create = function create(properties) {
                    return new ArgDef(properties);
                };
    
                /**
                 * Decodes an ArgDef message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.OpDef.ArgDef} ArgDef
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArgDef.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.OpDef.ArgDef();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.description = reader.string();
                            break;
                        case 3:
                            message.type = reader.int32();
                            break;
                        case 4:
                            message.type_attr = reader.string();
                            break;
                        case 5:
                            message.number_attr = reader.string();
                            break;
                        case 6:
                            message.type_list_attr = reader.string();
                            break;
                        case 16:
                            message.is_ref = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an ArgDef message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.OpDef.ArgDef} ArgDef
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArgDef.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.OpDef.ArgDef();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "name":
                            message.name = reader.string();
                            break;
                        case "description":
                            message.description = reader.string();
                            break;
                        case "type":
                            message.type = reader.enum($root.tensorflow.DataType);
                            break;
                        case "type_attr":
                            message.type_attr = reader.string();
                            break;
                        case "number_attr":
                            message.number_attr = reader.string();
                            break;
                        case "type_list_attr":
                            message.type_list_attr = reader.string();
                            break;
                        case "is_ref":
                            message.is_ref = reader.bool();
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies an ArgDef message.
                 * @function verify
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ArgDef.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.description != null && message.hasOwnProperty("description"))
                        if (!$util.isString(message.description))
                            return "description: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 101:
                        case 102:
                        case 103:
                        case 104:
                        case 105:
                        case 106:
                        case 107:
                        case 108:
                        case 109:
                        case 110:
                        case 111:
                        case 112:
                        case 113:
                        case 114:
                        case 115:
                        case 116:
                        case 117:
                        case 118:
                        case 119:
                        case 120:
                        case 121:
                        case 122:
                        case 123:
                            break;
                        }
                    if (message.type_attr != null && message.hasOwnProperty("type_attr"))
                        if (!$util.isString(message.type_attr))
                            return "type_attr: string expected";
                    if (message.number_attr != null && message.hasOwnProperty("number_attr"))
                        if (!$util.isString(message.number_attr))
                            return "number_attr: string expected";
                    if (message.type_list_attr != null && message.hasOwnProperty("type_list_attr"))
                        if (!$util.isString(message.type_list_attr))
                            return "type_list_attr: string expected";
                    if (message.is_ref != null && message.hasOwnProperty("is_ref"))
                        if (typeof message.is_ref !== "boolean")
                            return "is_ref: boolean expected";
                    return null;
                };
    
                /**
                 * Creates an ArgDef message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.OpDef.ArgDef} ArgDef
                 */
                ArgDef.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.OpDef.ArgDef)
                        return object;
                    var message = new $root.tensorflow.OpDef.ArgDef();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.description != null)
                        message.description = String(object.description);
                    switch (object.type) {
                    case "DT_INVALID":
                    case 0:
                        message.type = 0;
                        break;
                    case "DT_FLOAT":
                    case 1:
                        message.type = 1;
                        break;
                    case "DT_DOUBLE":
                    case 2:
                        message.type = 2;
                        break;
                    case "DT_INT32":
                    case 3:
                        message.type = 3;
                        break;
                    case "DT_UINT8":
                    case 4:
                        message.type = 4;
                        break;
                    case "DT_INT16":
                    case 5:
                        message.type = 5;
                        break;
                    case "DT_INT8":
                    case 6:
                        message.type = 6;
                        break;
                    case "DT_STRING":
                    case 7:
                        message.type = 7;
                        break;
                    case "DT_COMPLEX64":
                    case 8:
                        message.type = 8;
                        break;
                    case "DT_INT64":
                    case 9:
                        message.type = 9;
                        break;
                    case "DT_BOOL":
                    case 10:
                        message.type = 10;
                        break;
                    case "DT_QINT8":
                    case 11:
                        message.type = 11;
                        break;
                    case "DT_QUINT8":
                    case 12:
                        message.type = 12;
                        break;
                    case "DT_QINT32":
                    case 13:
                        message.type = 13;
                        break;
                    case "DT_BFLOAT16":
                    case 14:
                        message.type = 14;
                        break;
                    case "DT_QINT16":
                    case 15:
                        message.type = 15;
                        break;
                    case "DT_QUINT16":
                    case 16:
                        message.type = 16;
                        break;
                    case "DT_UINT16":
                    case 17:
                        message.type = 17;
                        break;
                    case "DT_COMPLEX128":
                    case 18:
                        message.type = 18;
                        break;
                    case "DT_HALF":
                    case 19:
                        message.type = 19;
                        break;
                    case "DT_RESOURCE":
                    case 20:
                        message.type = 20;
                        break;
                    case "DT_VARIANT":
                    case 21:
                        message.type = 21;
                        break;
                    case "DT_UINT32":
                    case 22:
                        message.type = 22;
                        break;
                    case "DT_UINT64":
                    case 23:
                        message.type = 23;
                        break;
                    case "DT_FLOAT_REF":
                    case 101:
                        message.type = 101;
                        break;
                    case "DT_DOUBLE_REF":
                    case 102:
                        message.type = 102;
                        break;
                    case "DT_INT32_REF":
                    case 103:
                        message.type = 103;
                        break;
                    case "DT_UINT8_REF":
                    case 104:
                        message.type = 104;
                        break;
                    case "DT_INT16_REF":
                    case 105:
                        message.type = 105;
                        break;
                    case "DT_INT8_REF":
                    case 106:
                        message.type = 106;
                        break;
                    case "DT_STRING_REF":
                    case 107:
                        message.type = 107;
                        break;
                    case "DT_COMPLEX64_REF":
                    case 108:
                        message.type = 108;
                        break;
                    case "DT_INT64_REF":
                    case 109:
                        message.type = 109;
                        break;
                    case "DT_BOOL_REF":
                    case 110:
                        message.type = 110;
                        break;
                    case "DT_QINT8_REF":
                    case 111:
                        message.type = 111;
                        break;
                    case "DT_QUINT8_REF":
                    case 112:
                        message.type = 112;
                        break;
                    case "DT_QINT32_REF":
                    case 113:
                        message.type = 113;
                        break;
                    case "DT_BFLOAT16_REF":
                    case 114:
                        message.type = 114;
                        break;
                    case "DT_QINT16_REF":
                    case 115:
                        message.type = 115;
                        break;
                    case "DT_QUINT16_REF":
                    case 116:
                        message.type = 116;
                        break;
                    case "DT_UINT16_REF":
                    case 117:
                        message.type = 117;
                        break;
                    case "DT_COMPLEX128_REF":
                    case 118:
                        message.type = 118;
                        break;
                    case "DT_HALF_REF":
                    case 119:
                        message.type = 119;
                        break;
                    case "DT_RESOURCE_REF":
                    case 120:
                        message.type = 120;
                        break;
                    case "DT_VARIANT_REF":
                    case 121:
                        message.type = 121;
                        break;
                    case "DT_UINT32_REF":
                    case 122:
                        message.type = 122;
                        break;
                    case "DT_UINT64_REF":
                    case 123:
                        message.type = 123;
                        break;
                    }
                    if (object.type_attr != null)
                        message.type_attr = String(object.type_attr);
                    if (object.number_attr != null)
                        message.number_attr = String(object.number_attr);
                    if (object.type_list_attr != null)
                        message.type_list_attr = String(object.type_list_attr);
                    if (object.is_ref != null)
                        message.is_ref = Boolean(object.is_ref);
                    return message;
                };
    
                /**
                 * Creates a plain object from an ArgDef message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.OpDef.ArgDef
                 * @static
                 * @param {tensorflow.OpDef.ArgDef} message ArgDef
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ArgDef.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.description = "";
                        object.type = options.enums === String ? "DT_INVALID" : 0;
                        object.type_attr = "";
                        object.number_attr = "";
                        object.type_list_attr = "";
                        object.is_ref = false;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.description != null && message.hasOwnProperty("description"))
                        object.description = message.description;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.tensorflow.DataType[message.type] : message.type;
                    if (message.type_attr != null && message.hasOwnProperty("type_attr"))
                        object.type_attr = message.type_attr;
                    if (message.number_attr != null && message.hasOwnProperty("number_attr"))
                        object.number_attr = message.number_attr;
                    if (message.type_list_attr != null && message.hasOwnProperty("type_list_attr"))
                        object.type_list_attr = message.type_list_attr;
                    if (message.is_ref != null && message.hasOwnProperty("is_ref"))
                        object.is_ref = message.is_ref;
                    return object;
                };
    
                /**
                 * Converts this ArgDef to JSON.
                 * @function toJSON
                 * @memberof tensorflow.OpDef.ArgDef
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ArgDef.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ArgDef;
            })();
    
            OpDef.AttrDef = (function() {
    
                /**
                 * Properties of an AttrDef.
                 * @memberof tensorflow.OpDef
                 * @interface IAttrDef
                 * @property {string|null} [name] AttrDef name
                 * @property {string|null} [type] AttrDef type
                 * @property {tensorflow.IAttrValue|null} [default_value] AttrDef default_value
                 * @property {string|null} [description] AttrDef description
                 * @property {boolean|null} [has_minimum] AttrDef has_minimum
                 * @property {number|Long|null} [minimum] AttrDef minimum
                 * @property {tensorflow.IAttrValue|null} [allowed_values] AttrDef allowed_values
                 */
    
                /**
                 * Constructs a new AttrDef.
                 * @memberof tensorflow.OpDef
                 * @classdesc Represents an AttrDef.
                 * @implements IAttrDef
                 * @constructor
                 * @param {tensorflow.OpDef.IAttrDef=} [properties] Properties to set
                 */
                function AttrDef(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * AttrDef name.
                 * @member {string} name
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.name = "";
    
                /**
                 * AttrDef type.
                 * @member {string} type
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.type = "";
    
                /**
                 * AttrDef default_value.
                 * @member {tensorflow.IAttrValue|null|undefined} default_value
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.default_value = null;
    
                /**
                 * AttrDef description.
                 * @member {string} description
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.description = "";
    
                /**
                 * AttrDef has_minimum.
                 * @member {boolean} has_minimum
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.has_minimum = false;
    
                /**
                 * AttrDef minimum.
                 * @member {number|Long} minimum
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.minimum = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * AttrDef allowed_values.
                 * @member {tensorflow.IAttrValue|null|undefined} allowed_values
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 */
                AttrDef.prototype.allowed_values = null;
    
                /**
                 * Creates a new AttrDef instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {tensorflow.OpDef.IAttrDef=} [properties] Properties to set
                 * @returns {tensorflow.OpDef.AttrDef} AttrDef instance
                 */
                AttrDef.create = function create(properties) {
                    return new AttrDef(properties);
                };
    
                /**
                 * Decodes an AttrDef message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.OpDef.AttrDef} AttrDef
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AttrDef.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.OpDef.AttrDef();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.type = reader.string();
                            break;
                        case 3:
                            message.default_value = $root.tensorflow.AttrValue.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.description = reader.string();
                            break;
                        case 5:
                            message.has_minimum = reader.bool();
                            break;
                        case 6:
                            message.minimum = reader.int64();
                            break;
                        case 7:
                            message.allowed_values = $root.tensorflow.AttrValue.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an AttrDef message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.OpDef.AttrDef} AttrDef
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AttrDef.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.OpDef.AttrDef();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "name":
                            message.name = reader.string();
                            break;
                        case "type":
                            message.type = reader.string();
                            break;
                        case "default_value":
                            message.default_value = $root.tensorflow.AttrValue.decodeText(reader, true);
                            break;
                        case "description":
                            message.description = reader.string();
                            break;
                        case "has_minimum":
                            message.has_minimum = reader.bool();
                            break;
                        case "minimum":
                            message.minimum = reader.int64();
                            break;
                        case "allowed_values":
                            message.allowed_values = $root.tensorflow.AttrValue.decodeText(reader, true);
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies an AttrDef message.
                 * @function verify
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AttrDef.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        if (!$util.isString(message.type))
                            return "type: string expected";
                    if (message.default_value != null && message.hasOwnProperty("default_value")) {
                        var error = $root.tensorflow.AttrValue.verify(message.default_value);
                        if (error)
                            return "default_value." + error;
                    }
                    if (message.description != null && message.hasOwnProperty("description"))
                        if (!$util.isString(message.description))
                            return "description: string expected";
                    if (message.has_minimum != null && message.hasOwnProperty("has_minimum"))
                        if (typeof message.has_minimum !== "boolean")
                            return "has_minimum: boolean expected";
                    if (message.minimum != null && message.hasOwnProperty("minimum"))
                        if (!$util.isInteger(message.minimum) && !(message.minimum && $util.isInteger(message.minimum.low) && $util.isInteger(message.minimum.high)))
                            return "minimum: integer|Long expected";
                    if (message.allowed_values != null && message.hasOwnProperty("allowed_values")) {
                        var error = $root.tensorflow.AttrValue.verify(message.allowed_values);
                        if (error)
                            return "allowed_values." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates an AttrDef message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.OpDef.AttrDef} AttrDef
                 */
                AttrDef.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.OpDef.AttrDef)
                        return object;
                    var message = new $root.tensorflow.OpDef.AttrDef();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.type != null)
                        message.type = String(object.type);
                    if (object.default_value != null) {
                        if (typeof object.default_value !== "object")
                            throw TypeError(".tensorflow.OpDef.AttrDef.default_value: object expected");
                        message.default_value = $root.tensorflow.AttrValue.fromObject(object.default_value);
                    }
                    if (object.description != null)
                        message.description = String(object.description);
                    if (object.has_minimum != null)
                        message.has_minimum = Boolean(object.has_minimum);
                    if (object.minimum != null)
                        if ($util.Long)
                            (message.minimum = $util.Long.fromValue(object.minimum)).unsigned = false;
                        else if (typeof object.minimum === "string")
                            message.minimum = parseInt(object.minimum, 10);
                        else if (typeof object.minimum === "number")
                            message.minimum = object.minimum;
                        else if (typeof object.minimum === "object")
                            message.minimum = new $util.LongBits(object.minimum.low >>> 0, object.minimum.high >>> 0).toNumber();
                    if (object.allowed_values != null) {
                        if (typeof object.allowed_values !== "object")
                            throw TypeError(".tensorflow.OpDef.AttrDef.allowed_values: object expected");
                        message.allowed_values = $root.tensorflow.AttrValue.fromObject(object.allowed_values);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an AttrDef message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.OpDef.AttrDef
                 * @static
                 * @param {tensorflow.OpDef.AttrDef} message AttrDef
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AttrDef.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.type = "";
                        object.default_value = null;
                        object.description = "";
                        object.has_minimum = false;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.minimum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.minimum = options.longs === String ? "0" : 0;
                        object.allowed_values = null;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = message.type;
                    if (message.default_value != null && message.hasOwnProperty("default_value"))
                        object.default_value = $root.tensorflow.AttrValue.toObject(message.default_value, options);
                    if (message.description != null && message.hasOwnProperty("description"))
                        object.description = message.description;
                    if (message.has_minimum != null && message.hasOwnProperty("has_minimum"))
                        object.has_minimum = message.has_minimum;
                    if (message.minimum != null && message.hasOwnProperty("minimum"))
                        if (typeof message.minimum === "number")
                            object.minimum = options.longs === String ? String(message.minimum) : message.minimum;
                        else
                            object.minimum = options.longs === String ? $util.Long.prototype.toString.call(message.minimum) : options.longs === Number ? new $util.LongBits(message.minimum.low >>> 0, message.minimum.high >>> 0).toNumber() : message.minimum;
                    if (message.allowed_values != null && message.hasOwnProperty("allowed_values"))
                        object.allowed_values = $root.tensorflow.AttrValue.toObject(message.allowed_values, options);
                    return object;
                };
    
                /**
                 * Converts this AttrDef to JSON.
                 * @function toJSON
                 * @memberof tensorflow.OpDef.AttrDef
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AttrDef.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return AttrDef;
            })();
    
            return OpDef;
        })();
    
        tensorflow.OpDeprecation = (function() {
    
            /**
             * Properties of an OpDeprecation.
             * @memberof tensorflow
             * @interface IOpDeprecation
             * @property {number|null} [version] OpDeprecation version
             * @property {string|null} [explanation] OpDeprecation explanation
             */
    
            /**
             * Constructs a new OpDeprecation.
             * @memberof tensorflow
             * @classdesc Represents an OpDeprecation.
             * @implements IOpDeprecation
             * @constructor
             * @param {tensorflow.IOpDeprecation=} [properties] Properties to set
             */
            function OpDeprecation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * OpDeprecation version.
             * @member {number} version
             * @memberof tensorflow.OpDeprecation
             * @instance
             */
            OpDeprecation.prototype.version = 0;
    
            /**
             * OpDeprecation explanation.
             * @member {string} explanation
             * @memberof tensorflow.OpDeprecation
             * @instance
             */
            OpDeprecation.prototype.explanation = "";
    
            /**
             * Creates a new OpDeprecation instance using the specified properties.
             * @function create
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {tensorflow.IOpDeprecation=} [properties] Properties to set
             * @returns {tensorflow.OpDeprecation} OpDeprecation instance
             */
            OpDeprecation.create = function create(properties) {
                return new OpDeprecation(properties);
            };
    
            /**
             * Decodes an OpDeprecation message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.OpDeprecation} OpDeprecation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpDeprecation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.OpDeprecation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.int32();
                        break;
                    case 2:
                        message.explanation = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an OpDeprecation message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.OpDeprecation} OpDeprecation
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpDeprecation.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.OpDeprecation();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "version":
                        message.version = reader.int32();
                        break;
                    case "explanation":
                        message.explanation = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies an OpDeprecation message.
             * @function verify
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OpDeprecation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                if (message.explanation != null && message.hasOwnProperty("explanation"))
                    if (!$util.isString(message.explanation))
                        return "explanation: string expected";
                return null;
            };
    
            /**
             * Creates an OpDeprecation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.OpDeprecation} OpDeprecation
             */
            OpDeprecation.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.OpDeprecation)
                    return object;
                var message = new $root.tensorflow.OpDeprecation();
                if (object.version != null)
                    message.version = object.version | 0;
                if (object.explanation != null)
                    message.explanation = String(object.explanation);
                return message;
            };
    
            /**
             * Creates a plain object from an OpDeprecation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.OpDeprecation
             * @static
             * @param {tensorflow.OpDeprecation} message OpDeprecation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OpDeprecation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.version = 0;
                    object.explanation = "";
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.explanation != null && message.hasOwnProperty("explanation"))
                    object.explanation = message.explanation;
                return object;
            };
    
            /**
             * Converts this OpDeprecation to JSON.
             * @function toJSON
             * @memberof tensorflow.OpDeprecation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OpDeprecation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return OpDeprecation;
        })();
    
        tensorflow.OpList = (function() {
    
            /**
             * Properties of an OpList.
             * @memberof tensorflow
             * @interface IOpList
             * @property {Array.<tensorflow.IOpDef>|null} [op] OpList op
             */
    
            /**
             * Constructs a new OpList.
             * @memberof tensorflow
             * @classdesc Represents an OpList.
             * @implements IOpList
             * @constructor
             * @param {tensorflow.IOpList=} [properties] Properties to set
             */
            function OpList(properties) {
                this.op = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * OpList op.
             * @member {Array.<tensorflow.IOpDef>} op
             * @memberof tensorflow.OpList
             * @instance
             */
            OpList.prototype.op = $util.emptyArray;
    
            /**
             * Creates a new OpList instance using the specified properties.
             * @function create
             * @memberof tensorflow.OpList
             * @static
             * @param {tensorflow.IOpList=} [properties] Properties to set
             * @returns {tensorflow.OpList} OpList instance
             */
            OpList.create = function create(properties) {
                return new OpList(properties);
            };
    
            /**
             * Decodes an OpList message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.OpList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.OpList} OpList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.OpList();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.op && message.op.length))
                            message.op = [];
                        message.op.push($root.tensorflow.OpDef.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an OpList message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.OpList
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.OpList} OpList
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpList.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.OpList();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "op":
                        if (!(message.op && message.op.length))
                            message.op = [];
                        message.op.push($root.tensorflow.OpDef.decodeText(reader, true));
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies an OpList message.
             * @function verify
             * @memberof tensorflow.OpList
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OpList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.op != null && message.hasOwnProperty("op")) {
                    if (!Array.isArray(message.op))
                        return "op: array expected";
                    for (var i = 0; i < message.op.length; ++i) {
                        var error = $root.tensorflow.OpDef.verify(message.op[i]);
                        if (error)
                            return "op." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates an OpList message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.OpList
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.OpList} OpList
             */
            OpList.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.OpList)
                    return object;
                var message = new $root.tensorflow.OpList();
                if (object.op) {
                    if (!Array.isArray(object.op))
                        throw TypeError(".tensorflow.OpList.op: array expected");
                    message.op = [];
                    for (var i = 0; i < object.op.length; ++i) {
                        if (typeof object.op[i] !== "object")
                            throw TypeError(".tensorflow.OpList.op: object expected");
                        message.op[i] = $root.tensorflow.OpDef.fromObject(object.op[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from an OpList message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.OpList
             * @static
             * @param {tensorflow.OpList} message OpList
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OpList.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.op = [];
                if (message.op && message.op.length) {
                    object.op = [];
                    for (var j = 0; j < message.op.length; ++j)
                        object.op[j] = $root.tensorflow.OpDef.toObject(message.op[j], options);
                }
                return object;
            };
    
            /**
             * Converts this OpList to JSON.
             * @function toJSON
             * @memberof tensorflow.OpList
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OpList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return OpList;
        })();
    
        tensorflow.TensorShapeProto = (function() {
    
            /**
             * Properties of a TensorShapeProto.
             * @memberof tensorflow
             * @interface ITensorShapeProto
             * @property {Array.<tensorflow.TensorShapeProto.IDim>|null} [dim] TensorShapeProto dim
             * @property {boolean|null} [unknown_rank] TensorShapeProto unknown_rank
             */
    
            /**
             * Constructs a new TensorShapeProto.
             * @memberof tensorflow
             * @classdesc Represents a TensorShapeProto.
             * @implements ITensorShapeProto
             * @constructor
             * @param {tensorflow.ITensorShapeProto=} [properties] Properties to set
             */
            function TensorShapeProto(properties) {
                this.dim = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TensorShapeProto dim.
             * @member {Array.<tensorflow.TensorShapeProto.IDim>} dim
             * @memberof tensorflow.TensorShapeProto
             * @instance
             */
            TensorShapeProto.prototype.dim = $util.emptyArray;
    
            /**
             * TensorShapeProto unknown_rank.
             * @member {boolean} unknown_rank
             * @memberof tensorflow.TensorShapeProto
             * @instance
             */
            TensorShapeProto.prototype.unknown_rank = false;
    
            /**
             * Creates a new TensorShapeProto instance using the specified properties.
             * @function create
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {tensorflow.ITensorShapeProto=} [properties] Properties to set
             * @returns {tensorflow.TensorShapeProto} TensorShapeProto instance
             */
            TensorShapeProto.create = function create(properties) {
                return new TensorShapeProto(properties);
            };
    
            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.TensorShapeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        if (!(message.dim && message.dim.length))
                            message.dim = [];
                        message.dim.push($root.tensorflow.TensorShapeProto.Dim.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.unknown_rank = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TensorShapeProto message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.TensorShapeProto();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "dim":
                        if (!(message.dim && message.dim.length))
                            message.dim = [];
                        message.dim.push($root.tensorflow.TensorShapeProto.Dim.decodeText(reader, true));
                        break;
                    case "unknown_rank":
                        message.unknown_rank = reader.bool();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a TensorShapeProto message.
             * @function verify
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorShapeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dim != null && message.hasOwnProperty("dim")) {
                    if (!Array.isArray(message.dim))
                        return "dim: array expected";
                    for (var i = 0; i < message.dim.length; ++i) {
                        var error = $root.tensorflow.TensorShapeProto.Dim.verify(message.dim[i]);
                        if (error)
                            return "dim." + error;
                    }
                }
                if (message.unknown_rank != null && message.hasOwnProperty("unknown_rank"))
                    if (typeof message.unknown_rank !== "boolean")
                        return "unknown_rank: boolean expected";
                return null;
            };
    
            /**
             * Creates a TensorShapeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.TensorShapeProto} TensorShapeProto
             */
            TensorShapeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.TensorShapeProto)
                    return object;
                var message = new $root.tensorflow.TensorShapeProto();
                if (object.dim) {
                    if (!Array.isArray(object.dim))
                        throw TypeError(".tensorflow.TensorShapeProto.dim: array expected");
                    message.dim = [];
                    for (var i = 0; i < object.dim.length; ++i) {
                        if (typeof object.dim[i] !== "object")
                            throw TypeError(".tensorflow.TensorShapeProto.dim: object expected");
                        message.dim[i] = $root.tensorflow.TensorShapeProto.Dim.fromObject(object.dim[i]);
                    }
                }
                if (object.unknown_rank != null)
                    message.unknown_rank = Boolean(object.unknown_rank);
                return message;
            };
    
            /**
             * Creates a plain object from a TensorShapeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.TensorShapeProto
             * @static
             * @param {tensorflow.TensorShapeProto} message TensorShapeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorShapeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.dim = [];
                if (options.defaults)
                    object.unknown_rank = false;
                if (message.dim && message.dim.length) {
                    object.dim = [];
                    for (var j = 0; j < message.dim.length; ++j)
                        object.dim[j] = $root.tensorflow.TensorShapeProto.Dim.toObject(message.dim[j], options);
                }
                if (message.unknown_rank != null && message.hasOwnProperty("unknown_rank"))
                    object.unknown_rank = message.unknown_rank;
                return object;
            };
    
            /**
             * Converts this TensorShapeProto to JSON.
             * @function toJSON
             * @memberof tensorflow.TensorShapeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorShapeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            TensorShapeProto.Dim = (function() {
    
                /**
                 * Properties of a Dim.
                 * @memberof tensorflow.TensorShapeProto
                 * @interface IDim
                 * @property {number|Long|null} [size] Dim size
                 * @property {string|null} [name] Dim name
                 */
    
                /**
                 * Constructs a new Dim.
                 * @memberof tensorflow.TensorShapeProto
                 * @classdesc Represents a Dim.
                 * @implements IDim
                 * @constructor
                 * @param {tensorflow.TensorShapeProto.IDim=} [properties] Properties to set
                 */
                function Dim(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Dim size.
                 * @member {number|Long} size
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @instance
                 */
                Dim.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Dim name.
                 * @member {string} name
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @instance
                 */
                Dim.prototype.name = "";
    
                /**
                 * Creates a new Dim instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {tensorflow.TensorShapeProto.IDim=} [properties] Properties to set
                 * @returns {tensorflow.TensorShapeProto.Dim} Dim instance
                 */
                Dim.create = function create(properties) {
                    return new Dim(properties);
                };
    
                /**
                 * Decodes a Dim message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.TensorShapeProto.Dim} Dim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dim.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.TensorShapeProto.Dim();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.size = reader.int64();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Dim message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.TensorShapeProto.Dim} Dim
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dim.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.TensorShapeProto.Dim();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "size":
                            message.size = reader.int64();
                            break;
                        case "name":
                            message.name = reader.string();
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a Dim message.
                 * @function verify
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Dim.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.size != null && message.hasOwnProperty("size"))
                        if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                            return "size: integer|Long expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    return null;
                };
    
                /**
                 * Creates a Dim message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.TensorShapeProto.Dim} Dim
                 */
                Dim.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.TensorShapeProto.Dim)
                        return object;
                    var message = new $root.tensorflow.TensorShapeProto.Dim();
                    if (object.size != null)
                        if ($util.Long)
                            (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                        else if (typeof object.size === "string")
                            message.size = parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                    if (object.name != null)
                        message.name = String(object.name);
                    return message;
                };
    
                /**
                 * Creates a plain object from a Dim message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {tensorflow.TensorShapeProto.Dim} message Dim
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Dim.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.size = options.longs === String ? "0" : 0;
                        object.name = "";
                    }
                    if (message.size != null && message.hasOwnProperty("size"))
                        if (typeof message.size === "number")
                            object.size = options.longs === String ? String(message.size) : message.size;
                        else
                            object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    return object;
                };
    
                /**
                 * Converts this Dim to JSON.
                 * @function toJSON
                 * @memberof tensorflow.TensorShapeProto.Dim
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Dim.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Dim;
            })();
    
            return TensorShapeProto;
        })();
    
        /**
         * DataType enum.
         * @name tensorflow.DataType
         * @enum {string}
         * @property {number} DT_INVALID=0 DT_INVALID value
         * @property {number} DT_FLOAT=1 DT_FLOAT value
         * @property {number} DT_DOUBLE=2 DT_DOUBLE value
         * @property {number} DT_INT32=3 DT_INT32 value
         * @property {number} DT_UINT8=4 DT_UINT8 value
         * @property {number} DT_INT16=5 DT_INT16 value
         * @property {number} DT_INT8=6 DT_INT8 value
         * @property {number} DT_STRING=7 DT_STRING value
         * @property {number} DT_COMPLEX64=8 DT_COMPLEX64 value
         * @property {number} DT_INT64=9 DT_INT64 value
         * @property {number} DT_BOOL=10 DT_BOOL value
         * @property {number} DT_QINT8=11 DT_QINT8 value
         * @property {number} DT_QUINT8=12 DT_QUINT8 value
         * @property {number} DT_QINT32=13 DT_QINT32 value
         * @property {number} DT_BFLOAT16=14 DT_BFLOAT16 value
         * @property {number} DT_QINT16=15 DT_QINT16 value
         * @property {number} DT_QUINT16=16 DT_QUINT16 value
         * @property {number} DT_UINT16=17 DT_UINT16 value
         * @property {number} DT_COMPLEX128=18 DT_COMPLEX128 value
         * @property {number} DT_HALF=19 DT_HALF value
         * @property {number} DT_RESOURCE=20 DT_RESOURCE value
         * @property {number} DT_VARIANT=21 DT_VARIANT value
         * @property {number} DT_UINT32=22 DT_UINT32 value
         * @property {number} DT_UINT64=23 DT_UINT64 value
         * @property {number} DT_FLOAT_REF=101 DT_FLOAT_REF value
         * @property {number} DT_DOUBLE_REF=102 DT_DOUBLE_REF value
         * @property {number} DT_INT32_REF=103 DT_INT32_REF value
         * @property {number} DT_UINT8_REF=104 DT_UINT8_REF value
         * @property {number} DT_INT16_REF=105 DT_INT16_REF value
         * @property {number} DT_INT8_REF=106 DT_INT8_REF value
         * @property {number} DT_STRING_REF=107 DT_STRING_REF value
         * @property {number} DT_COMPLEX64_REF=108 DT_COMPLEX64_REF value
         * @property {number} DT_INT64_REF=109 DT_INT64_REF value
         * @property {number} DT_BOOL_REF=110 DT_BOOL_REF value
         * @property {number} DT_QINT8_REF=111 DT_QINT8_REF value
         * @property {number} DT_QUINT8_REF=112 DT_QUINT8_REF value
         * @property {number} DT_QINT32_REF=113 DT_QINT32_REF value
         * @property {number} DT_BFLOAT16_REF=114 DT_BFLOAT16_REF value
         * @property {number} DT_QINT16_REF=115 DT_QINT16_REF value
         * @property {number} DT_QUINT16_REF=116 DT_QUINT16_REF value
         * @property {number} DT_UINT16_REF=117 DT_UINT16_REF value
         * @property {number} DT_COMPLEX128_REF=118 DT_COMPLEX128_REF value
         * @property {number} DT_HALF_REF=119 DT_HALF_REF value
         * @property {number} DT_RESOURCE_REF=120 DT_RESOURCE_REF value
         * @property {number} DT_VARIANT_REF=121 DT_VARIANT_REF value
         * @property {number} DT_UINT32_REF=122 DT_UINT32_REF value
         * @property {number} DT_UINT64_REF=123 DT_UINT64_REF value
         */
        tensorflow.DataType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DT_INVALID"] = 0;
            values[valuesById[1] = "DT_FLOAT"] = 1;
            values[valuesById[2] = "DT_DOUBLE"] = 2;
            values[valuesById[3] = "DT_INT32"] = 3;
            values[valuesById[4] = "DT_UINT8"] = 4;
            values[valuesById[5] = "DT_INT16"] = 5;
            values[valuesById[6] = "DT_INT8"] = 6;
            values[valuesById[7] = "DT_STRING"] = 7;
            values[valuesById[8] = "DT_COMPLEX64"] = 8;
            values[valuesById[9] = "DT_INT64"] = 9;
            values[valuesById[10] = "DT_BOOL"] = 10;
            values[valuesById[11] = "DT_QINT8"] = 11;
            values[valuesById[12] = "DT_QUINT8"] = 12;
            values[valuesById[13] = "DT_QINT32"] = 13;
            values[valuesById[14] = "DT_BFLOAT16"] = 14;
            values[valuesById[15] = "DT_QINT16"] = 15;
            values[valuesById[16] = "DT_QUINT16"] = 16;
            values[valuesById[17] = "DT_UINT16"] = 17;
            values[valuesById[18] = "DT_COMPLEX128"] = 18;
            values[valuesById[19] = "DT_HALF"] = 19;
            values[valuesById[20] = "DT_RESOURCE"] = 20;
            values[valuesById[21] = "DT_VARIANT"] = 21;
            values[valuesById[22] = "DT_UINT32"] = 22;
            values[valuesById[23] = "DT_UINT64"] = 23;
            values[valuesById[101] = "DT_FLOAT_REF"] = 101;
            values[valuesById[102] = "DT_DOUBLE_REF"] = 102;
            values[valuesById[103] = "DT_INT32_REF"] = 103;
            values[valuesById[104] = "DT_UINT8_REF"] = 104;
            values[valuesById[105] = "DT_INT16_REF"] = 105;
            values[valuesById[106] = "DT_INT8_REF"] = 106;
            values[valuesById[107] = "DT_STRING_REF"] = 107;
            values[valuesById[108] = "DT_COMPLEX64_REF"] = 108;
            values[valuesById[109] = "DT_INT64_REF"] = 109;
            values[valuesById[110] = "DT_BOOL_REF"] = 110;
            values[valuesById[111] = "DT_QINT8_REF"] = 111;
            values[valuesById[112] = "DT_QUINT8_REF"] = 112;
            values[valuesById[113] = "DT_QINT32_REF"] = 113;
            values[valuesById[114] = "DT_BFLOAT16_REF"] = 114;
            values[valuesById[115] = "DT_QINT16_REF"] = 115;
            values[valuesById[116] = "DT_QUINT16_REF"] = 116;
            values[valuesById[117] = "DT_UINT16_REF"] = 117;
            values[valuesById[118] = "DT_COMPLEX128_REF"] = 118;
            values[valuesById[119] = "DT_HALF_REF"] = 119;
            values[valuesById[120] = "DT_RESOURCE_REF"] = 120;
            values[valuesById[121] = "DT_VARIANT_REF"] = 121;
            values[valuesById[122] = "DT_UINT32_REF"] = 122;
            values[valuesById[123] = "DT_UINT64_REF"] = 123;
            return values;
        })();
    
        tensorflow.NodeDef = (function() {
    
            /**
             * Properties of a NodeDef.
             * @memberof tensorflow
             * @interface INodeDef
             * @property {string|null} [name] NodeDef name
             * @property {string|null} [op] NodeDef op
             * @property {Array.<string>|null} [input] NodeDef input
             * @property {string|null} [device] NodeDef device
             * @property {Object.<string,tensorflow.IAttrValue>|null} [attr] NodeDef attr
             */
    
            /**
             * Constructs a new NodeDef.
             * @memberof tensorflow
             * @classdesc Represents a NodeDef.
             * @implements INodeDef
             * @constructor
             * @param {tensorflow.INodeDef=} [properties] Properties to set
             */
            function NodeDef(properties) {
                this.input = [];
                this.attr = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * NodeDef name.
             * @member {string} name
             * @memberof tensorflow.NodeDef
             * @instance
             */
            NodeDef.prototype.name = "";
    
            /**
             * NodeDef op.
             * @member {string} op
             * @memberof tensorflow.NodeDef
             * @instance
             */
            NodeDef.prototype.op = "";
    
            /**
             * NodeDef input.
             * @member {Array.<string>} input
             * @memberof tensorflow.NodeDef
             * @instance
             */
            NodeDef.prototype.input = $util.emptyArray;
    
            /**
             * NodeDef device.
             * @member {string} device
             * @memberof tensorflow.NodeDef
             * @instance
             */
            NodeDef.prototype.device = "";
    
            /**
             * NodeDef attr.
             * @member {Object.<string,tensorflow.IAttrValue>} attr
             * @memberof tensorflow.NodeDef
             * @instance
             */
            NodeDef.prototype.attr = $util.emptyObject;
    
            /**
             * Creates a new NodeDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.NodeDef
             * @static
             * @param {tensorflow.INodeDef=} [properties] Properties to set
             * @returns {tensorflow.NodeDef} NodeDef instance
             */
            NodeDef.create = function create(properties) {
                return new NodeDef(properties);
            };
    
            /**
             * Decodes a NodeDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.NodeDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.NodeDef} NodeDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.NodeDef(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.op = reader.string();
                        break;
                    case 3:
                        if (!(message.input && message.input.length))
                            message.input = [];
                        message.input.push(reader.string());
                        break;
                    case 4:
                        message.device = reader.string();
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        key = reader.string();
                        reader.pos++;
                        message.attr[key] = $root.tensorflow.AttrValue.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a NodeDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.NodeDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.NodeDef} NodeDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.NodeDef(), key;
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "name":
                        message.name = reader.string();
                        break;
                    case "op":
                        message.op = reader.string();
                        break;
                    case "input":
                        if (!(message.input && message.input.length))
                            message.input = [];
                        message.input.push(reader.string());
                        break;
                    case "device":
                        message.device = reader.string();
                        break;
                    case "attr":
                        reader.assert("{");
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.attr[key] = $root.tensorflow.AttrValue.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a NodeDef message.
             * @function verify
             * @memberof tensorflow.NodeDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NodeDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.op != null && message.hasOwnProperty("op"))
                    if (!$util.isString(message.op))
                        return "op: string expected";
                if (message.input != null && message.hasOwnProperty("input")) {
                    if (!Array.isArray(message.input))
                        return "input: array expected";
                    for (var i = 0; i < message.input.length; ++i)
                        if (!$util.isString(message.input[i]))
                            return "input: string[] expected";
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    if (!$util.isString(message.device))
                        return "device: string expected";
                if (message.attr != null && message.hasOwnProperty("attr")) {
                    if (!$util.isObject(message.attr))
                        return "attr: object expected";
                    var key = Object.keys(message.attr);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.AttrValue.verify(message.attr[key[i]]);
                        if (error)
                            return "attr." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a NodeDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.NodeDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.NodeDef} NodeDef
             */
            NodeDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.NodeDef)
                    return object;
                var message = new $root.tensorflow.NodeDef();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.op != null)
                    message.op = String(object.op);
                if (object.input) {
                    if (!Array.isArray(object.input))
                        throw TypeError(".tensorflow.NodeDef.input: array expected");
                    message.input = [];
                    for (var i = 0; i < object.input.length; ++i)
                        message.input[i] = String(object.input[i]);
                }
                if (object.device != null)
                    message.device = String(object.device);
                if (object.attr) {
                    if (typeof object.attr !== "object")
                        throw TypeError(".tensorflow.NodeDef.attr: object expected");
                    message.attr = {};
                    for (var keys = Object.keys(object.attr), i = 0; i < keys.length; ++i) {
                        if (typeof object.attr[keys[i]] !== "object")
                            throw TypeError(".tensorflow.NodeDef.attr: object expected");
                        message.attr[keys[i]] = $root.tensorflow.AttrValue.fromObject(object.attr[keys[i]]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a NodeDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.NodeDef
             * @static
             * @param {tensorflow.NodeDef} message NodeDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NodeDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.input = [];
                if (options.objects || options.defaults)
                    object.attr = {};
                if (options.defaults) {
                    object.name = "";
                    object.op = "";
                    object.device = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.op != null && message.hasOwnProperty("op"))
                    object.op = message.op;
                if (message.input && message.input.length) {
                    object.input = [];
                    for (var j = 0; j < message.input.length; ++j)
                        object.input[j] = message.input[j];
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    object.device = message.device;
                var keys2;
                if (message.attr && (keys2 = Object.keys(message.attr)).length) {
                    object.attr = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.attr[keys2[j]] = $root.tensorflow.AttrValue.toObject(message.attr[keys2[j]], options);
                }
                return object;
            };
    
            /**
             * Converts this NodeDef to JSON.
             * @function toJSON
             * @memberof tensorflow.NodeDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NodeDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return NodeDef;
        })();
    
        tensorflow.VersionDef = (function() {
    
            /**
             * Properties of a VersionDef.
             * @memberof tensorflow
             * @interface IVersionDef
             * @property {number|null} [producer] VersionDef producer
             * @property {number|null} [min_consumer] VersionDef min_consumer
             * @property {Array.<number>|null} [bad_consumers] VersionDef bad_consumers
             */
    
            /**
             * Constructs a new VersionDef.
             * @memberof tensorflow
             * @classdesc Represents a VersionDef.
             * @implements IVersionDef
             * @constructor
             * @param {tensorflow.IVersionDef=} [properties] Properties to set
             */
            function VersionDef(properties) {
                this.bad_consumers = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VersionDef producer.
             * @member {number} producer
             * @memberof tensorflow.VersionDef
             * @instance
             */
            VersionDef.prototype.producer = 0;
    
            /**
             * VersionDef min_consumer.
             * @member {number} min_consumer
             * @memberof tensorflow.VersionDef
             * @instance
             */
            VersionDef.prototype.min_consumer = 0;
    
            /**
             * VersionDef bad_consumers.
             * @member {Array.<number>} bad_consumers
             * @memberof tensorflow.VersionDef
             * @instance
             */
            VersionDef.prototype.bad_consumers = $util.emptyArray;
    
            /**
             * Creates a new VersionDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.VersionDef
             * @static
             * @param {tensorflow.IVersionDef=} [properties] Properties to set
             * @returns {tensorflow.VersionDef} VersionDef instance
             */
            VersionDef.create = function create(properties) {
                return new VersionDef(properties);
            };
    
            /**
             * Decodes a VersionDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.VersionDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.VersionDef} VersionDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VersionDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.VersionDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.producer = reader.int32();
                        break;
                    case 2:
                        message.min_consumer = reader.int32();
                        break;
                    case 3:
                        if (!(message.bad_consumers && message.bad_consumers.length))
                            message.bad_consumers = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bad_consumers.push(reader.int32());
                        } else
                            message.bad_consumers.push(reader.int32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VersionDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.VersionDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.VersionDef} VersionDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VersionDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.VersionDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "producer":
                        message.producer = reader.int32();
                        break;
                    case "min_consumer":
                        message.min_consumer = reader.int32();
                        break;
                    case "bad_consumers":
                        if (!(message.bad_consumers && message.bad_consumers.length))
                            message.bad_consumers = [];
                        message.bad_consumers.push(reader.int32());
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a VersionDef message.
             * @function verify
             * @memberof tensorflow.VersionDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VersionDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.producer != null && message.hasOwnProperty("producer"))
                    if (!$util.isInteger(message.producer))
                        return "producer: integer expected";
                if (message.min_consumer != null && message.hasOwnProperty("min_consumer"))
                    if (!$util.isInteger(message.min_consumer))
                        return "min_consumer: integer expected";
                if (message.bad_consumers != null && message.hasOwnProperty("bad_consumers")) {
                    if (!Array.isArray(message.bad_consumers))
                        return "bad_consumers: array expected";
                    for (var i = 0; i < message.bad_consumers.length; ++i)
                        if (!$util.isInteger(message.bad_consumers[i]))
                            return "bad_consumers: integer[] expected";
                }
                return null;
            };
    
            /**
             * Creates a VersionDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.VersionDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.VersionDef} VersionDef
             */
            VersionDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.VersionDef)
                    return object;
                var message = new $root.tensorflow.VersionDef();
                if (object.producer != null)
                    message.producer = object.producer | 0;
                if (object.min_consumer != null)
                    message.min_consumer = object.min_consumer | 0;
                if (object.bad_consumers) {
                    if (!Array.isArray(object.bad_consumers))
                        throw TypeError(".tensorflow.VersionDef.bad_consumers: array expected");
                    message.bad_consumers = [];
                    for (var i = 0; i < object.bad_consumers.length; ++i)
                        message.bad_consumers[i] = object.bad_consumers[i] | 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a VersionDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.VersionDef
             * @static
             * @param {tensorflow.VersionDef} message VersionDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VersionDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.bad_consumers = [];
                if (options.defaults) {
                    object.producer = 0;
                    object.min_consumer = 0;
                }
                if (message.producer != null && message.hasOwnProperty("producer"))
                    object.producer = message.producer;
                if (message.min_consumer != null && message.hasOwnProperty("min_consumer"))
                    object.min_consumer = message.min_consumer;
                if (message.bad_consumers && message.bad_consumers.length) {
                    object.bad_consumers = [];
                    for (var j = 0; j < message.bad_consumers.length; ++j)
                        object.bad_consumers[j] = message.bad_consumers[j];
                }
                return object;
            };
    
            /**
             * Converts this VersionDef to JSON.
             * @function toJSON
             * @memberof tensorflow.VersionDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VersionDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return VersionDef;
        })();
    
        tensorflow.FunctionDefLibrary = (function() {
    
            /**
             * Properties of a FunctionDefLibrary.
             * @memberof tensorflow
             * @interface IFunctionDefLibrary
             * @property {Array.<tensorflow.IFunctionDef>|null} ["function"] FunctionDefLibrary function
             * @property {Array.<tensorflow.IGradientDef>|null} [gradient] FunctionDefLibrary gradient
             */
    
            /**
             * Constructs a new FunctionDefLibrary.
             * @memberof tensorflow
             * @classdesc Represents a FunctionDefLibrary.
             * @implements IFunctionDefLibrary
             * @constructor
             * @param {tensorflow.IFunctionDefLibrary=} [properties] Properties to set
             */
            function FunctionDefLibrary(properties) {
                this["function"] = [];
                this.gradient = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * FunctionDefLibrary function.
             * @member {Array.<tensorflow.IFunctionDef>} function
             * @memberof tensorflow.FunctionDefLibrary
             * @instance
             */
            FunctionDefLibrary.prototype["function"] = $util.emptyArray;
    
            /**
             * FunctionDefLibrary gradient.
             * @member {Array.<tensorflow.IGradientDef>} gradient
             * @memberof tensorflow.FunctionDefLibrary
             * @instance
             */
            FunctionDefLibrary.prototype.gradient = $util.emptyArray;
    
            /**
             * Creates a new FunctionDefLibrary instance using the specified properties.
             * @function create
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {tensorflow.IFunctionDefLibrary=} [properties] Properties to set
             * @returns {tensorflow.FunctionDefLibrary} FunctionDefLibrary instance
             */
            FunctionDefLibrary.create = function create(properties) {
                return new FunctionDefLibrary(properties);
            };
    
            /**
             * Decodes a FunctionDefLibrary message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.FunctionDefLibrary} FunctionDefLibrary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FunctionDefLibrary.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.FunctionDefLibrary();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message["function"] && message["function"].length))
                            message["function"] = [];
                        message["function"].push($root.tensorflow.FunctionDef.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        if (!(message.gradient && message.gradient.length))
                            message.gradient = [];
                        message.gradient.push($root.tensorflow.GradientDef.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a FunctionDefLibrary message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.FunctionDefLibrary} FunctionDefLibrary
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FunctionDefLibrary.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.FunctionDefLibrary();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "function":
                        if (!(message["function"] && message["function"].length))
                            message["function"] = [];
                        message["function"].push($root.tensorflow.FunctionDef.decodeText(reader, true));
                        break;
                    case "gradient":
                        if (!(message.gradient && message.gradient.length))
                            message.gradient = [];
                        message.gradient.push($root.tensorflow.GradientDef.decodeText(reader, true));
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a FunctionDefLibrary message.
             * @function verify
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FunctionDefLibrary.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message["function"] != null && message.hasOwnProperty("function")) {
                    if (!Array.isArray(message["function"]))
                        return "function: array expected";
                    for (var i = 0; i < message["function"].length; ++i) {
                        var error = $root.tensorflow.FunctionDef.verify(message["function"][i]);
                        if (error)
                            return "function." + error;
                    }
                }
                if (message.gradient != null && message.hasOwnProperty("gradient")) {
                    if (!Array.isArray(message.gradient))
                        return "gradient: array expected";
                    for (var i = 0; i < message.gradient.length; ++i) {
                        var error = $root.tensorflow.GradientDef.verify(message.gradient[i]);
                        if (error)
                            return "gradient." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a FunctionDefLibrary message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.FunctionDefLibrary} FunctionDefLibrary
             */
            FunctionDefLibrary.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.FunctionDefLibrary)
                    return object;
                var message = new $root.tensorflow.FunctionDefLibrary();
                if (object["function"]) {
                    if (!Array.isArray(object["function"]))
                        throw TypeError(".tensorflow.FunctionDefLibrary.function: array expected");
                    message["function"] = [];
                    for (var i = 0; i < object["function"].length; ++i) {
                        if (typeof object["function"][i] !== "object")
                            throw TypeError(".tensorflow.FunctionDefLibrary.function: object expected");
                        message["function"][i] = $root.tensorflow.FunctionDef.fromObject(object["function"][i]);
                    }
                }
                if (object.gradient) {
                    if (!Array.isArray(object.gradient))
                        throw TypeError(".tensorflow.FunctionDefLibrary.gradient: array expected");
                    message.gradient = [];
                    for (var i = 0; i < object.gradient.length; ++i) {
                        if (typeof object.gradient[i] !== "object")
                            throw TypeError(".tensorflow.FunctionDefLibrary.gradient: object expected");
                        message.gradient[i] = $root.tensorflow.GradientDef.fromObject(object.gradient[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FunctionDefLibrary message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.FunctionDefLibrary
             * @static
             * @param {tensorflow.FunctionDefLibrary} message FunctionDefLibrary
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FunctionDefLibrary.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object["function"] = [];
                    object.gradient = [];
                }
                if (message["function"] && message["function"].length) {
                    object["function"] = [];
                    for (var j = 0; j < message["function"].length; ++j)
                        object["function"][j] = $root.tensorflow.FunctionDef.toObject(message["function"][j], options);
                }
                if (message.gradient && message.gradient.length) {
                    object.gradient = [];
                    for (var j = 0; j < message.gradient.length; ++j)
                        object.gradient[j] = $root.tensorflow.GradientDef.toObject(message.gradient[j], options);
                }
                return object;
            };
    
            /**
             * Converts this FunctionDefLibrary to JSON.
             * @function toJSON
             * @memberof tensorflow.FunctionDefLibrary
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FunctionDefLibrary.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return FunctionDefLibrary;
        })();
    
        tensorflow.FunctionDef = (function() {
    
            /**
             * Properties of a FunctionDef.
             * @memberof tensorflow
             * @interface IFunctionDef
             * @property {tensorflow.IOpDef|null} [signature] FunctionDef signature
             * @property {Object.<string,tensorflow.IAttrValue>|null} [attr] FunctionDef attr
             * @property {Array.<tensorflow.INodeDef>|null} [node_def] FunctionDef node_def
             * @property {Object.<string,string>|null} [ret] FunctionDef ret
             */
    
            /**
             * Constructs a new FunctionDef.
             * @memberof tensorflow
             * @classdesc Represents a FunctionDef.
             * @implements IFunctionDef
             * @constructor
             * @param {tensorflow.IFunctionDef=} [properties] Properties to set
             */
            function FunctionDef(properties) {
                this.attr = {};
                this.node_def = [];
                this.ret = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * FunctionDef signature.
             * @member {tensorflow.IOpDef|null|undefined} signature
             * @memberof tensorflow.FunctionDef
             * @instance
             */
            FunctionDef.prototype.signature = null;
    
            /**
             * FunctionDef attr.
             * @member {Object.<string,tensorflow.IAttrValue>} attr
             * @memberof tensorflow.FunctionDef
             * @instance
             */
            FunctionDef.prototype.attr = $util.emptyObject;
    
            /**
             * FunctionDef node_def.
             * @member {Array.<tensorflow.INodeDef>} node_def
             * @memberof tensorflow.FunctionDef
             * @instance
             */
            FunctionDef.prototype.node_def = $util.emptyArray;
    
            /**
             * FunctionDef ret.
             * @member {Object.<string,string>} ret
             * @memberof tensorflow.FunctionDef
             * @instance
             */
            FunctionDef.prototype.ret = $util.emptyObject;
    
            /**
             * Creates a new FunctionDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {tensorflow.IFunctionDef=} [properties] Properties to set
             * @returns {tensorflow.FunctionDef} FunctionDef instance
             */
            FunctionDef.create = function create(properties) {
                return new FunctionDef(properties);
            };
    
            /**
             * Decodes a FunctionDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.FunctionDef} FunctionDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FunctionDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.FunctionDef(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.signature = $root.tensorflow.OpDef.decode(reader, reader.uint32());
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        key = reader.string();
                        reader.pos++;
                        message.attr[key] = $root.tensorflow.AttrValue.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.node_def && message.node_def.length))
                            message.node_def = [];
                        message.node_def.push($root.tensorflow.NodeDef.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.ret === $util.emptyObject)
                            message.ret = {};
                        key = reader.string();
                        reader.pos++;
                        message.ret[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a FunctionDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.FunctionDef} FunctionDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FunctionDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.FunctionDef(), key;
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "signature":
                        message.signature = $root.tensorflow.OpDef.decodeText(reader, true);
                        break;
                    case "attr":
                        reader.assert("{");
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.attr[key] = $root.tensorflow.AttrValue.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    case "node_def":
                        if (!(message.node_def && message.node_def.length))
                            message.node_def = [];
                        message.node_def.push($root.tensorflow.NodeDef.decodeText(reader, true));
                        break;
                    case "ret":
                        reader.assert("{");
                        if (message.ret === $util.emptyObject)
                            message.ret = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.ret[key] = reader.string();
                        reader.assert("}");
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a FunctionDef message.
             * @function verify
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FunctionDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.signature != null && message.hasOwnProperty("signature")) {
                    var error = $root.tensorflow.OpDef.verify(message.signature);
                    if (error)
                        return "signature." + error;
                }
                if (message.attr != null && message.hasOwnProperty("attr")) {
                    if (!$util.isObject(message.attr))
                        return "attr: object expected";
                    var key = Object.keys(message.attr);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.AttrValue.verify(message.attr[key[i]]);
                        if (error)
                            return "attr." + error;
                    }
                }
                if (message.node_def != null && message.hasOwnProperty("node_def")) {
                    if (!Array.isArray(message.node_def))
                        return "node_def: array expected";
                    for (var i = 0; i < message.node_def.length; ++i) {
                        var error = $root.tensorflow.NodeDef.verify(message.node_def[i]);
                        if (error)
                            return "node_def." + error;
                    }
                }
                if (message.ret != null && message.hasOwnProperty("ret")) {
                    if (!$util.isObject(message.ret))
                        return "ret: object expected";
                    var key = Object.keys(message.ret);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ret[key[i]]))
                            return "ret: string{k:string} expected";
                }
                return null;
            };
    
            /**
             * Creates a FunctionDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.FunctionDef} FunctionDef
             */
            FunctionDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.FunctionDef)
                    return object;
                var message = new $root.tensorflow.FunctionDef();
                if (object.signature != null) {
                    if (typeof object.signature !== "object")
                        throw TypeError(".tensorflow.FunctionDef.signature: object expected");
                    message.signature = $root.tensorflow.OpDef.fromObject(object.signature);
                }
                if (object.attr) {
                    if (typeof object.attr !== "object")
                        throw TypeError(".tensorflow.FunctionDef.attr: object expected");
                    message.attr = {};
                    for (var keys = Object.keys(object.attr), i = 0; i < keys.length; ++i) {
                        if (typeof object.attr[keys[i]] !== "object")
                            throw TypeError(".tensorflow.FunctionDef.attr: object expected");
                        message.attr[keys[i]] = $root.tensorflow.AttrValue.fromObject(object.attr[keys[i]]);
                    }
                }
                if (object.node_def) {
                    if (!Array.isArray(object.node_def))
                        throw TypeError(".tensorflow.FunctionDef.node_def: array expected");
                    message.node_def = [];
                    for (var i = 0; i < object.node_def.length; ++i) {
                        if (typeof object.node_def[i] !== "object")
                            throw TypeError(".tensorflow.FunctionDef.node_def: object expected");
                        message.node_def[i] = $root.tensorflow.NodeDef.fromObject(object.node_def[i]);
                    }
                }
                if (object.ret) {
                    if (typeof object.ret !== "object")
                        throw TypeError(".tensorflow.FunctionDef.ret: object expected");
                    message.ret = {};
                    for (var keys = Object.keys(object.ret), i = 0; i < keys.length; ++i)
                        message.ret[keys[i]] = String(object.ret[keys[i]]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FunctionDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.FunctionDef
             * @static
             * @param {tensorflow.FunctionDef} message FunctionDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FunctionDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.node_def = [];
                if (options.objects || options.defaults) {
                    object.ret = {};
                    object.attr = {};
                }
                if (options.defaults)
                    object.signature = null;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = $root.tensorflow.OpDef.toObject(message.signature, options);
                if (message.node_def && message.node_def.length) {
                    object.node_def = [];
                    for (var j = 0; j < message.node_def.length; ++j)
                        object.node_def[j] = $root.tensorflow.NodeDef.toObject(message.node_def[j], options);
                }
                var keys2;
                if (message.ret && (keys2 = Object.keys(message.ret)).length) {
                    object.ret = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ret[keys2[j]] = message.ret[keys2[j]];
                }
                if (message.attr && (keys2 = Object.keys(message.attr)).length) {
                    object.attr = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.attr[keys2[j]] = $root.tensorflow.AttrValue.toObject(message.attr[keys2[j]], options);
                }
                return object;
            };
    
            /**
             * Converts this FunctionDef to JSON.
             * @function toJSON
             * @memberof tensorflow.FunctionDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FunctionDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return FunctionDef;
        })();
    
        tensorflow.GradientDef = (function() {
    
            /**
             * Properties of a GradientDef.
             * @memberof tensorflow
             * @interface IGradientDef
             * @property {string|null} [function_name] GradientDef function_name
             * @property {string|null} [gradient_func] GradientDef gradient_func
             */
    
            /**
             * Constructs a new GradientDef.
             * @memberof tensorflow
             * @classdesc Represents a GradientDef.
             * @implements IGradientDef
             * @constructor
             * @param {tensorflow.IGradientDef=} [properties] Properties to set
             */
            function GradientDef(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GradientDef function_name.
             * @member {string} function_name
             * @memberof tensorflow.GradientDef
             * @instance
             */
            GradientDef.prototype.function_name = "";
    
            /**
             * GradientDef gradient_func.
             * @member {string} gradient_func
             * @memberof tensorflow.GradientDef
             * @instance
             */
            GradientDef.prototype.gradient_func = "";
    
            /**
             * Creates a new GradientDef instance using the specified properties.
             * @function create
             * @memberof tensorflow.GradientDef
             * @static
             * @param {tensorflow.IGradientDef=} [properties] Properties to set
             * @returns {tensorflow.GradientDef} GradientDef instance
             */
            GradientDef.create = function create(properties) {
                return new GradientDef(properties);
            };
    
            /**
             * Decodes a GradientDef message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.GradientDef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.GradientDef} GradientDef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GradientDef.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.GradientDef();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.function_name = reader.string();
                        break;
                    case 2:
                        message.gradient_func = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GradientDef message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.GradientDef
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.GradientDef} GradientDef
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GradientDef.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.GradientDef();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "function_name":
                        message.function_name = reader.string();
                        break;
                    case "gradient_func":
                        message.gradient_func = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a GradientDef message.
             * @function verify
             * @memberof tensorflow.GradientDef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GradientDef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.function_name != null && message.hasOwnProperty("function_name"))
                    if (!$util.isString(message.function_name))
                        return "function_name: string expected";
                if (message.gradient_func != null && message.hasOwnProperty("gradient_func"))
                    if (!$util.isString(message.gradient_func))
                        return "gradient_func: string expected";
                return null;
            };
    
            /**
             * Creates a GradientDef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.GradientDef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.GradientDef} GradientDef
             */
            GradientDef.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.GradientDef)
                    return object;
                var message = new $root.tensorflow.GradientDef();
                if (object.function_name != null)
                    message.function_name = String(object.function_name);
                if (object.gradient_func != null)
                    message.gradient_func = String(object.gradient_func);
                return message;
            };
    
            /**
             * Creates a plain object from a GradientDef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.GradientDef
             * @static
             * @param {tensorflow.GradientDef} message GradientDef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GradientDef.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.function_name = "";
                    object.gradient_func = "";
                }
                if (message.function_name != null && message.hasOwnProperty("function_name"))
                    object.function_name = message.function_name;
                if (message.gradient_func != null && message.hasOwnProperty("gradient_func"))
                    object.gradient_func = message.gradient_func;
                return object;
            };
    
            /**
             * Converts this GradientDef to JSON.
             * @function toJSON
             * @memberof tensorflow.GradientDef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GradientDef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GradientDef;
        })();
    
        tensorflow.AttrValue = (function() {
    
            /**
             * Properties of an AttrValue.
             * @memberof tensorflow
             * @interface IAttrValue
             * @property {Uint8Array|null} [s] AttrValue s
             * @property {number|Long|null} [i] AttrValue i
             * @property {number|null} [f] AttrValue f
             * @property {boolean|null} [b] AttrValue b
             * @property {tensorflow.DataType|null} [type] AttrValue type
             * @property {tensorflow.ITensorShapeProto|null} [shape] AttrValue shape
             * @property {tensorflow.ITensorProto|null} [tensor] AttrValue tensor
             * @property {tensorflow.AttrValue.IListValue|null} [list] AttrValue list
             * @property {tensorflow.INameAttrList|null} [func] AttrValue func
             * @property {string|null} [placeholder] AttrValue placeholder
             */
    
            /**
             * Constructs a new AttrValue.
             * @memberof tensorflow
             * @classdesc Represents an AttrValue.
             * @implements IAttrValue
             * @constructor
             * @param {tensorflow.IAttrValue=} [properties] Properties to set
             */
            function AttrValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * AttrValue s.
             * @member {Uint8Array} s
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.s = $util.newBuffer([]);
    
            /**
             * AttrValue i.
             * @member {number|Long} i
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.i = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * AttrValue f.
             * @member {number} f
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.f = 0;
    
            /**
             * AttrValue b.
             * @member {boolean} b
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.b = false;
    
            /**
             * AttrValue type.
             * @member {tensorflow.DataType} type
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.type = 0;
    
            /**
             * AttrValue shape.
             * @member {tensorflow.ITensorShapeProto|null|undefined} shape
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.shape = null;
    
            /**
             * AttrValue tensor.
             * @member {tensorflow.ITensorProto|null|undefined} tensor
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.tensor = null;
    
            /**
             * AttrValue list.
             * @member {tensorflow.AttrValue.IListValue|null|undefined} list
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.list = null;
    
            /**
             * AttrValue func.
             * @member {tensorflow.INameAttrList|null|undefined} func
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.func = null;
    
            /**
             * AttrValue placeholder.
             * @member {string} placeholder
             * @memberof tensorflow.AttrValue
             * @instance
             */
            AttrValue.prototype.placeholder = "";
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * AttrValue value.
             * @member {"s"|"i"|"f"|"b"|"type"|"shape"|"tensor"|"list"|"func"|"placeholder"|undefined} value
             * @memberof tensorflow.AttrValue
             * @instance
             */
            Object.defineProperty(AttrValue.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["s", "i", "f", "b", "type", "shape", "tensor", "list", "func", "placeholder"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new AttrValue instance using the specified properties.
             * @function create
             * @memberof tensorflow.AttrValue
             * @static
             * @param {tensorflow.IAttrValue=} [properties] Properties to set
             * @returns {tensorflow.AttrValue} AttrValue instance
             */
            AttrValue.create = function create(properties) {
                return new AttrValue(properties);
            };
    
            /**
             * Decodes an AttrValue message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.AttrValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.AttrValue} AttrValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AttrValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.AttrValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.s = reader.bytes();
                        break;
                    case 3:
                        message.i = reader.int64();
                        break;
                    case 4:
                        message.f = reader.float();
                        break;
                    case 5:
                        message.b = reader.bool();
                        break;
                    case 6:
                        message.type = reader.int32();
                        break;
                    case 7:
                        message.shape = $root.tensorflow.TensorShapeProto.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.tensor = $root.tensorflow.TensorProto.decode(reader, reader.uint32());
                        break;
                    case 1:
                        message.list = $root.tensorflow.AttrValue.ListValue.decode(reader, reader.uint32());
                        break;
                    case 10:
                        message.func = $root.tensorflow.NameAttrList.decode(reader, reader.uint32());
                        break;
                    case 9:
                        message.placeholder = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an AttrValue message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.AttrValue
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.AttrValue} AttrValue
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AttrValue.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.AttrValue();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "s":
                        message.s = reader.bytes();
                        break;
                    case "i":
                        message.i = reader.int64();
                        break;
                    case "f":
                        message.f = reader.float();
                        break;
                    case "b":
                        message.b = reader.bool();
                        break;
                    case "type":
                        message.type = reader.enum($root.tensorflow.DataType);
                        break;
                    case "shape":
                        message.shape = $root.tensorflow.TensorShapeProto.decodeText(reader, true);
                        break;
                    case "tensor":
                        message.tensor = $root.tensorflow.TensorProto.decodeText(reader, true);
                        break;
                    case "list":
                        message.list = $root.tensorflow.AttrValue.ListValue.decodeText(reader, true);
                        break;
                    case "func":
                        message.func = $root.tensorflow.NameAttrList.decodeText(reader, true);
                        break;
                    case "placeholder":
                        message.placeholder = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies an AttrValue message.
             * @function verify
             * @memberof tensorflow.AttrValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AttrValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.s != null && message.hasOwnProperty("s")) {
                    properties.value = 1;
                    if (!(message.s && typeof message.s.length === "number" || $util.isString(message.s)))
                        return "s: buffer expected";
                }
                if (message.i != null && message.hasOwnProperty("i")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    if (!$util.isInteger(message.i) && !(message.i && $util.isInteger(message.i.low) && $util.isInteger(message.i.high)))
                        return "i: integer|Long expected";
                }
                if (message.f != null && message.hasOwnProperty("f")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    if (typeof message.f !== "number")
                        return "f: number expected";
                }
                if (message.b != null && message.hasOwnProperty("b")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    if (typeof message.b !== "boolean")
                        return "b: boolean expected";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                    case 123:
                        break;
                    }
                }
                if (message.shape != null && message.hasOwnProperty("shape")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.tensorflow.TensorShapeProto.verify(message.shape);
                        if (error)
                            return "shape." + error;
                    }
                }
                if (message.tensor != null && message.hasOwnProperty("tensor")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.tensorflow.TensorProto.verify(message.tensor);
                        if (error)
                            return "tensor." + error;
                    }
                }
                if (message.list != null && message.hasOwnProperty("list")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.tensorflow.AttrValue.ListValue.verify(message.list);
                        if (error)
                            return "list." + error;
                    }
                }
                if (message.func != null && message.hasOwnProperty("func")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.tensorflow.NameAttrList.verify(message.func);
                        if (error)
                            return "func." + error;
                    }
                }
                if (message.placeholder != null && message.hasOwnProperty("placeholder")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    if (!$util.isString(message.placeholder))
                        return "placeholder: string expected";
                }
                return null;
            };
    
            /**
             * Creates an AttrValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.AttrValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.AttrValue} AttrValue
             */
            AttrValue.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.AttrValue)
                    return object;
                var message = new $root.tensorflow.AttrValue();
                if (object.s != null)
                    if (typeof object.s === "string")
                        $util.base64.decode(object.s, message.s = $util.newBuffer($util.base64.length(object.s)), 0);
                    else if (object.s.length)
                        message.s = object.s;
                if (object.i != null)
                    if ($util.Long)
                        (message.i = $util.Long.fromValue(object.i)).unsigned = false;
                    else if (typeof object.i === "string")
                        message.i = parseInt(object.i, 10);
                    else if (typeof object.i === "number")
                        message.i = object.i;
                    else if (typeof object.i === "object")
                        message.i = new $util.LongBits(object.i.low >>> 0, object.i.high >>> 0).toNumber();
                if (object.f != null)
                    message.f = Number(object.f);
                if (object.b != null)
                    message.b = Boolean(object.b);
                switch (object.type) {
                case "DT_INVALID":
                case 0:
                    message.type = 0;
                    break;
                case "DT_FLOAT":
                case 1:
                    message.type = 1;
                    break;
                case "DT_DOUBLE":
                case 2:
                    message.type = 2;
                    break;
                case "DT_INT32":
                case 3:
                    message.type = 3;
                    break;
                case "DT_UINT8":
                case 4:
                    message.type = 4;
                    break;
                case "DT_INT16":
                case 5:
                    message.type = 5;
                    break;
                case "DT_INT8":
                case 6:
                    message.type = 6;
                    break;
                case "DT_STRING":
                case 7:
                    message.type = 7;
                    break;
                case "DT_COMPLEX64":
                case 8:
                    message.type = 8;
                    break;
                case "DT_INT64":
                case 9:
                    message.type = 9;
                    break;
                case "DT_BOOL":
                case 10:
                    message.type = 10;
                    break;
                case "DT_QINT8":
                case 11:
                    message.type = 11;
                    break;
                case "DT_QUINT8":
                case 12:
                    message.type = 12;
                    break;
                case "DT_QINT32":
                case 13:
                    message.type = 13;
                    break;
                case "DT_BFLOAT16":
                case 14:
                    message.type = 14;
                    break;
                case "DT_QINT16":
                case 15:
                    message.type = 15;
                    break;
                case "DT_QUINT16":
                case 16:
                    message.type = 16;
                    break;
                case "DT_UINT16":
                case 17:
                    message.type = 17;
                    break;
                case "DT_COMPLEX128":
                case 18:
                    message.type = 18;
                    break;
                case "DT_HALF":
                case 19:
                    message.type = 19;
                    break;
                case "DT_RESOURCE":
                case 20:
                    message.type = 20;
                    break;
                case "DT_VARIANT":
                case 21:
                    message.type = 21;
                    break;
                case "DT_UINT32":
                case 22:
                    message.type = 22;
                    break;
                case "DT_UINT64":
                case 23:
                    message.type = 23;
                    break;
                case "DT_FLOAT_REF":
                case 101:
                    message.type = 101;
                    break;
                case "DT_DOUBLE_REF":
                case 102:
                    message.type = 102;
                    break;
                case "DT_INT32_REF":
                case 103:
                    message.type = 103;
                    break;
                case "DT_UINT8_REF":
                case 104:
                    message.type = 104;
                    break;
                case "DT_INT16_REF":
                case 105:
                    message.type = 105;
                    break;
                case "DT_INT8_REF":
                case 106:
                    message.type = 106;
                    break;
                case "DT_STRING_REF":
                case 107:
                    message.type = 107;
                    break;
                case "DT_COMPLEX64_REF":
                case 108:
                    message.type = 108;
                    break;
                case "DT_INT64_REF":
                case 109:
                    message.type = 109;
                    break;
                case "DT_BOOL_REF":
                case 110:
                    message.type = 110;
                    break;
                case "DT_QINT8_REF":
                case 111:
                    message.type = 111;
                    break;
                case "DT_QUINT8_REF":
                case 112:
                    message.type = 112;
                    break;
                case "DT_QINT32_REF":
                case 113:
                    message.type = 113;
                    break;
                case "DT_BFLOAT16_REF":
                case 114:
                    message.type = 114;
                    break;
                case "DT_QINT16_REF":
                case 115:
                    message.type = 115;
                    break;
                case "DT_QUINT16_REF":
                case 116:
                    message.type = 116;
                    break;
                case "DT_UINT16_REF":
                case 117:
                    message.type = 117;
                    break;
                case "DT_COMPLEX128_REF":
                case 118:
                    message.type = 118;
                    break;
                case "DT_HALF_REF":
                case 119:
                    message.type = 119;
                    break;
                case "DT_RESOURCE_REF":
                case 120:
                    message.type = 120;
                    break;
                case "DT_VARIANT_REF":
                case 121:
                    message.type = 121;
                    break;
                case "DT_UINT32_REF":
                case 122:
                    message.type = 122;
                    break;
                case "DT_UINT64_REF":
                case 123:
                    message.type = 123;
                    break;
                }
                if (object.shape != null) {
                    if (typeof object.shape !== "object")
                        throw TypeError(".tensorflow.AttrValue.shape: object expected");
                    message.shape = $root.tensorflow.TensorShapeProto.fromObject(object.shape);
                }
                if (object.tensor != null) {
                    if (typeof object.tensor !== "object")
                        throw TypeError(".tensorflow.AttrValue.tensor: object expected");
                    message.tensor = $root.tensorflow.TensorProto.fromObject(object.tensor);
                }
                if (object.list != null) {
                    if (typeof object.list !== "object")
                        throw TypeError(".tensorflow.AttrValue.list: object expected");
                    message.list = $root.tensorflow.AttrValue.ListValue.fromObject(object.list);
                }
                if (object.func != null) {
                    if (typeof object.func !== "object")
                        throw TypeError(".tensorflow.AttrValue.func: object expected");
                    message.func = $root.tensorflow.NameAttrList.fromObject(object.func);
                }
                if (object.placeholder != null)
                    message.placeholder = String(object.placeholder);
                return message;
            };
    
            /**
             * Creates a plain object from an AttrValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.AttrValue
             * @static
             * @param {tensorflow.AttrValue} message AttrValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AttrValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.list != null && message.hasOwnProperty("list")) {
                    object.list = $root.tensorflow.AttrValue.ListValue.toObject(message.list, options);
                    if (options.oneofs)
                        object.value = "list";
                }
                if (message.s != null && message.hasOwnProperty("s")) {
                    object.s = options.bytes === String ? $util.base64.encode(message.s, 0, message.s.length) : options.bytes === Array ? Array.prototype.slice.call(message.s) : message.s;
                    if (options.oneofs)
                        object.value = "s";
                }
                if (message.i != null && message.hasOwnProperty("i")) {
                    if (typeof message.i === "number")
                        object.i = options.longs === String ? String(message.i) : message.i;
                    else
                        object.i = options.longs === String ? $util.Long.prototype.toString.call(message.i) : options.longs === Number ? new $util.LongBits(message.i.low >>> 0, message.i.high >>> 0).toNumber() : message.i;
                    if (options.oneofs)
                        object.value = "i";
                }
                if (message.f != null && message.hasOwnProperty("f")) {
                    object.f = options.json && !isFinite(message.f) ? String(message.f) : message.f;
                    if (options.oneofs)
                        object.value = "f";
                }
                if (message.b != null && message.hasOwnProperty("b")) {
                    object.b = message.b;
                    if (options.oneofs)
                        object.value = "b";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type = options.enums === String ? $root.tensorflow.DataType[message.type] : message.type;
                    if (options.oneofs)
                        object.value = "type";
                }
                if (message.shape != null && message.hasOwnProperty("shape")) {
                    object.shape = $root.tensorflow.TensorShapeProto.toObject(message.shape, options);
                    if (options.oneofs)
                        object.value = "shape";
                }
                if (message.tensor != null && message.hasOwnProperty("tensor")) {
                    object.tensor = $root.tensorflow.TensorProto.toObject(message.tensor, options);
                    if (options.oneofs)
                        object.value = "tensor";
                }
                if (message.placeholder != null && message.hasOwnProperty("placeholder")) {
                    object.placeholder = message.placeholder;
                    if (options.oneofs)
                        object.value = "placeholder";
                }
                if (message.func != null && message.hasOwnProperty("func")) {
                    object.func = $root.tensorflow.NameAttrList.toObject(message.func, options);
                    if (options.oneofs)
                        object.value = "func";
                }
                return object;
            };
    
            /**
             * Converts this AttrValue to JSON.
             * @function toJSON
             * @memberof tensorflow.AttrValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AttrValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            AttrValue.ListValue = (function() {
    
                /**
                 * Properties of a ListValue.
                 * @memberof tensorflow.AttrValue
                 * @interface IListValue
                 * @property {Array.<Uint8Array>|null} [s] ListValue s
                 * @property {Array.<number|Long>|null} [i] ListValue i
                 * @property {Array.<number>|null} [f] ListValue f
                 * @property {Array.<boolean>|null} [b] ListValue b
                 * @property {Array.<tensorflow.DataType>|null} [type] ListValue type
                 * @property {Array.<tensorflow.ITensorShapeProto>|null} [shape] ListValue shape
                 * @property {Array.<tensorflow.ITensorProto>|null} [tensor] ListValue tensor
                 * @property {Array.<tensorflow.INameAttrList>|null} [func] ListValue func
                 */
    
                /**
                 * Constructs a new ListValue.
                 * @memberof tensorflow.AttrValue
                 * @classdesc Represents a ListValue.
                 * @implements IListValue
                 * @constructor
                 * @param {tensorflow.AttrValue.IListValue=} [properties] Properties to set
                 */
                function ListValue(properties) {
                    this.s = [];
                    this.i = [];
                    this.f = [];
                    this.b = [];
                    this.type = [];
                    this.shape = [];
                    this.tensor = [];
                    this.func = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ListValue s.
                 * @member {Array.<Uint8Array>} s
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.s = $util.emptyArray;
    
                /**
                 * ListValue i.
                 * @member {Array.<number|Long>} i
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.i = $util.emptyArray;
    
                /**
                 * ListValue f.
                 * @member {Array.<number>} f
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.f = $util.emptyArray;
    
                /**
                 * ListValue b.
                 * @member {Array.<boolean>} b
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.b = $util.emptyArray;
    
                /**
                 * ListValue type.
                 * @member {Array.<tensorflow.DataType>} type
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.type = $util.emptyArray;
    
                /**
                 * ListValue shape.
                 * @member {Array.<tensorflow.ITensorShapeProto>} shape
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.shape = $util.emptyArray;
    
                /**
                 * ListValue tensor.
                 * @member {Array.<tensorflow.ITensorProto>} tensor
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.tensor = $util.emptyArray;
    
                /**
                 * ListValue func.
                 * @member {Array.<tensorflow.INameAttrList>} func
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 */
                ListValue.prototype.func = $util.emptyArray;
    
                /**
                 * Creates a new ListValue instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {tensorflow.AttrValue.IListValue=} [properties] Properties to set
                 * @returns {tensorflow.AttrValue.ListValue} ListValue instance
                 */
                ListValue.create = function create(properties) {
                    return new ListValue(properties);
                };
    
                /**
                 * Decodes a ListValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.AttrValue.ListValue} ListValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.AttrValue.ListValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            if (!(message.s && message.s.length))
                                message.s = [];
                            message.s.push(reader.bytes());
                            break;
                        case 3:
                            if (!(message.i && message.i.length))
                                message.i = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.i.push(reader.int64());
                            } else
                                message.i.push(reader.int64());
                            break;
                        case 4:
                            if (!(message.f && message.f.length))
                                message.f = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.f.push(reader.float());
                            } else
                                message.f.push(reader.float());
                            break;
                        case 5:
                            if (!(message.b && message.b.length))
                                message.b = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.b.push(reader.bool());
                            } else
                                message.b.push(reader.bool());
                            break;
                        case 6:
                            if (!(message.type && message.type.length))
                                message.type = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.type.push(reader.int32());
                            } else
                                message.type.push(reader.int32());
                            break;
                        case 7:
                            if (!(message.shape && message.shape.length))
                                message.shape = [];
                            message.shape.push($root.tensorflow.TensorShapeProto.decode(reader, reader.uint32()));
                            break;
                        case 8:
                            if (!(message.tensor && message.tensor.length))
                                message.tensor = [];
                            message.tensor.push($root.tensorflow.TensorProto.decode(reader, reader.uint32()));
                            break;
                        case 9:
                            if (!(message.func && message.func.length))
                                message.func = [];
                            message.func.push($root.tensorflow.NameAttrList.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ListValue message from the specified text representation.
                 * @function decodeText
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {tensorflow.AttrValue.ListValue} ListValue
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListValue.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.tensorflow.AttrValue.ListValue();
                    reader.start(block);
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "s":
                            if (!(message.s && message.s.length))
                                message.s = [];
                            message.s.push(reader.bytes());
                            break;
                        case "i":
                            if (!(message.i && message.i.length))
                                message.i = [];
                            message.i.push(reader.int64());
                            break;
                        case "f":
                            if (!(message.f && message.f.length))
                                message.f = [];
                            message.f.push(reader.float());
                            break;
                        case "b":
                            if (!(message.b && message.b.length))
                                message.b = [];
                            message.b.push(reader.bool());
                            break;
                        case "type":
                            if (!(message.type && message.type.length))
                                message.type = [];
                            message.type.push(reader.enum($root.tensorflow.DataType));
                            break;
                        case "shape":
                            if (!(message.shape && message.shape.length))
                                message.shape = [];
                            message.shape.push($root.tensorflow.TensorShapeProto.decodeText(reader, true));
                            break;
                        case "tensor":
                            if (!(message.tensor && message.tensor.length))
                                message.tensor = [];
                            message.tensor.push($root.tensorflow.TensorProto.decodeText(reader, true));
                            break;
                        case "func":
                            if (!(message.func && message.func.length))
                                message.func = [];
                            message.func.push($root.tensorflow.NameAttrList.decodeText(reader, true));
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies a ListValue message.
                 * @function verify
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ListValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.s != null && message.hasOwnProperty("s")) {
                        if (!Array.isArray(message.s))
                            return "s: array expected";
                        for (var i = 0; i < message.s.length; ++i)
                            if (!(message.s[i] && typeof message.s[i].length === "number" || $util.isString(message.s[i])))
                                return "s: buffer[] expected";
                    }
                    if (message.i != null && message.hasOwnProperty("i")) {
                        if (!Array.isArray(message.i))
                            return "i: array expected";
                        for (var i = 0; i < message.i.length; ++i)
                            if (!$util.isInteger(message.i[i]) && !(message.i[i] && $util.isInteger(message.i[i].low) && $util.isInteger(message.i[i].high)))
                                return "i: integer|Long[] expected";
                    }
                    if (message.f != null && message.hasOwnProperty("f")) {
                        if (!Array.isArray(message.f))
                            return "f: array expected";
                        for (var i = 0; i < message.f.length; ++i)
                            if (typeof message.f[i] !== "number")
                                return "f: number[] expected";
                    }
                    if (message.b != null && message.hasOwnProperty("b")) {
                        if (!Array.isArray(message.b))
                            return "b: array expected";
                        for (var i = 0; i < message.b.length; ++i)
                            if (typeof message.b[i] !== "boolean")
                                return "b: boolean[] expected";
                    }
                    if (message.type != null && message.hasOwnProperty("type")) {
                        if (!Array.isArray(message.type))
                            return "type: array expected";
                        for (var i = 0; i < message.type.length; ++i)
                            switch (message.type[i]) {
                            default:
                                return "type: enum value[] expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 101:
                            case 102:
                            case 103:
                            case 104:
                            case 105:
                            case 106:
                            case 107:
                            case 108:
                            case 109:
                            case 110:
                            case 111:
                            case 112:
                            case 113:
                            case 114:
                            case 115:
                            case 116:
                            case 117:
                            case 118:
                            case 119:
                            case 120:
                            case 121:
                            case 122:
                            case 123:
                                break;
                            }
                    }
                    if (message.shape != null && message.hasOwnProperty("shape")) {
                        if (!Array.isArray(message.shape))
                            return "shape: array expected";
                        for (var i = 0; i < message.shape.length; ++i) {
                            var error = $root.tensorflow.TensorShapeProto.verify(message.shape[i]);
                            if (error)
                                return "shape." + error;
                        }
                    }
                    if (message.tensor != null && message.hasOwnProperty("tensor")) {
                        if (!Array.isArray(message.tensor))
                            return "tensor: array expected";
                        for (var i = 0; i < message.tensor.length; ++i) {
                            var error = $root.tensorflow.TensorProto.verify(message.tensor[i]);
                            if (error)
                                return "tensor." + error;
                        }
                    }
                    if (message.func != null && message.hasOwnProperty("func")) {
                        if (!Array.isArray(message.func))
                            return "func: array expected";
                        for (var i = 0; i < message.func.length; ++i) {
                            var error = $root.tensorflow.NameAttrList.verify(message.func[i]);
                            if (error)
                                return "func." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.AttrValue.ListValue} ListValue
                 */
                ListValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.AttrValue.ListValue)
                        return object;
                    var message = new $root.tensorflow.AttrValue.ListValue();
                    if (object.s) {
                        if (!Array.isArray(object.s))
                            throw TypeError(".tensorflow.AttrValue.ListValue.s: array expected");
                        message.s = [];
                        for (var i = 0; i < object.s.length; ++i)
                            if (typeof object.s[i] === "string")
                                $util.base64.decode(object.s[i], message.s[i] = $util.newBuffer($util.base64.length(object.s[i])), 0);
                            else if (object.s[i].length)
                                message.s[i] = object.s[i];
                    }
                    if (object.i) {
                        if (!Array.isArray(object.i))
                            throw TypeError(".tensorflow.AttrValue.ListValue.i: array expected");
                        message.i = [];
                        for (var i = 0; i < object.i.length; ++i)
                            if ($util.Long)
                                (message.i[i] = $util.Long.fromValue(object.i[i])).unsigned = false;
                            else if (typeof object.i[i] === "string")
                                message.i[i] = parseInt(object.i[i], 10);
                            else if (typeof object.i[i] === "number")
                                message.i[i] = object.i[i];
                            else if (typeof object.i[i] === "object")
                                message.i[i] = new $util.LongBits(object.i[i].low >>> 0, object.i[i].high >>> 0).toNumber();
                    }
                    if (object.f) {
                        if (!Array.isArray(object.f))
                            throw TypeError(".tensorflow.AttrValue.ListValue.f: array expected");
                        message.f = [];
                        for (var i = 0; i < object.f.length; ++i)
                            message.f[i] = Number(object.f[i]);
                    }
                    if (object.b) {
                        if (!Array.isArray(object.b))
                            throw TypeError(".tensorflow.AttrValue.ListValue.b: array expected");
                        message.b = [];
                        for (var i = 0; i < object.b.length; ++i)
                            message.b[i] = Boolean(object.b[i]);
                    }
                    if (object.type) {
                        if (!Array.isArray(object.type))
                            throw TypeError(".tensorflow.AttrValue.ListValue.type: array expected");
                        message.type = [];
                        for (var i = 0; i < object.type.length; ++i)
                            switch (object.type[i]) {
                            default:
                            case "DT_INVALID":
                            case 0:
                                message.type[i] = 0;
                                break;
                            case "DT_FLOAT":
                            case 1:
                                message.type[i] = 1;
                                break;
                            case "DT_DOUBLE":
                            case 2:
                                message.type[i] = 2;
                                break;
                            case "DT_INT32":
                            case 3:
                                message.type[i] = 3;
                                break;
                            case "DT_UINT8":
                            case 4:
                                message.type[i] = 4;
                                break;
                            case "DT_INT16":
                            case 5:
                                message.type[i] = 5;
                                break;
                            case "DT_INT8":
                            case 6:
                                message.type[i] = 6;
                                break;
                            case "DT_STRING":
                            case 7:
                                message.type[i] = 7;
                                break;
                            case "DT_COMPLEX64":
                            case 8:
                                message.type[i] = 8;
                                break;
                            case "DT_INT64":
                            case 9:
                                message.type[i] = 9;
                                break;
                            case "DT_BOOL":
                            case 10:
                                message.type[i] = 10;
                                break;
                            case "DT_QINT8":
                            case 11:
                                message.type[i] = 11;
                                break;
                            case "DT_QUINT8":
                            case 12:
                                message.type[i] = 12;
                                break;
                            case "DT_QINT32":
                            case 13:
                                message.type[i] = 13;
                                break;
                            case "DT_BFLOAT16":
                            case 14:
                                message.type[i] = 14;
                                break;
                            case "DT_QINT16":
                            case 15:
                                message.type[i] = 15;
                                break;
                            case "DT_QUINT16":
                            case 16:
                                message.type[i] = 16;
                                break;
                            case "DT_UINT16":
                            case 17:
                                message.type[i] = 17;
                                break;
                            case "DT_COMPLEX128":
                            case 18:
                                message.type[i] = 18;
                                break;
                            case "DT_HALF":
                            case 19:
                                message.type[i] = 19;
                                break;
                            case "DT_RESOURCE":
                            case 20:
                                message.type[i] = 20;
                                break;
                            case "DT_VARIANT":
                            case 21:
                                message.type[i] = 21;
                                break;
                            case "DT_UINT32":
                            case 22:
                                message.type[i] = 22;
                                break;
                            case "DT_UINT64":
                            case 23:
                                message.type[i] = 23;
                                break;
                            case "DT_FLOAT_REF":
                            case 101:
                                message.type[i] = 101;
                                break;
                            case "DT_DOUBLE_REF":
                            case 102:
                                message.type[i] = 102;
                                break;
                            case "DT_INT32_REF":
                            case 103:
                                message.type[i] = 103;
                                break;
                            case "DT_UINT8_REF":
                            case 104:
                                message.type[i] = 104;
                                break;
                            case "DT_INT16_REF":
                            case 105:
                                message.type[i] = 105;
                                break;
                            case "DT_INT8_REF":
                            case 106:
                                message.type[i] = 106;
                                break;
                            case "DT_STRING_REF":
                            case 107:
                                message.type[i] = 107;
                                break;
                            case "DT_COMPLEX64_REF":
                            case 108:
                                message.type[i] = 108;
                                break;
                            case "DT_INT64_REF":
                            case 109:
                                message.type[i] = 109;
                                break;
                            case "DT_BOOL_REF":
                            case 110:
                                message.type[i] = 110;
                                break;
                            case "DT_QINT8_REF":
                            case 111:
                                message.type[i] = 111;
                                break;
                            case "DT_QUINT8_REF":
                            case 112:
                                message.type[i] = 112;
                                break;
                            case "DT_QINT32_REF":
                            case 113:
                                message.type[i] = 113;
                                break;
                            case "DT_BFLOAT16_REF":
                            case 114:
                                message.type[i] = 114;
                                break;
                            case "DT_QINT16_REF":
                            case 115:
                                message.type[i] = 115;
                                break;
                            case "DT_QUINT16_REF":
                            case 116:
                                message.type[i] = 116;
                                break;
                            case "DT_UINT16_REF":
                            case 117:
                                message.type[i] = 117;
                                break;
                            case "DT_COMPLEX128_REF":
                            case 118:
                                message.type[i] = 118;
                                break;
                            case "DT_HALF_REF":
                            case 119:
                                message.type[i] = 119;
                                break;
                            case "DT_RESOURCE_REF":
                            case 120:
                                message.type[i] = 120;
                                break;
                            case "DT_VARIANT_REF":
                            case 121:
                                message.type[i] = 121;
                                break;
                            case "DT_UINT32_REF":
                            case 122:
                                message.type[i] = 122;
                                break;
                            case "DT_UINT64_REF":
                            case 123:
                                message.type[i] = 123;
                                break;
                            }
                    }
                    if (object.shape) {
                        if (!Array.isArray(object.shape))
                            throw TypeError(".tensorflow.AttrValue.ListValue.shape: array expected");
                        message.shape = [];
                        for (var i = 0; i < object.shape.length; ++i) {
                            if (typeof object.shape[i] !== "object")
                                throw TypeError(".tensorflow.AttrValue.ListValue.shape: object expected");
                            message.shape[i] = $root.tensorflow.TensorShapeProto.fromObject(object.shape[i]);
                        }
                    }
                    if (object.tensor) {
                        if (!Array.isArray(object.tensor))
                            throw TypeError(".tensorflow.AttrValue.ListValue.tensor: array expected");
                        message.tensor = [];
                        for (var i = 0; i < object.tensor.length; ++i) {
                            if (typeof object.tensor[i] !== "object")
                                throw TypeError(".tensorflow.AttrValue.ListValue.tensor: object expected");
                            message.tensor[i] = $root.tensorflow.TensorProto.fromObject(object.tensor[i]);
                        }
                    }
                    if (object.func) {
                        if (!Array.isArray(object.func))
                            throw TypeError(".tensorflow.AttrValue.ListValue.func: array expected");
                        message.func = [];
                        for (var i = 0; i < object.func.length; ++i) {
                            if (typeof object.func[i] !== "object")
                                throw TypeError(".tensorflow.AttrValue.ListValue.func: object expected");
                            message.func[i] = $root.tensorflow.NameAttrList.fromObject(object.func[i]);
                        }
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a ListValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.AttrValue.ListValue
                 * @static
                 * @param {tensorflow.AttrValue.ListValue} message ListValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ListValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.s = [];
                        object.i = [];
                        object.f = [];
                        object.b = [];
                        object.type = [];
                        object.shape = [];
                        object.tensor = [];
                        object.func = [];
                    }
                    if (message.s && message.s.length) {
                        object.s = [];
                        for (var j = 0; j < message.s.length; ++j)
                            object.s[j] = options.bytes === String ? $util.base64.encode(message.s[j], 0, message.s[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.s[j]) : message.s[j];
                    }
                    if (message.i && message.i.length) {
                        object.i = [];
                        for (var j = 0; j < message.i.length; ++j)
                            if (typeof message.i[j] === "number")
                                object.i[j] = options.longs === String ? String(message.i[j]) : message.i[j];
                            else
                                object.i[j] = options.longs === String ? $util.Long.prototype.toString.call(message.i[j]) : options.longs === Number ? new $util.LongBits(message.i[j].low >>> 0, message.i[j].high >>> 0).toNumber() : message.i[j];
                    }
                    if (message.f && message.f.length) {
                        object.f = [];
                        for (var j = 0; j < message.f.length; ++j)
                            object.f[j] = options.json && !isFinite(message.f[j]) ? String(message.f[j]) : message.f[j];
                    }
                    if (message.b && message.b.length) {
                        object.b = [];
                        for (var j = 0; j < message.b.length; ++j)
                            object.b[j] = message.b[j];
                    }
                    if (message.type && message.type.length) {
                        object.type = [];
                        for (var j = 0; j < message.type.length; ++j)
                            object.type[j] = options.enums === String ? $root.tensorflow.DataType[message.type[j]] : message.type[j];
                    }
                    if (message.shape && message.shape.length) {
                        object.shape = [];
                        for (var j = 0; j < message.shape.length; ++j)
                            object.shape[j] = $root.tensorflow.TensorShapeProto.toObject(message.shape[j], options);
                    }
                    if (message.tensor && message.tensor.length) {
                        object.tensor = [];
                        for (var j = 0; j < message.tensor.length; ++j)
                            object.tensor[j] = $root.tensorflow.TensorProto.toObject(message.tensor[j], options);
                    }
                    if (message.func && message.func.length) {
                        object.func = [];
                        for (var j = 0; j < message.func.length; ++j)
                            object.func[j] = $root.tensorflow.NameAttrList.toObject(message.func[j], options);
                    }
                    return object;
                };
    
                /**
                 * Converts this ListValue to JSON.
                 * @function toJSON
                 * @memberof tensorflow.AttrValue.ListValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ListValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ListValue;
            })();
    
            return AttrValue;
        })();
    
        tensorflow.NameAttrList = (function() {
    
            /**
             * Properties of a NameAttrList.
             * @memberof tensorflow
             * @interface INameAttrList
             * @property {string|null} [name] NameAttrList name
             * @property {Object.<string,tensorflow.IAttrValue>|null} [attr] NameAttrList attr
             */
    
            /**
             * Constructs a new NameAttrList.
             * @memberof tensorflow
             * @classdesc Represents a NameAttrList.
             * @implements INameAttrList
             * @constructor
             * @param {tensorflow.INameAttrList=} [properties] Properties to set
             */
            function NameAttrList(properties) {
                this.attr = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * NameAttrList name.
             * @member {string} name
             * @memberof tensorflow.NameAttrList
             * @instance
             */
            NameAttrList.prototype.name = "";
    
            /**
             * NameAttrList attr.
             * @member {Object.<string,tensorflow.IAttrValue>} attr
             * @memberof tensorflow.NameAttrList
             * @instance
             */
            NameAttrList.prototype.attr = $util.emptyObject;
    
            /**
             * Creates a new NameAttrList instance using the specified properties.
             * @function create
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {tensorflow.INameAttrList=} [properties] Properties to set
             * @returns {tensorflow.NameAttrList} NameAttrList instance
             */
            NameAttrList.create = function create(properties) {
                return new NameAttrList(properties);
            };
    
            /**
             * Decodes a NameAttrList message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.NameAttrList} NameAttrList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NameAttrList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.NameAttrList(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        key = reader.string();
                        reader.pos++;
                        message.attr[key] = $root.tensorflow.AttrValue.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a NameAttrList message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.NameAttrList} NameAttrList
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NameAttrList.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.NameAttrList(), key;
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "name":
                        message.name = reader.string();
                        break;
                    case "attr":
                        reader.assert("{");
                        if (message.attr === $util.emptyObject)
                            message.attr = {};
                        reader.assert("key");
                        key = reader.string();
                        reader.assert("value");
                        message.attr[key] = $root.tensorflow.AttrValue.decodeText(reader, true);
                        reader.assert("}");
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a NameAttrList message.
             * @function verify
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NameAttrList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.attr != null && message.hasOwnProperty("attr")) {
                    if (!$util.isObject(message.attr))
                        return "attr: object expected";
                    var key = Object.keys(message.attr);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.tensorflow.AttrValue.verify(message.attr[key[i]]);
                        if (error)
                            return "attr." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a NameAttrList message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.NameAttrList} NameAttrList
             */
            NameAttrList.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.NameAttrList)
                    return object;
                var message = new $root.tensorflow.NameAttrList();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.attr) {
                    if (typeof object.attr !== "object")
                        throw TypeError(".tensorflow.NameAttrList.attr: object expected");
                    message.attr = {};
                    for (var keys = Object.keys(object.attr), i = 0; i < keys.length; ++i) {
                        if (typeof object.attr[keys[i]] !== "object")
                            throw TypeError(".tensorflow.NameAttrList.attr: object expected");
                        message.attr[keys[i]] = $root.tensorflow.AttrValue.fromObject(object.attr[keys[i]]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a NameAttrList message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.NameAttrList
             * @static
             * @param {tensorflow.NameAttrList} message NameAttrList
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NameAttrList.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.attr = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                var keys2;
                if (message.attr && (keys2 = Object.keys(message.attr)).length) {
                    object.attr = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.attr[keys2[j]] = $root.tensorflow.AttrValue.toObject(message.attr[keys2[j]], options);
                }
                return object;
            };
    
            /**
             * Converts this NameAttrList to JSON.
             * @function toJSON
             * @memberof tensorflow.NameAttrList
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NameAttrList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return NameAttrList;
        })();
    
        tensorflow.TensorProto = (function() {
    
            /**
             * Properties of a TensorProto.
             * @memberof tensorflow
             * @interface ITensorProto
             * @property {tensorflow.DataType|null} [dtype] TensorProto dtype
             * @property {tensorflow.ITensorShapeProto|null} [tensor_shape] TensorProto tensor_shape
             * @property {number|null} [version_number] TensorProto version_number
             * @property {Uint8Array|null} [tensor_content] TensorProto tensor_content
             * @property {Array.<number>|null} [half_val] TensorProto half_val
             * @property {Array.<number>|null} [float_val] TensorProto float_val
             * @property {Array.<number>|null} [double_val] TensorProto double_val
             * @property {Array.<number>|null} [int_val] TensorProto int_val
             * @property {Array.<Uint8Array>|null} [string_val] TensorProto string_val
             * @property {Array.<number>|null} [scomplex_val] TensorProto scomplex_val
             * @property {Array.<number|Long>|null} [int64_val] TensorProto int64_val
             * @property {Array.<boolean>|null} [bool_val] TensorProto bool_val
             * @property {Array.<number>|null} [dcomplex_val] TensorProto dcomplex_val
             * @property {Array.<tensorflow.IResourceHandleProto>|null} [resource_handle_val] TensorProto resource_handle_val
             * @property {Array.<tensorflow.IVariantTensorDataProto>|null} [variant_val] TensorProto variant_val
             * @property {Array.<number>|null} [uint32_val] TensorProto uint32_val
             * @property {Array.<number|Long>|null} [uint64_val] TensorProto uint64_val
             */
    
            /**
             * Constructs a new TensorProto.
             * @memberof tensorflow
             * @classdesc Represents a TensorProto.
             * @implements ITensorProto
             * @constructor
             * @param {tensorflow.ITensorProto=} [properties] Properties to set
             */
            function TensorProto(properties) {
                this.half_val = [];
                this.float_val = [];
                this.double_val = [];
                this.int_val = [];
                this.string_val = [];
                this.scomplex_val = [];
                this.int64_val = [];
                this.bool_val = [];
                this.dcomplex_val = [];
                this.resource_handle_val = [];
                this.variant_val = [];
                this.uint32_val = [];
                this.uint64_val = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TensorProto dtype.
             * @member {tensorflow.DataType} dtype
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.dtype = 0;
    
            /**
             * TensorProto tensor_shape.
             * @member {tensorflow.ITensorShapeProto|null|undefined} tensor_shape
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.tensor_shape = null;
    
            /**
             * TensorProto version_number.
             * @member {number} version_number
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.version_number = 0;
    
            /**
             * TensorProto tensor_content.
             * @member {Uint8Array} tensor_content
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.tensor_content = $util.newBuffer([]);
    
            /**
             * TensorProto half_val.
             * @member {Array.<number>} half_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.half_val = $util.emptyArray;
    
            /**
             * TensorProto float_val.
             * @member {Array.<number>} float_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.float_val = $util.emptyArray;
    
            /**
             * TensorProto double_val.
             * @member {Array.<number>} double_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.double_val = $util.emptyArray;
    
            /**
             * TensorProto int_val.
             * @member {Array.<number>} int_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.int_val = $util.emptyArray;
    
            /**
             * TensorProto string_val.
             * @member {Array.<Uint8Array>} string_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.string_val = $util.emptyArray;
    
            /**
             * TensorProto scomplex_val.
             * @member {Array.<number>} scomplex_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.scomplex_val = $util.emptyArray;
    
            /**
             * TensorProto int64_val.
             * @member {Array.<number|Long>} int64_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.int64_val = $util.emptyArray;
    
            /**
             * TensorProto bool_val.
             * @member {Array.<boolean>} bool_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.bool_val = $util.emptyArray;
    
            /**
             * TensorProto dcomplex_val.
             * @member {Array.<number>} dcomplex_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.dcomplex_val = $util.emptyArray;
    
            /**
             * TensorProto resource_handle_val.
             * @member {Array.<tensorflow.IResourceHandleProto>} resource_handle_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.resource_handle_val = $util.emptyArray;
    
            /**
             * TensorProto variant_val.
             * @member {Array.<tensorflow.IVariantTensorDataProto>} variant_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.variant_val = $util.emptyArray;
    
            /**
             * TensorProto uint32_val.
             * @member {Array.<number>} uint32_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.uint32_val = $util.emptyArray;
    
            /**
             * TensorProto uint64_val.
             * @member {Array.<number|Long>} uint64_val
             * @memberof tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.uint64_val = $util.emptyArray;
    
            /**
             * Creates a new TensorProto instance using the specified properties.
             * @function create
             * @memberof tensorflow.TensorProto
             * @static
             * @param {tensorflow.ITensorProto=} [properties] Properties to set
             * @returns {tensorflow.TensorProto} TensorProto instance
             */
            TensorProto.create = function create(properties) {
                return new TensorProto(properties);
            };
    
            /**
             * Decodes a TensorProto message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.TensorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.TensorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.dtype = reader.int32();
                        break;
                    case 2:
                        message.tensor_shape = $root.tensorflow.TensorShapeProto.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.version_number = reader.int32();
                        break;
                    case 4:
                        message.tensor_content = reader.bytes();
                        break;
                    case 13:
                        if (!(message.half_val && message.half_val.length))
                            message.half_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.half_val.push(reader.int32());
                        } else
                            message.half_val.push(reader.int32());
                        break;
                    case 5:
                        if (!(message.float_val && message.float_val.length))
                            message.float_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.float_val.push(reader.float());
                        } else
                            message.float_val.push(reader.float());
                        break;
                    case 6:
                        if (!(message.double_val && message.double_val.length))
                            message.double_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.double_val.push(reader.double());
                        } else
                            message.double_val.push(reader.double());
                        break;
                    case 7:
                        if (!(message.int_val && message.int_val.length))
                            message.int_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.int_val.push(reader.int32());
                        } else
                            message.int_val.push(reader.int32());
                        break;
                    case 8:
                        if (!(message.string_val && message.string_val.length))
                            message.string_val = [];
                        message.string_val.push(reader.bytes());
                        break;
                    case 9:
                        if (!(message.scomplex_val && message.scomplex_val.length))
                            message.scomplex_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.scomplex_val.push(reader.float());
                        } else
                            message.scomplex_val.push(reader.float());
                        break;
                    case 10:
                        if (!(message.int64_val && message.int64_val.length))
                            message.int64_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.int64_val.push(reader.int64());
                        } else
                            message.int64_val.push(reader.int64());
                        break;
                    case 11:
                        if (!(message.bool_val && message.bool_val.length))
                            message.bool_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bool_val.push(reader.bool());
                        } else
                            message.bool_val.push(reader.bool());
                        break;
                    case 12:
                        if (!(message.dcomplex_val && message.dcomplex_val.length))
                            message.dcomplex_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.dcomplex_val.push(reader.double());
                        } else
                            message.dcomplex_val.push(reader.double());
                        break;
                    case 14:
                        if (!(message.resource_handle_val && message.resource_handle_val.length))
                            message.resource_handle_val = [];
                        message.resource_handle_val.push($root.tensorflow.ResourceHandleProto.decode(reader, reader.uint32()));
                        break;
                    case 15:
                        if (!(message.variant_val && message.variant_val.length))
                            message.variant_val = [];
                        message.variant_val.push($root.tensorflow.VariantTensorDataProto.decode(reader, reader.uint32()));
                        break;
                    case 16:
                        if (!(message.uint32_val && message.uint32_val.length))
                            message.uint32_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.uint32_val.push(reader.uint32());
                        } else
                            message.uint32_val.push(reader.uint32());
                        break;
                    case 17:
                        if (!(message.uint64_val && message.uint64_val.length))
                            message.uint64_val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.uint64_val.push(reader.uint64());
                        } else
                            message.uint64_val.push(reader.uint64());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TensorProto message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.TensorProto
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.TensorProto();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "dtype":
                        message.dtype = reader.enum($root.tensorflow.DataType);
                        break;
                    case "tensor_shape":
                        message.tensor_shape = $root.tensorflow.TensorShapeProto.decodeText(reader, true);
                        break;
                    case "version_number":
                        message.version_number = reader.int32();
                        break;
                    case "tensor_content":
                        message.tensor_content = reader.bytes();
                        break;
                    case "half_val":
                        if (!(message.half_val && message.half_val.length))
                            message.half_val = [];
                        message.half_val.push(reader.int32());
                        break;
                    case "float_val":
                        if (!(message.float_val && message.float_val.length))
                            message.float_val = [];
                        message.float_val.push(reader.float());
                        break;
                    case "double_val":
                        if (!(message.double_val && message.double_val.length))
                            message.double_val = [];
                        message.double_val.push(reader.double());
                        break;
                    case "int_val":
                        if (!(message.int_val && message.int_val.length))
                            message.int_val = [];
                        message.int_val.push(reader.int32());
                        break;
                    case "string_val":
                        if (!(message.string_val && message.string_val.length))
                            message.string_val = [];
                        message.string_val.push(reader.bytes());
                        break;
                    case "scomplex_val":
                        if (!(message.scomplex_val && message.scomplex_val.length))
                            message.scomplex_val = [];
                        message.scomplex_val.push(reader.float());
                        break;
                    case "int64_val":
                        if (!(message.int64_val && message.int64_val.length))
                            message.int64_val = [];
                        message.int64_val.push(reader.int64());
                        break;
                    case "bool_val":
                        if (!(message.bool_val && message.bool_val.length))
                            message.bool_val = [];
                        message.bool_val.push(reader.bool());
                        break;
                    case "dcomplex_val":
                        if (!(message.dcomplex_val && message.dcomplex_val.length))
                            message.dcomplex_val = [];
                        message.dcomplex_val.push(reader.double());
                        break;
                    case "resource_handle_val":
                        if (!(message.resource_handle_val && message.resource_handle_val.length))
                            message.resource_handle_val = [];
                        message.resource_handle_val.push($root.tensorflow.ResourceHandleProto.decodeText(reader, true));
                        break;
                    case "variant_val":
                        if (!(message.variant_val && message.variant_val.length))
                            message.variant_val = [];
                        message.variant_val.push($root.tensorflow.VariantTensorDataProto.decodeText(reader, true));
                        break;
                    case "uint32_val":
                        if (!(message.uint32_val && message.uint32_val.length))
                            message.uint32_val = [];
                        message.uint32_val.push(reader.uint32());
                        break;
                    case "uint64_val":
                        if (!(message.uint64_val && message.uint64_val.length))
                            message.uint64_val = [];
                        message.uint64_val.push(reader.uint64());
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a TensorProto message.
             * @function verify
             * @memberof tensorflow.TensorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    switch (message.dtype) {
                    default:
                        return "dtype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                    case 123:
                        break;
                    }
                if (message.tensor_shape != null && message.hasOwnProperty("tensor_shape")) {
                    var error = $root.tensorflow.TensorShapeProto.verify(message.tensor_shape);
                    if (error)
                        return "tensor_shape." + error;
                }
                if (message.version_number != null && message.hasOwnProperty("version_number"))
                    if (!$util.isInteger(message.version_number))
                        return "version_number: integer expected";
                if (message.tensor_content != null && message.hasOwnProperty("tensor_content"))
                    if (!(message.tensor_content && typeof message.tensor_content.length === "number" || $util.isString(message.tensor_content)))
                        return "tensor_content: buffer expected";
                if (message.half_val != null && message.hasOwnProperty("half_val")) {
                    if (!Array.isArray(message.half_val))
                        return "half_val: array expected";
                    for (var i = 0; i < message.half_val.length; ++i)
                        if (!$util.isInteger(message.half_val[i]))
                            return "half_val: integer[] expected";
                }
                if (message.float_val != null && message.hasOwnProperty("float_val")) {
                    if (!Array.isArray(message.float_val))
                        return "float_val: array expected";
                    for (var i = 0; i < message.float_val.length; ++i)
                        if (typeof message.float_val[i] !== "number")
                            return "float_val: number[] expected";
                }
                if (message.double_val != null && message.hasOwnProperty("double_val")) {
                    if (!Array.isArray(message.double_val))
                        return "double_val: array expected";
                    for (var i = 0; i < message.double_val.length; ++i)
                        if (typeof message.double_val[i] !== "number")
                            return "double_val: number[] expected";
                }
                if (message.int_val != null && message.hasOwnProperty("int_val")) {
                    if (!Array.isArray(message.int_val))
                        return "int_val: array expected";
                    for (var i = 0; i < message.int_val.length; ++i)
                        if (!$util.isInteger(message.int_val[i]))
                            return "int_val: integer[] expected";
                }
                if (message.string_val != null && message.hasOwnProperty("string_val")) {
                    if (!Array.isArray(message.string_val))
                        return "string_val: array expected";
                    for (var i = 0; i < message.string_val.length; ++i)
                        if (!(message.string_val[i] && typeof message.string_val[i].length === "number" || $util.isString(message.string_val[i])))
                            return "string_val: buffer[] expected";
                }
                if (message.scomplex_val != null && message.hasOwnProperty("scomplex_val")) {
                    if (!Array.isArray(message.scomplex_val))
                        return "scomplex_val: array expected";
                    for (var i = 0; i < message.scomplex_val.length; ++i)
                        if (typeof message.scomplex_val[i] !== "number")
                            return "scomplex_val: number[] expected";
                }
                if (message.int64_val != null && message.hasOwnProperty("int64_val")) {
                    if (!Array.isArray(message.int64_val))
                        return "int64_val: array expected";
                    for (var i = 0; i < message.int64_val.length; ++i)
                        if (!$util.isInteger(message.int64_val[i]) && !(message.int64_val[i] && $util.isInteger(message.int64_val[i].low) && $util.isInteger(message.int64_val[i].high)))
                            return "int64_val: integer|Long[] expected";
                }
                if (message.bool_val != null && message.hasOwnProperty("bool_val")) {
                    if (!Array.isArray(message.bool_val))
                        return "bool_val: array expected";
                    for (var i = 0; i < message.bool_val.length; ++i)
                        if (typeof message.bool_val[i] !== "boolean")
                            return "bool_val: boolean[] expected";
                }
                if (message.dcomplex_val != null && message.hasOwnProperty("dcomplex_val")) {
                    if (!Array.isArray(message.dcomplex_val))
                        return "dcomplex_val: array expected";
                    for (var i = 0; i < message.dcomplex_val.length; ++i)
                        if (typeof message.dcomplex_val[i] !== "number")
                            return "dcomplex_val: number[] expected";
                }
                if (message.resource_handle_val != null && message.hasOwnProperty("resource_handle_val")) {
                    if (!Array.isArray(message.resource_handle_val))
                        return "resource_handle_val: array expected";
                    for (var i = 0; i < message.resource_handle_val.length; ++i) {
                        var error = $root.tensorflow.ResourceHandleProto.verify(message.resource_handle_val[i]);
                        if (error)
                            return "resource_handle_val." + error;
                    }
                }
                if (message.variant_val != null && message.hasOwnProperty("variant_val")) {
                    if (!Array.isArray(message.variant_val))
                        return "variant_val: array expected";
                    for (var i = 0; i < message.variant_val.length; ++i) {
                        var error = $root.tensorflow.VariantTensorDataProto.verify(message.variant_val[i]);
                        if (error)
                            return "variant_val." + error;
                    }
                }
                if (message.uint32_val != null && message.hasOwnProperty("uint32_val")) {
                    if (!Array.isArray(message.uint32_val))
                        return "uint32_val: array expected";
                    for (var i = 0; i < message.uint32_val.length; ++i)
                        if (!$util.isInteger(message.uint32_val[i]))
                            return "uint32_val: integer[] expected";
                }
                if (message.uint64_val != null && message.hasOwnProperty("uint64_val")) {
                    if (!Array.isArray(message.uint64_val))
                        return "uint64_val: array expected";
                    for (var i = 0; i < message.uint64_val.length; ++i)
                        if (!$util.isInteger(message.uint64_val[i]) && !(message.uint64_val[i] && $util.isInteger(message.uint64_val[i].low) && $util.isInteger(message.uint64_val[i].high)))
                            return "uint64_val: integer|Long[] expected";
                }
                return null;
            };
    
            /**
             * Creates a TensorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.TensorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.TensorProto} TensorProto
             */
            TensorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.TensorProto)
                    return object;
                var message = new $root.tensorflow.TensorProto();
                switch (object.dtype) {
                case "DT_INVALID":
                case 0:
                    message.dtype = 0;
                    break;
                case "DT_FLOAT":
                case 1:
                    message.dtype = 1;
                    break;
                case "DT_DOUBLE":
                case 2:
                    message.dtype = 2;
                    break;
                case "DT_INT32":
                case 3:
                    message.dtype = 3;
                    break;
                case "DT_UINT8":
                case 4:
                    message.dtype = 4;
                    break;
                case "DT_INT16":
                case 5:
                    message.dtype = 5;
                    break;
                case "DT_INT8":
                case 6:
                    message.dtype = 6;
                    break;
                case "DT_STRING":
                case 7:
                    message.dtype = 7;
                    break;
                case "DT_COMPLEX64":
                case 8:
                    message.dtype = 8;
                    break;
                case "DT_INT64":
                case 9:
                    message.dtype = 9;
                    break;
                case "DT_BOOL":
                case 10:
                    message.dtype = 10;
                    break;
                case "DT_QINT8":
                case 11:
                    message.dtype = 11;
                    break;
                case "DT_QUINT8":
                case 12:
                    message.dtype = 12;
                    break;
                case "DT_QINT32":
                case 13:
                    message.dtype = 13;
                    break;
                case "DT_BFLOAT16":
                case 14:
                    message.dtype = 14;
                    break;
                case "DT_QINT16":
                case 15:
                    message.dtype = 15;
                    break;
                case "DT_QUINT16":
                case 16:
                    message.dtype = 16;
                    break;
                case "DT_UINT16":
                case 17:
                    message.dtype = 17;
                    break;
                case "DT_COMPLEX128":
                case 18:
                    message.dtype = 18;
                    break;
                case "DT_HALF":
                case 19:
                    message.dtype = 19;
                    break;
                case "DT_RESOURCE":
                case 20:
                    message.dtype = 20;
                    break;
                case "DT_VARIANT":
                case 21:
                    message.dtype = 21;
                    break;
                case "DT_UINT32":
                case 22:
                    message.dtype = 22;
                    break;
                case "DT_UINT64":
                case 23:
                    message.dtype = 23;
                    break;
                case "DT_FLOAT_REF":
                case 101:
                    message.dtype = 101;
                    break;
                case "DT_DOUBLE_REF":
                case 102:
                    message.dtype = 102;
                    break;
                case "DT_INT32_REF":
                case 103:
                    message.dtype = 103;
                    break;
                case "DT_UINT8_REF":
                case 104:
                    message.dtype = 104;
                    break;
                case "DT_INT16_REF":
                case 105:
                    message.dtype = 105;
                    break;
                case "DT_INT8_REF":
                case 106:
                    message.dtype = 106;
                    break;
                case "DT_STRING_REF":
                case 107:
                    message.dtype = 107;
                    break;
                case "DT_COMPLEX64_REF":
                case 108:
                    message.dtype = 108;
                    break;
                case "DT_INT64_REF":
                case 109:
                    message.dtype = 109;
                    break;
                case "DT_BOOL_REF":
                case 110:
                    message.dtype = 110;
                    break;
                case "DT_QINT8_REF":
                case 111:
                    message.dtype = 111;
                    break;
                case "DT_QUINT8_REF":
                case 112:
                    message.dtype = 112;
                    break;
                case "DT_QINT32_REF":
                case 113:
                    message.dtype = 113;
                    break;
                case "DT_BFLOAT16_REF":
                case 114:
                    message.dtype = 114;
                    break;
                case "DT_QINT16_REF":
                case 115:
                    message.dtype = 115;
                    break;
                case "DT_QUINT16_REF":
                case 116:
                    message.dtype = 116;
                    break;
                case "DT_UINT16_REF":
                case 117:
                    message.dtype = 117;
                    break;
                case "DT_COMPLEX128_REF":
                case 118:
                    message.dtype = 118;
                    break;
                case "DT_HALF_REF":
                case 119:
                    message.dtype = 119;
                    break;
                case "DT_RESOURCE_REF":
                case 120:
                    message.dtype = 120;
                    break;
                case "DT_VARIANT_REF":
                case 121:
                    message.dtype = 121;
                    break;
                case "DT_UINT32_REF":
                case 122:
                    message.dtype = 122;
                    break;
                case "DT_UINT64_REF":
                case 123:
                    message.dtype = 123;
                    break;
                }
                if (object.tensor_shape != null) {
                    if (typeof object.tensor_shape !== "object")
                        throw TypeError(".tensorflow.TensorProto.tensor_shape: object expected");
                    message.tensor_shape = $root.tensorflow.TensorShapeProto.fromObject(object.tensor_shape);
                }
                if (object.version_number != null)
                    message.version_number = object.version_number | 0;
                if (object.tensor_content != null)
                    if (typeof object.tensor_content === "string")
                        $util.base64.decode(object.tensor_content, message.tensor_content = $util.newBuffer($util.base64.length(object.tensor_content)), 0);
                    else if (object.tensor_content.length)
                        message.tensor_content = object.tensor_content;
                if (object.half_val) {
                    if (!Array.isArray(object.half_val))
                        throw TypeError(".tensorflow.TensorProto.half_val: array expected");
                    message.half_val = [];
                    for (var i = 0; i < object.half_val.length; ++i)
                        message.half_val[i] = object.half_val[i] | 0;
                }
                if (object.float_val) {
                    if (!Array.isArray(object.float_val))
                        throw TypeError(".tensorflow.TensorProto.float_val: array expected");
                    message.float_val = [];
                    for (var i = 0; i < object.float_val.length; ++i)
                        message.float_val[i] = Number(object.float_val[i]);
                }
                if (object.double_val) {
                    if (!Array.isArray(object.double_val))
                        throw TypeError(".tensorflow.TensorProto.double_val: array expected");
                    message.double_val = [];
                    for (var i = 0; i < object.double_val.length; ++i)
                        message.double_val[i] = Number(object.double_val[i]);
                }
                if (object.int_val) {
                    if (!Array.isArray(object.int_val))
                        throw TypeError(".tensorflow.TensorProto.int_val: array expected");
                    message.int_val = [];
                    for (var i = 0; i < object.int_val.length; ++i)
                        message.int_val[i] = object.int_val[i] | 0;
                }
                if (object.string_val) {
                    if (!Array.isArray(object.string_val))
                        throw TypeError(".tensorflow.TensorProto.string_val: array expected");
                    message.string_val = [];
                    for (var i = 0; i < object.string_val.length; ++i)
                        if (typeof object.string_val[i] === "string")
                            $util.base64.decode(object.string_val[i], message.string_val[i] = $util.newBuffer($util.base64.length(object.string_val[i])), 0);
                        else if (object.string_val[i].length)
                            message.string_val[i] = object.string_val[i];
                }
                if (object.scomplex_val) {
                    if (!Array.isArray(object.scomplex_val))
                        throw TypeError(".tensorflow.TensorProto.scomplex_val: array expected");
                    message.scomplex_val = [];
                    for (var i = 0; i < object.scomplex_val.length; ++i)
                        message.scomplex_val[i] = Number(object.scomplex_val[i]);
                }
                if (object.int64_val) {
                    if (!Array.isArray(object.int64_val))
                        throw TypeError(".tensorflow.TensorProto.int64_val: array expected");
                    message.int64_val = [];
                    for (var i = 0; i < object.int64_val.length; ++i)
                        if ($util.Long)
                            (message.int64_val[i] = $util.Long.fromValue(object.int64_val[i])).unsigned = false;
                        else if (typeof object.int64_val[i] === "string")
                            message.int64_val[i] = parseInt(object.int64_val[i], 10);
                        else if (typeof object.int64_val[i] === "number")
                            message.int64_val[i] = object.int64_val[i];
                        else if (typeof object.int64_val[i] === "object")
                            message.int64_val[i] = new $util.LongBits(object.int64_val[i].low >>> 0, object.int64_val[i].high >>> 0).toNumber();
                }
                if (object.bool_val) {
                    if (!Array.isArray(object.bool_val))
                        throw TypeError(".tensorflow.TensorProto.bool_val: array expected");
                    message.bool_val = [];
                    for (var i = 0; i < object.bool_val.length; ++i)
                        message.bool_val[i] = Boolean(object.bool_val[i]);
                }
                if (object.dcomplex_val) {
                    if (!Array.isArray(object.dcomplex_val))
                        throw TypeError(".tensorflow.TensorProto.dcomplex_val: array expected");
                    message.dcomplex_val = [];
                    for (var i = 0; i < object.dcomplex_val.length; ++i)
                        message.dcomplex_val[i] = Number(object.dcomplex_val[i]);
                }
                if (object.resource_handle_val) {
                    if (!Array.isArray(object.resource_handle_val))
                        throw TypeError(".tensorflow.TensorProto.resource_handle_val: array expected");
                    message.resource_handle_val = [];
                    for (var i = 0; i < object.resource_handle_val.length; ++i) {
                        if (typeof object.resource_handle_val[i] !== "object")
                            throw TypeError(".tensorflow.TensorProto.resource_handle_val: object expected");
                        message.resource_handle_val[i] = $root.tensorflow.ResourceHandleProto.fromObject(object.resource_handle_val[i]);
                    }
                }
                if (object.variant_val) {
                    if (!Array.isArray(object.variant_val))
                        throw TypeError(".tensorflow.TensorProto.variant_val: array expected");
                    message.variant_val = [];
                    for (var i = 0; i < object.variant_val.length; ++i) {
                        if (typeof object.variant_val[i] !== "object")
                            throw TypeError(".tensorflow.TensorProto.variant_val: object expected");
                        message.variant_val[i] = $root.tensorflow.VariantTensorDataProto.fromObject(object.variant_val[i]);
                    }
                }
                if (object.uint32_val) {
                    if (!Array.isArray(object.uint32_val))
                        throw TypeError(".tensorflow.TensorProto.uint32_val: array expected");
                    message.uint32_val = [];
                    for (var i = 0; i < object.uint32_val.length; ++i)
                        message.uint32_val[i] = object.uint32_val[i] >>> 0;
                }
                if (object.uint64_val) {
                    if (!Array.isArray(object.uint64_val))
                        throw TypeError(".tensorflow.TensorProto.uint64_val: array expected");
                    message.uint64_val = [];
                    for (var i = 0; i < object.uint64_val.length; ++i)
                        if ($util.Long)
                            (message.uint64_val[i] = $util.Long.fromValue(object.uint64_val[i])).unsigned = true;
                        else if (typeof object.uint64_val[i] === "string")
                            message.uint64_val[i] = parseInt(object.uint64_val[i], 10);
                        else if (typeof object.uint64_val[i] === "number")
                            message.uint64_val[i] = object.uint64_val[i];
                        else if (typeof object.uint64_val[i] === "object")
                            message.uint64_val[i] = new $util.LongBits(object.uint64_val[i].low >>> 0, object.uint64_val[i].high >>> 0).toNumber(true);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TensorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.TensorProto
             * @static
             * @param {tensorflow.TensorProto} message TensorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.float_val = [];
                    object.double_val = [];
                    object.int_val = [];
                    object.string_val = [];
                    object.scomplex_val = [];
                    object.int64_val = [];
                    object.bool_val = [];
                    object.dcomplex_val = [];
                    object.half_val = [];
                    object.resource_handle_val = [];
                    object.variant_val = [];
                    object.uint32_val = [];
                    object.uint64_val = [];
                }
                if (options.defaults) {
                    object.dtype = options.enums === String ? "DT_INVALID" : 0;
                    object.tensor_shape = null;
                    object.version_number = 0;
                    if (options.bytes === String)
                        object.tensor_content = "";
                    else {
                        object.tensor_content = [];
                        if (options.bytes !== Array)
                            object.tensor_content = $util.newBuffer(object.tensor_content);
                    }
                }
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    object.dtype = options.enums === String ? $root.tensorflow.DataType[message.dtype] : message.dtype;
                if (message.tensor_shape != null && message.hasOwnProperty("tensor_shape"))
                    object.tensor_shape = $root.tensorflow.TensorShapeProto.toObject(message.tensor_shape, options);
                if (message.version_number != null && message.hasOwnProperty("version_number"))
                    object.version_number = message.version_number;
                if (message.tensor_content != null && message.hasOwnProperty("tensor_content"))
                    object.tensor_content = options.bytes === String ? $util.base64.encode(message.tensor_content, 0, message.tensor_content.length) : options.bytes === Array ? Array.prototype.slice.call(message.tensor_content) : message.tensor_content;
                if (message.float_val && message.float_val.length) {
                    object.float_val = [];
                    for (var j = 0; j < message.float_val.length; ++j)
                        object.float_val[j] = options.json && !isFinite(message.float_val[j]) ? String(message.float_val[j]) : message.float_val[j];
                }
                if (message.double_val && message.double_val.length) {
                    object.double_val = [];
                    for (var j = 0; j < message.double_val.length; ++j)
                        object.double_val[j] = options.json && !isFinite(message.double_val[j]) ? String(message.double_val[j]) : message.double_val[j];
                }
                if (message.int_val && message.int_val.length) {
                    object.int_val = [];
                    for (var j = 0; j < message.int_val.length; ++j)
                        object.int_val[j] = message.int_val[j];
                }
                if (message.string_val && message.string_val.length) {
                    object.string_val = [];
                    for (var j = 0; j < message.string_val.length; ++j)
                        object.string_val[j] = options.bytes === String ? $util.base64.encode(message.string_val[j], 0, message.string_val[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.string_val[j]) : message.string_val[j];
                }
                if (message.scomplex_val && message.scomplex_val.length) {
                    object.scomplex_val = [];
                    for (var j = 0; j < message.scomplex_val.length; ++j)
                        object.scomplex_val[j] = options.json && !isFinite(message.scomplex_val[j]) ? String(message.scomplex_val[j]) : message.scomplex_val[j];
                }
                if (message.int64_val && message.int64_val.length) {
                    object.int64_val = [];
                    for (var j = 0; j < message.int64_val.length; ++j)
                        if (typeof message.int64_val[j] === "number")
                            object.int64_val[j] = options.longs === String ? String(message.int64_val[j]) : message.int64_val[j];
                        else
                            object.int64_val[j] = options.longs === String ? $util.Long.prototype.toString.call(message.int64_val[j]) : options.longs === Number ? new $util.LongBits(message.int64_val[j].low >>> 0, message.int64_val[j].high >>> 0).toNumber() : message.int64_val[j];
                }
                if (message.bool_val && message.bool_val.length) {
                    object.bool_val = [];
                    for (var j = 0; j < message.bool_val.length; ++j)
                        object.bool_val[j] = message.bool_val[j];
                }
                if (message.dcomplex_val && message.dcomplex_val.length) {
                    object.dcomplex_val = [];
                    for (var j = 0; j < message.dcomplex_val.length; ++j)
                        object.dcomplex_val[j] = options.json && !isFinite(message.dcomplex_val[j]) ? String(message.dcomplex_val[j]) : message.dcomplex_val[j];
                }
                if (message.half_val && message.half_val.length) {
                    object.half_val = [];
                    for (var j = 0; j < message.half_val.length; ++j)
                        object.half_val[j] = message.half_val[j];
                }
                if (message.resource_handle_val && message.resource_handle_val.length) {
                    object.resource_handle_val = [];
                    for (var j = 0; j < message.resource_handle_val.length; ++j)
                        object.resource_handle_val[j] = $root.tensorflow.ResourceHandleProto.toObject(message.resource_handle_val[j], options);
                }
                if (message.variant_val && message.variant_val.length) {
                    object.variant_val = [];
                    for (var j = 0; j < message.variant_val.length; ++j)
                        object.variant_val[j] = $root.tensorflow.VariantTensorDataProto.toObject(message.variant_val[j], options);
                }
                if (message.uint32_val && message.uint32_val.length) {
                    object.uint32_val = [];
                    for (var j = 0; j < message.uint32_val.length; ++j)
                        object.uint32_val[j] = message.uint32_val[j];
                }
                if (message.uint64_val && message.uint64_val.length) {
                    object.uint64_val = [];
                    for (var j = 0; j < message.uint64_val.length; ++j)
                        if (typeof message.uint64_val[j] === "number")
                            object.uint64_val[j] = options.longs === String ? String(message.uint64_val[j]) : message.uint64_val[j];
                        else
                            object.uint64_val[j] = options.longs === String ? $util.Long.prototype.toString.call(message.uint64_val[j]) : options.longs === Number ? new $util.LongBits(message.uint64_val[j].low >>> 0, message.uint64_val[j].high >>> 0).toNumber(true) : message.uint64_val[j];
                }
                return object;
            };
    
            /**
             * Converts this TensorProto to JSON.
             * @function toJSON
             * @memberof tensorflow.TensorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TensorProto;
        })();
    
        tensorflow.VariantTensorDataProto = (function() {
    
            /**
             * Properties of a VariantTensorDataProto.
             * @memberof tensorflow
             * @interface IVariantTensorDataProto
             * @property {string|null} [type_name] VariantTensorDataProto type_name
             * @property {Uint8Array|null} [metadata] VariantTensorDataProto metadata
             * @property {Array.<tensorflow.ITensorProto>|null} [tensors] VariantTensorDataProto tensors
             */
    
            /**
             * Constructs a new VariantTensorDataProto.
             * @memberof tensorflow
             * @classdesc Represents a VariantTensorDataProto.
             * @implements IVariantTensorDataProto
             * @constructor
             * @param {tensorflow.IVariantTensorDataProto=} [properties] Properties to set
             */
            function VariantTensorDataProto(properties) {
                this.tensors = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VariantTensorDataProto type_name.
             * @member {string} type_name
             * @memberof tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.type_name = "";
    
            /**
             * VariantTensorDataProto metadata.
             * @member {Uint8Array} metadata
             * @memberof tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.metadata = $util.newBuffer([]);
    
            /**
             * VariantTensorDataProto tensors.
             * @member {Array.<tensorflow.ITensorProto>} tensors
             * @memberof tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.tensors = $util.emptyArray;
    
            /**
             * Creates a new VariantTensorDataProto instance using the specified properties.
             * @function create
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {tensorflow.IVariantTensorDataProto=} [properties] Properties to set
             * @returns {tensorflow.VariantTensorDataProto} VariantTensorDataProto instance
             */
            VariantTensorDataProto.create = function create(properties) {
                return new VariantTensorDataProto(properties);
            };
    
            /**
             * Decodes a VariantTensorDataProto message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.VariantTensorDataProto} VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariantTensorDataProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.VariantTensorDataProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_name = reader.string();
                        break;
                    case 2:
                        message.metadata = reader.bytes();
                        break;
                    case 3:
                        if (!(message.tensors && message.tensors.length))
                            message.tensors = [];
                        message.tensors.push($root.tensorflow.TensorProto.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VariantTensorDataProto message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.VariantTensorDataProto} VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariantTensorDataProto.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.VariantTensorDataProto();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "type_name":
                        message.type_name = reader.string();
                        break;
                    case "metadata":
                        message.metadata = reader.bytes();
                        break;
                    case "tensors":
                        if (!(message.tensors && message.tensors.length))
                            message.tensors = [];
                        message.tensors.push($root.tensorflow.TensorProto.decodeText(reader, true));
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a VariantTensorDataProto message.
             * @function verify
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VariantTensorDataProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_name != null && message.hasOwnProperty("type_name"))
                    if (!$util.isString(message.type_name))
                        return "type_name: string expected";
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    if (!(message.metadata && typeof message.metadata.length === "number" || $util.isString(message.metadata)))
                        return "metadata: buffer expected";
                if (message.tensors != null && message.hasOwnProperty("tensors")) {
                    if (!Array.isArray(message.tensors))
                        return "tensors: array expected";
                    for (var i = 0; i < message.tensors.length; ++i) {
                        var error = $root.tensorflow.TensorProto.verify(message.tensors[i]);
                        if (error)
                            return "tensors." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a VariantTensorDataProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.VariantTensorDataProto} VariantTensorDataProto
             */
            VariantTensorDataProto.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.VariantTensorDataProto)
                    return object;
                var message = new $root.tensorflow.VariantTensorDataProto();
                if (object.type_name != null)
                    message.type_name = String(object.type_name);
                if (object.metadata != null)
                    if (typeof object.metadata === "string")
                        $util.base64.decode(object.metadata, message.metadata = $util.newBuffer($util.base64.length(object.metadata)), 0);
                    else if (object.metadata.length)
                        message.metadata = object.metadata;
                if (object.tensors) {
                    if (!Array.isArray(object.tensors))
                        throw TypeError(".tensorflow.VariantTensorDataProto.tensors: array expected");
                    message.tensors = [];
                    for (var i = 0; i < object.tensors.length; ++i) {
                        if (typeof object.tensors[i] !== "object")
                            throw TypeError(".tensorflow.VariantTensorDataProto.tensors: object expected");
                        message.tensors[i] = $root.tensorflow.TensorProto.fromObject(object.tensors[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a VariantTensorDataProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.VariantTensorDataProto
             * @static
             * @param {tensorflow.VariantTensorDataProto} message VariantTensorDataProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VariantTensorDataProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tensors = [];
                if (options.defaults) {
                    object.type_name = "";
                    if (options.bytes === String)
                        object.metadata = "";
                    else {
                        object.metadata = [];
                        if (options.bytes !== Array)
                            object.metadata = $util.newBuffer(object.metadata);
                    }
                }
                if (message.type_name != null && message.hasOwnProperty("type_name"))
                    object.type_name = message.type_name;
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    object.metadata = options.bytes === String ? $util.base64.encode(message.metadata, 0, message.metadata.length) : options.bytes === Array ? Array.prototype.slice.call(message.metadata) : message.metadata;
                if (message.tensors && message.tensors.length) {
                    object.tensors = [];
                    for (var j = 0; j < message.tensors.length; ++j)
                        object.tensors[j] = $root.tensorflow.TensorProto.toObject(message.tensors[j], options);
                }
                return object;
            };
    
            /**
             * Converts this VariantTensorDataProto to JSON.
             * @function toJSON
             * @memberof tensorflow.VariantTensorDataProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VariantTensorDataProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return VariantTensorDataProto;
        })();
    
        tensorflow.ResourceHandleProto = (function() {
    
            /**
             * Properties of a ResourceHandleProto.
             * @memberof tensorflow
             * @interface IResourceHandleProto
             * @property {string|null} [device] ResourceHandleProto device
             * @property {string|null} [container] ResourceHandleProto container
             * @property {string|null} [name] ResourceHandleProto name
             * @property {number|Long|null} [hash_code] ResourceHandleProto hash_code
             * @property {string|null} [maybe_type_name] ResourceHandleProto maybe_type_name
             */
    
            /**
             * Constructs a new ResourceHandleProto.
             * @memberof tensorflow
             * @classdesc Represents a ResourceHandleProto.
             * @implements IResourceHandleProto
             * @constructor
             * @param {tensorflow.IResourceHandleProto=} [properties] Properties to set
             */
            function ResourceHandleProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResourceHandleProto device.
             * @member {string} device
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             */
            ResourceHandleProto.prototype.device = "";
    
            /**
             * ResourceHandleProto container.
             * @member {string} container
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             */
            ResourceHandleProto.prototype.container = "";
    
            /**
             * ResourceHandleProto name.
             * @member {string} name
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             */
            ResourceHandleProto.prototype.name = "";
    
            /**
             * ResourceHandleProto hash_code.
             * @member {number|Long} hash_code
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             */
            ResourceHandleProto.prototype.hash_code = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * ResourceHandleProto maybe_type_name.
             * @member {string} maybe_type_name
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             */
            ResourceHandleProto.prototype.maybe_type_name = "";
    
            /**
             * Creates a new ResourceHandleProto instance using the specified properties.
             * @function create
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {tensorflow.IResourceHandleProto=} [properties] Properties to set
             * @returns {tensorflow.ResourceHandleProto} ResourceHandleProto instance
             */
            ResourceHandleProto.create = function create(properties) {
                return new ResourceHandleProto(properties);
            };
    
            /**
             * Decodes a ResourceHandleProto message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.ResourceHandleProto} ResourceHandleProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResourceHandleProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.ResourceHandleProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.device = reader.string();
                        break;
                    case 2:
                        message.container = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.hash_code = reader.uint64();
                        break;
                    case 5:
                        message.maybe_type_name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResourceHandleProto message from the specified text representation.
             * @function decodeText
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
             * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
             * @returns {tensorflow.ResourceHandleProto} ResourceHandleProto
             * @throws {Error} If the payload is not a reader or valid string
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResourceHandleProto.decodeText = function decodeText(reader, block) {
                if (!(reader instanceof $TextReader))
                    reader = $TextReader.create(reader);
                var message = new $root.tensorflow.ResourceHandleProto();
                reader.start(block);
                while (!reader.end(block)) {
                    var tag = reader.tag();
                    switch (tag) {
                    case "device":
                        message.device = reader.string();
                        break;
                    case "container":
                        message.container = reader.string();
                        break;
                    case "name":
                        message.name = reader.string();
                        break;
                    case "hash_code":
                        message.hash_code = reader.uint64();
                        break;
                    case "maybe_type_name":
                        message.maybe_type_name = reader.string();
                        break;
                    default:
                        reader.handle(tag);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Verifies a ResourceHandleProto message.
             * @function verify
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResourceHandleProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.device != null && message.hasOwnProperty("device"))
                    if (!$util.isString(message.device))
                        return "device: string expected";
                if (message.container != null && message.hasOwnProperty("container"))
                    if (!$util.isString(message.container))
                        return "container: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.hash_code != null && message.hasOwnProperty("hash_code"))
                    if (!$util.isInteger(message.hash_code) && !(message.hash_code && $util.isInteger(message.hash_code.low) && $util.isInteger(message.hash_code.high)))
                        return "hash_code: integer|Long expected";
                if (message.maybe_type_name != null && message.hasOwnProperty("maybe_type_name"))
                    if (!$util.isString(message.maybe_type_name))
                        return "maybe_type_name: string expected";
                return null;
            };
    
            /**
             * Creates a ResourceHandleProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.ResourceHandleProto} ResourceHandleProto
             */
            ResourceHandleProto.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.ResourceHandleProto)
                    return object;
                var message = new $root.tensorflow.ResourceHandleProto();
                if (object.device != null)
                    message.device = String(object.device);
                if (object.container != null)
                    message.container = String(object.container);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.hash_code != null)
                    if ($util.Long)
                        (message.hash_code = $util.Long.fromValue(object.hash_code)).unsigned = true;
                    else if (typeof object.hash_code === "string")
                        message.hash_code = parseInt(object.hash_code, 10);
                    else if (typeof object.hash_code === "number")
                        message.hash_code = object.hash_code;
                    else if (typeof object.hash_code === "object")
                        message.hash_code = new $util.LongBits(object.hash_code.low >>> 0, object.hash_code.high >>> 0).toNumber(true);
                if (object.maybe_type_name != null)
                    message.maybe_type_name = String(object.maybe_type_name);
                return message;
            };
    
            /**
             * Creates a plain object from a ResourceHandleProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.ResourceHandleProto
             * @static
             * @param {tensorflow.ResourceHandleProto} message ResourceHandleProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResourceHandleProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.device = "";
                    object.container = "";
                    object.name = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.hash_code = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.hash_code = options.longs === String ? "0" : 0;
                    object.maybe_type_name = "";
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    object.device = message.device;
                if (message.container != null && message.hasOwnProperty("container"))
                    object.container = message.container;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.hash_code != null && message.hasOwnProperty("hash_code"))
                    if (typeof message.hash_code === "number")
                        object.hash_code = options.longs === String ? String(message.hash_code) : message.hash_code;
                    else
                        object.hash_code = options.longs === String ? $util.Long.prototype.toString.call(message.hash_code) : options.longs === Number ? new $util.LongBits(message.hash_code.low >>> 0, message.hash_code.high >>> 0).toNumber(true) : message.hash_code;
                if (message.maybe_type_name != null && message.hasOwnProperty("maybe_type_name"))
                    object.maybe_type_name = message.maybe_type_name;
                return object;
            };
    
            /**
             * Converts this ResourceHandleProto to JSON.
             * @function toJSON
             * @memberof tensorflow.ResourceHandleProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResourceHandleProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ResourceHandleProto;
        })();
    
        return tensorflow;
    })();
    
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {};
    
            protobuf.Any = (function() {
    
                /**
                 * Properties of an Any.
                 * @memberof google.protobuf
                 * @interface IAny
                 * @property {string|null} [type_url] Any type_url
                 * @property {Uint8Array|null} [value] Any value
                 */
    
                /**
                 * Constructs a new Any.
                 * @memberof google.protobuf
                 * @classdesc Represents an Any.
                 * @implements IAny
                 * @constructor
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 */
                function Any(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Any type_url.
                 * @member {string} type_url
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.type_url = "";
    
                /**
                 * Any value.
                 * @member {Uint8Array} value
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.value = $util.newBuffer([]);
    
                /**
                 * Creates a new Any instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 * @returns {google.protobuf.Any} Any instance
                 */
                Any.create = function create(properties) {
                    return new Any(properties);
                };
    
                /**
                 * Decodes an Any message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type_url = reader.string();
                            break;
                        case 2:
                            message.value = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Any message from the specified text representation.
                 * @function decodeText
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.TextReader|string} [reader] TextReader or text string to decode from
                 * @param {boolean} [block] Assert enclosing curly braces when decoding nested objects (false by default)
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid string
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decodeText = function decodeText(reader, block) {
                    if (!(reader instanceof $TextReader))
                        reader = $TextReader.create(reader);
                    var message = new $root.google.protobuf.Any();
                    reader.start(block);
                    if (reader.any(message))
                        return message;
                    while (!reader.end(block)) {
                        var tag = reader.tag();
                        switch (tag) {
                        case "type_url":
                            message.type_url = reader.string();
                            break;
                        case "value":
                            message.value = reader.bytes();
                            break;
                        default:
                            reader.handle(tag);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Verifies an Any message.
                 * @function verify
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Any.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        if (!$util.isString(message.type_url))
                            return "type_url: string expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                            return "value: buffer expected";
                    return null;
                };
    
                /**
                 * Creates an Any message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Any} Any
                 */
                Any.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Any)
                        return object;
                    var message = new $root.google.protobuf.Any();
                    if (object.type_url != null)
                        message.type_url = String(object.type_url);
                    if (object.value != null)
                        if (typeof object.value === "string")
                            $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                        else if (object.value.length)
                            message.value = object.value;
                    return message;
                };
    
                /**
                 * Creates a plain object from an Any message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.Any} message Any
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Any.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type_url = "";
                        if (options.bytes === String)
                            object.value = "";
                        else {
                            object.value = [];
                            if (options.bytes !== Array)
                                object.value = $util.newBuffer(object.value);
                        }
                    }
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        object.type_url = message.type_url;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this Any to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Any
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Any.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Any;
            })();
    
            return protobuf;
        })();
    
        return google;
    })();

    return $root;
})(protobuf);
