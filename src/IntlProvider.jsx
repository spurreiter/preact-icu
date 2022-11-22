import { h, createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
// eslint-disable-next-line no-unused-vars
import { createInstance, I18n } from './i18n'

/** @typedef {import('./types').IntlProviderContext} IntlProviderContext */
/** @typedef {import('./types').I18nOptions} I18nOptions */
/** @typedef {import('./types').AnyComponent} AnyComponent */
/** @typedef {import('./types').VNode} VNode */

const Context = createContext({
  t: () => '',
  lng: '',
  i18n: undefined,
  changeLanguage: async () => {},
  getLanguages: () => []
})

/**
 * @param {object} props
 * @param {AnyComponent} props.children
 * @param {AnyComponent} [props.fallback] fallback component which is rendered while new language settings are loading
 * @param {I18nOptions} [props.options]
 * @param {string[]} [props.lngs] languages to preload
 * @param {string[]} [props.ns] namespaces to preload
 * @returns {VNode}
 */
export function IntlProvider (props) {
  const {
    fallback,
    options,
    children,
    lngs,
    ns
  } = props
  const fallbackC = fallback || (<div>Loading...</div>)

  const [instance] = useState(() => createInstance(options))
  const [isLoading, setIsLoading] = useState(true)
  const [lng, setLng] = useState('')

  const changeLanguage = async (lng) => {
    if (lng === instance.language) return
    setIsLoading(true)
    await instance.changeLanguage(lng)
    setLng(instance.language)
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (lngs?.length) {
        await instance.loadLanguages(lngs, ns)
      }
      // set initial language on load
      await changeLanguage(lng)
    })()
  }, [])

  const value = {
    i18n: instance,
    t: instance.t,
    lng: instance.language,
    getLanguages: instance.getLanguages,
    changeLanguage
  }
  return (
    <Context.Provider
      // @ts-ignore
      value={value} >
      {isLoading ? fallbackC : children}
    </Context.Provider>
  )
}

/**
 * @returns {IntlProviderContext}
 */
export function useTranslation () {
  return useContext(Context)
}
