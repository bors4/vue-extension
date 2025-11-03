import {ref} from 'vue';

import {chromeTabQuery} from '../helper/chromeTabQuery';

export function changeAccStatus(status = 'light') {
  const selectedStatus = ref(status);
  const queryParameter = `data.statuses[1]={id: "${String(selectedStatus.value).toUpperCase()}", name: "${String(selectedStatus.value).toUpperCase()}"}`;
  chromeTabQuery(selectedStatus, 'player', queryParameter);
}
