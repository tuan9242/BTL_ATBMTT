// Travel Combo Data
const travelCombos = [
    {
        id: 1,
        title: "Đà Lạt Lãng Mạn",
        destination: "da-lat",
        duration: "3 ngày 2 đêm",
        price: "4,500,000",
        originalPrice: "5,500,000",
        image: "dalat-combo.jpg",
        badge: "HOT",
        description: "Khám phá thành phố ngàn hoa với những trải nghiệm lãng mạn tuyệt vời",
        features: ["Vé máy bay", "Khách sạn 4*", "Xe đưa đón", "Ăn sáng", "Tour city"],
        budget: "under-5",
        durationCategory: "2-3",
        highlights: [
            "Tham quan Thiền Viện Trúc Lâm",
            "Đi cáp treo Đà Lạt",
            "Chụp ảnh tại Crazy House",
            "Thưởng thức cà phê tại Mê Linh Coffee Garden",
            "Tham quan Dinh Bảo Đại"
        ],
        itinerary: {
            day1: "Đón tại sân bay - Check-in khách sạn - Tham quan trung tâm thành phố",
            day2: "Tour thiên nhiên - Thác Elephant - Hồ Tuyền Lâm - Thiền Viện Trúc Lâm",
            day3: "Tự do mua sắm - Ra sân bay"
        }
    },
    {
        id: 2,
        title: "Hạ Long Kỳ Thú",
        destination: "ha-long",
        duration: "2 ngày 1 đêm",
        price: "3,200,000",
        originalPrice: "3,800,000",
        image: "halong-combo.jpg",
        badge: "SALE",
        description: "Khám phá vịnh Hạ Long - kỳ quan thiên nhiên thế giới với du thuyền sang trọng",
        features: ["Du thuyền 5*", "Buffet hải sản", "Kayak", "Hang Sửng Sốt", "Đảo Titop"],
        budget: "under-5",
        durationCategory: "2-3",
        highlights: [
            "Du ngoạn vịnh Hạ Long trên du thuyền",
            "Tham quan Hang Sửng Sốt",
            "Leo núi tại Đảo Titop",
            "Chèo kayak khám phá hang động",
            "Thưởng thức hải sản tươi sống"
        ],
        itinerary: {
            day1: "Đón tại Hà Nội - Đến Hạ Long - Lên du thuyền - Ăn trưa - Hang Sửng Sốt",
            day2: "Đảo Titop - Kayak - Ăn trưa - Về Hà Nội"
        }
    },
    {
        id: 3,
        title: "Hội An Cổ Kính",
        destination: "hoi-an",
        duration: "4 ngày 3 đêm",
        price: "6,800,000",
        originalPrice: "8,200,000",
        image: "hoian-combo.jpg",
        badge: "NEW",
        description: "Trải nghiệm phố cổ Hội An với những nét văn hóa truyền thống độc đáo",
        features: ["Resort 5*", "Xe đạp", "Đèn lồng", "Ẩm thực", "Làng gốm Thanh Hà"],
        budget: "5-10",
        durationCategory: "4-5",
        highlights: [
            "Dạo bộ phố cổ Hội An về đêm",
            "Thả đèn hoa đăng trên sông Hoài",
            "Tham quan làng gốm Thanh Hà",
            "Học nấu ăn món Hội An",
            "Tham quan rừng dừa Bảy Mẫu"
        ],
        itinerary: {
            day1: "Bay đến Đà Nẵng - Về Hội An - Check-in resort - Tham quan phố cổ",
            day2: "Làng gốm Thanh Hà - Rừng dừa Bảy Mẫu - Chợ đêm Hội An",
            day3: "Tự do nghỉ dưỡng tại resort - Spa - Thả đèn hoa đăng",
            day4: "Mua sắm - Ra sân bay về"
        }
    },
    {
        id: 4,
        title: "Phú Quốc Thiên Đường",
        destination: "phu-quoc",
        duration: "5 ngày 4 đêm",
        price: "12,500,000",
        originalPrice: "15,000,000",
        image: "phuquoc-combo.jpg",
        badge: "LUXURY",
        description: "Nghỉ dưỡng tại đảo ngọc Phú Quốc với những bãi biển tuyệt đẹp",
        features: ["Resort 5*", "Buffet sáng", "Spa", "Cáp treo", "Safari", "Sunset Town"],
        budget: "10-20",
        durationCategory: "4-5",
        highlights: [
            "Tham quan Vinpearl Safari Phú Quốc",
            "Đi cáp treo Hon Thom dài nhất thế giới",
            "Nghỉ dưỡng tại resort 5 sao",
            "Khám phá Sunset Town về đêm",
            "Thưởng thức hải sản tươi sống"
        ],
        itinerary: {
            day1: "Bay đến Phú Quốc - Check-in resort - Nghỉ ngơi",
            day2: "Vinpearl Safari - Cáp treo Hon Thom - Sunset Town",
            day3: "Tour 4 đảo - Lặn ngắm san hô - Câu cá",
            day4: "Spa - Nghỉ dưỡng tại resort - Mua sắm",
            day5: "Tự do - Ra sân bay về"
        }
    },
    {
        id: 5,
        title: "Sa Pa Hùng Vĩ",
        destination: "sapa",
        duration: "3 ngày 2 đêm",
        price: "4,200,000",
        originalPrice: "5,000,000",
        image: "sapa-combo.jpg",
        badge: "TRENDING",
        description: "Chinh phục đỉnh Fansipan và khám phá văn hóa các dân tộc thiểu số",
        features: ["Khách sạn 4*", "Cáp treo Fansipan", "Bản Cát Cát", "Tàu hỏa", "Trekking"],
        budget: "under-5",
        durationCategory: "2-3",
        highlights: [
            "Chinh phục đỉnh Fansipan bằng cáp treo",
            "Trekking qua ruộng bậc thang Mường Hoa",
            "Tham quan bản Cát Cát",
            "Khám phá chợ tình Sa Pa",
            "Thưởng thức ẩm thực núi rừng"
        ],
        itinerary: {
            day1: "Tàu hỏa từ Hà Nội - Đến Sa Pa - Check-in - Tham quan thị trấn",
            day2: "Cáp treo Fansipan - Bản Cát Cát - Chợ tình Sa Pa",
            day3: "Trekking ruộng bậc thang - Về Hà Nội"
        }
    },
    {
        id: 6,
        title: "Nha Trang Biển Xanh",
        destination: "nha-trang",
        duration: "4 ngày 3 đêm",
        price: "7,800,000",
        originalPrice: "9,200,000",
        image: "nhatrang-combo.jpg",
        badge: "POPULAR",
        description: "Tận hưởng biển xanh cát trắng Nha Trang với các hoạt động thể thao biển",
        features: ["Resort biển 4*", "Tour 4 đảo", "Lặn biển", "Tắm bùn", "Vinpearland"],
        budget: "5-10",
        durationCategory: "4-5",
        highlights: [
            "Tour 4 đảo Nha Trang",
            "Lặn ngắm san hô tại Hòn Mun",
            "Tắm bùn khoáng I-Resort",
            "Vui chơi tại Vinpearland",
            "Thưởng thức hải sản bãi biển"
        ],
        itinerary: {
            day1: "Bay đến Nha Trang - Check-in resort - Nghỉ ngơi tại bãi biển",
            day2: "Tour 4 đảo - Lặn ngắm san hô - Câu cá",
            day3: "Vinpearland - Tắm bùn khoáng - Massage",
            day4: "Tự do - Mua sắm - Ra sân bay"
        }
    }
];

