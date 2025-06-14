import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleLike = () => {
    setisLoading(!isLoading);
    setLiked(!liked);
    setTimeout(() => {
      setisLoading((prevVal) => !prevVal);
    }, 1000);
  };
  return (
    <div>
      {!isLoading && (
        <button
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <HeartIcon className="hicon" /> Like
        </button>
      )}
      {isLoading && (
        <button className="heart-icon">
          <SpinnerIcon className="hicon" /> Like
        </button>
      )}
    </div>
  );
}


// Great Frontend Solution

import { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icons';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export default function App() {
  // Determines if the button is in the default/liked state.
  const [liked, setLiked] = useState(false);
  // Whether there's a pending background API request.
  const [isPending, setIsPending] = useState(false);
  // Error message to be shown if the API request failed.
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        'https://questions.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        },
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="button-container">
      <button
        className={classNames(
          'like-button',
          liked
            ? 'like-button--liked'
            : 'like-button--default',
        )}
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}>
        {isPending ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? 'Liked' : 'Like'}
      </button>
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}


