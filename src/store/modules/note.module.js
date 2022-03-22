import axios from '../../axios/note'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            notes: []
        }
    },
    mutations: {
        setNotes(state, notes) {
            state.notes = notes
        },
        addNote(state, note) {
            state.notes.push(note)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/notes.json?auth=${token}`, payload)
                commit('addNote', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Note successfully created.',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/notes.json?auth=${token}`)
                const notes = Object.keys(data).map(id => ({...data[id], id}))
                commit('setNotes', notes)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        notes(state) {
            return state.notes
        }
    }
}
