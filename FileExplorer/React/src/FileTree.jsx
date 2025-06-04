import React, { useState } from 'react';

const sortFiles = files => {
  return [...files].sort((a, b) => {
    const aIsDir = !!a.children;
    const bIsDir = !!b.children;
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.name.localeCompare(b.name);
  });
};

const TreeNode = ({ item, level = 1 }) => {
  const [expanded, setExpanded] = useState(false);
  const isDir = !!item.children;

  const toggle = () => {
    if (isDir) setExpanded(prev => !prev);
  };

  return (
    <li
      role="treeitem"
      aria-expanded={isDir ? expanded : undefined}
      aria-level={level}
      style={{ marginLeft: `${(level - 1) * 20}px` }}
    >
      {isDir ? (
        <>
          <button
            onClick={toggle}
            aria-label={`${item.name} folder`}
            aria-expanded={expanded}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {expanded ? '▼' : '▶'} {item.name}
          </button>
          {expanded && (
            <ul role="group">
              {sortFiles(item.children).map(child => (
                <TreeNode key={child.id} item={child} level={level + 1} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <span>{item.name}</span>
      )}
    </li>
  );
};

const FileTree = ({ data }) => {
  return (
    <div role="tree" aria-label="File Tree">
      <ul role="group" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {sortFiles(data).map(item => (
          <TreeNode key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default FileTree;
