<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ArrowRight from './ArrowRight'
import Loading from './Loading'
import Copy from './Copy'
import Chat from './Chat'
import Close from './Close'
import ChevronDown from './ChevronDown'

export default {
  components: {
    ArrowRight,
    Loading,
    Copy,
    Chat,
    Close,
    ChevronDown
  },
  props: {
    name: {
      type: String, required: true
    }
  }
}
</script>
