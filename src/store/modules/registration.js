import axios from 'axios'
import {error} from '@/utils/error'

export default {
    namespaced: true,
    state() {
        return {
            message: {}
        }
    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        clearMessage(state) {
            state.message = {}
        }
    },
    actions: {
        setMessage({commit}, message) {
            commit('setMessage', message)
        },
        async newUser({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                dispatch('setMessage', {
                    value: 'This email is not busy.',
                    type: 'primary'
                })
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                })
                throw new Error()
            }
        },
        async isHasEmail({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                console.log(data.registered)
                dispatch('setMessage', {
                    value: data.registered ? 'The email address is already in use by another account.' : 'This email is not busy.',
                    type: 'primary'
                })
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                })
                throw new Error()
            }
        },
    },
    getters: {

    }
}