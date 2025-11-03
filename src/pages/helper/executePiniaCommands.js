/* eslint-disable no-console */

export function executePiniaCommand(command) {
  // const command = {
  //     action: 'callPiniaAction',
  //     store: appModule,
  //     method: queryParameter,
  //     args: selectedParameter.value
  //   };
  return new Promise((resolve, reject) => {
    const checkPinia = (attempts = 0) => {
      const maxAttempts = 20;
      try {
        if (!window.vm || !window.vm.$pinia) {
          if (attempts >= maxAttempts) {
            reject({status: 'error', message: 'Vue/Pinia instance not found.'});
          } else {
            setTimeout(() => checkPinia(attempts + 1), 100);
          }
          return;
        }

        const {action} = command;
        if (action === 'callPiniaAction') {
          const {store: storeId, method} = command;

          if (!storeId || !method) {
            reject({status: 'error', message: 'Missing store or method for callStoreMethod'});
            return;
          }

          // eslint-disable-next-line no-new-func
          const fn = new Function(`return window.vm.$pinia._s.get("${storeId}").${method}`);

          if (typeof fn !== 'function') {
            reject({
              status: 'error',
              message: `Method '${method}' not found in store '${storeId}'.`,
            });
            return;
          }

          try {
            const result = fn();

            Promise.resolve(result)
              .then((res) => resolve({status: 'success', data: res}))
              .catch((e) => reject({status: 'error', message: e?.message || String(e)}));
          } catch (e) {
            console.error('Error while executing store method:', e);
            reject({status: 'error', message: e?.message || String(e)});
          }
          return;
        }

        // Можно добавить другие поддерживаемые действия здесь
        reject({status: 'error', message: 'Unsupported action'});
      } catch (e) {
        console.error('Error while calling Pinia:', e);
        reject({status: 'error', message: e.message});
      }
    };

    checkPinia();
  });
}
