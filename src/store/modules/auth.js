import axios from 'axios'
import {error} from '@/utils/error'
const DATA_USER = 'data-user'

export default {
    namespaced: true,
    state() {
        return {
            user: JSON.parse(localStorage.getItem(DATA_USER))
        }
    },
    mutations: {
      setDataUser(state, userData) {
        state.user = userData
        localStorage.setItem(DATA_USER, JSON.stringify(userData))
      },
      logout(state) {
          state.name = null
          localStorage.removeItem(DATA_USER)
      }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                console.log(data)
                commit('setDataUser', {
                    id: data.localId,
                    name: data.displayName,
                    token: data.idToken
                })
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isAuthenticated(_, getters) {
            return !!getters.user
        }
    }
}