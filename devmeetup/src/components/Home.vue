<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">Create Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
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
  data () {
    return {
      meetups: [
        {
          imageUrl: 'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg',
          id: '1',
          title: 'Meetup in Newyork'
        },
        {
          imageUrl: 'https://www.england.nhs.uk/london/wp-content/uploads/sites/8/2013/09/london-eye-1400x520.jpg',
          id: '2',
          title: 'Meetup in London' },
        {
          imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/Japan/Tokyo/Tokyo%20lead-xxlarge.jpg',
          id: '3',
          title: 'Meetup in Tokyo'
        }
      ]
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
