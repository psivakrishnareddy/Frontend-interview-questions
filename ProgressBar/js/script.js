const progressBar = document.getElementById("progressBar");
const indicator = document.getElementById("progressIndicator");
const progressText = document.getElementById("progressText");

let progress = 10;

progressBar.addEventListener("click", function (e) {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  // Calculate new progress %
  progress = Math.round((clickX / width) * 100);
  progress = Math.max(0, Math.min(progress, 100)); // Clamp between 0-100

  // Update UI
  indicator.style.width = progress + "%";
  progressText.textContent = progress + "%";
  progressBar.setAttribute("aria-valuenow", progress);
});

// HTML
<div
  class="progress"
  id="progressBar"
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="10"
>
  <div class="progress-indicator" id="progressIndicator">
    <span id="progressText">10%</span>
  </div>
</div>;
