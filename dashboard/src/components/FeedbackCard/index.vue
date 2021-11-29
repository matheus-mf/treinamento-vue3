<template>
  <section
    @click="handleToggle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <article class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </article>

    <article class="text-lg font-medium text-gray-800" >
      <p>{{ feedback.text }}</p>
    </article>

    <article
      :class="{
        'animate__fadeOutUp': state.isClosing
      }"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Página</span>
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Usuário</span>
          <span class="font-medium text-gray-700">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </article>

    <article v-else class="flex justify-end mt-8">
      <Icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </article>
  </section>
</template>

<script>
import { reactive } from 'vue'

import palette from '../../../palette'

import { getDiffTimeBetweenCurrentDate } from '../../utils/getDiffTimeBetweenCurrentDate'
import { wait } from '../../utils/timeout'

import Icon from '../Icon'
import Badge from './Badge'

export default {
  components: { Badge, Icon },
  props: {
    feedback: { type: Object, required: true },
    isOpened: { type: Boolean, default: false }
  },
  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handleToggle () {
      state.isClosing = true

      await wait(250)
      state.isClosing = !state.isClosing
      state.isOpen = !state.isOpen
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>
