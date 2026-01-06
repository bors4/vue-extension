import {chromeTabQuery} from '../helper/chromeQueries';

export async function getCurrentLocale() {
  try {
    const res = await chromeTabQuery('', 'player', 'getLangCode');
    return res?.status === 'success' ? res.data : null;
  } catch {
    await new Promise((r) => setTimeout(r, 3000));
    return null;
  }
}
