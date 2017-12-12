import Vue from 'vue'
import Vuex from 'vuex'
import todoService from '../services/todoservice';

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      todos: []
    },

    actions: {
      GET_TODOS({commit}) {
        return todoService.getItems().then((items) => {
          commit('updateTodo', items);
        });        
      },
    },

    mutations: {
      updateTodo(state, payload) {
        state.todos = payload;
      }
    },

    getters: {}
  })
}