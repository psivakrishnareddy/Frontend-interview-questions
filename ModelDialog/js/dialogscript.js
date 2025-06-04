// With default dialog component
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.showModal(); // open dialog
});

closeBtn.addEventListener("click", () => {
  modal.close(); // close dialog
});

// Optional: close on ESC is built-in,
// but you can explicitly close on click outside
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const isClickOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;

  if (isClickOutside) {
    modal.close();
  }
});
