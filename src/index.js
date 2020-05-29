import 'jspolyfill-array.prototype.find' // needed for bowser support
import Bowser from 'bowser'


/**
 * Read browser capabilities
 */
export const browser = Bowser.getParser(window.navigator.userAgent)


/**
 * Load polyfills in DOM on demand
 * @param {Object} opts
 * @param {String} opts.path
 * @param {Array<Object>}  opts.load
 */
export default function({ path = '', load = {} }) {
  for(let file in load) {
    if(browser.satisfies(load[file])){
      file.startsWith('http')
        ? importUrl(file)
        : importFile(path, file)
    }
  }
}


/**
 * Import local file
 * @param {String} path
 * @param {String} file
 */
export function importFile(path, file) {
  const script = document.createElement('script')
  script.src = `${path}${file}`
  document.body.appendChild(script)
  console.debug('# load polyfill', script.src)
}


/**
 * Import distant file
 * @param {String} urls
 */
export function importUrl(url) {
  const script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  console.debug('# load polyfill', script.src)
}