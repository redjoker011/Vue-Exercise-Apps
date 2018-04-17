<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary"
          :width="7"
          :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup :meetup="meetup"></app-edit-meetup>
            </template>
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
    </v-layout>
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
     },
     userIsAuthenticated () {
       return this.$store.getters.user !== null && this.$store.getters.user !==
         undefined
     },
     userIsCreator () {
       if (!this.userIsAuthenticated) {
         return false
       }
       const user = this.$store.getters.user
       const meetup = this.meetup
       return user.uid === meetup.creatorId
     }
   }
 }
</script>
