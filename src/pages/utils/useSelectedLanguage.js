import {chromeTabQuery} from '../helper/chromeQueries';

export function changeLanguage(language = 'en') {
  const queryParameter = `changeLanguage("${language}")`;
  chromeTabQuery(language, 'player', queryParameter);
}
