document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
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



// SMOOTH SCROLL FOR HERO BUTTON

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
*/

document.addEventListener('DOMContentLoaded', function () {

  const tabs = Array.from(document.querySelectorAll('.exp-tab-btn'));
  const cards = Array.from(document.querySelectorAll('.exp-card'));

  
  function showCard(el) {
    el.classList.remove('exp-hidden');
   
    el.style.display = 'block';
    
    requestAnimationFrame(() => {
      el.classList.add('exp-visible');
    });
  }

 
  function hideCard(el) {
    el.classList.remove('exp-visible');
    el.classList.add('exp-hidden');
   
    const cleanup = () => {
      el.style.display = 'none';
      el.removeEventListener('transitionend', cleanup);
    };
 
    el.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, 350);
  }


  cards.forEach(c => {
    c.classList.remove('exp-hidden');
    c.classList.add('exp-visible');
    c.style.display = 'block';
  });

  // tab click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      
      tabs.forEach(t => {
        t.classList.remove('exp-tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('exp-tab-active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

     
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

// About Page JavaScript - Unique naming to avoid conflicts

// Hamburger Menu Toggle
const aboutHamburger = document.getElementById('aboutHamburger');
const aboutNavMenu = document.getElementById('aboutNavMenu');

if (aboutHamburger && aboutNavMenu) {
    aboutHamburger.addEventListener('click', () => {
        aboutHamburger.classList.toggle('active');
        aboutNavMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const aboutNavLinks = aboutNavMenu.querySelectorAll('a');
    aboutNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            aboutHamburger.classList.remove('active');
            aboutNavMenu.classList.remove('active');
        });
    });
}

// Scroll Reveal Animation
const aboutScrollReveal = () => {
    const aboutRevealElements = document.querySelectorAll('.about-stat-card, .about-principle-card, .about-showcase-card, .about-text-content, .about-image-content');
    
    aboutRevealElements.forEach(element => {
        element.classList.add('about-scroll-reveal');
    });

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('about-revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    aboutRevealElements.forEach(element => {
        aboutObserver.observe(element);
    });
};

// Hover Animation for Cards
const aboutInitHoverAnimations = () => {
    const aboutCards = document.querySelectorAll('.about-stat-card, .about-principle-card, .about-showcase-card');
    
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
};

// Smooth Scroll for Navigation Links
const aboutInitSmoothScroll = () => {
    const aboutLinks = document.querySelectorAll('.about-nav-menu a[href^="#"]');
    
    aboutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.about-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Navbar Hide on Scroll Down, Show on Scroll Up
let aboutLastScroll = 0;
const aboutNav = document.querySelector('.about-nav');

const aboutHandleNavScroll = () => {
    const aboutCurrentScroll = window.pageYOffset;
    
    if (aboutCurrentScroll <= 0) {
        aboutNav.style.transform = 'translateY(0)';
        return;
    }
    
    if (aboutCurrentScroll > aboutLastScroll && aboutCurrentScroll > 100) {
        // Scrolling down
        aboutNav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        aboutNav.style.transform = 'translateY(0)';
    }
    
    aboutLastScroll = aboutCurrentScroll;
};

// Parallax Effect for Hero Section
const aboutHandleParallax = () => {
    const aboutHeroImg = document.querySelector('.about-hero-img');
    if (aboutHeroImg) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        aboutHeroImg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
};

// Initialize all animations and interactions
const aboutInit = () => {
    aboutScrollReveal();
    aboutInitHoverAnimations();
    aboutInitSmoothScroll();
    
   
    let aboutScrollTimeout;
    window.addEventListener('scroll', () => {
  
        if (!aboutScrollTimeout) {
            aboutScrollTimeout = setTimeout(() => {
                aboutHandleNavScroll();
                aboutHandleParallax();
                aboutScrollTimeout = null;
            }, 10);
        }
    });
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aboutInit);
} else {
    aboutInit();
}



/*contact*/


// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        
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
