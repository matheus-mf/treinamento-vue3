<template>
  <CustomHeader
    @create-account="handleAccountCreate"
    @login="handleLogin"
  />
  <contact/>
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedback &copysr; 2021</p>
  </footer>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader'
import Contact from './Contact'
import useModal from '../../hooks/useModal'

export default {
  components: { Contact, CustomHeader },
  setup () {
    const router = useRouter()
    const { open } = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
      open({
        component: 'ModalLogin'
      })
    }

    function handleAccountCreate () {
      open({
        component: 'ModalCreateAccount'
      })
    }

    return {
      handleAccountCreate,
      handleLogin
    }
  }
}
</script>
