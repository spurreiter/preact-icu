export { AnyComponent, VNode } from 'preact'
import { I18n } from './i18n.js'

export interface I18nOptions {
  /** selected language */
  lng?: string
  /** fallback language */
  fallbackLng?: string
  /** default namespace */
  defaultNs?: string
  /** path for resources e.g. '/locales/{lng}/{ns}.json' */
  backendPath?: string
  /** debugging support */
  debug?: boolean
  /** logger */
  log?: Function
  /** resources object */
  resources?: {
    [lng:string]: {
      [ns:string]: {
        [label:string]: string
      }
    }
  }
  /** list of supported languages */
  supportedLngs?: string[]
}

export interface IntlProviderContext {
  /** access to i18next instance */
  i18n?: I18n
  /** translate function */
  t: Function
  /** selected language */
  lng: string
  /** changes current language */
  changeLanguage: (lng: string) => Promise<void>
  /** */
  getLanguages: (lng?: string) => string[]
}

export interface IntlMessageProps {
  label?: string
  lng?: string
  [key: string]: any
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export interface IntlNumberProps extends Intl.NumberFormatOptions {
  value?: number
  lng?: string
  // currency?: string
  // currencyDisplay?: string
  // currencySign?: string
  // style?: 'currently'|'unit'|'decimal'|'percent'
  // unit?: string
  // unitDisplay?: 'long'|'short'|'narrow'
  // notation?: string
  // compactDisplay?: string
  // useGrouping?: boolean
  // signDisplay?: string
  // localeMatcher?: string
  // minimumIntegerDigits?: number
  // minimumFractionDigits?: number
  // maximumFractionDigits?: number
  // minimumSignificantDigits?: number
  // maximumSignificantDigits?: number
  // numberingSystem?: string
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
*/
export interface IntlDateTimeProps extends Intl.DateTimeFormatOptions {
  value?: Date
  lng?: string
  date?: boolean
  time?: boolean
  hour12?: boolean
  // weekday?: string
  // era?: string
  // year?: string
  // month?: string
  // day?: string
  // hour?: string
  // minute?: string
  // second?: string
  // hourCycle?: string
  // timeZone?: string
  // timeZoneName?: string
  // localeMatcher?: string
  // formatMatcher?: string
  // numberingSystem?: string
  // calendar?: string
}

export interface IValueUnit {
  value: number
  unit: string
  date?: Date
}

export interface IntlRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  value?: number|Date
  unit?: Intl.RelativeTimeFormatUnit
  lng?: string
  // localeMatcher?: string
  // style?: string
  // numeric?: string
  // update?: boolean
  // updateUnit?: boolean
}
