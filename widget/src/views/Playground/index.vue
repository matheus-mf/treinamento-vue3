<template>
  <section class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-main">
    <h1 class="text-6xl font-black text-brand-gray">Playground</h1>
    <p class="text-2xl mt-3 font-regular text-brand-gray">Esse é o playground use para testar o widget.</p>
  </section>
  <section class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-gray">
    <h1 class="text-6xl font-black text-brand-graydark">Test</h1>
  </section>
  <section class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-main">
    <h1 class="text-6xl font-black text-brand-gray">Matheus</h1>
    <p class="text-2xl mt-3 font-regular text-brand-gray">Esse é o playground use para testar o widget.</p>
  </section>
  <section class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-gray">
    <h1 class="text-6xl font-black text-brand-graydark">AAA</h1>
  </section>
  <widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from '../Widget/index.vue'
export default defineComponent({
  components: { Widget }
})
</script>
