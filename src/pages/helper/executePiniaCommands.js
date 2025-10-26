/* eslint-disable no-console */
export function executePiniaCommand(locale, appModule) {
  return new Promise((resolve, reject) => {
    const checkPinia = (attempts = 0) => {
      const maxAttempts = 20;

      if (window.vm && window.vm.$pinia) {
        try {
          const moduleStore = window.vm.$pinia._s.get(appModule);

          if (moduleStore && typeof moduleStore.changeLanguage === 'function') {
            moduleStore.changeLanguage(locale);
            resolve({ status: "success", message: "Locale is changed" });
          } else if (moduleStore) {
            reject({ status: "error", message: `Storage '${appModule}' found, but 'changeLanguage' method is not available.` });
          } else {
            reject({ status: "error", message: `Storage '${appModule}' not found.` });
          }
        } catch (e) {
          console.error("Error while calling Pinia:", e);
          reject({ status: "error", message: e.message });
        }
      } else if (attempts >= maxAttempts) {
        reject({ status: "error", message: "Vue/Pinia instance not found." });
      } else {
        setTimeout(() => checkPinia(attempts + 1), 100);
      }
    };

    checkPinia();
  });
}