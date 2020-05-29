import { browser } from './index'


/**
 * Resolve browser features
 */
export const platform = browser.getPlatformType(true)
export const name = browser.getBrowserName(true)
                           .replace('internet explorer', 'ie')
                           .replace('microsoft edge', 'edge')


/**
 * Resolve browser capabilities
 * @type {Object<string, String>}
 */
const capabilities = {
  touch: (platform === 'mobile' || platform === 'tablet'),
  platform: platform,
  os: browser.getOSName(true),
  engine: browser.getEngineName(true),
  name: name,
  version: `${name}${browser.getBrowserVersion().split('.')[0]}`,
  chrome: (name === 'chrome'),
  opera: (name === 'opera'),
  firefox: (name === 'firefox'),
  safari: (name === 'safari'),
  edge: (name === 'edge'),
  ie: (name === 'ie'),
  webp: false,
}

// resolve webp support
const webp = new Image()
webp.onload = webp.onerror = () => capabilities.webp = (webp.height === 2)
webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAIAAQAcJaQAA3AA/v3AgAA='

export default capabilities


/**
 * Expose as window.capabilities and body classes
 */
export function expose() {
  window.capabilities = capabilities
  document.body.classList.add(capabilities.touch ? '-touch' : '-not-touch')
  document.body.classList.add(`-${capabilities.platform}`)
  document.body.classList.add(`-${capabilities.os}`)
  document.body.classList.add(`-${capabilities.engine}`)
  document.body.classList.add(`-${capabilities.name}`)
  document.body.classList.add(`-${capabilities.version}`)
  if(capabilities.webp) {
    document.body.classList.add('-webp')
  }
}