<template>
  <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Loading from './Loading'
import Copy from './Copy'
import Chat from './Chat'
import ChevronDown from './ChevronDown'

export default defineComponent({
  components: {
    Loading,
    Copy,
    Chat,
    ChevronDown
  },
  props: {
    name: {
      type: String, required: true
    }
  }
})
</script>
