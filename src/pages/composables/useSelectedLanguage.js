/* eslint-disable no-console */
import { ref } from 'vue'
import { executePiniaCommand } from '../helper/executePiniaCommands.js'

export function changeLanguage(language = 'en') {
  const selectedLanguage = ref(language);
  const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        world: "MAIN",
        func: executePiniaCommand,
        args: [selectedLanguage.value, "player"],
      }, (injectionResults) => {
        if (chrome.runtime.lastError) {
          console.error("Script injection failed:", chrome.runtime.lastError.message);
          alert(`Error: ${chrome.runtime.lastError.message}`);

          return;
        }
        if (injectionResults && injectionResults.length > 0) {
          const result = injectionResults[0].result;

          if (result && result.status === "success") {
            console.log(`Locale was changed to ${selectedLanguage.value}!`);
          } else {
            alert(`Error changing locale: ${result ? result.message : "Unknown error"}`);
          }
        } else {
          console.error("No results from script injection.");
        }
      });
    }
  });
}