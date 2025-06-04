import React from "react";
import ReactDOM from "react-dom/client";
import FileTree from "./FileTree";

const fileData = [
  { id: 1, name: "README.md" },
  {
    id: 2,
    name: "Documents",
    children: [
      { id: 3, name: "Word.doc" },
      { id: 4, name: "Powerpoint.ppt" },
    ],
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FileTree data={fileData} />);
