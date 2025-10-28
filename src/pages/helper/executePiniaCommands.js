/* eslint-disable no-console */
export function executePiniaCommand(selectedParameter, appModule, queryParameter) {
  return new Promise((resolve, reject) => {
    const checkPinia = (attempts = 0) => {
      const maxAttempts = 20;
      if (selectedParameter && window.vm.$pinia) {
        try {
          const moduleStore = window.vm.$pinia._s.get(appModule).data;
          const piniaCommand = new Function(`window.vm.$pinia._s.get("${appModule}").${queryParameter}`);
          console.log(piniaCommand);
          if (moduleStore && typeof piniaCommand === 'function') {
            piniaCommand();
            resolve({status: 'success', message: 'Success update'});
          } else if (moduleStore) {
            reject({status: 'error', message: `Storage '${appModule}' found, but 'queryParameter' is not correctly.`});
          } else {
            reject({status: 'error', message: `Storage '${appModule}' not found.`});
          }
        } catch (e) {
          console.error('Error while calling Pinia:', e);
          reject({status: 'error', message: e.message});
        }
      } else if (attempts >= maxAttempts) {
        reject({status: 'error', message: 'Vue/Pinia instance not found.'});
      } else {
        setTimeout(() => checkPinia(attempts + 1), 100);
      }
    };

    checkPinia();
  });
}
