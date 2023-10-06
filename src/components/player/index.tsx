import { Play, Maximize, Pause, VolumeX, Volume2, Repeat } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import screenfull from 'screenfull';
import { Slider } from 'antd';
import { timeFormat } from './utils';

interface PlayerComponentProps {
  url: string;
}

const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

const PlayerComponent = ({ url }: PlayerComponentProps) => {
  const fullScreenRef = useRef(null);
  const playerRef = useRef<ReactPlayer>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volumes, setVolumes] = useState<number>(50);
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState('0:00');
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (isRepeat && isPlaying) {
      setVolumes(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFullScreen = () => {
    if (screenfull.isEnabled && fullScreenRef.current) {
      // eslint-disable-next-line react/no-find-dom-node
      screenfull.toggle(findDOMNode(fullScreenRef.current) as Element);
    }
  };

  const handlePlaying = () => {
    setIsPlaying((prev) => !prev);
    if (isEnded) {
      setIsEnded(false);
      setSeekTime('0:00');
    }
  };

  const handleMuting = (value: number) => {
    setVolumes(value);
  };

  const handleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  const handleStart = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolumes(value);
  };

  /** */

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(false);
    console.log(parseFloat(e.target.value));
    playerRef.current?.seekTo(parseFloat(e.target.value), 'fraction');
  };

  const handleSeekChange = (e: any) => {
    console.log('handleSeekChange', e.target.value);
    setPlayed(parseFloat(e.target.value));
    // setSeekTime(value);
    // setPlayed(parseFloat(e.target.value));
    // if (playerRef?.current) {
    //   setSeeking(false);
    //   playerRef.current?.seekTo(parseFloat(e.target.value));
    // }
  };

  const onProgress = (e: ReactPlayerProps) => {
    console.log(e.playedSeconds, e.playedSeconds);
    setSeekTime(timeFormat(Math.ceil(e.playedSeconds)));
  };

  const handleEnded = () => {
    if (isRepeat) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    setIsEnded(true);
  };

  // console.log(played);

  // console.log(duration);
  // console.log(playerRef?.current);
  // console.log(playerRef?.current?.getInternalPlayer()?.getSize());
  // console.log(playerRef?.current?.getSecondsLoaded(), timeFormat(Number(playerRef?.current?.getSecondsLoaded())));
  // console.log(playerRef?.current);
  // console.log(playerRef?.current?.getDuration());
  console.log(seekTime);
  return (
    <article className="flex h-auto w-auto flex-col bg-black">
      <div className="relative pt-[56.25%]" ref={fullScreenRef}>
        <VideoPlayer
          volumes={volumes}
          isPlaying={isPlaying}
          // url="https://www.youtube.com/watch?v=NNS5Piu-EII"
          url={url}
          playerRef={playerRef}
          onProgress={(e) => onProgress(e)}
          isRepeat={isRepeat}
          onStart={handleStart}
          onPause={handlePause}
          onPlay={handlePlay}
          onEnded={handleEnded}
          // onDuration={handleDuration}
        />
      </div>
      {/* <Slider
        defaultValue={0}
        max={1}
        min={0}
        value={seekTime}
        step={0.01}
        onChange={handleSeekChange}
        trackStyle={{ backgroundColor: 'white' }}
        railStyle={{ backgroundColor: 'gray' }}
        handleStyle={{ borderColor: 'white' }}
        className="p-0 m-0"
      /> */}
      {/* <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        value={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
        className="z-10 w-full h-1 bg-gray-300 appearance-none cursor-pointer"
      /> */}
      <div className="flex h-16 w-full items-center justify-between px-5">
        <div className="flex items-center">
          {isPlaying ? (
            <Pause onClick={handlePlaying} className="cursor-pointer text-white hover:text-gray-400" />
          ) : (
            <Play onClick={handlePlaying} className="cursor-pointer text-white hover:text-gray-400" />
          )}
          {volumes === 0 ? (
            <VolumeX onClick={() => handleMuting(1)} className="ml-3 cursor-pointer text-white hover:text-gray-400" />
          ) : (
            <div
              className="ml-3 flex items-center gap-2"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <Volume2 onClick={() => handleMuting(0)} className="cursor-pointer text-white hover:text-gray-400" />
              {showVolumeSlider && (
                <div className="w-20">
                  <Slider
                    defaultValue={volumes}
                    onChange={handleVolumeChange}
                    trackStyle={{ backgroundColor: 'white' }}
                    railStyle={{ backgroundColor: 'gray' }}
                    handleStyle={{ borderColor: 'white' }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="ml-3 flex  -translate-y-0.5 items-center">
            <time dateTime={`P${Math.ceil(Number(seekTime))}S`} className="text-white">
              {seekTime}
            </time>
            <p className="mx-1 text-white">/</p>
            <time dateTime={`P${Math.ceil(playerRef?.current?.getDuration() || 0)}S`} className="text-white">
              {timeFormat(Math.ceil(Number(playerRef?.current?.getDuration())) || 0)}
            </time>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Repeat
            onClick={handleRepeat}
            className={`${isRepeat ? 'text-white' : 'text-gray-600'} cursor-pointer hover:text-gray-400`}
          />
          <Maximize onClick={handleFullScreen} className="cursor-pointer text-white hover:text-gray-400" />
        </div>
      </div>
    </article>
  );
};

export default PlayerComponent;
