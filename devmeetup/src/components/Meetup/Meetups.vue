<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 xs10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src= 'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg'
                  height="125px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">My Meetup</h5>
                    <div>13th APril 2018</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/meetups/1">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout row wrap>
  </v-container>
</template>
