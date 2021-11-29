<template>
  <section class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </section>

  <section class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </section>

  <section class="flex justify-center w-full h-full">
    <article class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>
      <ContentLoader v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
       />
      <div
        v-else
        class="flex justify-between py-3 pl-5 mt-2 items-center rounded bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasError">Error ao carregar o script</span>
        <span v-else id="apikey">{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!state.hasError" class="flex ml-20 mr-5">
          <Icon
            @click="handleCopy"
            name="Copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer" />
          <Icon
            id="generate-apikey"
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3" />
        </div>
      </div>
      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-20 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Error ao carregar o script</span>
        <pre v-else>&lt;script src="https://matheus-mf-feedbacker-widget.netlify.app?api_key={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
      </div>
    </article>
  </section>
</template>

<script>
import { reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'

import palette from '../../../palette'

import useStore from '../../hooks/useStore'

import { setApiKey } from '../../store/user'
import services from '../../services'

import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import Icon from '../../components/Icon'

export default {
  components: {
    HeaderLogged,
    ContentLoader,
    Icon
  },
  setup () {
    const store = useStore()
    const toast = useToast()

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    const state = reactive({
      isLoading: false,
      hasError: false
    })

    function handleError (error) {
      state.hasError = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.auth.generateApiKey()

        console.log(data)

        setApiKey(data.apiKey)
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
