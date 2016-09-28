'use strict';

const expect = require('chai').expect;

const pug = require('pug');
const pig = require('../lib');
const pugResolve = require('pug-load').resolve;

const fixture = name => `test/fixtures/${name}.pug`;
const testRender = fixtureName =>
  pug.renderFile(fixture(fixtureName), { plugins: [ pig() ] });
const controlRender = fixtureName => pug.renderFile(fixture(fixtureName));
const expectEqualRenders = (testFixtureName, controlFixtureName) =>
  expect(testRender(testFixtureName))
  .to.equal(controlRender(controlFixtureName || testFixtureName));

describe('pug-include-glob', function () {
  
  it('should have no effect on files which do not contain includes', function () {
    expectEqualRenders('no-includes');
  });
  
  it('should have no effect on non-globby includes', function () {
    expectEqualRenders('normal-include');
  });
  
  it('should have no effect on non-globby raw includes', function () {
    expectEqualRenders('normal-raw-include');
  });
  
  it('should expand globby includes', function () {
    expectEqualRenders('globby-include', 'globby-include-dummy');
  });
  
  it('should handle globs which do not match any files', function () {
    expectEqualRenders('globby-no-match', 'globby-no-match-dummy');
  });
  
  it('should expand globby raw includes', function () {
    expectEqualRenders('globby-raw-include', 'globby-raw-include-dummy');
  });
  
  it.skip('should handle globs which expand to both raw and normal includes', function () {
    expectEqualRenders('globby-mixed-includes', 'globby-mixed-includes-dummy');
  });
  
  it('should recursively apply to included files', function () {
    expectEqualRenders('recursive-globby-includes', 'globby-include-dummy');
  });
  
});
