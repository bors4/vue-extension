<template>
  <button class="button-confirm" @click="emitConfirm">Change</button>
</template>

<script setup>
const emit = defineEmits(['confirm']);

const emitConfirm = () => {
  emit('confirm');
};
</script>

<style scoped>
.button-confirm {
  display: flex;
  min-width: 70px;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;
  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
  background-origin: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 10px;
  margin-left: 5px;
  cursor: pointer;
}
</style>