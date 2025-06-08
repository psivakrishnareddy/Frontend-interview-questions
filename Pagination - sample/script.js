const content = document.getElementById("content");
const pageInfo = document.getElementById("page-info");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentPage = 1;
const pageSize = 10;
const totalItems = 100;
const totalPages = Math.ceil(totalItems / pageSize);

function getItems(page) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalItems);
    return Array.from({ length: end - start + 1 }, (_, i) => `Item ${start + i}`);
}

function renderPage(page) {
    content.innerHTML = ""; // Clear existing
    const items = getItems(page);
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.textContent = item;
        content.appendChild(div);
    });

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

// Load initial
renderPage(currentPage);
