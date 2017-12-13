import Vue from 'vue';
let id = 0;

export default {
  getItems() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/api/todo').then((resp) => {
        const todos = resp.body.todos;
        resolve([
          { header: 'Today' },
          todos[Math.floor(Math.random()*todos.length)],
          { divider: true, inset: true },
          todos[Math.floor(Math.random()*todos.length)],
          { divider: true, inset: true },
          todos[Math.floor(Math.random()*todos.length)],
        ]);
      }, reject);
    });
  },
};
