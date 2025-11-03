<template>
  <button class="button-confirm" @click="emitConfirm">Выполнить</button>
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
  min-width: 90px;
  max-height: 25px;
  flex-direction: column;
  padding: 4px 6px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 14px;
  letter-spacing: 0.05rem;
  font-weight: 620;
  border-radius: 6px;
  border: none;
  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
  background-origin: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  user-select: none;
  margin-bottom: 10px;
  margin-left: 5px;
  cursor: pointer;
}

.button-confirm:hover {
  background: linear-gradient(180deg, #2e82ff 0%, #276ff6 100%);
}
.button-confirm:focus-visible {
  outline: 3px solid rgba(46,130,255,.6);
  outline-offset: 2px;
}
</style>