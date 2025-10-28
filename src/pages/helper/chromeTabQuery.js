/* eslint-disable no-console */
import {executePiniaCommand} from '../helper/executePiniaCommands.js';

export function chromeTabQuery(selectedParameter, appModule, queryParameter) {
  const queryOptions = {active: true, currentWindow: true};
  chrome.tabs.query(queryOptions, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          world: 'MAIN',
          func: executePiniaCommand,
          args: [selectedParameter.value, appModule, queryParameter],
        },
        (injectionResults) => {
          if (chrome.runtime.lastError) {
            console.error('Script injection failed:', chrome.runtime.lastError.message);
            alert(`Error: ${chrome.runtime.lastError.message}`);

            return;
          }
          if (injectionResults && injectionResults.length > 0) {
            const result = injectionResults[0].result;

            if (result && result.status === 'success') {
              console.log(`Locale was changed to ${selectedParameter.value}!`);
            } else {
              alert(`Error changing locale: ${result ? result.message : 'Unknown error'}`);
            }
          } else {
            console.error('No results from script injection.');
          }
        }
      );
    }
  });
}
