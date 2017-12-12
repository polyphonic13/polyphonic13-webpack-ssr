let id = 0;

export default {
  getItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { header: 'Today' },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { divider: true, inset: true },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
          { divider: true, inset: true },
          { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" }
        ]);
      }, 600);
    });
  },
};
