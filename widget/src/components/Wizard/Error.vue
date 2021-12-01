<template>
  <article class="flex flex-col items-center justify-between w-full my-5">
    <icon
      name="atention"
      :color="palette.danger"
      size="70" />

    <p class="text-xl font-black text-center w-full mt-2">
      Droga! Aconteceu algum erro.
    </p>
    <div class="flex justify-center items-center w-full mt-2">
      <button
        @click="goBack"
        class="
          rounded-full font-regular text-sm flex flex-col justify-center bg-band-gray
          items-center py-2 px-5 cursor-pointer focus:outline-none
        "
      >
        Tente novamente
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resetStore } from '@/store'
import Icon from '@/components/Icon/index.vue'
import palette from '../../../palette'

interface ISetupReturn {
  palette: Record<string, string>
  goBack ():void
}

export default defineComponent({
  components: { Icon },
  setup ():ISetupReturn {
    function goBack ():void {
      resetStore()
    }

    return {
      palette: palette.brand,
      goBack
    }
  }
})
</script>
