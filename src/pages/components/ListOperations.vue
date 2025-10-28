<template>
  <div class="option-container change-locale">
    <label for="language-select" title="Изменяет текущую локаль" class="header-label">Change locale to:</label>
    <select id="language-select" v-model="selectedLanguage">
      <option v-for="lang in LANGUAGES" :key="lang.value" :value="lang.value" :module="languages">
        {{ lang.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeLanguage"></ButtonConfirm>
  </div>
  <div class="option-container change-acc-status">
    <label for="status-select" title="Изменяет VIP статус аккаунта" class="header-label">Change acc status:</label>
    <select id="status-select" v-model="selectedStatus">
      <option v-for="status in ACC_STATUS" :key="status.value" :value="status.value" :module="playerStatus">
        {{ status.text }}
      </option>
    </select>
    <ButtonConfirm @confirm="handleChangeStatus"></ButtonConfirm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonConfirm from './ButtonConfirm.vue';
import { LANGUAGES, ACC_STATUS } from '../constants/parameters';
import { changeLanguage } from '../composables/useSelectedLanguage';
import { changeAccStatus } from "../composables/useChangeAccountStatus";

const selectedLanguage = ref('en');
const selectedStatus = ref('light');

const handleChangeLanguage = () => changeLanguage(selectedLanguage.value);
const handleChangeStatus = () => changeAccStatus(selectedStatus.value);

</script>