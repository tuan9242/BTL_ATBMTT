const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Travel combo data (same as in frontend)
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
        },
        availableSlots: 15,
        rating: 4.8,
        reviews: 127
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
        },
        availableSlots: 8,
        rating: 4.7,
        reviews: 89
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
        },
        availableSlots: 12,
        rating: 4.9,
        reviews: 156
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
        },
        availableSlots: 5,
        rating: 4.9,
        reviews: 203
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
        },
        availableSlots: 20,
        rating: 4.6,
        reviews: 94
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
        },
        availableSlots: 10,
        rating: 4.5,
        reviews: 178
    }
];

// In-memory storage for bookings and contacts (in production, use a database)
let bookings = [];
let contacts = [];

// Routes

// Serve the main travel website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'travel.html'));
});

// Also serve travel.html directly
app.get('/travel', (req, res) => {
    res.sendFile(path.join(__dirname, 'travel.html'));
});

// API: Get all combos
app.get('/api/combos', (req, res) => {
    try {
        res.json({
            success: true,
            data: travelCombos,
            total: travelCombos.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách combo',
            error: error.message
        });
    }
});

// API: Search combos
app.get('/api/combos/search', (req, res) => {
    try {
        const { destination, duration, budget, keyword } = req.query;
        let filteredCombos = [...travelCombos];

        if (destination) {
            filteredCombos = filteredCombos.filter(combo => 
                combo.destination === destination
            );
        }

        if (duration) {
            filteredCombos = filteredCombos.filter(combo => 
                combo.durationCategory === duration
            );
        }

        if (budget) {
            filteredCombos = filteredCombos.filter(combo => 
                combo.budget === budget
            );
        }

        if (keyword) {
            const searchKeyword = keyword.toLowerCase();
            filteredCombos = filteredCombos.filter(combo =>
                combo.title.toLowerCase().includes(searchKeyword) ||
                combo.description.toLowerCase().includes(searchKeyword) ||
                combo.highlights.some(highlight => 
                    highlight.toLowerCase().includes(searchKeyword)
                )
            );
        }

        // Sort by rating and availability
        filteredCombos.sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return b.availableSlots - a.availableSlots;
        });

        res.json({
            success: true,
            data: filteredCombos,
            total: filteredCombos.length,
            filters: { destination, duration, budget, keyword }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi tìm kiếm combo',
            error: error.message
        });
    }
});

// API: Get combo by ID
app.get('/api/combos/:id', (req, res) => {
    try {
        const comboId = parseInt(req.params.id);
        const combo = travelCombos.find(c => c.id === comboId);

        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy combo'
            });
        }

        res.json({
            success: true,
            data: combo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thông tin combo',
            error: error.message
        });
    }
});

// API: Book a combo
app.post('/api/bookings', (req, res) => {
    try {
        const {
            comboId,
            customerName,
            customerEmail,
            customerPhone,
            numberOfPeople,
            departureDate,
            specialRequests
        } = req.body;

        // Validation
        if (!comboId || !customerName || !customerEmail || !customerPhone || !numberOfPeople || !departureDate) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        // Find combo
        const combo = travelCombos.find(c => c.id === parseInt(comboId));
        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy combo'
            });
        }

        // Check availability
        if (combo.availableSlots < numberOfPeople) {
            return res.status(400).json({
                success: false,
                message: `Chỉ còn ${combo.availableSlots} chỗ trống cho combo này`
            });
        }

        // Create booking
        const booking = {
            id: bookings.length + 1,
            comboId: parseInt(comboId),
            comboTitle: combo.title,
            customerName,
            customerEmail,
            customerPhone,
            numberOfPeople: parseInt(numberOfPeople),
            departureDate,
            specialRequests: specialRequests || '',
            totalPrice: parseInt(combo.price.replace(/,/g, '')) * parseInt(numberOfPeople),
            status: 'pending',
            bookingDate: new Date().toISOString(),
            bookingCode: `TC${Date.now()}`
        };

        bookings.push(booking);

        // Update available slots
        combo.availableSlots -= parseInt(numberOfPeople);

        res.json({
            success: true,
            message: 'Đặt combo thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
            data: {
                bookingId: booking.id,
                bookingCode: booking.bookingCode,
                totalPrice: booking.totalPrice
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi đặt combo',
            error: error.message
        });
    }
});

// API: Get booking by code
app.get('/api/bookings/:code', (req, res) => {
    try {
        const bookingCode = req.params.code;
        const booking = bookings.find(b => b.bookingCode === bookingCode);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông tin đặt chỗ'
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thông tin đặt chỗ',
            error: error.message
        });
    }
});

// API: Submit contact form
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email không hợp lệ'
            });
        }

        // Phone validation
        const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Số điện thoại không hợp lệ'
            });
        }

        const contact = {
            id: contacts.length + 1,
            name,
            email,
            phone,
            message,
            status: 'new',
            createdAt: new Date().toISOString()
        };

        contacts.push(contact);

        res.json({
            success: true,
            message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
            data: { contactId: contact.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi gửi tin nhắn',
            error: error.message
        });
    }
});

// API: Get popular destinations
app.get('/api/destinations/popular', (req, res) => {
    try {
        const destinationStats = {};
        
        travelCombos.forEach(combo => {
            if (!destinationStats[combo.destination]) {
                destinationStats[combo.destination] = {
                    destination: combo.destination,
                    count: 0,
                    totalBookings: 0,
                    averageRating: 0,
                    totalRatings: 0
                };
            }
            
            destinationStats[combo.destination].count++;
            destinationStats[combo.destination].totalBookings += (20 - combo.availableSlots);
            destinationStats[combo.destination].totalRatings += combo.rating;
        });

        const popularDestinations = Object.values(destinationStats).map(dest => ({
            ...dest,
            averageRating: (dest.totalRatings / dest.count).toFixed(1)
        })).sort((a, b) => b.totalBookings - a.totalBookings);

        res.json({
            success: true,
            data: popularDestinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thống kê điểm đến',
            error: error.message
        });
    }
});

// API: Get booking statistics (admin)
app.get('/api/admin/stats', (req, res) => {
    try {
        const stats = {
            totalCombos: travelCombos.length,
            totalBookings: bookings.length,
            totalContacts: contacts.length,
            totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
            popularCombos: travelCombos
                .map(combo => ({
                    id: combo.id,
                    title: combo.title,
                    bookings: 20 - combo.availableSlots,
                    rating: combo.rating
                }))
                .sort((a, b) => b.bookings - a.bookings)
                .slice(0, 5),
            recentBookings: bookings
                .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                .slice(0, 10)
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thống kê',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trên server',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy trang yêu cầu'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Travel Combo Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📱 Website: http://localhost:${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`📊 Combos: ${travelCombos.length} combo có sẵn`);
});

module.exports = app;