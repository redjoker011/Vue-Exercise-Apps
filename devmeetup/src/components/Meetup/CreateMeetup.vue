<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="createMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="image-url"
                label="Image Url"
                id="image-url"
                required
                v-model="imageUrl"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150"></img>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
                multi-line
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="success"
                :disabled="!formIsValid"
                type="submit"
                >CREATE MEETUP</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
 export default {
   data () {
     return {
       title: '',
       location: '',
       description: '',
       imageUrl: ''
     }
   },
   computed: {
     formIsValid () {
       return this.title !== '' &&
       this.location !== '' &&
       this.imageUrl !== '' &&
       this.description !== ''
     }
   },
   methods: {
     createMeetup () {
       if (this.formIsValid) {
         const meetupData = {
           title: this.title,
           location: this.location,
           imageUrl: this.imageUrl,
           description: this.description,
           date: new Date(),
           id: 'asdsd'
         }
         this.$store.dispatch('createMeetup', meetupData)
         this.$router.push('/meetups')
       }
     }
   }
 }
</script>
