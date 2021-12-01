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
import { defineComponent, reactive, watch } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'
import { useIframeControl } from '@/hooks/iframeControl'
import { useStore } from '@/hooks/store'

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
    const store = useStore()
    const state = reactive<TState>({
      component: 'Standby'
    })
    const { notifyOpen, notifyClose, updateCoreValuesOnStore } = useIframeControl()

    watch(() => store.currentComponent, () => {
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
