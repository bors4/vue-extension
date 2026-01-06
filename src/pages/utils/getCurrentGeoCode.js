import {chromeAPIQuery} from '../helper/chromeQueries';

export function getCurrentGeoCode() {
  return chromeAPIQuery('globalThis.GEO_CODE');
}
