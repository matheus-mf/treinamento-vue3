<template>
  <div id="modal-login" class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Entre na sua conta
    </h1>

    <button
      @click="handleClose"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          id="email-field"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          placeholder="john.doe@example.com"
        >
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>
      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          id="password-field"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          placeholder="***"
        >
        <span
          id="password-error"
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        id="submit-button"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :class="{
          'opacity-50': state.isLoading
        }"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import Icon from '../../components/Icon'
import { validadeEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'
import useModal from '../../hooks/useModal'
import services from '../../services'

export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const toast = useToast()
    const modal = useModal()

    const {
      value: email,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)
    const {
      value: password,
      errorMessage: passwordErrorMessage
    } = useField('password', validadeEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: email,
        errorMessage: emailErrorMessage
      },
      password: {
        value: password,
        errorMessage: passwordErrorMessage
      }
    })

    function handleClose () {
      modal.close()
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          window.localStorage.setItem('token', data.token)
          state.isLoading = false
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }
        if (errors.status === 401) {
          toast.error('E-mail ou senha inválidos')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }
      } catch (error) {
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o login')
      } finally {
        state.isLoading = false
      }
    }

    return { state, handleClose, handleSubmit }
  }
}
</script>
