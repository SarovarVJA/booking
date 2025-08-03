// Handle header transparency on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

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
        }
    });
});

// Form submission handling
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
    });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
    });
}

// Room booking functionality
document.querySelectorAll('.room-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const roomType = this.closest('.room-card').querySelector('h3').textContent;
        alert(`Booking request received for ${roomType}. Our team will contact you shortly to confirm your reservation.`);
    });
});

// Add animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.featured-item, .room-card, .amenity');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animation
document.querySelectorAll('.featured-item, .room-card, .amenity').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
animateOnScroll();

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });
    
    nav.insertBefore(mobileMenuBtn, nav.firstChild);
}

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Booking form handling
const checkAvailabilityBtn = document.getElementById('check-availability');
const availableRoomsDiv = document.getElementById('available-rooms');

const rooms = [
    {
        type: 'deluxe',
        name: 'Deluxe Room',
        price: 2000,
        maxGuests: 2,
        description: 'Perfect for couples, featuring a comfortable double bed and modern amenities.',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800'
    },
    {
        type: 'family',
        name: 'Family Room',
        price: 2500,
        maxGuests: 4,
        description: 'Spacious room with a queen bed and bunk beds, perfect for families.',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800'
    },
    {
        type: 'suite',
        name: 'Suite Room',
        price: 2800,
        maxGuests: 3,
        description: 'Luxury suite with king bed and separate living area with sofa.',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800'
    }
];

if (checkAvailabilityBtn) {
    checkAvailabilityBtn.addEventListener('click', function() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        if (!checkIn || !checkOut) {
            alert('Please select both check-in and check-out dates');
            return;
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate >= checkOutDate) {
            alert('Check-out date must be after check-in date');
            return;
        }

        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        // Display available rooms
        availableRoomsDiv.innerHTML = rooms.map(room => `
            <div class="available-room-card">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <p>Maximum guests: ${room.maxGuests}</p>
                <div class="price">₹${room.price} per night</div>
                <div class="total-price">Total for ${nights} nights: ₹${room.price * nights}</div>
                <button class="btn" onclick="bookRoom('${room.type}', ${nights}, ${room.price * nights})">Book Now</button>
            </div>
        `).join('');
    });
}

// Function to handle room booking
function bookRoom(roomType, nights, totalPrice) {
    alert(`Booking Confirmation:
        Room Type: ${roomType}
        Number of Nights: ${nights}
        Total Price: ₹${totalPrice}
        
        Our team will contact you shortly to confirm your reservation.`);
}

// Set default and minimum dates for check-in and check-out
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayString = today.toISOString().split('T')[0];
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Set minimum dates
        checkInInput.min = todayString;
        checkOutInput.min = todayString;
        
        // Set default values
        checkInInput.value = todayString;
        checkOutInput.value = tomorrowString;
        
        // Update display
        updateDatesDisplay(todayString, tomorrowString);
        
        // Update check-out minimum date when check-in is selected
        checkInInput.addEventListener('change', function() {
            checkOutInput.min = this.value;
        });
    }
});

// Combined DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Modal Functionality
    // Get modal elements
    const galleryModal = document.getElementById('gallery-modal');
    const exploreModal = document.getElementById('explore-modal');
    const offersModal = document.getElementById('offers-modal');
    const branchesModal = document.getElementById('branches-modal');
    const closeButtons = document.querySelectorAll('.close');



    // Room link handler
    document.querySelectorAll('.room-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const roomType = this.getAttribute('data-room');
            const roomName = roomType === 'queen' ? 'Queen Bed Room' : 'King Bed Room';
            const roomPrice = roomType === 'queen' ? '₹2,999' : '₹3,499';
            const roomSize = roomType === 'queen' ? '250 sq ft' : '300 sq ft';
            const roomGuests = roomType === 'queen' ? '2 Guests' : '3 Guests';
            
            // Create a temporary modal for room details
            const roomModal = document.createElement('div');
            roomModal.className = 'modal';
            roomModal.style.display = 'block';
            roomModal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${roomName}</h2>
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <img src="https://images.unsplash.com/photo-${roomType === 'queen' ? '1611892440504-42a792e24d32' : '1571896349842-33c89424de2d'}?auto=format&fit=crop&w=600" 
                             alt="${roomName}" style="width: 100%; max-width: 500px; border-radius: 10px;">
                    </div>
                    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                            <span><i class="fas fa-ruler-combined"></i> Room Size:</span>
                            <span style="font-weight: 600;">${roomSize}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                            <span><i class="fas fa-user-friends"></i> Capacity:</span>
                            <span style="font-weight: 600;">${roomGuests}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                            <span><i class="fas fa-wifi"></i> Free WiFi:</span>
                            <span style="font-weight: 600; color: #28a745;">✓ Included</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                            <span><i class="fas fa-utensils"></i> Breakfast:</span>
                            <span style="font-weight: 600; color: #28a745;">✓ Included</span>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: #e74c3c; margin-bottom: 1rem;">
                            ${roomPrice}/night
                        </div>
                        <button class="btn btn-large" onclick="scrollToBooking()">Book This Room</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(roomModal);
            document.body.style.overflow = 'hidden';
            
            // Add close functionality to the new modal
            const newCloseBtn = roomModal.querySelector('.close');
            newCloseBtn.addEventListener('click', function() {
                roomModal.remove();
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            roomModal.addEventListener('click', function(e) {
                if (e.target === roomModal) {
                    roomModal.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // Close button handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    [galleryModal, exploreModal, offersModal, branchesModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Social media link handlers
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                           this.querySelector('i').className.includes('instagram') ? 'Instagram' : 'Twitter';
            alert(`Thank you for your interest! Our ${platform} page is coming soon. Please follow us for updates and special offers.`);
        });
    });

    // Branch booking button handlers (for both modal and section)
    document.querySelectorAll('.branch-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.disabled) {
                alert('Thank you for your interest! We will notify you when Sarovar Aplus, MG Road opens for bookings.');
            } else {
                const branchCard = this.closest('.branch-card');
                const branchName = branchCard.querySelector('h3').textContent.trim();
                
                // Check if it's an active branch (not upcoming)
                if (!branchCard.classList.contains('upcoming')) {
                    // Open Google search for the active branches
                    const searchQuery = encodeURIComponent(`${branchName} Vijayawada hotel`);
                    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                } else {
                    alert(`Booking request received for ${branchName}. Our team will contact you shortly to confirm your reservation.`);
                }
            }
        });
    });

    // Offers section booking button handlers
    document.querySelectorAll('.offers .offer-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const offerName = this.closest('.offer-card').querySelector('h3').textContent.trim();
            alert(`Booking request received for ${offerName} offer. Our team will contact you shortly to confirm your reservation.`);
        });
    });

    // Guest dropdown toggle functionality
    setTimeout(function() {
        const guestDropdown = document.querySelector('.guest-dropdown');
        const guestDisplay = document.querySelector('.guest-display');
        
        console.log('Guest dropdown found:', guestDropdown);
        console.log('Guest display found:', guestDisplay);
        
        if (guestDisplay && guestDropdown) {
            guestDisplay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Guest display clicked');
                guestDropdown.classList.toggle('active');
                console.log('Dropdown active class:', guestDropdown.classList.contains('active'));
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!guestDropdown.contains(e.target)) {
                    guestDropdown.classList.remove('active');
                }
            });
        }
        
        // Initialize travelers count
        updateTravelersCount();
    }, 100);
});

