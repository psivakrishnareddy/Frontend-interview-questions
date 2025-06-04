const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const backdrop = document.getElementById("modalBackdrop");

function openModal() {
  modal.hidden = false;
  backdrop.hidden = false;
  closeBtn.focus();
}

function closeModal() {
  modal.hidden = true;
  backdrop.hidden = true;
  openBtn.focus(); // return focus
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

// ESC key support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
