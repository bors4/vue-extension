import {chromeTabQuery} from '../helper/chromeQueries';

export function changeAccStatus(status = 'light') {
  const queryParameter = `data.statuses[1]={id: "${String(status).toUpperCase()}", name: "${String(status).toUpperCase()}"}`;
  chromeTabQuery(status, 'player', queryParameter);
}
