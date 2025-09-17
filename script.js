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
    });
    /* ---------- Animate Skill Bars ---------- */
    document.querySelectorAll('.bar').forEach(bar => {
        const lvl = bar.dataset.level;
        const span = bar.querySelector('span');
        if (lvl && span) {
          span.style.width = lvl + '%';
        }
      });
 
    
    /* ---------- Fade-in on Scroll ---------- */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
    }, { threshold: 0.2 });
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
  
    /* ---------- Footer Year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    /* ---------- EmailJS Contact Form ---------- */
    if (window.emailjs) {
      emailjs.init("0k5Rpqp_H7hVJMoAt"); // 🔑 your public key
  
      const form   = document.getElementById("contactForm");
      const status = document.getElementById("formStatus");
      const sendBtn = document.getElementById("sendBtn");
  
      form?.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Simple front-end validation
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
  });
  