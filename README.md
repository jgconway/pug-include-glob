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

### Express

```javascript
res.render('view_name', { plugins: [ pugIncludeGlob({ /* options */ }) ] })
```

### Options

- `glob` - Options object passed to `node-glob` methods. See [node-glob](http://github.com/isaacs/node-glob) for details.
- `ignore` - Files that should not be checked by this plugin. Checking every file is time expensive so excluding files where possible is likely to improve performance.

## License
MIT &copy; Jack Conway
