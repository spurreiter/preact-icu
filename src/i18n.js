import { format } from 'intl-messageformat-tiny'
import { cookieParse, cookieSerialize } from './cookie.js'

/** @typedef {import('./types').I18nOptions} I18nOptions */
/** @typedef {{ok: boolean, status: number, lng: string, ns: string}} LoadResponse */

const isBrowser = globalThis?.navigator?.language && globalThis?.document

const defaultOptions = {
  version: 'na',
  lng: undefined,
  supportedLngs: undefined,
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNs: 'translations',
  backendPath: '/locales/{lng}/{ns}.json?v={version}',
  debug: false,
  cookie: {
    name: 'i18nLocale',
    path: '/'
  }
}

/* eslint-disable no-unused-vars */
let log = {
  debug: (...args) => {},
  error: (...args) => {}
}
/* eslint-enable no-unused-vars */

const uniq = arr => [...new Set(arr.filter(Boolean))]

const mainLng = (lng) => ((lng || '').split('-', 1))[0]

/**
 * @param {string} lng
 * @param {string[]} supportedLngs
 * @param {string[]} [defaultLngs]
 * @returns
 */
const reduceSupportedLangs = (lng, supportedLngs, defaultLngs = []) => {
  const langs = uniq([lng, ...defaultLngs]
    .filter(Boolean)
    .slice(0, 5)
    .reduce((curr, nextLng) => {
      // @ts-expect-error
      curr.push(nextLng, mainLng(nextLng))
      return curr
    }, []))
  return supportedLngs?.length
    ? langs.reduce((curr, nextLng) => {
      if (supportedLngs.includes(nextLng)) {
        curr.push(nextLng)
      }
      return curr
    }, [])
    : langs
}

export class I18n {
  /**
   * @param {I18nOptions} options
   */
  constructor (options = {}) {
    const {
      lng = '',
      defaultNs,
      fallbackLng,
      resources = {},
      debug,
      ...opts
    } = { ...defaultOptions, ...options }
    this.options = opts
    this.defaultNs = defaultNs
    this.fallbackLng = fallbackLng
    this.language = lng
    this.languages = [this.language].filter(Boolean)
    this.resources = resources
    if (debug) {
      // @ts-expect-error
      log = opts.log || console
    }
    this.t = this.t.bind(this)
    this.getLanguages = this.getLanguages.bind(this)
    if (!this.resources?.[fallbackLng]?.[defaultNs]) {
      this.resources[fallbackLng] = this.resources[fallbackLng] || {}
      this.resources[fallbackLng][defaultNs] = {}
    }
    this._setLanguage()
  }

  /**
   * @param {string} label
   * @param {object} values
   * @returns {string}
   */
  t (label, values = {}) {
    const { language, fallbackLng, defaultNs } = this
    const { lng = language, ns = defaultNs, ...msgValues } = values
    const [main] = lng?.split('-', 1) || []
    const message = this.resources[lng]?.[ns]?.[label] ||
      this.resources[main]?.[ns]?.[label] ||
      this.resources[fallbackLng]?.[ns]?.[label] ||
      label
    return format(message, msgValues, lng)
  }

  /**
   * @returns {string}
   */
  getUserLanguage () {
    if (!isBrowser) {
      return this.fallbackLng
    }
    const [cookieLng, browserLng] = this._getSettings()
    log.debug('getUserLanguage: cookieLng:%s browserLng:%s', cookieLng, browserLng)
    return cookieLng || browserLng
  }

  resetUserLanguage () {
    if (!isBrowser) return
    const { name, ...opts } = this.options.cookie
    log.debug('reset cookie')
    document.cookie = cookieSerialize(name, '', { ...opts, expires: 0 })
    this._setLanguage()
  }

  /**
   * @private
   * @returns {[cookieLng:string, browserLng:string]}
   */
  _getSettings () {
    const { name } = this.options.cookie
    const cookieLng = cookieParse(document.cookie)[name]
    const browserLng = globalThis?.navigator?.language
    return [cookieLng, browserLng]
  }

