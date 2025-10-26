<template>
  <ExtensionHeader></ExtensionHeader>
  <div class="main-container">
    <ListOperations>
    </ListOperations>
  </div>
</template>

<script setup>
import ExtensionHeader from "./components/ExtensionHeader.vue";
import ListOperations from './components/ListOperations.vue';

</script>

<style>
body {
  width: 500px;
  height: 500px;
  background-image: linear-gradient(to top, #000000 0%, #133d85 100%);
}

.option-container {
  display: grid;
  align-items: stretch;
  grid-template-columns: 4fr 3.5fr 1fr;
  padding-right: 10px;
}

select {
  padding-left: 20px;
  margin-bottom: 10px;
}

select {
  appearance: none;

  @supports (appearance: base-select) {

    &,
    &::picker(select) {
      appearance: base-select;
    }
  }
}

select {
  display: flex;
  min-width: 100px;
  align-items: center;
  color: white;
  border-radius: 6px;
  border: 2px solid rgb(101, 168, 101);
  cursor: pointer;
  font-weight: 550;
  background: rgb(36, 46, 50) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23FFF' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E%0A") right 10px center / 20px no-repeat;

  @supports (appearance: base-select) {
    padding-inline: 10px;
    background-image: none;

    &::picker-icon {
      content: "";
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23FFF' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E%0A");
      transition: rotate 0.2s ease-out;
    }

    &:open::picker-icon {
      rotate: 180deg;
    }

    &::picker(select) {
      position-anchor: --html;
      margin-top: 5px;
      background: rgb(255, 255, 255);
      font-weight: 400;
      bottom: 0;
      width: 100%;
      translate: 0 100dvh;
      transition: translate 0.5s ease-out, opacity 0.5s ease-out, overlay 0.5s,
        display 0.5s;
    }

    &:open::picker(select) {
      bottom: 0;
      width: 100%;
      translate: 0;
      overflow: auto;

      @starting-style {
        translate: 0 100dvh;
        opacity: 0;
        height: 0;
      }
    }

    option {
      padding: 10px;
      cursor: pointer;
      transition-property: color, background;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;

      &:where(:hover, :focus, :active) {
        background: rgb(134, 134, 134);
        color: white;
      }

      &:checked {
        background: rgb(78, 78, 90);
        color: rgb(255, 255, 255);
      }

      &:first-child {
        border: 0;
      }
    }
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.sr-only {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.header-label {
  color: rgb(241, 251, 255);
  --s: 0.1em;
  font-size: 19px;
  white-space: nowrap;
  padding-left: 10px;
  font-weight: 500;
}

.header-label:hover {
  color: rgba(237, 237, 237, 0.548);
}
</style>