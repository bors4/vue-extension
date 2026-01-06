import {chromeAPIQuery} from '../helper/chromeQueries';
import {getCurrentLocale} from '../utils/getCurrentLocale';

export async function showStringsOnPage() {
  const currentLocale = await getCurrentLocale();

  return chromeAPIQuery(
    `() => {
        const currentLocale = '${currentLocale}';
        const getI18n = () =>
          window.__nuxt
            ? __nuxt.__vue_app__.$nuxt.$i18n
            : app.__vue_app__._context.provides[app.__vue_app__.__VUE_I18N_SYMBOL__].global

        const { setLocaleMessage } = getI18n()

        if (setLocaleMessage.__reset) {
          setLocaleMessage.__reset()
        } else {
          const messages = window.__nuxt ? { ...getI18n().messages.value } : { ...getI18n().messages }

          const fakeSet = (currentLocale, translations) => {
            messages[currentLocale] = translations
          }

          fakeSet.__reset = () => {
            getI18n().setLocaleMessage = setLocaleMessage

            Object.entries(messages).forEach(([key, translation]) => {
              getI18n().setLocaleMessage(key, translation)
            })

            const currentLang = vm.$pinia._s.get('player').getLangCode

            getI18n().setLocaleMessage(currentLang, messages[currentLang])
          }

          getI18n().setLocaleMessage = fakeSet
          setLocaleMessage(currentLocale, {})
        }
      }`
  );
}
