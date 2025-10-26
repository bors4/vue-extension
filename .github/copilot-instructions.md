<!-- .github/copilot-instructions.md -->
# Быстрые инструкции для AI-кодирующих агентов

Ниже — компактная и прагматичная справка, чтобы быстро стать продуктивным в этом репозитории (Vue 3 + Vite, browser extension).

- Проект: браузерное расширение (Vite + Vue 3). Вход для popup: `src/popup.html` -> `src/popup.js` -> `src/pages/App.vue`.
- Манифест: `src/manifest.json`. Файлы `package.json` и `manifest.json` объединяются при сборке через `vite-plugin-web-extension` (см. `vite.config.js::generateManifest`).

Ключевая архитектура и «почему»:
- Vite + `vite-plugin-web-extension` собирают расширение и динамически сливают поля из `package.json` в `src/manifest.json`. Изменение имени/версии/описания обычно делается в `package.json`.
- Popup — обычное SPA Vue 3 (см. `src/popup.html` и `src/popup.js`). Важно: приложение монтируется в DOM прямо в `body`: `createApp(App).mount('body')`.
- Контакт с целевой страницей реализован через API расширения: `chrome.scripting.executeScript` (см. `src/pages/App.vue`). Скрипт вызывается в «MAIN» world и передаёт имя Pinia-модуля (`"player"`) и локаль.
- Для доступа к Pinia внутри целевой страницы код ищет глобальный объект Vue-приложения в `window.vm` и затем `window.vm.$pinia._s.get(appModule)` — это проектная конвенция: целевые страницы ожидается, что экспортируют/подключают глобальную `window.vm` (см. комментарии в `App.vue`).

Developer workflow (быстрое руководство):
- Локальная разработка (dev server):
  - npm run dev  — запустит vite (стандартный dev сервер). Для popup можно открывать `src/popup.html` через vite-сервер.
- Сборка расширения для загрузки в браузер:
  - npm run build
  - Результат: сборка в dist (плагин `vite-plugin-web-extension` формирует артефакты). Для загрузки в Chrome — `chrome://extensions` -> Load unpacked -> выбрать папку сборки.
- Собрать под другой браузер: установить переменную окружения TARGET. В Windows cmd:
  - set TARGET=firefox && npm run build

Проектные соглашения и паттерны (важно для автогенерации/патчей):
- Манифест содержит шаблонные поля для chrome/firefox (`{{chrome}}`, `{{firefox}}`) — изменения манифеста должны проверяться через `vite.config.js::generateManifest`.
- Popup взаимодействует с контентом через injection-функцию `executePiniaCommand(locale, appModule)` (в `src/pages/App.vue`). Примеры значимых строк:
  - Пример: поиск стора — `window.vm.$pinia._s.get(appModule)` и вызов `changeLanguage(locale)`.
  - Если вы модифицируете API сторa, обновите код инъекции и проверьте обработку ошибок (в `App.vue` есть retry loop и информирование через alert/console).
- Входные точки сборки и имена выходных файлов: `vite.config.js` настраивает `entryFileNames`, `chunkFileNames` и `assetFileNames` в `assets/[name].js` — учтите это при ссылках на собранные ресурсы.

Интеграции и зависимости:
- Используется `webextension-polyfill` (в зависимостях) и `vite-plugin-web-extension` (devDependency). Не менять версии без проверки компатибельности с Manifest v2/v3.
- `vite.config.js` слушает `package.json` и `manifest.json` (см. `watchFilePaths`) — изменение этих файлов влияет на результирующий `manifest` при сборке.

Что не найдено/отсутствует в репозитории:
- Нет настроенного тест-раннера (никаких `test` скриптов в `package.json`). Не предполагайте наличие unit/integration тестов.

Как вносить изменения и проверять их (примерный чеклист):
1. Изменить код в `src/` (например, API инъекции или имя Pinia store).
2. Обновить соответствующие поля в `package.json` / `src/manifest.json`, если затрагиваются метаданные.
3. Сборка: `npm run build` (проверить `dist` и содержимое конечного `manifest.json`).
4. Загрузить папку сборки в браузер (Chrome — `chrome://extensions`, Firefox — `about:debugging`).

Короткие примеры для агентов (copy-paste friendly):
- Где найти popup entry: `src/popup.html` -> script `/src/popup.js` -> `src/pages/App.vue`.
- Пример поиска Pinia store внутри инъекции (в `App.vue`):
  - moduleStore = window.vm.$pinia._s.get("player")
  - moduleStore.changeLanguage('ru')

Если какая-то часть кажется неполной — спросите, какие страницы (target pages) должны предоставлять глобальную `window.vm`, или пришлите `src` целевой страницы, чтобы я автоматически выровнял инъекцию под её Pinia-структуру.

---
Пожалуйста, проверьте этот файл и скажите, что дописать или сократить. Готов внести правки по замечаниям.