  _setCookie () {
    if (!isBrowser) return
    const [cookieLng, browserLng] = this._getSettings()
    const { language = '', fallbackLng } = this
    if (cookieLng === language) {
      return
    }
    let expires
    let value = language
    if ([browserLng, fallbackLng].includes(language)) {
      expires = 0
      value = ''
    }
    const { name, ...opts } = this.options.cookie
    log.debug('_setCookie: %s:%s', expires === 0 ? 'reset' : 'set', language)
    document.cookie = cookieSerialize(name, value, { ...opts, expires })
  }

  /**
   * @private
   * @param {string} [lng]
   * @returns {string[]}
   */
  _setLanguage (lng) {
    const _lng = lng || this.getUserLanguage()

    const { supportedLngs } = this.options
    const browserLngs = globalThis?.navigator?.languages || []
    // @ts-expect-error
    const variants = reduceSupportedLangs(_lng, supportedLngs, browserLngs)

    if (!variants.length) {
      this.language = this.fallbackLng
      const [main] = this.language.split('-')
      variants.push(uniq([this.language, main]))
    } else {
      this.language = _lng
    }

    this.languages = [this.language, ...browserLngs].filter(Boolean)
    this._setCookie()

    return variants
  }

  /**
   * @param {string} lng
   * @returns {string[]}
   */
  getLanguages (lng) {
    return [lng, ...this.languages].filter(Boolean)
  }

  /**
   * changes the language
   * @param {string} [lng]
   * @return {Promise<void>}
   */
  async changeLanguage (lng) {
    const variants = this._setLanguage(lng)
    log.debug('changeLanguage: lng:%s variants:%s', lng, variants)
    await this.loadLanguages(variants)

    let loadedLng = this.fallbackLng
    for (const variant of variants) {
      if (this.resources[variant]?.[this.defaultNs]) {
        loadedLng = variant
        break
      }
    }
    log.debug('changeLanguage: loadedLng:%s', loadedLng)
    const mainLoadedLng = mainLng(loadedLng)
    if (mainLng(lng || variants[0]) !== mainLoadedLng) {
      // find first matching lng with same mainLng
      const matchLng = variants.find(variant => mainLng(variant) === mainLoadedLng)
      this._setLanguage(matchLng || loadedLng)
    }
    this._setCookie()
  }

  /**
   * @param {string} ns
   * @return {Promise<void>}
   */
  async changeNamespace (ns) {
    this.defaultNs = ns
    await this.loadLanguages([this.language, this.fallbackLng])
  }

  /**
   * @param {string[]} lngs
   * @param {string[]} [ns]
   * @return {Promise<(LoadResponse|undefined|void)[]>}
   */
  async loadLanguages (lngs = [], ns = []) {
    const _lngs = uniq(lngs)
    const _ns = uniq([...ns, this.defaultNs])
    if (!_lngs.length || !_ns.length) {
      log.error("can't load without languages or namespaces")
      return []
    }
    const loaders = []
    for (const lng of _lngs) {
      for (const ns of _ns) {
        if (!this.resources[lng]?.[ns]) {
          loaders.push(this._load({ lng, ns }).catch(err => log.error(err)))
        }
      }
    }
    const result = await Promise.all(loaders)
    return result
  }

  /**
   * @private
   * @param {{
   *  lng: string
   *  ns: string
   * }} param0
   * @return {Promise<undefined|LoadResponse>}
   */
  async _load ({ lng, ns }) {
    const { version } = this.options
    const url = format(this.options.backendPath, { lng, ns, version })
    const res = await fetch(url).catch(err => log.error(err))
    this.resources[lng] = this.resources[lng] || {}
    const { ok = false, status = -1 } = res || {}
    if (ok && res) {
      const labels = await res.json()
      this.resources[lng][ns] = labels
    }
    return { ok, status, lng, ns }
  }
}

export const createInstance = (options) => new I18n(options)
