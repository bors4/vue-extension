/* eslint-disable no-console */
import {executePiniaCommand} from './executePiniaCommands';

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
        reject(new Error('No active tab found.', {cause: {status: 'error'}}));
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
            reject(new Error(chrome.runtime.lastError.message, {cause: {status: 'error'}}));
            return;
          }

          if (injectionResults && injectionResults.length > 0) {
            const result = injectionResults[0].result;
            resolve(result);
          } else {
            reject(new Error('No results from script injection.'));
          }
        }
      );
    });
  });
}

export async function chromeAPIQuery(queryParameter) {
  try {
    console.log('Выполнение скрипта:', queryParameter);

    const tab = await getCurrentTab();

    if (!tab) {
      throw new Error('Нет активной вкладки');
    }

    if (!tab.id) {
      throw new Error('Не удалось получить ID вкладки');
    }

    console.log('ID активной вкладки:', tab.id);

    const results = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      world: 'MAIN',
      func: (code) => {
        try {
          // eslint-disable-next-line no-new-func
          const func = new Function(
            `const f = ${code};
            if(typeof f === 'function') {
            return f()}
            else {return f}`
          );

          const result = func();
          return result;
        } catch (error) {
          console.error(`Ошибка выполнения кода "${code}":`, error);
          return {
            __error: true,
            message: error.message,
            name: error.name,
            stack: error.stack,
          };
        }
      },
      args: [queryParameter],
    });
    console.log(`${results}:`, results);
    const result = results[0]?.result;
    console.log('Результат выполнения скрипта:', result);

    if (result?.__error) {
      throw new Error(`Ошибка выполнения: ${result.message}`);
    }

    return result;
  } catch (error) {
    console.error('Ошибка в chromeAPIQuery:', error);
    throw error;
  }
}

async function getCurrentTab() {
  try {
    const queryOptions = {
      active: true,
      currentWindow: true,
    };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab || null;
  } catch (error) {
    console.error('Ошибка получения активной вкладки:', error);
    return null;
  }
}
