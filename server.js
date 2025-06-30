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
        
        // For security, don't send password hashes to the client
        const safeUsers = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password, // We need to send this for authentication
            gameData: user.gameData || {
                highestLevel: 1,
                totalScore: 0,
                completedGames: 0
            }
        }));
        
        res.json(safeUsers);
    } catch (error) {
        console.error('Error reading users file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for updating users
app.put('/users.json', (req, res) => {
    try {
        const users = req.body;
        const usersPath = path.join(__dirname, 'users.json');
        
        // Validate the data before saving
        if (!Array.isArray(users)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }
        
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error writing users file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usersPath = path.join(__dirname, 'users.json');
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ error: 'Tên đăng nhập không tồn tại' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mật khẩu không chính xác' });
        }
        
        // Return user data without password
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            gameData: user.gameData || {
                highestLevel: 1,
                totalScore: 0,
                completedGames: 0
            }
        };
        
        res.json(userData);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const usersPath = path.join(__dirname, 'users.json');
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        
        // Check if username or email already exists
        if (users.some(u => u.username === username)) {
            return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });
        }
        
        if (users.some(u => u.email === email)) {
            return res.status(400).json({ error: 'Email đã được sử dụng' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            gameData: {
                highestLevel: 1,
                totalScore: 0,
                completedGames: 0
            }
        };
        
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        
        // Return success message
        res.status(201).json({ success: true, message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for updating user game data
app.post('/api/update-game-data', async (req, res) => {
    try {
        const { userId, gameData } = req.body;
        
        if (!userId || !gameData) {
            return res.status(400).json({ error: 'Thiếu thông tin cần thiết' });
        }
        
        const usersPath = path.join(__dirname, 'users.json');
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }
        
        // Update game data
        users[userIndex].gameData = gameData;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        
        res.json({ success: true, message: 'Cập nhật dữ liệu thành công' });
    } catch (error) {
        console.error('Error updating game data:', error);
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