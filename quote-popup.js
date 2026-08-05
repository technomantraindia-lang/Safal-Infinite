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

  if (!document.querySelector(".floating-call")) {
    const callButton = document.createElement("a");
    callButton.className = "floating-call";
    callButton.href = "tel:+61406858679";
    callButton.setAttribute("aria-label", "Call Safal Infinite on +61 406 858 679");
    callButton.innerHTML = icons.phone;
    document.body.appendChild(callButton);
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
        <div class="quote-contact-card"><span>${icons.mail}</span><div><strong>Email Us</strong><a href="mailto:safalinfinite@gmail.com">safalinfinite@gmail.com</a></div></div>
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

  document.querySelectorAll(".site-header").forEach((header) => {
    const nav = header.querySelector(".main-nav");
    const brand = header.querySelector(".brand");
    if (!nav || !brand || header.querySelector(".mobile-menu-toggle")) return;

    const menuButton = document.createElement("button");
    menuButton.className = "mobile-menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>';
    brand.insertAdjacentElement("afterend", menuButton);

    if (!nav.querySelector(".mobile-nav-quote")) {
      const quoteLink = document.createElement("a");
      quoteLink.className = "mobile-nav-quote quote-button";
      quoteLink.href = "#quote";
      quoteLink.textContent = "Request a Quote";
      nav.appendChild(quoteLink);
    }

    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-menu-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      const trigger = dropdown.querySelector(".nav-dropdown-trigger");
      if (!trigger) return;

      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", (event) => {
        if (!window.matchMedia("(max-width: 1080px)").matches) return;

        event.preventDefault();
        const isOpen = dropdown.classList.toggle("is-dropdown-open");
        trigger.setAttribute("aria-expanded", String(isOpen));

        nav.querySelectorAll(".nav-dropdown").forEach((otherDropdown) => {
          if (otherDropdown === dropdown) return;
          otherDropdown.classList.remove("is-dropdown-open");
          const otherTrigger = otherDropdown.querySelector(".nav-dropdown-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });
      });
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1080px)").matches && link.classList.contains("nav-dropdown-trigger")) return;
        header.classList.remove("is-menu-open");
        nav.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
          dropdown.classList.remove("is-dropdown-open");
          const trigger = dropdown.querySelector(".nav-dropdown-trigger");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  });

  document.querySelectorAll(".footer-brand").forEach((footerBrand) => {
    if (footerBrand.querySelector(".footer-mobile-actions")) return;

    const actions = document.createElement("div");
    actions.className = "footer-mobile-actions";
    actions.innerHTML = `
      <a class="footer-call-action" href="tel:+61406858679">${icons.phone}<span>Call Now</span></a>
      <a class="footer-whatsapp-action" href="https://wa.me/61406858679">${icons.message}<span>WhatsApp</span></a>
    `;

    const social = footerBrand.querySelector(".footer-social");
    if (social) {
      social.insertAdjacentElement("beforebegin", actions);
    } else {
      footerBrand.appendChild(actions);
    }
  });

  function addRevealAnimations(groups) {
    groups.forEach(([selector, directions]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        const direction = Array.isArray(directions) ? directions[index % directions.length] : directions;
        element.classList.add("reveal-on-scroll", direction);
        element.style.setProperty("--reveal-duration", "1.55s");
        element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 420)}ms`);
      });
    });
  }

  function observeRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  if (document.querySelector(".service-page-hero")) {
    addRevealAnimations([
      [".service-page-hero > div", "reveal-bottom"],
      [".service-page-intro .service-kicker", "reveal-top"],
      [".service-page-intro h2", "reveal-bottom"],
      [".service-page-card", ["reveal-left", "reveal-right", "reveal-bottom"]],
      [".service-why > .service-kicker", "reveal-top"],
      [".service-why > h2", "reveal-bottom"],
      [".service-process article", ["reveal-left", "reveal-top", "reveal-right", "reveal-bottom"]],
      [".service-cta > div", "reveal-left"],
      [".service-cta .quote-button", "reveal-right"],
    ]);
  }

  if (document.querySelector(".service-detail-section")) {
    addRevealAnimations([
      [".inner-page-hero > div", "reveal-bottom"],
      [".service-detail-section > img", "reveal-left"],
      [".service-detail-copy", "reveal-right"],
      [".feature-list li", ["reveal-left", "reveal-right", "reveal-bottom"]],
      [".detail-actions", "reveal-bottom"],
      [".service-extra-head", "reveal-bottom"],
      [".service-extra-grid article", ["reveal-left", "reveal-top", "reveal-right"]],
      [".service-mini-cta", "reveal-bottom"],
    ]);
  }

  if (document.querySelector(".contact-page-section")) {
    addRevealAnimations([
      [".contact-hero-content", "reveal-bottom"],
      [".contact-cards article", ["reveal-left", "reveal-top", "reveal-right", "reveal-bottom"]],
      [".contact-page-form", "reveal-left"],
      [".contact-page-form .form-row", ["reveal-left", "reveal-right"]],
      [".contact-page-form > label", "reveal-bottom"],
      [".contact-page-form button", "reveal-bottom"],
      [".visit-panel", "reveal-right"],
      [".visit-list > div", ["reveal-left", "reveal-right", "reveal-bottom"]],
      [".map-content", "reveal-left"],
      [".map-frame", "reveal-right"],
      [".contact-cta img", "reveal-left"],
      [".contact-cta > div", "reveal-bottom"],
      [".contact-cta .quote-button", "reveal-right"],
    ]);
  }

  observeRevealAnimations();

  const WEB3FORMS_ACCESS_KEY = "d559df42-4ff1-4bd4-bbe5-0594c936eb12";
  const WEB3FORMS_URL = "https://api.web3forms.com/submit";

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

  function getFormStatusNode(form) {
    let status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "form-status";
      form.appendChild(status);
    }
    return status;
  }

  function showFormStatus(form, message, isSuccess) {
    const status = getFormStatusNode(form);
    status.textContent = message;
    status.style.color = isSuccess ? "#147d38" : "#b02a37";
    status.style.marginTop = "1rem";
    status.style.fontWeight = "600";
  }

  function setDefaultSubject(formData) {
    if (formData.get("subject")) return;

    const service = formData.get("service");
    if (service) {
      formData.set("subject", `Cleaning enquiry: ${service}`);
      return;
    }

    formData.set("subject", "Website enquiry");
  }

  async function submitWeb3Forms(form) {
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
    }

    try {
      const formData = new FormData(form);
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);
      setDefaultSubject(formData);

      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to send your enquiry. Please try again.");
      }

      form.reset();
      showFormStatus(form, "Thank you! Your enquiry has been sent.", true);
    } catch (error) {
      showFormStatus(form, error.message || "Something went wrong. Please try again later.", false);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
      }
    }
  }

  document.querySelectorAll('input[name="phone"]').forEach((phoneInput) => {
    phoneInput.addEventListener("input", () => {
      phoneInput.setCustomValidity("");
    });
  });

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (!validateAustralianPhone(form)) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    submitWeb3Forms(form);
  }

  document.querySelectorAll(".contact-page-form, .booking-form, .quote-form").forEach((formElement) => {
    formElement.addEventListener("submit", handleSubmit);
  });

  document.addEventListener("click", (event) => {
    const quoteButton = event.target.closest(".quote-button");
    if (!quoteButton) return;
    openModal(event);
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  closeButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
