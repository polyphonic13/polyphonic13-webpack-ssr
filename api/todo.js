const express = require('express');
const router = express.Router();
let id = 100;

router.get('/', (req, res, next) => {
  const todos = [
    { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Build Campaign', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> - Create Campaign for new client" },
    { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Add List Feature', subtitle: "<span class='grey--text text--darken-2'>Alex Scott</span> - Make a ToDo List Feature" },
    { id: ++id, avatar: 'http://i.pravatar.cc/60?cachebust=' + id, title: 'Remove Tech Debt', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Clean up the code" }
  ];
  res.json({ todos });
});

module.exports = router;
