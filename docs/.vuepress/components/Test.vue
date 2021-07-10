<template>
  <div>test</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  distTag: {
    type: String,
    required: false,
    default: 'next',
  },
})
</script>

<style scoped>
.npm-badge {
  margin-right: 0.5rem;
}
</style>
