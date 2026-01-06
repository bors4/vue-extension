import {ref} from 'vue';

import {chromeTabQuery} from '../helper/chromeTabQuery';

export function changeLanguage(language = 'en') {
  const selectedLanguage = ref(language);
  const queryParameter = `changeLanguage("${language}")`;
  chromeTabQuery(selectedLanguage, 'player', queryParameter);
}
