const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Helper function to read tasks
const readTasks = async () => {
    const data = await fs.readFile(path.join(__dirname, '../task.json'), 'utf8');
    return JSON.parse(data).tasks;
};

// Helper function to write tasks
const writeTasks = async (tasks) => {
    await fs.writeFile(
        path.join(__dirname, '../task.json'),
        JSON.stringify({ tasks }, null, 2)
    );
};

// Validation middleware
const validateTask = (req, res, next) => {
    const { title, description, completed, priority } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            error: {
                message: 'Title and description are required',
                status: 400
            }
        });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({
            error: {
                message: 'Completed must be a boolean value',
                status: 400
            }
        });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
            error: {
                message: 'Priority must be low, medium, or high',
                status: 400
            }
        });
    }

    next();
};

// GET all tasks with filtering and sorting
router.get('/', async (req, res, next) => {
    try {
        let tasks = await readTasks();
        const { completed, sort } = req.query;

        // Filter by completion status
        if (completed !== undefined) {
            tasks = tasks.filter(task => task.completed === (completed === 'true'));
        }

        // Sort by creation date (using id as proxy for creation date)
        if (sort === 'date') {
            tasks.sort((a, b) => a.id - b.id);
        }

        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// GET tasks by priority
router.get('/priority/:level', async (req, res, next) => {
    try {
        const { level } = req.params;
        if (!['low', 'medium', 'high'].includes(level)) {
            return res.status(400).json({
                error: {
                    message: 'Invalid priority level',
                    status: 400
                }
            });
        }

        const tasks = await readTasks();
        const filteredTasks = tasks.filter(task => task.priority === level);
        res.json(filteredTasks);
    } catch (error) {
        next(error);
    }
});

// GET task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));

        if (!task) {
            return res.status(404).json({
                error: {
                    message: 'Task not found',
                    status: 404
                }
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
});

// POST new task
router.post('/', validateTask, async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false,
            priority: req.body.priority || 'medium',
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// PUT update task
router.put('/:id', validateTask, async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

        if (taskIndex === -1) {
            return res.status(404).json({
                error: {
                    message: 'Task not found',
                    status: 404
                }
            });
        }

        const updatedTask = {
            ...tasks[taskIndex],
            ...req.body,
            id: parseInt(req.params.id)
        };

        tasks[taskIndex] = updatedTask;
        await writeTasks(tasks);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

        if (taskIndex === -1) {
            return res.status(404).json({
                error: {
                    message: 'Task not found',
                    status: 404
                }
            });
        }

        const deletedTask = tasks[taskIndex];
        tasks.splice(taskIndex, 1);
        await writeTasks(tasks);
        res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 