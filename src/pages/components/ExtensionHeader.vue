<template>
      <div className="extension-header"> {{ title }} </div>
</template>

<script setup>
import { useShowExtensionHeader } from '../composables/useExtensionHeaderTitle'

const {title} = useShowExtensionHeader('Welcome to Extension');

</script>

<style>
.extension-header {
  color: rgb(199, 237, 252);
  text-align: center;
  font-size: 32px;
  padding-bottom: 20px;
}
</style>