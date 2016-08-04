'use strict';

const fs = require('fs');
const glob = require('glob');
const walk = require('pug-walk');
const pugResolve = require('pug-load').resolve;
const path = require('path');

const includeTypes = ['Include', 'RawInclude'];
const isInclude = node => includeTypes.indexOf(node.type) !== -1;
const clone = node => JSON.parse(JSON.stringify(node));
const setPath = (node, path) => {
  node.file.path = path;
  return node;
};
const addInclude = (block, include) => {
  block.nodes.push(include);
  return block;
};
const newBlock = node => ({
  type: 'Block',
  nodes: [],
  line: node.line
});

const newPlugin = options => {
  const isGlobby = path => glob.hasMagic(path, options.glob);
  const deglob = pattern => glob.sync(pattern, options.glob);
  return {
    postParse: (ast, pugOptions) => {
      const source = pugOptions.filename;
      const sourceDir = path.dirname(source);
      const resolve = path => pugResolve(path, source, pugOptions);
      const relative = filename => path.relative(sourceDir, filename);
      return walk(ast, (node, replace) => {
        if (!isInclude(node) || !isGlobby(node.file.path))
          return true;
        let filenames = deglob(resolve(node.file.path));
        let paths = filenames.map(filename => relative(filename));
        let nodes = paths.map(path => setPath(clone(node), path));
        let block = nodes.reduce(addInclude, newBlock(node));
        replace(block);
        return false;
      });
      return ast;
    }
  };
};

module.exports = function (options) {
  if (!options)
    options = {};
  if (!options.glob)
    options.glob = {};
  return newPlugin(options);
}
