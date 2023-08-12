import React, { useRef, useState } from "react";

const VideoRef = () => {
  const [state, setState] = useState(false);
  let videoRef = useRef();
  const handlePlayPause = () => {
    if (state === false) {
      videoRef.current.play();
    } else if (state === true) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            handlePlayPause();
            setState(!state);
          }}
        >
          {!state ? "Play" : "Pause"}
        </button>
      </div>
      <video width={1080} height={540} ref={videoRef}>
        <source src="Videos/motVideo.mp4" />
      </video>
    </div>
  );
};

export default VideoRef;
