window.addEventListener("DOMContentLoaded", () => {
  const panels = Array.from(document.querySelectorAll(".accordion"));
  const multiSelect = document.getElementById("multiselect");

  function setPanelState(panelEl, open) {
    const header = panelEl.querySelector(".accordion-header");
    const content = panelEl.querySelector(".accordion-content");
    const expandIcon = panelEl.querySelector(".expand-icon");
    const collapseIcon = panelEl.querySelector(".collapse-icon");

    header.setAttribute("aria-expanded", open);
    content.style.display = open ? "block" : "none";
    expandIcon.style.display = open ? "none" : "inline";
    collapseIcon.style.display = open ? "inline" : "none";
  }

  // Initialize all panels (first open, rest closed)
  panels.forEach((panelEl, idx) => {
    setPanelState(panelEl, idx === 0);
  });

  panels.forEach((panelEl) => {
    const header = panelEl.querySelector(".accordion-header");

    const togglePanel = () => {
      const isOpen = header.getAttribute("aria-expanded") === "true";
      if (!multiSelect.checked) {
        panels.forEach((el) => setPanelState(el, false)); // Close all
      }
      setPanelState(panelEl, !isOpen); // Toggle current
    };

    // Click
    header.addEventListener("click", togglePanel);

    // Keyboard: Enter or Space
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePanel();
      }
    });
  });
});
