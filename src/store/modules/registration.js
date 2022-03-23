import axios from 'axios'
import {error} from '@/utils/error'

export default {
    namespaced: true,
    state() {

    },
    mutations: {
    },
    actions: {
        async newUser({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                console.log(data)
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

    }
}