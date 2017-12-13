import Vue from 'vue'
import Vuex from 'vuex'
import todoService from '../services/todoservice';

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      todos: [],
      error: null,
    },

    actions: {
      GET_TODOS({commit}) {
        return todoService.getItems().then(
          (items) => commit('updateTodo', items),
          (err) => commit('updateError', err)
        );
      },
    },

    mutations: {
      updateTodo(state, payload) {
        state.todos = payload;
      },
      updateError(state, payload) {
        state.error = payload;
      }
    },

    getters: {}
  })
}