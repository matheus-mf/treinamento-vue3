<template>
  <teleport to="body">
    <component
      @opne-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="state.component"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'

type TState = {
  component: string
}

interface ISetupReturn {
  state: TState
  handleOpenBox(): void
  handleCloseBox(): void
}

export default defineComponent({
  components: { Standby, Box },
  setup ():ISetupReturn {
    const state = reactive<TState>({
      component: 'Standby'
    })

    function handleOpenBox ():void {
      state.component = 'Box'
    }
    function handleCloseBox (): void {
      state.component = 'Standby'
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    }
  }
})
</script>
