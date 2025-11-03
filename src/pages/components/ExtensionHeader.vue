<template>
  <h2 class="extension-header loading-text"> {{ title }} </h2>
</template>

<script setup>
import { useShowExtensionHeader } from '../composables/useExtensionHeaderTitle'

const {title} = useShowExtensionHeader('Welcome to Extension');

</script>

<style scoped>
.extension-header {
  text-align: center;
  font-family: Pangolin;
  font-size: 30px;
  margin-bottom: 10px;
}

.loading-text {
  place-self: center;
  background: linear-gradient(120deg, rgb(0, 242, 255), rgba(74, 255, 180, 0.769), rgb(0, 242, 255)) -100%/ 200%;
  background-clip: text;
  color: transparent;
  animation: shimmer 4s linear infinite
}

@keyframes shimmer {
  to {
    background-position: 100%
  }
}

@font-face {
  font-family: 'Pangolin';
  src: url('../assets/fonts/Pangolin/Pangolin-Regular.ttf') format('ttf');
  font-weight: normal;
  font-style: normal;
}

</style>