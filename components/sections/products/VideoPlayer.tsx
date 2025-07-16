import React from "react";

const VideoPlayer = ({ src }:any) => {
  const isYouTube = src.includes("youtube.com");

  return (
    <div className="rounded-lg object-cover w-full  mb-4">
      {isYouTube ? (
        <iframe
          width="100%"
          height="500"
          className="rounded-lg object-cover w-full  mb-4"
          src={`https://www.youtube.com/embed/${extractYouTubeID(src)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video
          className="rounded-lg object-cover w-full h-auto mb-4"
          controls
          src={src}
        />
      )}
    </div>
  );
};

// Prosta funkcja do wyciągania ID z YouTube URL
function extractYouTubeID(url:any) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default VideoPlayer;
