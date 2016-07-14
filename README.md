# pug-include-glob

Use glob patterns in your Pug include directives.

## Installation

```bash
$ npm install --save pug-include-glob
```

## Usage

```javascript
const pugIncludeGlob = require('pug-include-glob');
const pug = require('pug');

let html = pug.renderFile('path/to/template.pug', {
  plugins: [ pugIncludeGlob({ /* options */ }) ]
});
```

### Options

- `glob` - Options object passed to `node-glob` methods. See [node-glob](http://github.com/isaacs/node-glob) for details.

## License
MIT &copy; Jack Conway
