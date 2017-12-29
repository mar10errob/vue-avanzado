<template lang="pug">
  section.hero.is-primary
    .hero-head
      header.navbar
        .container
          .navbar-brand
            strong Platzi Music
          .navbar-menu
    .hero-body
      .container.has-text-centered
        h1.title Platzi Music
        h2.subtitle Canciones que estan bien chidas
        pm-player
</template>
<script>
  import PmPlayer from '@/components/Player.vue'
  export default {
    components: {PmPlayer}
  }
</script>
