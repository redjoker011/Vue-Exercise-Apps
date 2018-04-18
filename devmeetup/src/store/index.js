import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    registerMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      // Remove key using Reflect
      Reflect.deleteProperty(state.user.fbKeys, payload)
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          console.log(meetups)
          commit('setLoading', false)
          commit('setLoadedMeetups', meetups)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.uid
      }
      // variable for image Url and key
      let imageUrl
      let key
      // Reach to firebase and store it
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          // get firebase record key/id
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          // Store Image on firebase storage
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          // get Image Url from firebase storage and referenced on Meetup
          // in firebase database
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    signUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const fetchedUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', fetchedUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {uid: payload.uid, registeredMeetups: [], fbKeys: {}})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updatedObj = { id: payload.id }
      if (payload.title) {
        updatedObj.title = payload.title
      }
      if (payload.description) {
        updatedObj.description = payload.description
      }
      if (payload.location) {
        updatedObj.location = payload.location
      }
      if (payload.date) {
        updatedObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updatedObj)
        .then((data) => {
          commit('setLoading', false)
          commit('updateMeetup', updatedObj)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    registerMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.uid).child('/registrations/').push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerMeetup', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        commit('setLoading', false)
        return
      }
      const fbKey = user.fbKeys[payload]
      // Remove record in firebase
      firebase.database().ref('/users/' + user.uid + '/registrations/').child(fbKey)
      .remove()
        .then(data => {
          commit('setLoading', false)
          commit('unregisterMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
