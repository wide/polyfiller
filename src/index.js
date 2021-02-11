import 'custom-event-polyfill' // needed for bowser support
import 'jspolyfill-array.prototype.find' // needed for bowser support
import Bowser from 'bowser'
import BowserUtils from 'bowser/src/utils' 

/**
 * Read browser capabilities
 */
export const browser = Bowser.getParser(window.navigator.userAgent)

/**
 * Allows to compare the version passed as a parameter 
 * with the version of the user's operating system
 * @param {String} version 
 * @link https://github.com/lancedikson/bowser/blob/master/src/parser.js
 */
export function compareVersion(version) {
  let expectedResults = [0]
  let comparableVersion = version
  let isLoose = false

  const currentOSVersion = browser.getOSVersion()

  if(typeof currentOSVersion !== 'string') {
    return void 0
  }

  if(version[0] === '>' || version[0] === '<') {
    comparableVersion = version.substr(1)
    if(version[1] === '=') {
      isLoose = true
      comparableVersion = version.substr(2)
    } else {
      expectedResults = []
    }
    if(version[0] === '>') {
      expectedResults.push(1)
    } else {
      expectedResults.push(-1)
    }
  } else if(version[0] === '=') {
    comparableVersion = version.substr(1)
  } else if(version[0] === '~') {
    isLoose = true
    comparableVersion = version.substr(1)
  }

  return expectedResults.indexOf(
    BowserUtils.compareVersions(currentOSVersion, comparableVersion, isLoose),
  ) > -1
}

/**
 * Check if parsed operating system matches certain conditions
 * @param {Object} os 
 * @return {Boolean}
 */
export function satisfiesOS(os) {
  const current = browser.getOSName(true)
  return os[current] 
    ? compareVersion(os[current])
    : false
}

/**
 * Load polyfills in DOM on demand
 * @param {Object} opts
 * @param {String} opts.path
 * @param {Array<Object>}  opts.load
 */
export default function({ path = '', load = {} }) {
  for(let file in load) {
    const os = {
      android: load[file].android ? load[file].android : false,
      ios: load[file].iOS ? load[file].iOS : false
    }

    if(browser.satisfies(load[file]) || satisfiesOS(os)){
      file.startsWith('http')
        ? importUrl(file)
        : importFile(path, file)
    }
  }

  // global event to specify the injection of polyfill files in the DOM
  const event = new CustomEvent('polyfiller.all-injected')
  document.body.dispatchEvent(event)
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