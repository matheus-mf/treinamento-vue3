<template>
  <article class="flex flex-col items-center justify-center w-full my-5">
    <textarea
      v-model="state.feedback"
      class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
    />
    <button
      :disabled="submitButtonIsDisabled"
      :class="{
        'opacity-50': state.isLoading,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
        'bg-brand-main text-white': !submitButtonIsDisabled
      }"
      @click="submitAFeedback"
      class="
        rounded-lg font-black mt-3 flex flex-col
        justify-center items-center py-2 w-full cursor-pointer
        focus:outline-none transition-all duration-200
      ">
      <icon v-if="state.isLoading" name="loading" class="animate-spin" color="white" />
      <template v-else>
        Enviar feedback
      </template>
    </button>
  </article>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, reactive } from 'vue'

import services from '@/services'
import useStore from '@/hooks/store'
import { useNavigation } from '@/hooks/navigation'

import Icon from '@/components/Icon/index.vue'

type TState = {
  feedback: string
  isLoading: boolean
  hasError: Error | null
}

interface ISetupReturn {
  state: TState
  submitButtonIsDisabled: ComputedRef<boolean>
  submitAFeedback(): Promise<void>
}

export default defineComponent({
  components: { Icon },
  setup ():ISetupReturn {
    const store = useStore()
    const { setErrorState, setSuccessState } = useNavigation()

    const state = reactive<TState>({
      feedback: '',
      isLoading: false,
      hasError: null
    })

    const submitButtonIsDisabled = computed<boolean>(() => {
      return !state.feedback.length
    })

    function handleError (error: Error) {
      state.hasError = error
      setErrorState()
    }

    async function submitAFeedback (): Promise<void> {
      try {
        const response = await services.feedback.create({
          type: store.feedbackType,
          text: store.message,
          page: store.currentPage,
          apiKey: store.apiKey,
          device: window.navigator.userAgent,
          fingerprint: store.fingerprint
        })

        if (!response.errors) {
          setSuccessState()
        } else {
          setErrorState()
        }
      } catch (error: Error) {
        handleError(Error)
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      submitButtonIsDisabled,
      submitAFeedback
    }
  }
})
</script>
