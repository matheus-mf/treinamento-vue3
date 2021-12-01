<template>
  <teleport to="body">
    <component
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="state.component"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'
import { useIframeControl } from '@/hooks/iframeControl'

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
    const { notifyOpen, notifyClose, updateCoreValuesOnStore } = useIframeControl()

    onMounted(() => {
      updateCoreValuesOnStore()
    })

    function handleOpenBox ():void {
      notifyOpen()
      state.component = 'Box'
    }

    function handleCloseBox (): void {
      notifyClose()
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
