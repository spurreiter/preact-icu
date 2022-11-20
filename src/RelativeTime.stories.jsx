import { RelativeTime } from './RelativeTime.jsx'
import { useTranslation } from './IntlProvider.jsx'

export const storyRelativeTime = {
  title: 'RelativeTime',
  component: () => {
    const { lng } = useTranslation()
    return (
      <>
        <section>
          <h3>{lng}</h3>
          <RelativeTime value={new Date(Date.now() + 10e3)} /><br/>
          <RelativeTime value="-1" unit="day" /><br/>
          <RelativeTime value="1234" unit="seconds" /><br/>
          <RelativeTime value="-1" unit="week" styleProp="long" numeric="always" /><br/>
          <RelativeTime value="0" unit="week" styleProp="long" numeric="always" /><br/>
          <RelativeTime value="1" unit="week" styleProp="long" numeric="always" /><br/>
          <RelativeTime value="0" numeric="auto" /><br/>
          <RelativeTime value="-1" unit="day" numeric="auto" /><br/>
          <RelativeTime value="0" unit="day" numeric="auto" /><br/>
          <RelativeTime value="1" unit="day" numeric="auto" /><br/>
          <RelativeTime value="-1" unit="week" numeric="auto" /><br/>
          <RelativeTime value="0" unit="week" numeric="auto" /><br/>
          <RelativeTime value="1" unit="week" numeric="auto" /><br/>
          <RelativeTime /><br/>
          <RelativeTime value="2022-01-01" /><br/>
        <section>
        </section>
          <h3>static (with lng)</h3>
          🇮🇹 <RelativeTime value="-1" unit="day" lng="it"/><br/>
          🇫🇷 <RelativeTime value="1234" unit="seconds" lng="fr"/><br/>
        </section>
      </>
    )
  }
}
