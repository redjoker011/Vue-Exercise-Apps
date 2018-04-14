<template>
  <v-container>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <h6 class="primary--text">My Meetup</h6>
        </v-card-title>
        <v-card-media
          :src= 'meetup.imageUrl'
          height="400px"
        ></v-card-media>
      <v-card-text>
        <div class="mb-2 info--text">{{ meetup.date }}</div>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has
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
     }
   }
 }
</script>

