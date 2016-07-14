'use strict';

const pugIncludeGlob = require('../src');
const pug = require('pug');
const marked = require('jstransformer')(require('jstransformer-marked'));
const fs = require('fs');

const expected = fs.readFileSync(__dirname + '/expected.html', { encoding: 'utf8' });
const result = pug.renderFile('pug/index.pug', {
  plugins: [ pugIncludeGlob({}) ],
  filters: [ marked ]
});
console.log(result);
