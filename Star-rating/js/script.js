const stars = document.querySelectorAll("#star-rating .star");
const ratingDisplay = document.getElementById("rating-value");
let selectedRating = 0;

function updateStars(rating) {
  stars.forEach((star, index) => {
    const val = parseInt(star.dataset.value);
    star.classList.toggle("selected", val <= rating);
    star.setAttribute("aria-checked", val === rating);
    star.tabIndex = val === rating || (rating === 0 && index === 0) ? 0 : -1;
  });
}

stars.forEach((star, i) => {
  const value = parseInt(star.dataset.value);

  // Mouse hover
  star.addEventListener("mouseover", () => {
    stars.forEach((s) => {
      s.classList.toggle("hovered", parseInt(s.dataset.value) <= value);
    });
  });

  star.addEventListener("mouseout", () => {
    stars.forEach((s) => s.classList.remove("hovered"));
  });

  // Mouse click
  star.addEventListener("click", () => {
    selectedRating = value;
    ratingDisplay.textContent = selectedRating;
    updateStars(selectedRating);
  });

  // Keyboard support
  star.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = stars[Math.min(i + 1, stars.length - 1)];
      next.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = stars[Math.max(i - 1, 0)];
      prev.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectedRating = value;
      ratingDisplay.textContent = selectedRating;
      updateStars(selectedRating);
    }
  });
});
