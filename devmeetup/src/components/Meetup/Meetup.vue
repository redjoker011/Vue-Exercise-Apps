<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary"
          :width="7"
          :size="70"
          v-if="loading">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-flex xs12 v-if="!loading">
      <v-card>
        <v-card-title>
          <h6 class="primary--text">My Meetup</h6>
        </v-card-title>
        <v-card-media
          :src= 'meetup.imageUrl'
          height="400px"
        ></v-card-media>
      <v-card-text>
        <div class="mb-2 info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
        <div>
          {{ meetup.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="success--text">Register</v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
 export default {
   props: ['id'],
   computed: {
     meetup () {
       return this.$store.getters.loadedMeetup(this.id)
     },
     loading () {
       return this.$store.getters.loading
     }
   }
 }
</script>

