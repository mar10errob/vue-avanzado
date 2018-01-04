<template lang="pug">
  section.hero.is-primary
    .hero-head
      header.navbar
        .container
          .navbar-brand
            .navbar-item
              strong Platzi Music
            button.button.navbar-burger(:class="{ 'is-active': showMenu }", @click="onToogleMenu")
              span
              span
              span
          .navbar-menu(:class="{ 'is-active': showMenu }")
            .navbar-end
              router-link(:to="{ name: 'search' }").navbar-item Buscar
              router-link(to="about").navbar-item Nosotros
    .hero-body
      .container.has-text-centered
        h1.title Platzi Music
        h2.subtitle Canciones que estan bien chidas
        pm-player
</template>
<script>
  import PmPlayer from '@/components/Player.vue'
  export default {
    data () {
      return {
        showMenu: false
      }
    },
    components: {PmPlayer},
    methods: {
      onToogleMenu () { this.showMenu = !this.showMenu }
    }
  }
</script>
