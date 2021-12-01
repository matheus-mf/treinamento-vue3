<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ArrowRight from './ArrowRight'
import Atention from './Atention'
import Chat from './Chat'
import Check from './Check'
import ChevronDown from './ChevronDown'
import Close from './Close'
import Copy from './Copy'
import Loading from './Loading'

export default {
  components: {
    ArrowRight,
    Atention,
    Chat,
    Check,
    ChevronDown,
    Close,
    Copy,
    Loading
  },
  props: {
    name: {
      type: String, required: true
    }
  }
}
</script>
