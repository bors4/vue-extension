/* eslint-disable no-console */
import {changeLanguage} from '../composables/useSelectedLanguage';
import {chromeTabQuery} from '../helper/chromeTabQuery';

function findValueByPath(obj, pathParts) {
  if (!obj || pathParts.length === 0) return obj;

  const [currentKey, ...remainingPath] = pathParts;

  if (typeof obj === 'object' && obj !== null && currentKey in obj) {
    const currentValue = obj[currentKey];

    if (remainingPath.length === 0 || typeof currentValue !== 'object') {
      return currentValue;
    }
    return findValueByPath(currentValue, remainingPath);
  }

  return undefined;
}

export async function getStringValue(strings, language) {
  const arrayStrings = strings
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    changeLanguage(language);

    const maxAttempts = 3;
    let translations = null;

    for (let i = 0; i < maxAttempts && !translations; i += 1) {
      try {
        const res = await chromeTabQuery(language, 'interfaceTranslations', `data?.["${language}"]`);

        if (res?.status === 'success' && res.data) {
          translations = res.data;
        }
      } catch {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    if (!translations) {
      throw new Error(`Translations for language '${language}' not found on target page.`);
    }

    return arrayStrings.map((path) => {
      const value = findValueByPath(translations, path.split('.'));
      return `\n${path}: "${value ?? ''}"`;
    });
  } catch (e) {
    console.error('Failed to get translations:', e);
    throw e;
  }
}
