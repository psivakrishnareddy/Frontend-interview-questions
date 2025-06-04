const fileData = [
  {
    id: 1,
    name: "README.md",
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "Word.doc",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
      },
      {
        id: 7,
        name: "Misc",
        children: [
          {
            id: 8,
            name: "foo.txt",
          },
          {
            id: 9,
            name: "bar.txt",
          },
        ],
      },
    ],
  },
];

// Utility: Sort directories first, then files, both alphabetically
function sortFiles(files) {
  return [...files].sort((a, b) => {
    aIsDir = Object.hasOwn(a, "children");
    bIsDir = Object.hasOwn(b, "children");
    //aIsDir=  a.hasOwnProperty("children")
    //aIsDir = !!a.children
    if (aIsDir && !bIsDir) return -1; // similar to a < b when a is less then return -1
    if (!aIsDir && bIsDir) return 1;
    if ((!aIsDir && !bIsDir) || (aIsDir && bIsDir))
      return a.name.localeCompare(b.name);
  });
}

function createFileNode(file, level = 0) {
  const li = document.createElement("li");
  li.style.marginLeft = `${level * 5}px`; // Child should have intendation
  li.setAttribute("aria-level", level + 1);
  li.setAttribute("role", "treeitem");
  li.style.listStyle = "none";

  if (file.children) {
    // UL Element child initially hidden, role group
    const ul = document.createElement("ul");
    ul.setAttribute("role", "group");
    ul.style.display = "none";
    // Buttton or icon
    const button = document.createElement("span");
    button.textContent = `${file.name} [+]`;
    button.classList.add("button");
    button.setAttribute("aria-expanded", false);
    button.setAttribute("aria-label", `${file.name} folder`);
    button.style.background = "none";
    button.style.border = "none";
    button.style.cursor = "pointer";

    // Sort children and add to Node since we have children we create new UL
    sortFiles(file.children).forEach((childFile) => {
      ul.appendChild(createFileNode(childFile, level + 1));
    });
    button.addEventListener("click", () => {
      //   const button = li.firstElementChild; // can do query selctor
      const isOpen = button.getAttribute("aria-expanded") == "true";
      button.setAttribute("aria-expanded", !isOpen);
      //   console.log("Clicked", { isOpen: button.getAttribute("aria-expanded") });
      button.textContent = `${file.name} ${isOpen ? "[+]" : "[-]"}`;
      ul.style.display = isOpen ? "none" : "block";
    });

    // events
    li.appendChild(button);
    li.appendChild(ul);
    // console.log(li);
  } else {
    li.textContent = file.name;
  }

  return li;
}

function buildFileTree(files) {
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.setAttribute("role", "group");

  files.forEach((file) => {
    ul.append(createFileNode(file));
  });
  return ul;
}

// Sort the Files
const sortedFiles = sortFiles(fileData);

// Printing the JSON in html
const pre = document.createElement("pre");
pre.textContent = JSON.stringify(sortedFiles, null, 2);
// console.log(pre);

const fileTree = buildFileTree(sortedFiles);
console.log(fileTree);
document.querySelector(".file-tree").appendChild(fileTree);
