import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.className = savedTheme;
    updateThemeIcon(savedTheme === 'light-mode');

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        if (isLight) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon(false);
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon(true);
        }
    });

    function updateThemeIcon(isLight) {
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Dynamic Metadata Population
    document.title = `${resumeData.name} | Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', `Portfolio of ${resumeData.name}. ${resumeData.summary.substring(0, 150)}...`);


    // Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function toggleMenu(show) {
        mobileNav.classList.toggle('open', show);
        mobileOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', () => toggleMenu(true));
    menuClose.addEventListener('click', () => toggleMenu(false));
    mobileOverlay.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Populate Hero
    // Populate Hero with split spans for animation
    const heroName = document.getElementById('hero-name');
    const nameParts = resumeData.name.split(' ');
    heroName.innerHTML = `<span class="first-name">${nameParts[0]}</span> <span class="last-name">${nameParts[1]}</span>`;
    
    const firstName = heroName.querySelector('.first-name');
    const lastName = heroName.querySelector('.last-name');

    // Name Scroll Animation
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        // Animation range: 0 to 400px scroll
        const progress = Math.min(scrollPos / 400, 1);
        const opacity = 1 - progress;
        const scale = 1 + (progress * 0.5);
        
        // Cap move distance on mobile to prevent extreme overflow
        const maxMove = window.innerWidth < 768 ? 80 : 150;
        const move = progress * maxMove;

        if (firstName && lastName) {
            firstName.style.transform = `translateX(-${move}px) scale(${scale})`;
            firstName.style.opacity = opacity;
            
            lastName.style.transform = `translateX(${move}px) scale(${scale})`;
            lastName.style.opacity = opacity;
        }
    }, { passive: true });
    // Hero summary removed as per request
    
    // Populate About
    document.getElementById('full-summary').textContent = resumeData.summary;
    document.getElementById('endeavor-text').textContent = resumeData.proposedEndeavor;

    // Populate Experience
    const expList = document.getElementById('experience-list');
    resumeData.experience.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'exp-card';
        card.innerHTML = `
            <div class="exp-header">
                <div>
                    <div class="exp-company">${exp.company}</div>
                    <h3>${exp.role}</h3>
                </div>
                <div class="exp-period">${exp.period}</div>
            </div>
            <ul class="exp-list">
                ${exp.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
        expList.appendChild(card);
    });

    // Populate Skills
    const skillsGrid = document.getElementById('skills-grid');
    const skillCategories = [
        { title: 'Languages', data: resumeData.skills.languages },
        { title: 'AI & Machine Learning', data: resumeData.skills.machineLearning },
        { title: 'Frameworks & Tools', data: resumeData.skills.frameworks },
        { title: 'Networking & Systems', data: resumeData.skills.networking },
        { title: 'Geospatial & Imaging', data: [...resumeData.skills.imaging, ...resumeData.skills.spatial] }
    ];

    skillCategories.forEach((cat) => {
        const div = document.createElement('div');
        div.className = `skill-category`;
        div.innerHTML = `
            <h4>${cat.title}</h4>
            <div class="skill-tags">
                ${cat.data.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        skillsGrid.appendChild(div);
    });

    // Populate Education
    const eduList = document.getElementById('education-list');
    resumeData.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'edu-item';
        div.innerHTML = `
            <h3>${edu.degree}</h3>
            <div class="edu-meta">${edu.institution} | ${edu.period}</div>
            <p class="edu-desc">${edu.details}</p>
            ${edu.reportUrl ? `<a href="${edu.reportUrl}" target="_blank" class="skill-tag" style="margin-top:1rem; display:inline-block;"><i class="fas fa-file-pdf"></i> View Project Report</a>` : ''}
        `;
        eduList.appendChild(div);
    });

    // Populate Achievements
    const achList = document.getElementById('achievement-list');
    resumeData.achievements.forEach(ach => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="ach-icon"><i class="fas fa-trophy" style="color: var(--accent-color);"></i></div>
            <div class="ach-text">
                ${ach.text}
                ${ach.url ? `<br><a href="${ach.url}" target="_blank" class="ach-link"><i class="fas fa-link"></i> View Presentation</a>` : ''}
            </div>
        `;
        achList.appendChild(li);
    });

    // Populate Profiles/Links
    const profileContainer = document.getElementById('profiles-content');
    const profiles = [
        { name: 'Google Scholar', url: 'https://' + resumeData.contact.googleScholar, icon: 'fas fa-graduation-cap' },
        { name: 'GitHub', url: 'https://' + resumeData.contact.github, icon: 'fab fa-github' },
        { name: 'LinkedIn', url: 'https://' + resumeData.contact.linkedin, icon: 'fab fa-linkedin' },
        { name: 'ResearchGate', url: 'https://' + resumeData.contact.researchGate, icon: 'fas fa-microscope' }
    ];
    profiles.forEach(p => {
        const a = document.createElement('a');
        a.href = p.url;
        a.className = 'profile-btn';
        a.target = '_blank';
        a.innerHTML = `<i class="${p.icon}"></i> ${p.name}`;
        profileContainer.appendChild(a);
    });

    // Update Footer Links
    if (document.getElementById('linkedin-link')) document.getElementById('linkedin-link').href = 'https://' + resumeData.contact.linkedin;
    if (document.getElementById('github-link')) document.getElementById('github-link').href = 'https://' + resumeData.contact.github;
    if (document.getElementById('scholar-link')) document.getElementById('scholar-link').href = 'https://' + resumeData.contact.googleScholar;
    if (document.getElementById('email-link')) document.getElementById('email-link').href = `mailto:${resumeData.contact.email}`;
    
    // Populate Contact Section
    if (document.getElementById('contact-email')) {
        document.getElementById('contact-email').href = `mailto:${resumeData.contact.email}`;
        document.getElementById('contact-email-text').textContent = resumeData.contact.email;
    }
    if (document.getElementById('contact-phone')) {
        document.getElementById('contact-phone').href = `tel:${resumeData.contact.phone.replace(/[^0-9+]/g, '')}`;
        document.getElementById('contact-phone-text').textContent = resumeData.contact.phone;
    }


    // Custom Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Custom slower smooth scroll implementation
                const startPosition = window.pageYOffset;
                const distance = offsetPosition - startPosition;
                const duration = 1200; // Increased duration for "slower" feel
                let start = null;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percent = Math.min(progress / duration, 1);
                    
                    // Easing function: easeInOutCubic
                    const easing = percent < 0.5 
                        ? 4 * percent * percent * percent 
                        : 1 - Math.pow(-2 * percent + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easing);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                });
            }
        });
    });

    // Reveal Animations with passive scroll listener for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing after reveal to reduce overhead
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // Logo Click Scroll to Top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
