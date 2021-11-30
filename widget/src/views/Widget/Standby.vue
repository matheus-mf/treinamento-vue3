<template>
  <section
    @click="() => emit('open-box')"
    class="
      fixed z-500 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full
      py-3 px-5 flex items-center shadow-xl cursor-pointer select-none
      animate__animated animate__fadeInUp animate__faster
    "
  >
    <icon
      name="chat"
      size="27"
      color="white"
      class="mr-3"
    />
    <span class="font-black text-white text-xl">
      Deixe um feedback
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'

import Icon from '../../components/Icon/index.vue'

interface ISetupReturn {
  emit: SetupContext['emit']
}

export default defineComponent({
  components: { Icon },
  setup (_, { emit }: SetupContext):ISetupReturn {
    return {
      emit
    }
  }
})
</script>
