(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = "Open navigation menu";
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = isOpen ? "Open navigation menu" : "Close navigation menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (nav.classList.contains("is-open") &&
          !nav.contains(event.target) &&
          !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("move-planner");
  const result = document.getElementById("form-result");
  const output = document.getElementById("checklist-output");
  const copyButton = document.getElementById("copy-checklist");
  const copyStatus = document.getElementById("copy-status");

  if (form && result && output) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const propertyType = document.getElementById("property-type").value.trim();
      const date = document.getElementById("move-date").value.trim();
      const details = document.getElementById("move-details").value.trim();

      if (!propertyType) {
        document.getElementById("property-type").focus();
        return;
      }

      const checklist = [
        "MOVING DETAILS CHECKLIST",
        "Property type: " + propertyType,
        "Preferred moving date: " + (date || "To be confirmed"),
        "Pickup, destination and requirements: " + (details || "Add addresses, inventory, packing needs and building access details."),
        "",
        "Before confirming a move:",
        "- Confirm the service scope and written quotation.",
        "- Check lift bookings, loading access and building approvals.",
        "- Confirm packing, furniture dismantling and reassembly requirements.",
        "- Ask about exclusions and applicable insurance terms.",
        "",
        "Contact the company through its official website: https://expertmoverspacker.com/"
      ].join("\n");

      output.textContent = checklist;
      result.hidden = false;
      if (copyStatus) copyStatus.textContent = "";
      result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    });
  }

  if (copyButton && output && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const text = output.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = "Checklist copied. You can paste it into your message.";
      } catch (error) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(output);
        selection.removeAllRanges();
        selection.addRange(range);
        copyStatus.textContent = "Automatic copying was unavailable. The checklist text is selected so you can copy it manually.";
      }
    });
  }
})();
