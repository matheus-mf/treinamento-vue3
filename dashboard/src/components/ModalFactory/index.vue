<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToggle({status: false})"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <section
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <article class="flex flex-col px-12 py-10 bg-white">
            <component :is="state.component" v-bind="state.props"/>
          </article>
        </section>
      </div>
    </div>
  </teleport>
</template>

<script>
import { onBeforeMount, onMounted, reactive, defineAsyncComponent } from 'vue'
import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin, ModalCreateAccount
  },
  setup () {
    const { listen, off } = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    onMounted(() => {
      listen(handleModalToggle)
    })

    onBeforeMount(() => {
      off(handleModalToggle)
    })

    function handleModalToggle (payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActive = payload.status
    }

    return { state, handleModalToggle }
  }
}
</script>
