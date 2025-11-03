<template>
  <ExtensionHeader></ExtensionHeader>
  <hr class="gradient-line">
  <div class="main-container">
    <ListOperations>
    </ListOperations>
  </div>
  <Footer class="footer-container"></Footer>
</template>

<script setup>
import ExtensionHeader from './components/ExtensionHeader.vue';
import ListOperations from './components/ListOperations.vue';
import Footer from './components/MainFooter.vue';
import './assets/css/main.css';
</script>