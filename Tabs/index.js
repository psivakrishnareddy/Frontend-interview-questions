import "./styles.css";

// Write your JavaScript here.

const tabs = document.querySelectorAll("button[role='tab']");
// console.log(tabs)
const content = document.querySelector("#panels");
// console.log(content)

// select the first one

const setTabState = (isSelected, element) => {
  // const tabid = element.getAttribute("id").split("-")[0];
  const panel = document.getElementById(element.dataset.target);
  panel.style.display = isSelected ? "block" : "none";
  element.style.backgroundColor = isSelected ? "blue" : "";
  element.setAttribute("aria-selected", isSelected);
};

setTabState(true, tabs[0]);

tabs.forEach((element) => {
  element.addEventListener("click", () => {
    // Close all tabs
    tabs.forEach((el) => {
      setTabState(false, el);
    });
    // content.forEach((el) => (el.style.display = "none"));
    let isSelected = element.getAttribute("aria-selected") == true;
    if (!isSelected) {
      isSelected = !isSelected;
      setTabState(isSelected, element);
    }
  });
});