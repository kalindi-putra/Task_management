const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('./taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware); // Protect all routes below this line
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;

