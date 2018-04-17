import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg',
        id: '1',
        title: 'Meetup in Newyork',
        date: new Date(),
        location: 'New York',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        imageUrl: 'https://www.england.nhs.uk/london/wp-content/uploads/sites/8/2013/09/london-eye-1400x520.jpg',
        id: '2',
        title: 'Meetup in London',
        date: new Date(),
        location: 'london',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/Japan/Tokyo/Tokyo%20lead-xxlarge.jpg',
        id: '3',
        title: 'Meetup in Tokyo',
        date: new Date(),
        location: 'Tokyo',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: payload.id
      }
      // Reach to firebase and store it
      commit('createMeetup', meetup)
    },
    signUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        // Load meetups sorted by date
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      // Find specific meetup
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    user (state) {
      return state.user
    }
  }
})
