<template>
  <!-- showEditDialog will turn to true by activator -->
  <v-dialog width="350px" persistent v-model="showEditDialog">
    <!-- activator will display button outside dialog -->
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker
              v-model="editableTime"
              style="width: 100%"
              actions
              format="24hr"
              >
              <template>
                <v-btn class="blue--text darken-1"
                  flat
                  @click.native="showEditDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        showEditDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        // Current Meetup Date
        const newDate = new Date(this.meetup.date)
        // Change Hours and Minutes
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)

        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date)
    }
  }
</script>
