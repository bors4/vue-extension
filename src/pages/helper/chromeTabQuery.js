/* eslint-disable no-console */
import {executePiniaCommand} from '../helper/executePiniaCommands';

export function chromeTabQuery(selectedParameter, appModule, queryParameter) {
  const command = {
    action: 'callPiniaAction',
    store: appModule,
    method: queryParameter,
    args: selectedParameter.value,
  };
  // console.log(command)
  const queryOptions = {active: true, currentWindow: true};
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryOptions, (tabs) => {
      if (!tabs[0]) {
        reject({status: 'error', message: 'No active tab found.'});
        return;
      }

      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          world: 'MAIN',
          func: executePiniaCommand,
          args: [command],
        },
        (injectionResults) => {
          if (chrome.runtime.lastError) {
            console.error('Script injection failed:', chrome.runtime.lastError.message);
            reject({status: 'error', message: chrome.runtime.lastError.message});
            return;
          }

          if (injectionResults && injectionResults.length > 0) {
            const result = injectionResults[0].result;
            resolve(result);
          } else {
            reject({status: 'error', message: 'No results from script injection.'});
          }
        }
      );
    });
  });
}
