import { Number } from './Number.jsx'
import { useTranslation } from './IntlProvider.jsx'

export const storyNumber = {
  title: 'Number',
  component: () => {
    const { lng } = useTranslation()
    return (
      <>
        <section>
          <h3>{lng}</h3>
          <Number value="123456.789" /><br/>
          <Number value="123456.789" currency="EUR" style="currency" /><br/>
          <Number value="987654321" notation="engineering" /><br/>
          <Number value="987654321" notation="compact" /><br/>
          <Number /><br/>
          <Number value="not a number" /><br/>
        </section>
        <section>
          <h3>static (with lng)</h3>
          🇮🇳 <Number value="123456.789" lng="en-IN" /><br/>
          🇦🇪 <Number value="123456.789" lng="ar-EG" /><br/>
          🇨🇳 <Number value="123456.789" lng="zh-Hans-CN-u-nu-hanidec" /><br/>
          🇩🇪 <Number value="123456.789" lng="de-DE" currency="EUR" style="currency" /><br/>
          🇯🇵 <Number value="123456.789" lng="ja-JP" currency="JPY" style="currency" /><br/>
          🇮🇳 <Number value="123456.789" lng="en-IN" maximumSignificantDigits="3" /><br/>
          🇵🇹 <Number value="50" lng="pt-PT" style="unit" unit="mile-per-hour" /><br/>
          🇫🇷 <Number value="12" lng="fr" style="unit" unit="liter" unitDisplay="long" /><br/>
          🇺🇸 <Number value="987654321" lng="en-US" notation="scientific" /><br/>
          🇵🇹 <Number value="987654321" lng="pt-PT" notation="scientific" /><br/>
          🇬🇧 <Number value="987654321" lng="en-GB" notation="engineering" /><br/>
          🇩🇪 <Number value="987654321" lng="de" notation="engineering" /><br/>
          🇨🇳 <Number value="987654321" lng="zh-CN" notation="compact" /><br/>
          🇫🇷 <Number value="987654321" lng="fr" notation="compact" /><br/>
        </section>
      </>
    )
  }
}
