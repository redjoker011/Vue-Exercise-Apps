<template>
  <!-- showEditDialog will turn to true by activator -->
  <v-dialog persistent width="300px" v-model="showRegistrationDialog">
    <!-- activator will display button outside dialog -->
    <v-btn accent class="primary" slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              You can always change your decision later on
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darker-1" flat
                @click="showRegistrationDialog = false">Cancel</v-btn>
              <v-btn
                class="success--text darken-1"
                @click="registerForMeetup">
                Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        showRegistrationDialog: false,
        editableTime: null
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      registerForMeetup () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerMeetup', this.meetupId)
        }
      }
    }
  }
</script>
