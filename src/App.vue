<template lang="pug">
  #app
    pm-header
    section.section
      nav.navbar.has-shadow
        .container
          input.input.is-large(
            type = "text",
            placeholder="Buscar",
            v-model="searchQuery"
          )
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{ searchMessage }}
      pm-loader(v-show="isLoading")
      .container.results(v-show="!isLoading")
        .columns.is-multiline
          .column.is-one-quarter(v-for="track in tracks")
            pm-track(:track="track")
    pm-footer
</template>
<script>
import trackService from '@/services/track'
import PmFooter from '@/components/layout/Footer.vue'
import PmHeader from '@/components/layout/Header.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',
  components: { PmFooter, PmHeader, PmTrack, PmLoader },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(response => {
          this.tracks = response.tracks.items
          this.isLoading = false
        })
    }
  }
}
</script>
<style lang="scss">
  @import './scss/main.scss';

  .results{
    margin-top: 20px;
  }
</style>
