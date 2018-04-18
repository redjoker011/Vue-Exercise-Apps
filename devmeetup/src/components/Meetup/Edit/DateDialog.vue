<template>
  <!-- showEditDialog will turn to true by activator -->
  <v-dialog width="350px" persistent v-model="showEditDialog">
    <!-- activator will display button outside dialog -->
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker
              v-model="editableDate"
              style="width: 100%"
              actions>
              <template>
                <v-btn class="blue--text darken-1"
                  flat
                  @click.native="showEditDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        // Current Meetup Date
        const newDate = new Date(this.meetup.date)
        // Create new date based on editable date
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        // Set new date based on editable date
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        // Dispatch Action
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      const meetupDate = new Date(this.meetup.date)
      // Set date to string format: yy-mm-dd
      this.editableDate = meetupDate.toISOString().slice(0, 10)
    }
  }
</script>
