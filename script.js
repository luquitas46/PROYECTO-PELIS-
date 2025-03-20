// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const searchInput = document.getElementById('search');
const movieCards = document.querySelectorAll('.movie-card');
const playButtons = document.querySelectorAll('.play-btn');
const videoPlayer = document.getElementById('video-player');
const closeVideo = document.getElementById('close-video');
const videoTitle = document.getElementById('video-title');
const header = document.querySelector('header');

// Theme Toggle
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    themeToggle.checked = false;
    body.classList.add('light-theme');
} else {
    themeToggle.checked = true;
}

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
        mainNav.classList.remove('active');
    }
});

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    movieCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Video Player
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.movie-card');
        const title = card.querySelector('h3').textContent;
        
        videoTitle.textContent = title;
        videoPlayer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Video Player
closeVideo.addEventListener('click', () => {
    videoPlayer.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close video player with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoPlayer.classList.contains('active')) {
        videoPlayer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = body.classList.contains('light-theme') 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(20, 20, 20, 0.95)';
    } else {
        header.style.background = body.classList.contains('light-theme') 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(0, 0, 0, 0.8)';
    }
});

// Dropdown menus for mobile
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const dropdown = btn.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        e.stopPropagation();
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});

// Simulate loading state for movie cards
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.movie-card').forEach(card => {
            card.style.opacity = '1';
        });
    }, 500);
});

// Add movies to "My List" functionality
const addToListButtons = document.querySelectorAll('.btn-small:last-child');

addToListButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.movie-card');
        const title = card.querySelector('h3').textContent;
        
        // Toggle button text and icon
        if (button.innerHTML.includes('Mi Lista')) {
            button.innerHTML = '<i class="fas fa-check"></i> En Lista';
            showNotification(`${title} añadida a Mi Lista`);
        } else {
            button.innerHTML = '<i class="fas fa-plus"></i> Mi Lista';
            showNotification(`${title} eliminada de Mi Lista`);
        }
    });
});

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.boxShadow = 'var(--shadow)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}