// Function to scroll to booking section
function scrollToBooking() {
    const bookingSection = document.querySelector('.hero');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Close any open modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Guest Selector Functionality
let adultsCount = 1;
let childrenCount = 0;

function updateTravelersCount() {
    const totalGuests = adultsCount + childrenCount;
    const travelersCountElement = document.getElementById('travelers-count');
    const adultsCountElement = document.getElementById('adults-count');
    const childrenCountElement = document.getElementById('children-count');
    
    if (travelersCountElement) {
        travelersCountElement.textContent = `1 room, ${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;
    }
    if (adultsCountElement) {
        adultsCountElement.textContent = adultsCount;
    }
    if (childrenCountElement) {
        childrenCountElement.textContent = childrenCount;
    }
    
    // Update button states
    const decreaseAdultsBtns = document.querySelectorAll('.counter-btn[onclick="decreaseAdults()"]');
    const decreaseChildrenBtns = document.querySelectorAll('.counter-btn[onclick="decreaseChildren()"]');
    
    decreaseAdultsBtns.forEach(btn => {
        btn.disabled = adultsCount <= 1;
    });
    decreaseChildrenBtns.forEach(btn => {
        btn.disabled = childrenCount <= 0;
    });
}

function increaseAdults() {
    if (adultsCount < 10) {
        adultsCount++;
        updateTravelersCount();
    }
}

function decreaseAdults() {
    if (adultsCount > 1) {
        adultsCount--;
        updateTravelersCount();
    }
}

function increaseChildren() {
    if (childrenCount < 6) {
        childrenCount++;
        updateTravelersCount();
    }
}

function decreaseChildren() {
    if (childrenCount > 0) {
        childrenCount--;
        updateTravelersCount();
    }
}

// Dates dropdown functions
function toggleDates() {
    const datesDropdown = document.getElementById('dates-dropdown');
    if (datesDropdown) {
        datesDropdown.classList.toggle('active');
        console.log('Dates dropdown toggled, active:', datesDropdown.classList.contains('active'));
    }
}

function closeDates() {
    const datesDropdown = document.getElementById('dates-dropdown');
    if (datesDropdown) {
        datesDropdown.classList.remove('active');
    }
}

function applyDates() {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    
    if (checkIn && checkOut) {
        updateDatesDisplay(checkIn, checkOut);
    }
    
    closeDates();
    console.log('Dates applied:', checkIn, 'to', checkOut);
}

function updateDatesDisplay(checkIn, checkOut) {
    const checkInDisplay = document.getElementById('check-in-display');
    const checkOutDisplay = document.getElementById('check-out-display');
    
    if (checkInDisplay && checkOutDisplay) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        checkInDisplay.textContent = checkInDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        checkOutDisplay.textContent = checkOutDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Travelers dropdown functions
function toggleTravelers() {
    const travelersDropdown = document.getElementById('travelers-dropdown');
    if (travelersDropdown) {
        travelersDropdown.classList.toggle('active');
        console.log('Travelers dropdown toggled, active:', travelersDropdown.classList.contains('active'));
    }
}

function closeTravelers() {
    const travelersDropdown = document.getElementById('travelers-dropdown');
    if (travelersDropdown) {
        travelersDropdown.classList.remove('active');
    }
}

function applyTravelers() {
    closeTravelers();
    console.log('Travelers applied:', adultsCount, 'adults,', childrenCount, 'children');
}



// Function to open Google search for branches
function openGoogleSearch(branchName) {
    alert('Function called for: ' + branchName);
    const searchQuery = encodeURIComponent(`${branchName} Vijayawada hotel`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
}

// Simple test function
function simpleTest() {
    alert('Simple test function works!');
}

// Test function for Google redirect
function testGoogleRedirect() {
    console.log('Test function called');
    const searchQuery = encodeURIComponent('Sarovar Mess Vijayawada hotel');
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
    console.log('Opening Google URL:', googleUrl);
    window.open(googleUrl, '_blank');
} 