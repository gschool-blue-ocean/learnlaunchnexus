const express = require('express');
const router = express.Router();

const admins = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
];

// CREATE: Add a new user
router.post('/', (req, res) => {
    const user = req.body;
    admins.push(user);
    res.status(201).send(user);
});

// READ: Get a list of all admins
router.get('/', (req, res) => {
    res.status(200).send(admins); // First status, then send
});


// READ: Get a single user by ID
router.get('/:id', (req, res) => {
    const user = admins.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// UPDATE: Update a user by ID
router.put('/:id', (req, res) => {
    const user = admins.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    Object.assign(user, req.body);
    res.send(user);
});

// DELETE: Delete a user by ID
router.delete('/:id', (req, res) => {
    const index = admins.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
    const user = admins.splice(index, 1);
    res.send(user);
});


module.exports = router;
