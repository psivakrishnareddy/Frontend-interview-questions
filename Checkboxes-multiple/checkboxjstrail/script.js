// Tree Data
const checkBoxTree = [
  {
    label: "Parent 1",
    children: [
      { label: "Child 1" },
      { label: "Child 2" },
      { label: "Child 3" },
    ],
  },
  {
    label: "Parent 2",
    children: [
      { label: "Child 1" },
      { label: "Child 2" },
      {
        label: "Child 3",
        children: [
          { label: "Child 111" },
          { label: "Child 222" },
          { label: "Child 333" },
        ],
      },
    ],
  },
];

function createCheckBoxTree(data) {
  const ul = document.createElement("ul");

  for (item of data) {
    // create a label element
    const li = document.createElement("li");

    //create a check box
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.dataset.label = item.label;
    checkBox.setAttribute("aria-checked", false);
    checkBox.role = "checkbox";

    // label
    const label = document.createElement("label");
    label.textContent = item.label;

    // Add to the UL
    li.appendChild(label);
    li.appendChild(checkBox);

    if (item.children) {
      const childLi = createCheckBoxTree(item.children);
      li.appendChild(childLi);
    }

    ul.appendChild(li);
  }

  return ul;
}

// Check box Logic

function checkBoxSelectionLogic(tree) {
  // Check event on the root container which is triggered for all changes due to event bubbling
  tree.addEventListener("change", (e) => {
    const checkbox = e.target;

    // const li = checkbox.parentNode; // This gets the parent node of Input which is LI

    // If the target is not if type input skip
    if (checkbox.tagName !== "INPUT" || checkbox.type !== "checkbox") return;

    const li = checkbox.closest("li"); // Gives the closest ancestor
    // console.log(li);

    // DOWNWARD LOGIC

    // Get all child check boxes
    // Find direct UL child, next Sibling is ul here we can use li.quer
    const childCheckboxes =
      li?.querySelectorAll("ul input[type='checkbox']") || [];
    //This can also be done instead of query selctor
    console.log(childCheckboxes, checkbox.nextElementSibling);

    childCheckboxes.forEach((child) => {
      child.checked = checkbox.checked;
      child.setAttribute("aria-checked", checkbox.checked);
    });

    // UPWARD LOGIC

    updateParentCheckboxes(li);
  });
}

function updateParentCheckboxes(li) {
  let parentUl = li.parentElement.closest("li"); //takes the parent element for the current li of the checkbox
  while (parentUl) {
    console.log(parentUl);
    // Until a parent is checked!
    const parentCheckbox = parentUl.querySelector("input[type='checkbox']");
    const childCheckboxes = parentUl.querySelectorAll(
      ":scope > ul input[type='checkbox']"
    ); // If scope is not given event parent is selected then we need to slice, from parent all Ul Elements with  input

    const allChecked = Array.from(childCheckboxes)
      .slice()
      .every((cb) => cb.checked);

    const someChecked = Array.from(childCheckboxes)
      .slice()
      .some((cb) => cb.checked);

    console.log(allChecked, someChecked);

    parentCheckbox.checked = allChecked;
    parentCheckbox.indeterminate = !allChecked && someChecked;

    parentUl = parentUl.parentElement.closest("li");
  }
}

// Create the Tree Nodes UL
const treeContainer = createCheckBoxTree(checkBoxTree);

// Root
const root = document.querySelector(".container-tree");
root.appendChild(treeContainer);

checkBoxSelectionLogic(root);
