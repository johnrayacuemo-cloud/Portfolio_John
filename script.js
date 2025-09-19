document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll("nav .nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Active Nav Highlight ---------- */
  const links = document.querySelectorAll("nav .nav-link");
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => l.classList.remove("active"));
        document.querySelector(`nav a[href="#${sec.id}"]`)?.classList.add("active");
      }
    });

    // Scroll Progress Bar (optional if you use it)
    const progress = document.querySelector(".scroll-progress");
    if (progress) {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${(scrollY / pageHeight) * 100}%`;
    }
  });

  /* ---------- Animate Skill Bars ---------- */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const lvl = bar.dataset.level;
        const span = bar.querySelector("span");
        if (lvl && span) {
          span.style.transition = "width 1.5s cubic-bezier(.4,0,.2,1)";
          span.style.width = lvl + "%";
        }
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".bar").forEach(bar => skillObserver.observe(bar));

  /* ---------- Fade-in on Scroll with Stagger ---------- */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.15}s`;
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- EmailJS Contact Form ---------- */
  if (window.emailjs) {
    emailjs.init("0k5Rpqp_H7hVJMoAt"); // 🔑 your public key
    const form    = document.getElementById("contactForm");
    const status  = document.getElementById("formStatus");
    const sendBtn = document.getElementById("sendBtn");

    form?.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!this.name.value.trim() || !this.email.value.trim() || !this.message.value.trim()) {
        status.textContent = "⚠️ Please fill in all fields.";
        return;
      }
      sendBtn.disabled = true;
      status.textContent = "⏳ Sending…";
      emailjs.sendForm("service_uvz57i7", "template_nqy0u99", this)
        .then(() => {
          status.textContent = "✅ Message sent successfully!";
          this.reset();
        })
        .catch(err => {
          console.error("EmailJS error:", err);
          status.textContent = "❌ Failed to send message. Please try again.";
        })
        .finally(() => { sendBtn.disabled = false; });
    });
  } else {
    console.error("EmailJS library not loaded.");
  }

  /* ---------- Mobile Hamburger Menu (Updated) ---------- */
  const toggleBtn = document.getElementById("navToggle");
  const navLinks  = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      toggleBtn.classList.toggle("open");
    });

    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggleBtn.classList.remove("open");
      });
    });
  }

  /* ---------- Button Ripple Effect ---------- */
  document.querySelectorAll("button, .btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top  = `${e.clientY - rect.top  - diameter / 2}px`;
      circle.classList.add("ripple");
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
});
