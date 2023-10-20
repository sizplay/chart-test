import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

interface VideoPlayerProps {
  volumes: number;
  isPlaying: boolean;
  playerRef: React.RefObject<ReactPlayer>;
  onProgress: (e: ReactPlayerProps) => void;
  isRepeat: boolean;
  onStart: () => void;
  onPause: () => void;
  onPlay: () => void;
  onEnded: () => void;
  url: string;
}

const VideoPlayer = ({
  volumes,
  isPlaying,
  playerRef,
  onProgress,
  isRepeat,
  onStart,
  onPause,
  onPlay,
  onEnded,
  url,
}: VideoPlayerProps) => {
  return (
    <ReactPlayer
      muted={volumes === 0}
      playing={isPlaying}
      url={url}
      ref={playerRef}
      width="100%"
      height="100%"
      onProgress={(e) => onProgress(e)}
      className="absolute left-0 top-0"
      controls={false}
      loop={isRepeat}
      volume={volumes / 100}
      onStart={onStart}
      onPause={onPause}
      onPlay={onPlay}
      onEnded={onEnded}
    />
  );
};

export default VideoPlayer;
