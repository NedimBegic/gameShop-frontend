import React from "react";

interface VideoProps {
  src: string;
  width?: number;
  height?: number;
}

const Video: React.FC<VideoProps> = ({ src, width = 640, height = 360 }) => {
  return (
    <div>
      <video width={width} height={height} controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
