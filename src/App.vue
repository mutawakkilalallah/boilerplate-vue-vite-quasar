<template>
  <q-dialog v-model="store.loading" persistent backdrop-filter="blur(4px)">
    <div>
      <q-spinner-cube color="orange" size="4em" />
      <q-tooltip :offset="[0, 8]">Loading</q-tooltip>
    </div>
  </q-dialog>
  <router-view />
</template>
<script setup>
import { useGStore } from "./store/global.js";

const store = useGStore();
</script>
