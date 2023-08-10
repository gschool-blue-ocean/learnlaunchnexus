const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
];

// CREATE: Add a new user
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

// READ: Get a list of all users
router.get('/', (req, res) => {
    res.send(users);
});

// READ: Get a single user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// UPDATE: Update a user by ID
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    Object.assign(user, req.body);
    res.send(user);
});

// DELETE: Delete a user by ID
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
    const user = users.splice(index, 1);
    res.send(user);
});


module.exports = router;
