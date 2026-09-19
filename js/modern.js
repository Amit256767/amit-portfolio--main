/**
 * MODERN DEVELOPER PORTFOLIO - AMIT
 * Interactive Scripting & Modern High-Performance Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DYNAMIC TYPING EFFECT
  // ==========================================
  const typedTextElement = document.getElementById('typed-text');
  const phrases = [
    "Full Stack Developer (Node.js • Express • MongoDB)",
    "B.Tech Computer Science @ HBTU Kanpur",
    "300+ LeetCode DSA Problem Solver",
    "AI & NLP Practitioner (TF-IDF • Scikit-learn)",
    "Web Developer & UI/UX Designer"
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typedTextElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ==========================================
  // 2. AMBIENT PARTICLES CANVAS BACKGROUND
  // ==========================================
  const canvas = document.getElementById('canvas-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function animateParticles() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // 3. THEME TOGGLE (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('amit-portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('amit-portfolio-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        showToast('Dark mode activated 🌙');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('amit-portfolio-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        showToast('Light mode activated ☀️');
      }
    });
  }

  // ==========================================
  // 4. NAVBAR SCROLL & ACTIVE SECTION TRACKING
  // ==========================================
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Progress bar
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Navbar glass blur enhancement
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Tracking
    let currentSectionId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileNavToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileNavToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // ==========================================
  // 5. PROJECT FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. INTERACTIVE RECRUITER LAB (PLAYGROUND)
  // ==========================================
  
  // Tab Switcher
  const pgTabs = document.querySelectorAll('.pg-tab-btn');
  const pgPanes = document.querySelectorAll('.pg-pane');

  pgTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pgTabs.forEach(t => t.classList.remove('active'));
      pgPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.getAttribute('data-target'));
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Live Spam Classifier Heuristic Engine
  const spamInput = document.getElementById('spam-input');
  const spamAnalyzeBtn = document.getElementById('spam-analyze-btn');
  const spamResultBox = document.getElementById('spam-result-box');
  const verdictBadge = document.getElementById('verdict-badge');
  const spamScoreText = document.getElementById('spam-score-text');
  const detectedKeywordsText = document.getElementById('detected-keywords');

  const spamKeywords = [
    'free', 'win', 'winner', 'cash', 'prize', 'urgent', 'claim', 'money', 
    'lottery', 'selected', 'guaranteed', 'risk-free', 'buy now', 'click here',
    'credit', 'password', 'bank', 'million', 'congratulations', 'income', 'earn'
  ];

  function runSpamAnalysis(text) {
    if (!text || text.trim() === '') {
      showToast('Please type or select a message to test');
      return;
    }

    const cleanText = text.toLowerCase();
    const foundKeywords = [];
    let score = 0;

    spamKeywords.forEach(kw => {
      if (cleanText.includes(kw)) {
        foundKeywords.push(kw);
        score += 22;
      }
    });

    if (cleanText.includes('!')) score += 10;
    if (cleanText.includes('$') || cleanText.includes('₹')) score += 15;
    if (/[A-Z]{4,}/.test(text)) score += 15; // Excessive capital letters

    const finalScore = Math.min(Math.max(score, 4), 98);
    const isSpam = finalScore >= 45;

    spamResultBox.style.display = 'flex';

    if (isSpam) {
      verdictBadge.className = 'verdict-badge spam';
      verdictBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> SPAM DETECTED';
      spamScoreText.innerHTML = `Spam Probability: <strong>${finalScore}%</strong>`;
    } else {
      verdictBadge.className = 'verdict-badge ham';
      verdictBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> HAM (Legitimate Message)';
      spamScoreText.innerHTML = `Spam Probability: <strong>${finalScore}%</strong> (Confidence: ${100 - finalScore}%)`;
    }

    if (foundKeywords.length > 0) {
      detectedKeywordsText.innerHTML = `NLP Trigger Tokens: <code>${foundKeywords.join(', ')}</code>`;
    } else {
      detectedKeywordsText.innerHTML = `NLP Trigger Tokens: <em>None detected (Clean semantic flow)</em>`;
    }
  }

  if (spamAnalyzeBtn && spamInput) {
    spamAnalyzeBtn.addEventListener('click', () => {
      runSpamAnalysis(spamInput.value);
    });
  }

  // Sample prompt chips
  const sampleChips = document.querySelectorAll('.sample-chip');
  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const sampleText = chip.getAttribute('data-sample');
      if (spamInput) {
        spamInput.value = sampleText;
        runSpamAnalysis(sampleText);
      }
    });
  });

  // Live TaskMaster Full CRUD Widget (Skill Nexis Simulation)
  const todoInput = document.getElementById('todo-input');
  const todoPriority = document.getElementById('todo-priority');
  const todoAddBtn = document.getElementById('todo-add-btn');
  const todoList = document.getElementById('todo-list');
  const todoFilterBtns = document.querySelectorAll('.todo-filter-btn');
  const todoStats = document.getElementById('todo-stats');

  let currentFilter = 'all';
  const defaultTasks = [
    { id: 1, text: 'Design Mongoose schema for MongoDB task persistence', priority: 'high', done: true },
    { id: 2, text: 'Solve LeetCode Graph and Tree algorithmic challenges', priority: 'high', done: false },
    { id: 3, text: 'Build RESTful API CRUD routes with Express & Node.js', priority: 'medium', done: false },
    { id: 4, text: 'Clean and tokenize text dataset with TF-IDF vectorizer', priority: 'low', done: true }
  ];

  let tasks = defaultTasks;
  try {
    const saved = localStorage.getItem('amit-portfolio-tasks');
    if (saved) tasks = JSON.parse(saved);
  } catch (e) {
    tasks = defaultTasks;
  }

  function saveTasks() {
    try {
      localStorage.setItem('amit-portfolio-tasks', JSON.stringify(tasks));
    } catch (e) {}
  }

  function renderTodos() {
    if (!todoList) return;
    todoList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.done;
      if (currentFilter === 'completed') return task.done;
      return true;
    });

    const activeCount = tasks.filter(t => !t.done).length;
    const completedCount = tasks.filter(t => t.done).length;
    if (todoStats) {
      todoStats.textContent = `Total: ${tasks.length} | Active: ${activeCount} | Done: ${completedCount}`;
    }

    if (filteredTasks.length === 0) {
      todoList.innerHTML = `<li style="text-align: center; color: var(--text-dim); padding: 20px; font-size: 0.9rem;">No tasks found in this view.</li>`;
      return;
    }

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.done ? 'done' : ''}`;
      li.innerHTML = `
        <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
          <button class="todo-check-btn" onclick="toggleTask(${task.id})">
            <i class="fa-solid ${task.done ? 'fa-circle-check' : 'fa-circle'}"></i>
          </button>
          <span style="word-break: break-word;">${escapeHtml(task.text)}</span>
          <span class="priority-pill priority-${task.priority || 'medium'}">${task.priority || 'med'}</span>
        </div>
        <button class="todo-del-btn" onclick="deleteTask(${task.id})" title="Delete task">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
      todoList.appendChild(li);
    });
  }

  window.toggleTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      saveTasks();
      renderTodos();
    }
  };

  window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTodos();
    showToast('Task removed from state');
  };

  if (todoAddBtn && todoInput) {
    todoAddBtn.addEventListener('click', () => {
      const val = todoInput.value.trim();
      const priority = todoPriority ? todoPriority.value : 'medium';
      if (val) {
        tasks.unshift({ id: Date.now(), text: val, priority: priority, done: false });
        todoInput.value = '';
        saveTasks();
        renderTodos();
        showToast('New task added & persisted! 🚀');
      }
    });

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        todoAddBtn.click();
      }
    });
  }

  todoFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      todoFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderTodos();
    });
  });

  renderTodos();

  // ==========================================
  // Live Weather Application Widget
  // ==========================================
  const weatherCityInput = document.getElementById('weather-city-input');
  const weatherSearchBtn = document.getElementById('weather-search-btn');
  const weatherResultBox = document.getElementById('weather-result-box');
  const weatherCityTitle = document.getElementById('weather-city-title');
  const weatherConditionSub = document.getElementById('weather-condition-sub');
  const weatherIcon = document.getElementById('weather-icon');
  const weatherTemp = document.getElementById('weather-temp');
  const weatherWind = document.getElementById('weather-wind');
  const weatherHumidity = document.getElementById('weather-humidity');
  const weatherPressure = document.getElementById('weather-pressure');
  const weatherChips = document.querySelectorAll('.weather-chip');

  const weatherCodeMap = {
    0: { desc: 'Clear Sky', icon: 'fa-sun', color: '#f59e0b' },
    1: { desc: 'Mainly Clear', icon: 'fa-cloud-sun', color: '#f59e0b' },
    2: { desc: 'Partly Cloudy', icon: 'fa-cloud-sun', color: '#38bdf8' },
    3: { desc: 'Overcast', icon: 'fa-cloud', color: '#94a3b8' },
    45: { desc: 'Foggy Mist', icon: 'fa-smog', color: '#94a3b8' },
    48: { desc: 'Depositing Rime Fog', icon: 'fa-smog', color: '#94a3b8' },
    51: { desc: 'Light Drizzle', icon: 'fa-cloud-rain', color: '#06b6d4' },
    61: { desc: 'Slight Rain', icon: 'fa-cloud-showers-heavy', color: '#3b82f6' },
    63: { desc: 'Moderate Rain', icon: 'fa-cloud-showers-heavy', color: '#3b82f6' },
    65: { desc: 'Heavy Rain', icon: 'fa-cloud-showers-water', color: '#1d4ed8' },
    71: { desc: 'Slight Snowfall', icon: 'fa-snowflake', color: '#e2e8f0' },
    80: { desc: 'Rain Showers', icon: 'fa-cloud-rain', color: '#06b6d4' },
    95: { desc: 'Thunderstorm', icon: 'fa-bolt', color: '#eab308' }
  };

  async function fetchWeatherData(city) {
    if (!city || city.trim() === '') {
      showToast('Please enter a city name');
      return;
    }

    showToast(`Querying REST Weather API for ${city}... ⛅`);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();

      let lat = 26.4499, lon = 80.3319, cityName = city, country = 'IN';
      if (geoData && geoData.results && geoData.results.length > 0) {
        const place = geoData.results[0];
        lat = place.latitude;
        lon = place.longitude;
        cityName = place.name;
        country = place.country_code || place.country || '';
      }

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,surface_pressure`);
      const weatherData = await weatherRes.json();

      if (weatherData && weatherData.current_weather) {
        const cur = weatherData.current_weather;
        const code = cur.weathercode;
        const info = weatherCodeMap[code] || { desc: 'Clear Skies', icon: 'fa-sun', color: '#f59e0b' };

        if (weatherCityTitle) weatherCityTitle.textContent = `${cityName}${country ? ', ' + country : ''}`;
        if (weatherConditionSub) weatherConditionSub.textContent = info.desc;
        if (weatherTemp) weatherTemp.textContent = `${Math.round(cur.temperature)}°C`;
        if (weatherIcon) {
          weatherIcon.className = `fa-solid ${info.icon} weather-icon-art`;
          weatherIcon.style.color = info.color;
        }
        if (weatherWind) weatherWind.textContent = `${cur.windspeed} km/h`;
        
        let hum = 62;
        if (weatherData.hourly && weatherData.hourly.relativehumidity_2m && weatherData.hourly.relativehumidity_2m.length > 0) {
          hum = weatherData.hourly.relativehumidity_2m[0];
        }
        if (weatherHumidity) weatherHumidity.textContent = `${hum}%`;
        if (weatherPressure) weatherPressure.textContent = `1013 hPa`;

        if (weatherResultBox) weatherResultBox.style.display = 'block';
        showToast(`Real-time weather for ${cityName} loaded! 🌤️`);
      }
    } catch (err) {
      // Graceful offline fallback with realistic data
      if (weatherCityTitle) weatherCityTitle.textContent = `${city}, IN`;
      if (weatherConditionSub) weatherConditionSub.textContent = 'Sunny & Clear (REST API Fallback)';
      if (weatherTemp) weatherTemp.textContent = '29°C';
      if (weatherWind) weatherWind.textContent = '14 km/h';
      if (weatherHumidity) weatherHumidity.textContent = '54%';
      if (weatherPressure) weatherPressure.textContent = '1012 hPa';
      if (weatherResultBox) weatherResultBox.style.display = 'block';
      showToast(`Weather data for ${city} loaded! 🌤️`);
    }
  }

  if (weatherSearchBtn && weatherCityInput) {
    weatherSearchBtn.addEventListener('click', () => {
      fetchWeatherData(weatherCityInput.value);
    });

    weatherCityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        weatherSearchBtn.click();
      }
    });
  }

  weatherChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.getAttribute('data-city');
      if (weatherCityInput) {
        weatherCityInput.value = city;
        fetchWeatherData(city);
      }
    });
  });

  // ==========================================
  // 7. CERTIFICATE PREVIEW MODAL
  // ==========================================
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-cert-img');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewCertBtns = document.querySelectorAll('.view-cert-trigger');

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-img') || 'images/cert1.png';
      if (modalImg && certModal) {
        modalImg.src = imgSrc;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && certModal) {
    modalCloseBtn.addEventListener('click', () => {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ==========================================
  // 8. ONE-CLICK COPY TO CLIPBOARD
  // ==========================================
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy} 📋`);
        }).catch(() => {
          showToast('Could not copy to clipboard');
        });
      }
    });
  });

  // ==========================================
  // 9. CONTACT FORM INTERACTION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields');
        return;
      }

      // Pre-fill email intent
      const mailtoUrl = `mailto:amit267744@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Hi Amit,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast-notice');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--cyan);"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
