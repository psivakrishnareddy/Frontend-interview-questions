import React from "react";
import "./ProgressBar.css"; // Assume you have styles for .progress and .progress-indicator

export default function ProgressBar() {
  const [progress, setProgress] = React.useState(10);
  const progressRef = React.useRef(null);

  const handleProgress = (e) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect(); // get size & position
    const clickX = e.clientX - rect.left; // get click offset inside bar
    const totalWidth = rect.width;

    const newProgress = Math.min(100, Math.max(0, (clickX / totalWidth) * 100));
    setProgress(newProgress);
  };

  return (
    <div
      className="progress"
      onClick={handleProgress}
      ref={progressRef}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="progress-indicator"
        style={{ width: `${progress}%` }}
      >
        <span>{`${Math.round(progress)}%`}</span>
      </div>
    </div>
  );
}


import ProgressBar from './ProgressBar';

export default function App() {
  return (
    <div>
      <ProgressBar />
    </div>
  );
}

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
