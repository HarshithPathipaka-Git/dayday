// Global variables
let userName = '';
let currentSection = 'landing';

// DOM Elements
const nameModal = document.getElementById('nameModal');
const surpriseModal = document.getElementById('surpriseModal');
const nameInput = document.getElementById('nameInput');
const userNameSpan = document.getElementById('userName');
const navbar = document.getElementById('navbar');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

// Content sections
const contentSections = ['video', 'gallery', 'memories', 'footer'];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key listener to name input
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitName();
        }
    });
});

// Modal functions
function showNameModal() {
    nameModal.classList.remove('hidden');
    nameInput.focus();
}

function hideNameModal() {
    nameModal.classList.add('hidden');
    nameInput.value = '';
}

function submitName() {
    const name = nameInput.value.trim();
    if (name) {
        userName = name;
        hideNameModal();
        setTimeout(() => {
            showSurpriseModal();
        }, 300);
    }
}

function showSurpriseModal() {
    userNameSpan.textContent = userName;
    surpriseModal.classList.remove('hidden');
}

function hideSurpriseModal() {
    surpriseModal.classList.add('hidden');
}

function showSurprise() {
    hideSurpriseModal();
    setTimeout(() => {
        showAllContent();
        scrollToSection('video');
        addConfetti();
    }, 300);
}

function hideSurprise() {
    hideSurpriseModal();
    setTimeout(() => {
        showToast(
            `That's okay ${userName}! 😊`,
            "The surprise will be here whenever you're ready!"
        );
    }, 300);
}

// Content display functions
function showAllContent() {
    // Show navigation bar
    navbar.classList.remove('hidden');
    
    // Show all content sections
    contentSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
        }
    });
    
    // Add staggered animation to elements
    animateElements();
}

function animateElements() {
    // Animate photo gallery items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2 + 0.3}s`;
    });
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = sectionId === 'landing' ? 0 : 80;
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        currentSection = sectionId;
        updateActiveNavLink();
    }
}

function updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick*="${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Toast notification function
function showToast(title, message) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        hideToast();
    }, 4000);
}

function hideToast() {
    toast.classList.add('hidden');
}

// Confetti animation
function addConfetti() {
    const colors = ['#ff69b4', '#00d4aa', '#ffeb3b', '#9c27b0', '#ff5722', '#4fc3f7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'ease-in'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Photo gallery interactions
document.addEventListener('DOMContentLoaded', function() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.photo-overlay p');
            
            if (img && caption) {
                showImageModal(img.src, img.alt, caption.textContent);
            }
        });
    });
});

// Image modal for gallery
function showImageModal(src, alt, caption) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content glass-effect" style="max-width: 90%; max-height: 90%;">
            <div style="position: relative;">
                <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border-radius: 12px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">
                    ✕
                </button>
                <div style="text-align: center; padding: 1rem; color: white; background: rgba(0,0,0,0.7); border-radius: 0 0 12px 12px;">
                    <p style="margin: 0; font-weight: 600;">${caption}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Footer button interactions
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.footer-btn:first-child');
    const saveBtn = document.querySelector('.footer-btn:last-child');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '🎉 Happy Birthday! 🎂',
                    text: 'Check out this amazing birthday surprise website!',
                    url: window.location.href
                });
            } else {
                copyToClipboard(window.location.href);
                showToast('Link Copied!', 'Share this birthday surprise with others! 🎉');
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            showToast('Memories Saved!', 'All your beautiful memories are saved! 💖');
        });
    }
});

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        if (!nameModal.classList.contains('hidden')) {
            hideNameModal();
        }
        if (!surpriseModal.classList.contains('hidden')) {
            hideSurpriseModal();
        }
        if (!toast.classList.contains('hidden')) {
            hideToast();
        }
    }
    
    // Space bar to start surprise (when on landing)
    if (e.key === ' ' && currentSection === 'landing') {
        e.preventDefault();
        showNameModal();
    }
});

// Scroll event listener for navbar visibility
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update current section based on scroll position
    if (scrollPosition < windowHeight * 0.5) {
        currentSection = 'landing';
    } else if (scrollPosition < windowHeight * 1.5) {
        currentSection = 'video';
    } else if (scrollPosition < windowHeight * 2.5) {
        currentSection = 'gallery';
    } else if (scrollPosition < windowHeight * 3.5) {
        currentSection = 'memories';
    } else {
        currentSection = 'footer';
    }
    
    updateActiveNavLink();
});
