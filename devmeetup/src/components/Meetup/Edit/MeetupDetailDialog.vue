<template>
  <!-- showEditDialog will turn to true by activator -->
  <v-dialog width="350px" persistent v-model="showEditDialog">
    <!-- activator will display button outside dialog -->
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="editedLocation"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                multi-line
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="showEditDialog =
                !showEditDialog">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedLocation: this.meetup.location,
        editeDate: this.meetup.date,
        showEditDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() ===
          '' || this.editedLocation.trim() === '') {
          return
        }
        this.showEditDialog = true
        const updatedMeetup = {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription,
          location: this.editedLocation,
          date: this.editedDate
        }
        this.$store.dispatch('updateMeetup', updatedMeetup)
      }
    }
  }
</script>
