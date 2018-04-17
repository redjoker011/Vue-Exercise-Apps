import { store } from '../store'
// Auth Guard
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}
