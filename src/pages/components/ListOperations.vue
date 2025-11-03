<template>
  <div class="option-container change-locale">
    <label for="language-select" title="Изменяет текущую локаль" class="header-label">Изменить локаль:</label>
    <select id="language-select" v-model="selectedLanguage">
      <option v-for="lang in LANGUAGES" :key="lang.value" :value="lang.value">
        {{ lang.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeLanguage"></ButtonConfirm>
  </div>
  <div class="option-container change-acc-status">
    <label for="status-select" title="Изменяет VIP статус аккаунта" class="header-label">Изменить статус аккаунта:</label>
    <select id="status-select" v-model="selectedStatus">
      <option v-for="status in ACC_STATUS" :key="status.value" :value="status.value">
        {{ status.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeStatus"></ButtonConfirm>
  </div>
  <div class="option-container">
    <label for="strings-array" title="Получает значения списка строковых по маске" class="header-label">Получить строковые:</label>
    <div class="textarea-wrap">
      <textarea id="strings-array" v-model="insertStrings" placeholder="confirm_email.verify_to_continue,..."></textarea>
      <ButtonCopyToClipboard @confirm="handleCopyToClipboard"></ButtonCopyToClipboard>
    </div>
    <ButtonConfirm @confirm="handleGetStringValue"></ButtonConfirm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonConfirm from './ButtonConfirm.vue';
import ButtonCopyToClipboard from './ButtonCopyToClipboard.vue';
import { LANGUAGES, ACC_STATUS } from '../constants/parameters';
import { changeLanguage } from '../composables/useSelectedLanguage';
import { changeAccStatus } from '../composables/useChangeAccountStatus';
import { getStringValue } from '../composables/useGetStringValue';
import { copyToClipboard } from '../helper/copyToClipboard';

const selectedLanguage = ref('en');
const selectedStatus = ref('light');
const insertStrings = ref('');

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

</script>

<style lang="css" scoped>
textarea {
  display: block;
  width: 100%;
  height: auto;
  max-height: 75%;
  box-sizing: border-box;
  resize: none;
  padding-left: 10px;
  min-width: 100px;
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  overflow: auto;
  transition: box-shadow 160ms ease, max-height 200ms ease;
}

.textarea-wrap {
  display: grid;
  align-items: stretch;
  grid-template-columns: 4fr 0.1fr;
  position: relative;
  width: 100%;
  height: 90%;
}

.textarea-wrap:focus-within {
  z-index: 2000;
}

.textarea-wrap {
  overflow: visible;
}

.textarea-wrap:focus-within #strings-array {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  max-height: none;
  z-index: 4000;
  box-shadow: 0 8px 24px rgba(22, 12, 157, 0.6);
}

#strings-array:focus {
  box-shadow: 0 8px 24px rgba(22, 12, 157, 0.6);
}

.header-label {
  color: rgb(254, 254, 254);
  --s: 0.1em;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  padding-left: 10px;
  font-weight: 500;
}

.header-label:hover {
  color: rgb(207, 246, 251);
}

select {
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
  min-width: 60px;
  color: white;
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  cursor: pointer;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 520;
  font-size: 13px;
  background: rgb(59, 87, 124);
}
</style>