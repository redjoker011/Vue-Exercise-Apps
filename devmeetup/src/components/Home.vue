<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetups/new" class="info">Create Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary"
          :width="7"
          :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-else>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click.native="onLoadMeetup(meetup.id)"
            style="cursor: pointer"
            >
            <div class="title-container">
              <h3 class="title-container__content">{{ meetup.title }}</h3>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>
<style scoped>
  .title-container{
    position: absolute;
    bottom: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .title-container__content {
    background-color: rgba(0,0,0,0.5);
    padding: 10px;
    color: white;
  }
</style>
