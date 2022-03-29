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
                const user = store.getters['auth/user']
                const {data} = await axios.post(`/users/${user.id}/notes.json?auth=${user.token}`, payload)
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
                const user = store.getters['auth/user']
                const {data} = await axios.get(`/users/${user.id}/notes.json?auth=${user.token}`)
                const notes = Object.keys(data).map(id => ({...data[id], id}))
                commit('setNotes', notes)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadOne({dispatch}, id) {
            try {
                const user = store.getters['auth/user']
                const {data} = await axios.get(`/users/${user.id}/notes/${id}.json?auth=${user.token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({dispatch}, id) {
            try {
                const user = store.getters['auth/user']
                await axios.delete(`/users/${user.id}/notes/${id}.json?auth=${user.token}`)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async update({dispatch}, note) {
            try {
                const user = store.getters['auth/user']
                await axios.put(`/users/${user.id}/notes/${note.id}.json?auth=${user.token}`, note)
                dispatch('setMessage', {
                    value: 'Note updated successfully!',
                    type: 'primary'
                }, {root: true})
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
