let id = 0;

export default {
  getItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { header: 'Today' },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Build Campaign', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> - Create Campaign for new client" },
          { divider: true, inset: true },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Add List Feature', subtitle: "<span class='grey--text text--darken-2'>Alex Scott</span> - Make a ToDo List Feature" },
          { divider: true, inset: true },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Remove Tech Debt', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Clean up the code" }
        ]);
      }, 600);
    });
  },
};
