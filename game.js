// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.usersFilePath = 'users.json';
        
        this.initializeEventListeners();
        this.checkLoggedInUser();
    }

    initializeEventListeners() {
        // Tab switching
        document.getElementById('login-tab').addEventListener('click', () => this.switchTab('login'));
        document.getElementById('register-tab').addEventListener('click', () => this.switchTab('register'));
        
        // Login
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('guest-login-btn').addEventListener('click', () => this.guestLogin());
        
        // Register
        document.getElementById('register-btn').addEventListener('click', () => this.register());
        
        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        
        // Handle Enter key press in login form
        document.getElementById('login-username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('login-password').focus();
            }
        });
        
        document.getElementById('login-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.login();
            }
        });
        
        // Handle Enter key press in register form
        document.getElementById('register-username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('register-email').focus();
            }
        });
        
        document.getElementById('register-email').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('register-password').focus();
            }
        });
        
        document.getElementById('register-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('register-confirm-password').focus();
            }
        });
        
        document.getElementById('register-confirm-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.register();
            }
        });
    }

    switchTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tabBtn => {
            tabBtn.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        // Update form visibility
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tab}-form`).classList.add('active');
        
        // Clear messages
        document.getElementById('login-message').textContent = '';
        document.getElementById('login-message').classList.remove('error', 'success');
        document.getElementById('login-message').style.display = 'none';
        
        document.getElementById('register-message').textContent = '';
        document.getElementById('register-message').classList.remove('error', 'success');
        document.getElementById('register-message').style.display = 'none';
        
        // Clear form fields when switching to a tab
        if (tab === 'login') {
            document.getElementById('login-username').value = '';
            document.getElementById('login-password').value = '';
        } else if (tab === 'register') {
            document.getElementById('register-username').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm-password').value = '';
        }
    }

    async getUsers() {
        try {
            const response = await fetch(this.usersFilePath);
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu người dùng');
            }
            return await response.json();
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu người dùng:', error);
            return [];
        }
    }

    async saveUsers(users) {
        try {
            const response = await fetch(this.usersFilePath, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
            
            if (!response.ok) {
                throw new Error('Không thể lưu dữ liệu người dùng');
            }
            
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu người dùng:', error);
            return false;
        }
    }

    async login() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const messageElement = document.getElementById('login-message');
        
        if (!username || !password) {
            this.showMessage(messageElement, 'Vui lòng nhập đầy đủ thông tin đăng nhập', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                this.showMessage(messageElement, data.error || 'Đăng nhập thất bại', 'error');
                return;
            }
            
            // Login successful
            this.currentUser = data;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            this.updateUserDisplay();
            this.showWelcomeScreen();
            
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            this.showMessage(messageElement, 'Đã xảy ra lỗi khi đăng nhập', 'error');
        }
    }

    guestLogin() {
        this.currentUser = {
            id: 'guest',
            username: 'Khách',
            gameData: {
                highestLevel: 1,
                totalScore: 0,
                completedGames: 0
            }
        };
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.updateUserDisplay();
        this.showWelcomeScreen();
    }

    async register() {
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const messageElement = document.getElementById('register-message');
        
        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            this.showMessage(messageElement, 'Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage(messageElement, 'Mật khẩu xác nhận không khớp', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage(messageElement, 'Mật khẩu phải có ít nhất 6 ký tự', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                this.showMessage(messageElement, data.error || 'Đăng ký thất bại', 'error');
                return;
            }
            
            this.showMessage(messageElement, data.message || 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.', 'success');
            
            // Clear form
            document.getElementById('register-username').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm-password').value = '';
            
            // Switch to login tab after a delay
            setTimeout(() => {
                this.switchTab('login');
            }, 2000);
            
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            this.showMessage(messageElement, 'Đã xảy ra lỗi khi đăng ký', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Reset game state if needed
        if (window.gameInstance) {
            window.gameInstance.restartGame();
        }
        
        // Ẩn thông tin game khi đăng xuất
        document.getElementById('game-info').style.display = 'none';
        
        this.updateUserDisplay();
        this.showAuthScreen();
    }

    checkLoggedInUser() {
        const savedUser = localStorage.getItem('currentUser');
        
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateUserDisplay();
                this.showWelcomeScreen();
            } catch (error) {
                console.error('Lỗi khi phân tích dữ liệu người dùng:', error);
                localStorage.removeItem('currentUser');
                this.showAuthScreen();
            }
        } else {
            // Make sure auth screen is shown if no user is logged in
            this.showAuthScreen();
        }
    }

    updateUserDisplay() {
        const userDisplay = document.getElementById('user-display');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (this.currentUser) {
            userDisplay.textContent = this.currentUser.username;
            logoutBtn.style.display = 'inline-block';
        } else {
            userDisplay.textContent = 'Khách';
            logoutBtn.style.display = 'none';
        }
    }

    showMessage(element, message, type) {
        element.textContent = message;
        element.classList.remove('error', 'success');
        element.classList.add(type);
        element.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }

    showAuthScreen() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('auth-screen').classList.add('active');
        // Ẩn thông tin game khi ở màn hình đăng nhập
        document.getElementById('game-info').style.display = 'none';
    }

    showWelcomeScreen() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('welcome-screen').classList.add('active');
        // Hiển thị thông tin game sau khi đăng nhập
        document.getElementById('game-info').style.display = 'flex';
    }

    // Method to save user game data
    async saveUserGameData(gameData) {
        if (!this.currentUser || this.currentUser.id === 'guest') {
            console.log('Không lưu dữ liệu cho người dùng khách');
            return; // Don't save data for guests
        }
        
        console.log('Lưu dữ liệu trò chơi cho người dùng:', this.currentUser.username);
        console.log('Dữ liệu trò chơi:', gameData);
        
        try {
            // Sử dụng API endpoint mới để cập nhật dữ liệu người dùng
            const response = await fetch('/api/update-game-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.currentUser.id,
                    gameData: gameData
                })
            });
            
            const data = await response.json();
            console.log('Kết quả lưu dữ liệu:', data);
            
            if (!response.ok) {
                console.error('Lỗi khi lưu dữ liệu trò chơi:', data.error);
                return;
            }
            
            // Update local storage
            this.currentUser.gameData = gameData;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            console.log('Đã cập nhật localStorage');
            
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu trò chơi:', error);
        }
    }
}

// Initialize Authentication System
const authSystem = new AuthSystem();

// Game State Management
class BankSecurityGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.currentTransaction = 0;
        this.totalTransactions = 5;
        this.transactions = [];
        this.currentTransactionData = null;
        this.timer = null;
        this.timeLeft = 30;
        this.processingTimes = [];
        
        // Load game data from user if available
        this.loadUserGameData();
        
        // RSA Keys
        this.rsaKeys = null;
        this.generateRSAKeys();
        
        this.initializeEventListeners();
        this.generateTransactions();
    }

    // Load game data from current user
    loadUserGameData() {
        if (authSystem.currentUser && authSystem.currentUser.gameData) {
            const { highestLevel, totalScore } = authSystem.currentUser.gameData;
            
            if (highestLevel > this.currentLevel) {
                this.currentLevel = highestLevel;
            }
            
            // Update UI
            document.getElementById('current-level').textContent = this.currentLevel;
        }
    }

    // Save game data to user
    saveGameData() {
        if (authSystem.currentUser) {
            const gameData = {
                highestLevel: Math.max(this.currentLevel, authSystem.currentUser.gameData?.highestLevel || 1),
                totalScore: (authSystem.currentUser.gameData?.totalScore || 0) + this.score,
                completedGames: (authSystem.currentUser.gameData?.completedGames || 0) + 1
            };
            
            authSystem.saveUserGameData(gameData);
        }
    }

    // Initialize RSA Keys
    generateRSAKeys() {
        const crypt = new JSEncrypt();
        crypt.getKey();
        this.rsaKeys = {
            public: crypt.getPublicKey(),
            private: crypt.getPrivateKey()
        };
    }

    // Initialize Event Listeners
    initializeEventListeners() {
        // Start Game Button
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.showScreen('game-screen');
            this.startNewTransaction();
        });

        // AES Encryption Button
        document.getElementById('encrypt-aes-btn').addEventListener('click', () => {
            this.performAESEncryption();
        });

        // RSA Verification Button
        document.getElementById('verify-rsa-btn').addEventListener('click', () => {
            this.performRSAVerification();
        });

        // SHA Verification Button
        document.getElementById('verify-sha-btn').addEventListener('click', () => {
            this.performSHAVerification();
        });

        // Process Transaction Button
        document.getElementById('process-transaction-btn').addEventListener('click', () => {
            this.processTransaction();
        });

        // Skip Transaction Button
        document.getElementById('skip-transaction-btn').addEventListener('click', () => {
            this.skipTransaction();
        });

        // Next Transaction Button
        document.getElementById('next-transaction-btn').addEventListener('click', () => {
            this.nextTransaction();
        });

        // View Summary Button
        document.getElementById('view-summary-btn').addEventListener('click', () => {
            this.showSummary();
        });

        // Next Level Button
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        // Restart Game Button
        document.getElementById('restart-game-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        // Hiển thị thông tin game khi ở các màn hình game
        if (screenId === 'auth-screen') {
            document.getElementById('game-info').style.display = 'none';
        } else {
            document.getElementById('game-info').style.display = 'flex';
        }
    }

    // Generate Transactions
    generateTransactions() {
        this.transactions = [];
        const transactionCount = this.getTransactionCountByLevel();
        for (let i = 0; i < transactionCount; i++) {
            // Mỗi khách hàng (fromAccount) có cặp khóa riêng
            const customerKey = new JSEncrypt({default_key_size: this.getRSAKeySizeByLevel()});
            customerKey.getKey();
            const customerPublic = customerKey.getPublicKey();
            const customerPrivate = customerKey.getPrivateKey();

            const transaction = {
                id: i + 1,
                fromAccount: this.generateAccountNumber(),
                toAccount: this.generateAccountNumber(),
                amount: this.generateAmount(),
                content: this.generateContent(),
                timestamp: new Date().toISOString(),
                signature: null,
                hash: null,
                encryptedData: null,
                customerPublic,
                customerPrivate,
                isFake: false // level 3 sẽ có giao dịch giả mạo
            };

            // Tạo dữ liệu giao dịch
            const transactionData = `${transaction.fromAccount}-${transaction.toAccount}-${transaction.amount}-${transaction.content}`;
            // Tạo chữ ký RSA
            const crypt = new JSEncrypt();
            crypt.setPrivateKey(customerPrivate);
            transaction.signature = crypt.sign(transactionData, CryptoJS.SHA256, "sha256");
            // Tạo hash SHA
            transaction.hash = CryptoJS.SHA256(transactionData).toString();

            // Level 3: một số giao dịch bị làm giả (chữ ký hoặc hash sai)
            if (this.currentLevel >= 3 && Math.random() < 0.3) {
                transaction.isFake = true;
                if (Math.random() < 0.5) {
                    // Làm giả chữ ký
                    transaction.signature = 'FAKE_SIGNATURE_' + transaction.signature;
                } else {
                    // Làm giả hash
                    transaction.hash = 'FAKE_HASH_' + transaction.hash;
                }
            }

            this.transactions.push(transaction);
        }
        this.totalTransactions = transactionCount;
    }

    // Số lượng giao dịch theo cấp độ
    getTransactionCountByLevel() {
        if (this.currentLevel === 1) return 5;
        if (this.currentLevel === 2) return 8;
        return 12;
    }

    // Độ dài khóa RSA theo cấp độ
    getRSAKeySizeByLevel() {
        if (this.currentLevel === 1) return 512;
        if (this.currentLevel === 2) return 1024;
        return 2048;
    }

    // Thời gian xử lý theo cấp độ
    getTimeLimitByLevel() {
        if (this.currentLevel === 1) return 30;
        if (this.currentLevel === 2) return 20;
        return 15;
    }

    // Generate Random Account Number
    generateAccountNumber() {
        return Math.floor(Math.random() * 9000000000) + 1000000000;
    }

    // Generate Random Amount
    generateAmount() {
        const amounts = [100000, 250000, 500000, 750000, 1000000, 1500000, 2000000, 5000000];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }

    // Generate Random Content
    generateContent() {
        const contents = [
            "Chuyển tiền học phí",
            "Thanh toán hóa đơn điện",
            "Chuyển tiền cho gia đình",
            "Mua sắm trực tuyến",
            "Thanh toán thẻ tín dụng",
            "Chuyển tiền tiết kiệm",
            "Thanh toán dịch vụ",
            "Chuyển tiền đầu tư"
        ];
        return contents[Math.floor(Math.random() * contents.length)];
    }

    // Start New Transaction
    startNewTransaction() {
        if (this.currentTransaction >= this.totalTransactions) {
            this.showGameOver();
            return;
        }

        this.currentTransactionData = this.transactions[this.currentTransaction];
        this.displayTransaction();
        this.resetSteps();
        this.startTimer();
        this.updateUI();
    }

    // Display Transaction
    displayTransaction() {
        document.getElementById('transaction-number').textContent = this.currentTransactionData.id;
        document.getElementById('from-account').textContent = this.currentTransactionData.fromAccount;
        document.getElementById('to-account').textContent = this.currentTransactionData.toAccount;
        document.getElementById('amount').textContent = this.formatCurrency(this.currentTransactionData.amount);
        document.getElementById('content').textContent = this.currentTransactionData.content;
    }

    // Format Currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }

    // Reset Steps
    resetSteps() {
        const steps = ['aes', 'rsa', 'sha'];
        steps.forEach(step => {
            const stepElement = document.getElementById(`step-${step}`);
            const statusElement = document.getElementById(`${step}-status`);
            const resultElement = document.getElementById(`${step}-result`);
            
            stepElement.classList.remove('completed', 'failed');
            statusElement.textContent = 'Chưa thực hiện';
            statusElement.className = 'step-status';
            resultElement.classList.remove('show');
            resultElement.textContent = '';
        });

        // Reset buttons
        document.getElementById('encrypt-aes-btn').disabled = false;
        document.getElementById('verify-rsa-btn').disabled = true;
        document.getElementById('verify-sha-btn').disabled = true;
        document.getElementById('process-transaction-btn').disabled = true;
    }

    // Start Timer
    startTimer() {
        this.timeLeft = this.getTimeLimitByLevel();
        this.updateTimer();
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    // Update Timer
    updateTimer() {
        document.getElementById('timer').textContent = this.timeLeft;
        
        // Change color based on time left
        const timerElement = document.querySelector('.transaction-timer');
        if (this.timeLeft <= 10) {
            timerElement.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        } else if (this.timeLeft <= 20) {
            timerElement.style.background = 'linear-gradient(135deg, #ffc107, #e0a800)';
        }
    }

    // Time Up
    timeUp() {
        clearInterval(this.timer);
        this.showResult(false, 'Hết thời gian!');
    }

    // Update UI
    updateUI() {
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('processed-transactions').textContent = this.currentTransaction;
        document.getElementById('total-transactions').textContent = this.totalTransactions;
    }

    // Perform AES Encryption
    performAESEncryption() {
        const button = document.getElementById('encrypt-aes-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Mã hóa...';
        button.disabled = true;
        setTimeout(() => {
            try {
                const transactionData = {
                    fromAccount: this.currentTransactionData.fromAccount,
                    toAccount: this.currentTransactionData.toAccount,
                    amount: this.currentTransactionData.amount,
                    content: this.currentTransactionData.content,
                    timestamp: this.currentTransactionData.timestamp
                };
                // Độ dài khóa AES theo cấp độ
                const keySize = this.currentLevel === 1 ? 128 : (this.currentLevel === 2 ? 192 : 256);
                const key = CryptoJS.lib.WordArray.random(keySize/8);
                const iv = CryptoJS.lib.WordArray.random(128/8);
                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(transactionData), key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                this.currentTransactionData.encryptedData = {
                    ciphertext: encrypted.toString(),
                    key: key.toString(),
                    iv: iv.toString()
                };
                this.updateStep('aes', true, `Giao dịch được mã hóa thành công bằng AES (${keySize} bit)`);
                document.getElementById('aes-result').textContent = `Dữ liệu đã được mã hóa: ${encrypted.toString().substring(0, 50)}...`;
                document.getElementById('aes-result').classList.add('show');
                document.getElementById('verify-rsa-btn').disabled = false;
            } catch (error) {
                this.updateStep('aes', false, 'Lỗi mã hóa AES!');
                console.error('AES Encryption Error:', error);
            }
            button.innerHTML = originalText;
        }, 1500);
    }

    // Perform RSA Verification
    performRSAVerification() {
        const button = document.getElementById('verify-rsa-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Xác thực...';
        button.disabled = true;
        setTimeout(() => {
            try {
                const transactionData = `${this.currentTransactionData.fromAccount}-${this.currentTransactionData.toAccount}-${this.currentTransactionData.amount}-${this.currentTransactionData.content}`;
                const crypt = new JSEncrypt();
                crypt.setPublicKey(this.currentTransactionData.customerPublic);
                const isValid = crypt.verify(transactionData, this.currentTransactionData.signature, CryptoJS.SHA256);
                if (isValid) {
                    this.updateStep('rsa', true, 'Chữ ký RSA hợp lệ');
                    document.getElementById('rsa-result').textContent = `Chữ ký hợp lệ: ${this.currentTransactionData.signature.substring(0, 50)}...`;
                    document.getElementById('rsa-result').classList.add('show');
                    document.getElementById('verify-sha-btn').disabled = false;
                } else {
                    this.updateStep('rsa', false, 'Xác thực RSA thất bại – giao dịch bị từ chối');
                }
            } catch (error) {
                this.updateStep('rsa', false, 'Lỗi xác thực RSA!');
                console.error('RSA Verification Error:', error);
            }
            button.innerHTML = originalText;
        }, 1200);
    }

    // Perform SHA Verification
    performSHAVerification() {
        const button = document.getElementById('verify-sha-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Kiểm tra...';
        button.disabled = true;
        setTimeout(() => {
            try {
                const transactionData = `${this.currentTransactionData.fromAccount}-${this.currentTransactionData.toAccount}-${this.currentTransactionData.amount}-${this.currentTransactionData.content}`;
                const calculatedHash = CryptoJS.SHA256(transactionData).toString();
                const originalHash = this.currentTransactionData.hash;
                let valid = calculatedHash === originalHash;
                // Level 3: kiểm tra toàn vẹn nhiều bước (có thể kiểm tra lại hash phụ)
                if (this.currentLevel >= 3 && this.currentTransactionData.isFake && originalHash.startsWith('FAKE_HASH_')) {
                    valid = false;
                }
                if (valid) {
                    this.updateStep('sha', true, 'Mã băm SHA khớp – giao dịch an toàn');
                    document.getElementById('sha-result').textContent = `Hash hợp lệ: ${calculatedHash.substring(0, 50)}...`;
                    document.getElementById('sha-result').classList.add('show');
                    document.getElementById('process-transaction-btn').disabled = false;
                } else {
                    this.updateStep('sha', false, 'Mã băm SHA không khớp – giao dịch bị từ chối');
                }
            } catch (error) {
                this.updateStep('sha', false, 'Lỗi kiểm tra SHA!');
                console.error('SHA Verification Error:', error);
            }
            button.innerHTML = originalText;
        }, 1000);
    }

    // Update Step Status
    updateStep(step, success, message) {
        const stepElement = document.getElementById(`step-${step}`);
        const statusElement = document.getElementById(`${step}-status`);
        
        if (success) {
            stepElement.classList.add('completed');
            stepElement.classList.remove('failed');
            statusElement.textContent = message;
            statusElement.classList.add('completed');
        } else {
            stepElement.classList.add('failed');
            stepElement.classList.remove('completed');
            statusElement.textContent = message;
            statusElement.classList.add('failed');
        }
    }

    // Process Transaction
    processTransaction() {
        clearInterval(this.timer);
        const aesCompleted = document.getElementById('step-aes').classList.contains('completed');
        const rsaCompleted = document.getElementById('step-rsa').classList.contains('completed');
        const shaCompleted = document.getElementById('step-sha').classList.contains('completed');
        let success = aesCompleted && rsaCompleted && shaCompleted;
        let message = '';
        if (success) {
            message = 'Bạn đã xử lý giao dịch một cách an toàn và bảo mật.';
        } else {
            if (!aesCompleted) message = 'Sai bước mã hóa AES!';
            else if (!rsaCompleted) message = 'Sai bước xác thực RSA!';
            else if (!shaCompleted) message = 'Sai bước kiểm tra toàn vẹn SHA!';
        }
        let pointsEarned = success ? 10 : 0;
        if (success) {
            const processingTime = this.getTimeLimitByLevel() - this.timeLeft;
            this.processingTimes.push(processingTime);
            this.score += pointsEarned;
            this.currentTransaction++;
            this.showResult(true, message, pointsEarned, processingTime);
        } else {
            this.currentTransaction++;
            this.showResult(false, message, 0, this.getTimeLimitByLevel() - this.timeLeft);
        }
    }

    // Skip Transaction
    skipTransaction() {
        clearInterval(this.timer);
        this.currentTransaction++;
        this.showResult(false, 'Đã bỏ qua giao dịch!');
    }

    // Show Result
    showResult(success, message, pointsEarned = 0, processingTime = 0) {
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');
        const pointsElement = document.getElementById('points-earned');
        const timeElement = document.getElementById('processing-time');
        
        if (success) {
            resultIcon.className = 'fas fa-check-circle success';
            resultTitle.textContent = 'Giao dịch thành công!';
            resultMessage.textContent = message;
            pointsElement.textContent = `+${pointsEarned}`;
            timeElement.textContent = `${processingTime}s`;
        } else {
            resultIcon.className = 'fas fa-times-circle failed';
            resultTitle.textContent = 'Giao dịch thất bại!';
            resultMessage.textContent = message;
            pointsElement.textContent = '+0';
            timeElement.textContent = `${this.getTimeLimitByLevel() - this.timeLeft}s`;
        }
        
        this.showScreen('result-screen');
    }

    // Next Transaction
    nextTransaction() {
        if (this.currentTransaction >= this.totalTransactions) {
            this.showGameOver();
        } else {
            this.showScreen('game-screen');
            this.startNewTransaction();
        }
    }

    // Show Game Over
    showGameOver() {
        clearInterval(this.timer);
        
        // Calculate average processing time
        const avgTime = this.processingTimes.length > 0 
            ? this.processingTimes.reduce((a, b) => a + b, 0) / this.processingTimes.length 
            : 0;
        
        // Update final stats
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-transactions').textContent = this.currentTransaction;
        document.getElementById('avg-time').textContent = avgTime.toFixed(1) + 's';
        
        // Save game data
        this.saveGameData();
        
        this.showScreen('game-over-screen');
    }

    // Show Summary
    showSummary() {
        // For now, just go to next transaction
        this.nextTransaction();
    }

    // Next Level
    nextLevel() {
        this.saveGameData(); // Save game data before moving to next level
        this.currentLevel++;
        this.score = 0;
        this.currentTransaction = 0;
        this.generateTransactions();
        
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('processed-transactions').textContent = this.currentTransaction;
        document.getElementById('total-transactions').textContent = this.totalTransactions;
        
        this.showScreen('game-screen');
        this.startNewTransaction();
    }

    // Restart Game
    restartGame() {
        this.saveGameData(); // Save game data before restarting
        this.score = 0;
        this.currentTransaction = 0;
        this.generateTransactions();
        
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('processed-transactions').textContent = this.currentTransaction;
        document.getElementById('total-transactions').textContent = this.totalTransactions;
        
        this.showScreen('welcome-screen');
    }
}

// Initialize Game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BankSecurityGame();
});

// Add some educational tooltips and information
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips for algorithm cards
    const algorithmCards = document.querySelectorAll('.algorithm-card');
    algorithmCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            let description = '';
            
            switch(title) {
                case 'AES':
                    description = 'Advanced Encryption Standard - Thuật toán mã hóa đối xứng, được sử dụng để bảo vệ dữ liệu nhạy cảm như thông tin tài khoản và số tiền giao dịch.';
                    break;
                case 'RSA':
                    description = 'Rivest-Shamir-Adleman - Thuật toán mã hóa bất đối xứng, được sử dụng để xác thực người gửi và đảm bảo tính toàn vẹn của giao dịch.';
                    break;
                case 'SHA':
                    description = 'Secure Hash Algorithm - Thuật toán tạo mã hash, được sử dụng để kiểm tra tính toàn vẹn của dữ liệu và phát hiện các thay đổi không mong muốn.';
                    break;
            }
            
            alert(`${title}\n\n${description}`);
        });
    });
});

// Initialize Game Instance
window.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new BankSecurityGame();
});