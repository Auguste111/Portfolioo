// Enhanced Professional Portfolio JavaScript Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 1500);
    
    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Intersection Observer for Section Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Typing Animation for Header
    const headerText = document.querySelector('h1 strong');
    if (headerText) {
        headerText.classList.add('typing-animation');
    }
    
    // Parallax Effect for Header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.getElementById('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // Enhanced Menu Toggle with Animation
    function toggleMenu() {
        const menuItems = document.getElementById('menuItems');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const menuLines = document.querySelectorAll('.menu-line');
        
        if (menuItems.style.display === 'block') {
            menuItems.style.display = 'none';
            hamburgerMenu.classList.remove('active');
            
            // Reset hamburger lines
            menuLines[0].style.transform = 'rotate(0deg) translateY(0px)';
            menuLines[1].style.opacity = '1';
            menuLines[2].style.transform = 'rotate(0deg) translateY(0px)';
        } else {
            menuItems.style.display = 'block';
            hamburgerMenu.classList.add('active');
            
            // Animate hamburger to X
            menuLines[0].style.transform = 'rotate(45deg) translateY(7px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        }
    }
    
    // Make toggleMenu globally available
    window.toggleMenu = toggleMenu;
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Mouse Trail Effect
    const trail = [];
    const trailLength = 20;
    
    function createTrailDot() {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = 'rgba(0, 212, 255, 0.6)';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '999';
        dot.style.transition = 'all 0.3s ease';
        document.body.appendChild(dot);
        return dot;
    }
    
    // Initialize trail dots
    for (let i = 0; i < trailLength; i++) {
        trail.push(createTrailDot());
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trail
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x - 3 + 'px';
            dot.style.top = y - 3 + 'px';
            dot.style.opacity = (trailLength - index) / trailLength;
            dot.style.transform = `scale(${(trailLength - index) / trailLength})`;
            
            // Get position for next dot
            if (nextDot) {
                x += (parseInt(nextDot.style.left) - x) * 0.3;
                y += (parseInt(nextDot.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Floating Particles Background
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.zIndex = '-1';
        document.body.appendChild(particle);
        
        // Animate particle
        const duration = Math.random() * 3000 + 2000;
        const startTime = Date.now();
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                document.body.removeChild(particle);
                return;
            }
            
            const y = window.innerHeight - (progress * (window.innerHeight + 100));
            const x = parseFloat(particle.style.left) + Math.sin(elapsed * 0.001) * 2;
            
            particle.style.top = y + 'px';
            particle.style.left = x + 'px';
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(animateParticle);
        }
        
        animateParticle();
    }
    
    // Create particles periodically
    setInterval(createFloatingParticle, 300);
    
    // Text Scramble Effect for Headings
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.getRandomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        getRandomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble to project titles
    document.querySelectorAll('.work-item h3').forEach((el, index) => {
        const scramble = new TextScramble(el);
        setTimeout(() => {
            scramble.setText(el.innerText);
        }, index * 200);
    });
    
    // Enhanced Button Hover Effects
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonPulse 0.6s ease-in-out';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Code Rain Effect (Matrix Style)
    function createCodeRain() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = '01';
        const matrixArray = matrix.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 26, 46, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Initialize code rain with a delay
    setTimeout(createCodeRain, 2000);
    
    // Add CSS keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes buttonPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .glitch-effect {
            animation: glitch 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Glitch effect on logo/name hover
    const nameElement = document.querySelector('h1 strong');
    if (nameElement) {
        nameElement.addEventListener('mouseenter', function() {
            this.classList.add('glitch-effect');
            setTimeout(() => {
                this.classList.remove('glitch-effect');
            }, 300);
        });
    }
    
    // Skills Progress Bars Animation (for CV section)
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        });
    }
    
    // Trigger skill bars when CV section is visible
    const cvSection = document.querySelector('#cv-section');
    if (cvSection) {
        observer.observe(cvSection);
        cvSection.addEventListener('transitionend', animateSkillBars);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const menuContainer = document.querySelector('.menu-container');
        const menuItems = document.getElementById('menuItems');
        
        if (menuItems.style.display === 'block' && !menuContainer.contains(e.target)) {
            toggleMenu();
        }
    });
    
    console.log('🚀 Enhanced Portfolio Effects Loaded Successfully!');
});

// Additional utility functions
function addTechAccent(element) {
    element.classList.add('tech-accent');
}

// Add tech accents to headings
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('h2, h3').forEach(heading => {
        if (!heading.closest('.work-item')) {
            addTechAccent(heading);
        }
    });
});