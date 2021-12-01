<template>
  <component
    :is="store.currentComponent"
    @select-feedback-type="handleSelectFeedbackType"
    @next="next"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteAFeedback.vue'
import Success from './Success.vue'
import ErrorState from './Error.vue'

import useStore from '@/hooks/store'
import { INavigation, useNavigation } from '@/hooks/navigation'
import { setFeedbackType, TStoreState } from '@/store'

interface ISetupReturn {
  store: TStoreState
  next: INavigation['next']
  handleSelectFeedbackType(type: string): void
}

export default defineComponent({
  components: { SelectFeedbackType, WriteAFeedback, Success, Error: ErrorState },
  setup ():ISetupReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleSelectFeedbackType (type: string) {
      setFeedbackType(type)
    }

    return { store, next, handleSelectFeedbackType }
  }
})
</script>
