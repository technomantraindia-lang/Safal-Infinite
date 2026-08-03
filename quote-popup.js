(function () {
  const pageIsInPagesFolder = window.location.pathname.includes("/pages/");
  const assetPrefix = pageIsInPagesFolder ? "../assets/" : "assets/";
  const icons = {
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="4" /></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6.1 6.1l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16v12H4z" /><path d="M9 8V5h6v3" /><path d="M4 13h16" /></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></svg>',
    message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5Z" /></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v6c0 4 2.8 7.4 7 9 4.2-1.6 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>',
  };

  function field(icon, html) {
    return `<label class="quote-field">${icons[icon]}${html}</label>`;
  }

  const modal = document.createElement("div");
  modal.className = "quote-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Request a cleaning quote");
  modal.innerHTML = `
    <div class="quote-modal-panel">
      <aside class="quote-modal-side">
        <div class="quote-modal-logo"><img src="${assetPrefix}logo.png" alt="Safal Infinite" /></div>
        <img class="quote-modal-photo" src="${assetPrefix}service-regular-cleaning.png" alt="Cleaner wiping a table" />
        <small>Trusted Canberra Cleaners</small>
        <h2>Home, Office &amp; Deep Cleaning Care</h2>
        <div class="quote-contact-card"><span>${icons.phone}</span><div><strong>Call Us</strong><a href="tel:+61406858679">+61 406 858 679</a></div></div>
        <div class="quote-contact-card"><span>${icons.mail}</span><div><strong>Email Us</strong><a href="mailto:hello@safalinfinite.com.au">hello@safalinfinite.com.au</a></div></div>
        <div class="quote-contact-card"><span>${icons.home}</span><div><strong>Canberra Service</strong><p>Florey, Canberra 2615</p></div></div>
      </aside>
      <section class="quote-modal-main">
        <button class="quote-modal-close" type="button" aria-label="Close quote form">${icons.close}</button>
        <h2>Request a Quote</h2>
        <p>Tell us what cleaning service you need and our Safal Infinite team will get back to you shortly.</p>
        <form class="quote-form">
          ${field("user", '<input type="text" name="name" placeholder="Full Name" required />')}
          ${field("mail", '<input type="email" name="email" placeholder="Email Address" required />')}
          ${field("phone", '<input type="tel" name="phone" placeholder="e.g. +61 406 858 679" pattern="^\\+61[\\d\\s()\\-]{6,}$" title="Please enter an Australian number starting with +61" required />')}
          ${field("home", '<input type="text" name="suburb" placeholder="Suburb / Location" />')}
          ${field("briefcase", '<select name="service" required><option value="">Select Cleaning Service</option><option>Regular Cleaning</option><option>One Off / Spring Cleaning</option><option>Move Out / End of Lease Cleaning</option><option>Carpet & Upholstery Cleaning</option><option>Window Cleaning</option><option>Oven & Rangehood Cleaning</option><option>Office Cleaning Services</option></select>')}
          ${field("list", '<input type="text" name="property" placeholder="Property Type / Size" />')}
          <label class="quote-field quote-wide">${icons.message}<input type="text" name="subject" placeholder="Subject" /></label>
          <label class="quote-field quote-wide">${icons.message}<textarea name="message" placeholder="Message"></textarea></label>
          <button class="quote-submit" type="submit"><span>Send Enquiry</span>${icons.send}</button>
          <p class="quote-note">${icons.shield}<span>We will respond within 24 hours.</span></p>
        </form>
      </section>
    </div>`;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector(".quote-modal-close");
  const form = modal.querySelector(".quote-form");

  function openModal(event) {
    event.preventDefault();
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function validateAustralianPhone(formElement) {
    const phoneInput = formElement.querySelector('input[name="phone"]');
    if (!phoneInput) return true;

    const value = phoneInput.value.trim();
    const isValid = /^\+61[\d\s()-]{6,}$/.test(value);
    phoneInput.setCustomValidity(isValid ? "" : "Please enter an Australian number starting with +61.");

    if (!isValid) {
      phoneInput.reportValidity();
      phoneInput.focus();
    }

    return isValid;
  }

  document.querySelectorAll('input[name="phone"]').forEach((phoneInput) => {
    phoneInput.addEventListener("input", () => {
      phoneInput.setCustomValidity("");
    });
  });

  document.querySelectorAll(".quote-button").forEach((button) => button.addEventListener("click", openModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  closeButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
  document.querySelectorAll(".contact-page-form").forEach((contactForm) => {
    contactForm.addEventListener("submit", (event) => {
      if (!validateAustralianPhone(contactForm)) {
        event.preventDefault();
      }
    });
  });

  form.addEventListener("submit", (event) => {
    if (!validateAustralianPhone(form)) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    closeModal();
  });
})();
