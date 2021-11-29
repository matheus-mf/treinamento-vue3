<template>
  <section class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </section>

  <section class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </section>

  <section class="flex justify-center w-full pb-20">
    <article class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h2 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h2>
        <suspense>
          <template #default>
            <Filters
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <FiltersLoading
              class="mt-8"
            />
          </template>
        </suspense>
      </div>
      <div class="col-span-3 px-10 pt-20">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks :(
        </p>
        <p v-if="!state.feedbacks.length && !state.isLoading && !state.isLoadingFeedbacks && !state.isLoadingMoreFeedbacks && !state.hasError"
           class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido B)
        </p>
        <FeedbackCardLoading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <FeedbackCardLoading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </article>
  </section>
</template>

<script>
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue'

import services from '../../services'

import HeaderLogged from '../../components/HeaderLogged'
import FeedbackCard from '../../components/FeedbackCard'
import FeedbackCardLoading from '../../components/FeedbackCard/Loading'

import Filters from './Filters'
import FiltersLoading from './FiltersLoading'

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },
  setup () {
    const state = reactive({
      hasError: false,
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      pagination: {
        limit: 5,
        offset: 0
      },
      currentFeedbackType: '',
      feedbacks: []
    })

    onErrorCaptured(handleErrors)

    onMounted(() => {
      handleFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    function handleErrors (error) {
      state.hasError = !!error
    }

    async function handleScroll () {
      const isBottomOfWindow = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight

      if (state.isLoading || state.isLoadingMoreFeedbacks) return
      if (!isBottomOfWindow) return
      if (state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedbacks = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoadingMoreFeedbacks = false
      }
    }

    async function handleFeedbacks () {
      try {
        state.isLoading = true

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoading = false
      }
    }

    async function changeFeedbacksType (type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.limit = 5
        state.pagination.offset = 0
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoadingFeedbacks = false
      }
    }

    return {
      state,
      changeFeedbacksType
    }
  }
}
</script>
