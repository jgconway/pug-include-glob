'use strict';

var fs = require('fs');
var glob = require('glob');
var walk = require('pug-walk');
var pugResolve = require('pug-load').resolve;
var path = require('path');

var includeTypes = ['Include', 'RawInclude'];
var isInclude = function isInclude(node) {
  return includeTypes.indexOf(node.type) !== -1;
};
var clone = function clone(node) {
  return JSON.parse(JSON.stringify(node));
};
var setPath = function setPath(node, path) {
  node.file.path = path;
  return node;
};
var addInclude = function addInclude(block, include) {
  block.nodes.push(include);
  return block;
};
var newBlock = function newBlock(node) {
  return {
    type: 'Block',
    nodes: [],
    line: node.line
  };
};

var newPlugin = function newPlugin(options) {
  var isGlobby = function isGlobby(path) {
    return glob.hasMagic(path, options.glob);
  };
  var deglob = function deglob(pattern) {
    return glob.sync(pattern, options.glob);
  };
  return {
    postParse: function postParse(ast, pugOptions) {
      var source = pugOptions.filename;
      var sourceDir = path.dirname(source);
      var resolve = function resolve(path) {
        return pugResolve(path, source, pugOptions);
      };
      var relative = function relative(filename) {
        return path.relative(sourceDir, filename);
      };
      return walk(ast, function (node, replace) {
        if (!isInclude(node) || !isGlobby(node.file.path)) return true;
        var filenames = deglob(resolve(node.file.path));
        var paths = filenames.map(function (filename) {
          return relative(filename);
        });
        var nodes = paths.map(function (path) {
          return setPath(clone(node), path);
        });
        var block = nodes.reduce(addInclude, newBlock(node));
        replace(block);
        return false;
      });
      return ast;
    }
  };
};

module.exports = function (options) {
  if (!options) options = {};
  if (!options.glob) options.glob = {};
  return newPlugin(options);
};

