<template>
  <div>
    <h1>Hello {{ name }}</h1>
    <input type="text" v-model="name" />
    <br />

    <a :href="link">Link Curso!</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'Matheus',
    link: 'https://treinamento.vuejsbrasil.org/'
  })
}
</script>
