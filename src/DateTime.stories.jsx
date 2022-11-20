import { DateTime } from './DateTime.jsx'
import { useTranslation } from './IntlProvider.jsx'

export const storyDateTime = {
  title: 'DateTime',
  component: () => {
    const { lng } = useTranslation()
    return (
      <>
        <section>
          <h3>{lng}</h3>
          <DateTime /><br/>
          <DateTime value="2020-03-12" /><br/>
          <DateTime value="2020-03-12" weekday='short' year='numeric' month='long' day='numeric' /><br/>
          <DateTime value="2020-03-12 12:01:23" hour12 time timeZone="Asia/Tokyo" /><br/>
          <DateTime value="2020-03-12 12:00:00" date time timeZone="Asia/Tokyo" /><br/>
          <DateTime value="2020-03-12 12:00:00" date time timeZone="Foo/Bar" /><br/>
        </section>
        <section>
          <h3>static (with lng)</h3>
          🇺🇸 <DateTime value="2020-03-12" lng="en-US" /><br/>
          🇹🇹 <DateTime value="2020-03-12" lng="en-TT" /><br/>
          🇯🇵 <DateTime value="2020-03-12" date weekday="long" month="long" lng="ja" /><br/>
      </section>
      </>
    )
  }
}