// DOM Elements
const comboGrid = document.getElementById('combo-results');
const modal = document.getElementById('combo-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const destinationCards = document.querySelectorAll('.destination-card');

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    displayCombos(travelCombos);
    initializeEventListeners();
    initializeNavigation();
    initializeDestinationCards();
});

// Display combo cards
function displayCombos(combos) {
    if (!comboGrid) return;
    
    comboGrid.innerHTML = '';
    
    if (combos.length === 0) {
        comboGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>Không tìm thấy combo phù hợp</h3>
                <p>Hãy thử thay đổi tiêu chí tìm kiếm của bạn</p>
            </div>
        `;
        return;
    }
    
    combos.forEach(combo => {
        const comboCard = createComboCard(combo);
        comboGrid.appendChild(comboCard);
    });
}

// Create combo card element
function createComboCard(combo) {
    const card = document.createElement('div');
    card.className = 'combo-card';
    card.onclick = () => showComboDetails(combo);
    
    card.innerHTML = `
        <div class="combo-image" style="background-image: url('data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 400 250\\"><rect fill=\\"${getDestinationColor(combo.destination)}\\" width=\\"400\\" height=\\"250\\"/><text x=\\"200\\" y=\\"125\\" text-anchor=\\"middle\\" fill=\\"white\\" font-family=\\"Arial\\" font-size=\\"24\\" font-weight=\\"bold\\">${combo.title}</text></svg>')">
            <div class="combo-badge">${combo.badge}</div>
        </div>
        <div class="combo-info">
            <h3>${combo.title}</h3>
            <p>${combo.description}</p>
            <div class="combo-details">
                <div class="combo-duration">
                    <i class="fas fa-clock"></i>
                    <span>${combo.duration}</span>
                </div>
                <div class="combo-price">
                    <span style="text-decoration: line-through; font-size: 0.9rem; color: #999;">${formatPrice(combo.originalPrice)}đ</span>
                    <span>${formatPrice(combo.price)}đ</span>
                </div>
            </div>
            <div class="combo-features">
                ${combo.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <button class="combo-btn" onclick="event.stopPropagation(); bookCombo(${combo.id})">
                <i class="fas fa-calendar-check"></i>
                Đặt Ngay
            </button>
        </div>
    `;
    
    return card;
}

// Get destination color for card background
function getDestinationColor(destination) {
    const colors = {
        'da-lat': '#ff69b4',
        'ha-long': '#20b2aa',
        'hoi-an': '#ffd700',
        'phu-quoc': '#00bfff',
        'sapa': '#32cd32',
        'nha-trang': '#87ceeb',
        'da-nang': '#ff6347',
        'ho-chi-minh': '#9370db'
    };
    return colors[destination] || '#667eea';
}

// Format price with thousand separators
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Search combos based on criteria
function searchCombos() {
    const destination = document.getElementById('destination-select').value;
    const duration = document.getElementById('duration-select').value;
    const budget = document.getElementById('budget-select').value;
    
    let filteredCombos = travelCombos;
    
    if (destination) {
        filteredCombos = filteredCombos.filter(combo => combo.destination === destination);
    }
    
    if (duration) {
        filteredCombos = filteredCombos.filter(combo => combo.durationCategory === duration);
    }
    
    if (budget) {
        filteredCombos = filteredCombos.filter(combo => combo.budget === budget);
    }
    
    // Add loading animation
    comboGrid.innerHTML = '<div class="loading-container" style="text-align: center; padding: 3rem;"><div class="loading"></div><p style="margin-top: 1rem;">Đang tìm kiếm combo phù hợp...</p></div>';
    
    // Simulate API call delay
    setTimeout(() => {
        displayCombos(filteredCombos);
        
        // Scroll to results
        document.getElementById('combos').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Show combo details in modal
function showComboDetails(combo) {
    modalBody.innerHTML = `
        <div class="combo-detail-header">
            <div class="combo-detail-image" style="background-image: url('data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 800 400\\"><rect fill=\\"${getDestinationColor(combo.destination)}\\" width=\\"800\\" height=\\"400\\"/><text x=\\"400\\" y=\\"200\\" text-anchor=\\"middle\\" fill=\\"white\\" font-family=\\"Arial\\" font-size=\\"36\\" font-weight=\\"bold\\">${combo.title}</text></svg>'); height: 300px; background-size: cover; background-position: center; border-radius: 15px; margin-bottom: 2rem; position: relative;">
                <div class="combo-badge" style="position: absolute; top: 15px; right: 15px;">${combo.badge}</div>
            </div>
            <div class="combo-detail-info">
                <h2>${combo.title}</h2>
                <p style="font-size: 1.1rem; color: #666; margin-bottom: 1.5rem;">${combo.description}</p>
                <div class="combo-detail-price" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <span style="font-size: 2rem; font-weight: 700; color: #ff6b6b;">${formatPrice(combo.price)}đ</span>
                    <span style="text-decoration: line-through; color: #999;">${formatPrice(combo.originalPrice)}đ</span>
                    <span style="background: #e8f5e8; color: #2e7d32; padding: 5px 10px; border-radius: 15px; font-size: 0.9rem; font-weight: 600;">
                        Tiết kiệm ${formatPrice((parseInt(combo.originalPrice.replace(/,/g, '')) - parseInt(combo.price.replace(/,/g, ''))).toString())}đ
                    </span>
                </div>
            </div>
        </div>
        
        <div class="combo-detail-content">
            <div class="detail-section">
                <h3><i class="fas fa-star"></i> Điểm nổi bật</h3>
                <ul>
                    ${combo.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-calendar-alt"></i> Lịch trình</h3>
                <div class="itinerary">
                    ${Object.entries(combo.itinerary).map(([day, activity], index) => `
                        <div class="itinerary-day">
                            <div class="day-number">Ngày ${index + 1}</div>
                            <div class="day-activity">${activity}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-check-circle"></i> Dịch vụ bao gồm</h3>
                <div class="features-grid">
                    ${combo.features.map(feature => `<div class="feature-item"><i class="fas fa-check"></i> ${feature}</div>`).join('')}
                </div>
            </div>
            
            <div class="booking-section">
                <button class="book-now-btn" onclick="bookCombo(${combo.id})">
                    <i class="fas fa-paper-plane"></i>
                    Đặt Ngay - ${formatPrice(combo.price)}đ
                </button>
                <p style="text-align: center; margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    <i class="fas fa-phone"></i> Gọi ngay: <strong>+84 123 456 789</strong> để được tư vấn
                </p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Book combo
function bookCombo(comboId) {
    const combo = travelCombos.find(c => c.id === comboId);
    alert(`Cảm ơn bạn đã quan tâm đến combo "${combo.title}"!\n\nChúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đặt chỗ.\n\nHotline: +84 123 456 789\nEmail: info@travelcombo.vn`);
    
    // Close modal if open
    if (modal.style.display === 'block') {
        closeModalFunction();
    }
}

// Close modal function
function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize event listeners
function initializeEventListeners() {
    // Modal close events
    if (closeModal) {
        closeModal.onclick = closeModalFunction;
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    };
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Cảm ơn ${name}!\n\nChúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.`);
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Initialize navigation
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// Initialize destination cards
function initializeDestinationCards() {
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            
            // Set destination in search form
            const destinationSelect = document.getElementById('destination-select');
            if (destinationSelect) {
                destinationSelect.value = destination;
                
                // Trigger search
                searchCombos();
            }
        });
    });
}

// Add CSS for modal content
const modalStyles = `
<style>
.combo-detail-header {
    margin-bottom: 2rem;
}

.detail-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
}

.detail-section:last-child {
    border-bottom: none;
}

.detail-section h3 {
    color: #2c5aa0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.detail-section ul {
    list-style: none;
    padding: 0;
}

.detail-section li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    padding-left: 25px;
}

.detail-section li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #4caf50;
    font-weight: bold;
}

.itinerary-day {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    align-items: flex-start;
}

.day-number {
    background: #2c5aa0;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: 600;
    min-width: 80px;
    text-align: center;
}

.day-activity {
    flex: 1;
    padding: 8px 0;
    line-height: 1.6;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f8fafc;
    border-radius: 8px;
}

.feature-item i {
    color: #4caf50;
}

.booking-section {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #f0f0f0;
}

.book-now-btn {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.book-now-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
}

.no-results {
    text-align: center;
    padding: 3rem;
    grid-column: 1 / -1;
}

.no-results h3 {
    color: #666;
    margin-bottom: 1rem;
}

.no-results p {
    color: #999;
}

.loading-container {
    grid-column: 1 / -1;
}
</style>
`;

// Inject modal styles
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Export functions for global access
window.searchCombos = searchCombos;
window.showComboDetails = showComboDetails;
window.bookCombo = bookCombo;