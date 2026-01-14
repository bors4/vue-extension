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
  border: none;
  color: #fff;
  text-shadow:
    1px 1px 0 #00158d;
  background: #6E6D70;
  background-origin: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  user-select: none;
  margin-bottom: 10px;
  margin-left: 5px;
  cursor: pointer;
}

.button-confirm:hover {
  background: linear-gradient(180deg, #c9ffd681 0%, #53b871 100%);
}

.button-confirm:focus-visible {
  outline: 3px solid rgba(46, 130, 255, .6);
  outline-offset: 2px;
}
</style>
