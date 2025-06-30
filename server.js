const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('./'));

// Routes for user management
app.get('/users.json', (req, res) => {
    try {
        const usersPath = path.join(__dirname, 'users.json');
        if (!fs.existsSync(usersPath)) {
            fs.writeFileSync(usersPath, '[]');
        }
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        res.json(users);
    } catch (error) {
        console.error('Error reading users file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/users.json', (req, res) => {
    try {
        const users = req.body;
        const usersPath = path.join(__dirname, 'users.json');
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error writing users file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Create users.json if it doesn't exist
    const usersPath = path.join(__dirname, 'users.json');
    if (!fs.existsSync(usersPath)) {
        fs.writeFileSync(usersPath, '[]');
        console.log('Created empty users.json file');
    }
}); 