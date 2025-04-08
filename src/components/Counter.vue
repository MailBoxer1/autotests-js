<template>
  <button @click="counter++">count is {{ counter }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
</script>
