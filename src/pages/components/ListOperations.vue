<template>
  <div class="option-container">
    <label for="language-select" title="Изменяет текущую локаль" class="header-label">Изменить локаль:</label>
    <select id="language-select" v-model="selectedLanguage">
      <option v-for="lang in LANGUAGES" :key="lang.value" :value="lang.value">
        {{ lang.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeLanguage"></ButtonConfirm>
  </div>
  <div class="option-container">
    <label for="status-select" title="Изменяет VIP статус аккаунта" class="header-label">Изменить статус
      аккаунта:</label>
    <select id="status-select" v-model="selectedStatus">
      <option v-for="status in ACC_STATUS" :key="status.value" :value="status.value">
        {{ status.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeStatus"></ButtonConfirm>
  </div>
  <div class="option-container">
    <label title="Получает значения списка строковых по маске" class="header-label">Получить
      строковые:</label>
    <div class="inner-container-wrap">
      <div class="inline-group">
        <textarea id="strings-array" v-model="insertStrings"
          placeholder="confirm_email.verify_to_continue,..."></textarea>
        <ButtonCopyToClipboard @confirm="handleCopyToClipboard"></ButtonCopyToClipboard>
      </div>
    </div>
    <ButtonConfirm @confirm="handleGetStringValue"></ButtonConfirm>
  </div>
  <div class="option-container">
    <label for="current-geo" title="Отображается текущий GEO_CODE (frontend)" class="header-label">Текущий
      GEO_CODE:</label>
    <div class="params-wrapper">
      <div class="inner-container-wrap">
        <input id="current-geo" v-model="currentGeoCodeValue" :size="currentGeoCodeValue.length || 1"
          class="input-field" placeholder="---" disabled>
      </div>
    </div>
  </div>
  <div class="option-container">
    <label for="show-strings-checkbox" title="Выводит ключи строковых на странице вместо значений"
      class="header-label">Отобразить строковые</label>
    <div class="inner-container-wrap">
      <input id="show-strings-checkbox" v-model="showStrings" type="checkbox" :indeterminate="true"
        @change="handleShowStrings" />
      <label for="show-strings-checkbox" class="toggle">
        <span>
          <svg width="10px" height="10px" viewBox="0 0 10 10">
            <path
              d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z">
            </path>
          </svg>
        </span>
      </label>
    </div>
  </div>
  <div class="option-container">
    <label for="" title="Получение списка игр, которые не поддерживаются указанной валютой"
      class="header-label">Получить
      список игр, для которых недоступна валюта:</label>
    <div class="inner-container-wrap">
      <div class="params-wrapper">
        <div class="inline-group">
          <textarea id="" v-model="insertNoCurrencyGames" placeholder="---"></textarea>
          <label for="currencyCode" class="input-label">Код валюты</label>
          <input id="currencyCode" v-model="currentGeoCodeValue" :size="currentGeoCodeValue.length || 3"
            class="input-field currency-input" type="text" maxlength="3" pattern="[A-Za-z]{3}" placeholder="---"
            disabled />
          <div class="tooltip">
            <svg width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              aria-label="Информация">
              <circle cx="12" cy="12" r="10" fill="#4DA6FF" fill-opacity="0.9" />
              <text x="12" y="16" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12"
                font-weight="bold">i</text>
              <circle cx="12" cy="12" r="11" stroke="#2B8CE6" stroke-width="0.5" stroke-opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <ButtonConfirm @confirm="handleGetNoCurrencyGames"></ButtonConfirm>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ButtonConfirm from './ButtonConfirm.vue';
import ButtonCopyToClipboard from './ButtonCopyToClipboard.vue';
import { LANGUAGES, ACC_STATUS } from '../constants/parameters';
import { changeLanguage } from '../utils/useSelectedLanguage';
import { changeAccStatus } from '../utils/useChangeAccountStatus';
import { getStringValue } from '../utils/useGetStringValue';
import { copyToClipboard } from '../helper/copyToClipboard';
import { getCurrentGeoCode } from '../utils/getCurrentGeoCode';
import { showStringsOnPage } from "../utils/useShowStringsOnPage";

const selectedLanguage = ref('en');
const selectedStatus = ref('light');
const insertStrings = ref('');
const currentGeoCodeValue = ref('');
const isLoading = ref(false);
const showStrings = ref();


const handleChangeLanguage = () => changeLanguage(selectedLanguage.value);
const handleChangeStatus = () => changeAccStatus(selectedStatus.value);
const handleGetStringValue = async () => {
  const stringsValues = await getStringValue(insertStrings.value, selectedLanguage.value);
  insertStrings.value = 'Результат:' + stringsValues;
};
const handleCopyToClipboard = () => {
  const copiedText = insertStrings.value;
  copyToClipboard(copiedText);
};

const initializeExtension = () => {
  console.log('Расширение открыто!');
};

const handleShowStrings = () => showStringsOnPage(showStrings.value);

onMounted(async () => {
  initializeExtension();

  try {
    isLoading.value = true;

    const geoCodeResult = await getCurrentGeoCode();

    if (geoCodeResult && typeof geoCodeResult === 'object') {
      if (geoCodeResult.code) {
        currentGeoCodeValue.value = String(geoCodeResult.code);
      } else if (geoCodeResult.value) {
        currentGeoCodeValue.value = String(geoCodeResult.value);
      } else if (geoCodeResult.result) {
        currentGeoCodeValue.value = String(geoCodeResult.result);
      } else {
        currentGeoCodeValue.value = JSON.stringify(geoCodeResult);
      }
    } else {
      currentGeoCodeValue.value = String(geoCodeResult || '');
    }
  } catch (error) {
    console.error('Ошибка получения GEO_CODE:', error);
    currentGeoCodeValue.value = 'Ошибка получения';
  } finally {
    isLoading.value = false;
  }
});

</script>

<style lang="css" scoped>
textarea {
  vertical-align: middle;
  height: 32px;
  /* Фиксированная высота в покое */
  flex-grow: 1;
  /* Позволяет текстовому полю занимать свободное место */
  max-height: 70%;
  box-sizing: border-box;
  resize: none;
  padding-left: 10px;
  min-width: 100px;
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  overflow: auto;
  transition: box-shadow 160ms ease, max-height 200ms ease;
}

.params-wrapper input {
  width: 100%;
  min-width: 0;
}

.inline-group {
  display: flex;
  flex-direction: row;
  /* Строго в ряд */
  align-items: center;
  gap: 10px;
  width: 100%;
}

.params-wrapper .inline-group {
  display: flex;
  align-items: center;
  gap: 5px;
  max-height: 40px;
}

.params-wrapper:focus-within {
  z-index: 2000;
}

.params-wrapper:focus-within #strings-array,
#strings-array:focus {
  position: initial;
  height: 100px;
  max-height: 100px;
  z-index: 4000;
  box-shadow: 0 8px 24px rgba(22, 12, 157, 0.6);
}

.label-wrap {
  font: Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #ffffff;
}

.header-label {
  overflow: hidden;
  text-overflow: ellipsis;
  /* Добавит три точки, если текст не влезет в 200px */
  white-space: nowrap;
  color: rgb(254, 254, 254);
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 14px;
  padding-left: 10px;
}

.header-label:hover {
  color: rgb(207, 246, 251);
}

select {
  height: 32px;
  margin-bottom: 0;
  /* Обнуляем */
  width: 100%;
  padding-left: 10px;
  display: flex;
  min-width: 60px;
  color: white;
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  cursor: pointer;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 520;
  font-size: 13px;
  background: rgb(95, 98, 102);
}

.input-field {
  color: rgb(192, 192, 192);
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 520;
  font-size: 13px;
  min-width: 20px;
  box-sizing: content-box;
  text-align: center;
}

.input-field.currency-input {
  padding-left: 4px;
  padding-right: 4px;
  min-width: 30px;
  width: 40px;
  max-width: 50px;
  text-align: center;
}

.input-label {
  color: #c8ccd4;
}

.input-field:disabled {
  cursor: not-allowed;
  background: rgb(7, 15, 26);
}

.inner-container-wrap {
  display: flex;
  align-items: center;
  width: 100%;
}

input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.toggle {
  position: relative;
  display: block;
  width: 30px;
  height: 15px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}

.toggle:before {
  content: "";
  position: relative;
  top: 1px;
  left: 1px;
  width: 30px;
  height: 20px;
  display: block;
  background: #c8ccd4;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.toggle span {
  position: absolute;
  top: 10%;
  left: 0;
  width: 20px;
  height: 20px;
  display: block;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(154, 153, 153, 0.75);
  transition: all 0.2s ease;
}

.toggle span svg {
  margin: 5px;
  fill: none;
}

.toggle span svg path {
  stroke: #c8ccd4;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: 0;
  transition: all 0.5s linear;
}

input[type="checkbox"]:checked+.toggle:before {
  background: #00b321;
}

input[type="checkbox"]:checked+.toggle span {
  transform: translateX(18px);
}

input[type="checkbox"]:checked+.toggle span path {
  stroke: #52d66b;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
}

.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
