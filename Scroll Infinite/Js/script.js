const container = document.getElementById("scroll-container");
const content = document.getElementById("content");
const loading = document.getElementById("loading");

let page = 1;
let loadingInProgress = false;

// Fake API call
function fetchItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from(
        { length: 10 },
        (_, i) => `Item ${(page - 1) * 10 + i + 1}`
      );
      resolve(items);
    }, 1000);
  });
}

function renderItems(items) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;
    content.appendChild(div);
  });
}

async function loadMoreItems() {
  if (loadingInProgress) return;
  loadingInProgress = true;
  loading.style.display = "block";

  const items = await fetchItems(page++);
  renderItems(items);

  loading.style.display = "none";
  loadingInProgress = false;
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = container;
  console.log({ scrollTop, scrollHeight, clientHeight });
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMoreItems();
  }
}

// Initial data
loadMoreItems();

// Attach event to container, not window
container.addEventListener("scroll", handleScroll);
