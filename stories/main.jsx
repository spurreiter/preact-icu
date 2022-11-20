/* eslint-disable react/jsx-key */
import { render } from 'preact'
import { IntlProvider, useTranslation } from '../src/index.js'

import Storybook from './Storybook'

import { storyMessage } from '../src/Message.stories'
import { storyNumber } from '../src/Number.stories'
import { storyDateTime } from '../src/DateTime.stories'
import { storyRelativeTime } from '../src/RelativeTime.stories'

function Control () {
  const { i18n, changeLanguage } = useTranslation()

  const clear = () => {
    i18n.resetUserLanguage()
    changeLanguage()
  }

  return (
    <p>
      <button title="en-US" onClick={() => changeLanguage('en-US')}>
        🇺🇸
      </button>
      <button title="en-GB" onClick={() => changeLanguage('en-GB')}>
        🇬🇧
      </button>
      <button title="de" onClick={() => changeLanguage('de')}>
        🇩🇪
      </button>
      <button title="at" onClick={() => changeLanguage('de-CH')}>
        🇨🇭
      </button>
      <button title="fallbackLng" onClick={() => changeLanguage('it-IT')}>
        🏁
      </button>
      <button title="clear" onClick={() => clear()}>
        🗑
      </button>
    </p>
  )
}

const options = {
  debug: true,
  version: String(Math.random().toString(36)).slice(2),
  // supportedLngs: ['en', 'en-GB', 'de'],
  backendPath: '/stories/locales/{lng}/{ns}.json?v={version}'
}

render(
  <IntlProvider lngs={['de']} options={options}>
    <Storybook
      control={<Control />}
      stories={[
        storyMessage,
        storyNumber,
        storyDateTime,
        storyRelativeTime
      ]}
    />
  </IntlProvider>,
  document.getElementById('app')
)
