// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Add animate class to sections
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
    section.classList.add('animate');
    observer.observe(section);
});

// Animate cards within sections
const cards = document.querySelectorAll('.destination-card, .culture-card, .feature-item, .exp-feature');
cards.forEach((card, index) => {
    card.classList.add('animate');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Smooth scroll for anchor links
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


// =======================
// SMOOTH SCROLL FOR HERO BUTTON
// =======================
const exploreBtn = document.querySelector('.dest-btn[href="#dest-explore"]');
if (exploreBtn) {
  exploreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#dest-explore");
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
}






/*
  Experiences page script
  - unique class names prefixed with exp-
  - sets up tab filtering and show/hide animation
*/

document.addEventListener('DOMContentLoaded', function () {
  // elements
  const tabs = Array.from(document.querySelectorAll('.exp-tab-btn'));
  const cards = Array.from(document.querySelectorAll('.exp-card'));

  // helper: show a card (with small fade in)
  function showCard(el) {
    el.classList.remove('exp-hidden');
    // ensure it's display:block (some external CSS might hide it)
    el.style.display = 'block';
    // add small delay to allow transition
    requestAnimationFrame(() => {
      el.classList.add('exp-visible');
    });
  }

  // helper: hide a card (with fade out)
  function hideCard(el) {
    el.classList.remove('exp-visible');
    el.classList.add('exp-hidden');
    // after transition ends, set display none to remove from layout
    const cleanup = () => {
      el.style.display = 'none';
      el.removeEventListener('transitionend', cleanup);
    };
    // if transition doesn't fire (rare), still enforce after 300ms
    el.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, 350);
  }

  // initialize: make all cards visible (defensive against other CSS)
  cards.forEach(c => {
    c.classList.remove('exp-hidden');
    c.classList.add('exp-visible');
    c.style.display = 'block';
  });

  // tab click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // active tab visuals & aria
      tabs.forEach(t => {
        t.classList.remove('exp-tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('exp-tab-active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      // filter logic:
      // All -> show all
      // adventure -> show island, mountain, food, beach (cards with 'adventure')
      // culture -> show food, cultural immersion, photography (cards with 'culture')
      cards.forEach(card => {
        const catAttr = (card.getAttribute('data-category') || '').trim();
        const cats = catAttr === '' ? [] : catAttr.split(/\s+/);

        if (filter === 'all' || cats.includes(filter)) {
          showCard(card);
        } else {
          hideCard(card);
        }
      });
    });
  });

  // keyboard accessibility: left/right arrow moves between tabs
  let focusedIndex = tabs.findIndex(t => t.classList.contains('exp-tab-active'));
  tabs.forEach((t, i) => {
    t.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        focusedIndex = (i + 1) % tabs.length;
        tabs[focusedIndex].focus();
      } else if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        focusedIndex = (i - 1 + tabs.length) % tabs.length;
        tabs[focusedIndex].focus();
      } else if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        t.click();
      }
    });
  });
});


// Simple hover interactivity for smooth feel
document.querySelectorAll('.culturecard, .tradition-card, .food-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.03)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

// === MINI MUSIC PLAYER ===
const player = document.getElementById("music-player");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");

if (player && playBtn && volumeSlider) {
  let isPlaying = true;
  player.volume = 0.7;

  document.addEventListener(
    "click",
    () => {
      player.play().catch(() => {});
    },
    { once: true }
  );

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      player.pause();
      playBtn.textContent = "Play";
    } else {
      player.play();
      playBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
  });

  volumeSlider.addEventListener("input", (e) => {
    player.volume = e.target.value;
  });
}

// === DYNAMIC PAGE LOADING (PREVENTS RELOAD) ===
const links = document.querySelectorAll(".nav-link");
const content = document.getElementById("page-content");

links.forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    const page = link.dataset.page;

    if (page === "home") {
      content.innerHTML = `<h1>Home</h1>`;
    } else if (page === "about") {
      content.innerHTML = `<h1>About</h1>`;
    } else if (page === "contact") {
      content.innerHTML = `<h1>Contact</h1>`;
    }
  });
});


// === Smooth Fade Scroll Animation (Safe & Isolated) ===
(function() {
  const fadeSections = document.querySelectorAll('.fadescroll-section');

  function handleFadeOnScroll() {
    fadeSections.forEach(section => {
      const position = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (position < windowHeight - 100) {
        section.classList.add('fadescroll-visible');
      }
    });
  }

  window.addEventListener('scroll', handleFadeOnScroll);
  window.addEventListener('load', handleFadeOnScroll);
})();

// === Hover to Play Video (Safe & Isolated) ===
(function() {
  const hoverVideos = document.querySelectorAll('.hoverplay-video');

  hoverVideos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // reset to start
    });
  });
})();

/*contact*/


// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Contact Form Submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you within 24-48 hours.');
    
    // Reset form
    contactForm.reset();
});

// Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('feedbackName').value,
        email: document.getElementById('feedbackEmail').value,
        feedbackType: document.querySelector('input[name="feedbackType"]:checked').value,
        message: document.getElementById('feedbackMessage').value
    };
    
    console.log('Feedback Form Submitted:', formData);
    
    // Show success message
    alert('Thank you for your feedback! We appreciate you taking the time to help us improve.');
    
    // Reset form and close modal
    feedbackForm.reset();
    closeModalFunc();
});


// Observe all fade-in elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
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

// Add hover effect to info cards
const infoCards = document.querySelectorAll('.infocard');
infoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add hover effect to social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Form input focus effects
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transition = 'all 0.3s ease';
    });
});

// Keyboard accessibility for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && feedbackModal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Initialize: Set initial state for FAQ items
faqItems.forEach(item => {
    const answer = item.querySelector('.faq-answer');
    answer.style.maxHeight = '0';
});

console.log('Tara, Dayo Contact Page Loaded Successfully!');
