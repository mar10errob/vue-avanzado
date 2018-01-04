<template lang="pug">
  main
    pm-notification(v-show="showNotification", :color="notify.type")
      p(slot="body") {{ notify.message }}

    section.section
      nav.navbar
        .container
          input.input.is-large(
            type = "text",
            placeholder="Buscar",
            v-model="searchQuery",
            @keyup.enter="search"
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
            pm-track(
              v-blur="track.preview_url",
              :class="{ 'is-active': track.id === selectedTrack }",
              :track="track",
              @select="setSelectedTrack")
</template>
<script>
import trackService from '@/services/track'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'app',
  components: { PmTrack, PmLoader, PmNotification },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: '',
      showNotification: false,
      notify: {
        type: '',
        message: ''
      }
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) {
        this.showNotification = true
        this.notify.type = 'is-danger'
        this.notify.message = 'No se ha realizado ninguna busqueda.'

        return
      }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(response => {
          this.showNotification = true
          if (response.tracks.total === 0) {
            this.notify.type = 'is-danger'
            this.notify.message = 'No se encontraron resultados.'
          } else {
            this.notify.type = 'is-success'
            this.notify.message = `Se ha encontrado ${response.tracks.total} resultados`
          }
          this.tracks = response.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  }
}
</script>
<style lang="scss">
  .results {
    margin-top: 20px;
  }

  .is-active {
    border: 3px #23d160 solid;
  }
</style>
