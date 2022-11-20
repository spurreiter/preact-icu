# preact-icu

> A tiny i18n provider with icu syntax for preact

- Focuses on tiny footprint (~10kb instead of ~120kb if using [i18next][]).
- Uses extended [ICU message syntax][] provided by [intl-messageformat-tiny][].
- Fetches translations by language and namespace
- Stores users language selection in cookie

# Table of Contents

<!-- !toc (omit="preact-icu;Table of Contents") -->

* [installation](#installation)
* [usage](#usage)
  * [IntlProvider](#intlprovider)
  * [useTranslation](#usetranslation)
  * [Message](#message)
  * [Number](#number)
  * [DateTime](#datetime)
  * [RelativeTime](#relativetime)
* [example and storybook](#example-and-storybook)
* [license](#license)

<!-- toc! -->

# installation

```
npm i preact-icu
```

# usage

## IntlProvider

Provides the context for the translations.

```jsx
import { IntlProvider } from 'preact-icu'

const options = { // all settings are optional
  backendPath: '/locales/{lng}/{ns}.json?v={version}', // path to load translations 
    // lng, ns, version are templated values which will be replaced
  debug: false, // set debug mode
  log: console, // set logger function `{ debug, error }`
  supportedLngs: ['en', 'en-GB', 'de'], // list of supported languages
  version: '1.0.0', // version of translations
  cookie: {
    name: 'i18nLocale', // cookie name for storing user selection
    path: '/', // path cookie
    domain: 'domain.my' // domain cookie
  },
  resources: { // initial translations (optional)
    en: { Truck: 'Truck' },
    'en-GB': { Truck: 'Lorry' },
    de: { Truck: 'LKW',
      '{lng} selected': 'Gewählte Sprache: {lng}'  
    }
  }
}

function App (props) {
  <IntlProvider 
    lngs={['en', 'de']} 
    options={options}   
    fallback={<div>translations are loading...</div>}
  >
    {props.children}
  </IntlProvider>
}
```

**props**

| property  | type         | description                                                                                |
| --------- | ------------ | ------------------------------------------------------------------------------------------ |
| fallback? | AnyComponent | fallback component which is rendered while new language settings are loading, e.g. spinner |
| options?  | object       | init options                                                                               |
| lngs?     | string[]     | Array of languages which are loaded on initialization                                      |
| ns?       | string[]     | Array of namespaces which are loaded on initialization                                     |

## useTranslation

Grants access to the IntlProvider context.

```jsx
import { useTranslation } from 'preact-icu'

function Test () {
  const { 
    t, // the translation function
    changeLanguage, // change language
    lng, // the selected language
    i18n // access to the instance
  } = useTranslation()

  return (
    <>
      <button onClick={() => changeLanguage('de')}>{t('Change to German')}</button>
      <p>t('{lng} selected', { lng })</p>
      <p>t('Truck')
    </>
  )
}
```

## Message

Message which supports [intl-messageformat-tiny][] syntax.

```jsx
import { Message } from 'preact-icu'

const Hello = () => <Message label="Hello {name}!" name="Elsa" />
// <Hello/> -> "Hello Elsa!"

const Persons = ({ value = 0 }) => <Message 
  label="{value, plural, zero {No Persons} one {One Person} other {# Persons}}" 
  value={value} />
// <Persons value={0}> -> "No Persons"
// <Persons value={1}> -> "One Person"
// <Persons value={7}> -> "7 Persons"
```

**props**

| property | type   | description                    |
| -------- | ------ | ------------------------------ |
| label    | string | the translation label          |
| lng?     | string | overrides the default language |
| ...      | string | the placeholder value(s)       |

## Number

Uses [`Intl.NumberFormat`][Intl.NumberFormat] to format a number.

```jsx
import { Message } from 'preact-icu'

const MyNumber = () => <Number value={123456.012} />
// "1,234,567.089" for lng=en
// "1.234.567,089" for lng=de
const MyCurrency = () => <Number value={123456.012} currency="EUR" style="currency" />
// "€123,456.01"  for lng=en
// "123.456,01 €" for lng=de
```

**props**

| property | type   | description                           |
| -------- | ------ | ------------------------------------- |
| value    | number | the number to translate               |
| lng?     | string | overrides the default language        |
| ...      | any    | see [NumberFormat][] for all options. |


## DateTime

Uses [`Intl.DateTimeFormat`][Intl.DateTimeFormat] to format a date or time.

```jsx
import { DateTime } from 'preact-icu'

const DateTimeShort = () => <DateTime value={new Date('2020-03-12')} />
// "3/12/2020" for lng='en-US'
// "12/03/2020" for lng='en-GB'
const DateTimeLong = () => <DateTime value={new Date()} weekday='long' year='numeric' month='long' day='numeric' />
// "Thursday, March 12, 2020" for lng='en-US'
// "Thursday, 12 March, 2020 "for lng='en-GB'
```

**props**

| property | type    | description                                              |
| -------- | ------- | -------------------------------------------------------- |
| value    | number  | the Date or Time to translate                            |
| lng?     | string  | overrides the default language                           |
| date?    | boolean | if `true` show only date                                 |
| time?    | boolean | if `true` show only time                                 |
| hour12?  | boolean | if `true` show time in in 12 hour format with `am`, `pm` |
| ...      | any     | see [DateTimeFormat][] for all options.                  |

## RelativeTime

Uses [`Intl.RelativeTimeFormat`][Intl.RelativeTimeFormat] to format a relative date or time.

```jsx
import { DateTime } from 'preact-icu'

const MyRelativeTime = () => <RelativeTime value="2022-01-01" />
// "7 months ago" for lng=en
const MyRelativeTime2 = () => <RelativeTime value="1" unit="day" />
// "tomorrow" for lng=en
```

**props**

| property | type         | description                             |
| -------- | ------------ | --------------------------------------- |
| value    | Date\|number | the number to translate                 |
| lng?     | string       | overrides the default language          |
| ...      | any          | see [DateTimeFormat][] for all options. |

# example and storybook

````
npm run dev
````

Then access http://localhost:5173

# license

[MIT licensed](./LICENSE)


[intl-messageformat-tiny]: https://github.com/spurreiter/intl-messageformat-tiny#readme
[ICU message syntax]: https://formatjs.io/docs/core-concepts/icu-syntax

[Intl.NumberFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
[Intl.DateTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
[Intl.DateTime]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
[Intl.RelativeTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat

[i18next]: https://www.i18next.com
