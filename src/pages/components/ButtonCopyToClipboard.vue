<template>
    <img src="../assets/icons/copy-button.svg" class="copy-button" title="Копировать" @click="emitConfirm">
</template>

<script setup>
const emit = defineEmits(['confirm']);

const emitConfirm = () => {
    emit('confirm');
};
</script>

<style>
.copy-button {
    width: 30px;
      height: 30px;
      object-fit: cover;
      fill: #ff0000;
}

.copy-button:hover {
  cursor: pointer;
}
</style>