import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg',
        id: '1',
        title: 'Meetup in Newyork',
        date: '2018-04-13'
      },
      {
        imageUrl: 'https://www.england.nhs.uk/london/wp-content/uploads/sites/8/2013/09/london-eye-1400x520.jpg',
        id: '2',
        title: 'Meetup in London',
        date: '2018-04-13'
      },
      {
        imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/Japan/Tokyo/Tokyo%20lead-xxlarge.jpg',
        id: '3',
        title: 'Meetup in Tokyo',
        date: '2018-04-13'
      }
    ],
    user: {
      id: 'asdsd',
      registeredMeetups: ['asdsdsa']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  }
})
