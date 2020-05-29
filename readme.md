# Polyfiller

Load polyfills on demand.


## Install

```
npm install @wide/polyfiller --save
```

## Usage

This exemple will load `assets/polyfills/object-assign.js` on `IE 11` only:
```js
import polyfiller from '@wide/polyfiller'

polyfiller({
  path: 'assets/polyfills/',
  load: {
    'object-assign.js': {
      ie: '<=11'
    }
  }
})
```
- `path` public folder of compiled polyfills
- `load` collection of polyfills to load, accept a key/value combination
  - `key`: filename or url of the polyfill
  - `value`: criteria to satisfies (see [bowser.satisfied](https://www.npmjs.com/package/bowser))


## Built-in polyfills

`@wide/polyfiller` comes with a set of well-known polyfills:
- `babel.js`: `core-js/stable` and `regenerator-runtime/runtime`
- `closest.js`: `element-closest-polyfill`
- `object-fit.js`: `object-fit-images` and `object-fit-videos`
- `picture-fill.js`: `picturefill`
- `object-assign.js`: `es6-object-assign`
- `fetch`: `whatwg-fetch`
- `svg.js`: `svg4everybody`

These polyfills can be loaded in two steps, first import the needed ones using the `presets` collection:
```js
import polyfiller from '@wide/polyfiller'
import presets from '@wide/polyfiller/lib/presets'

polyfiller({
  path: 'assets/polyfills/',
  load: {
    ...preset.babel,
    ...preset.fetch,
  }
})
```

Then, you need to compile them into the `assets/polyfills`:
```js
// assets/polyfills/babel.js
import '@wide/polyfiller/lib/presets/babel'
```
```js
// assets/polyfills/fetch.js
import '@wide/polyfiller/lib/presets/fetch'
```


## Capabilities

To resolve which polyfill must be loaded, `@wide/polyfiller` makes use of the `bowser` lib and expose the main feature of the browser:
```js
import capabitilies from '@wide/polyfiller/lib/capabitilies'

capabitilies.touch    // true | false
capabitilies.platform // desktop | mobile
capabitilies.os       // linux | macos | windows
capabitilies.engine   // trident | gecko
capabitilies.name     // ie | chrome | firefox
capabitilies.version  // number
capabitilies.chrome   // true | false
capabitilies.opera    // true | false
capabitilies.firefox  // true | false
capabitilies.safari   // true | false
capabitilies.edge     // true | false
capabitilies.ie       // true | false
capabitilies.webp     // true | false
```

These capabilities can be exposed as `window.capabilities` and `body` css classes:
```js
import { expose } from '@wide/polyfiller/lib/capabitilies'

expose()
```


## Libraries

This package uses :
- [`bowser`](https://github.com/lancedikson/bowser)


## Authors

- **Aymeric Assier** - [github.com/myeti](https://github.com/myeti)
- **Julien Martins Da Costa** - [github.com/jdacosta](https://github.com/jdacosta)


## License

This project is licensed under the MIT License - see the [licence](licence) file for details