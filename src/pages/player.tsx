import PlayerComponent from '@/components/player';

const Player: React.FC = () => {
  return (
    <div>
      <h1>Player</h1>
      <div className="flex items-center justify-center">
        <div className="w-1/2 h-auto">
          <PlayerComponent />
        </div>
      </div>
    </div>
  );
};

export default Player;

// 처음 렌더링 될 때 비디오가 자동 재생 되려면 소리가 mute 되어야 한다.
// 그리고 풀스크린은 처음 렌더링 될때 안되고 풀스크린 버튼을 눌러야 한다.
// 그리고 풀스크린을 끄면 비디오가 멈추어야 한다.
// 그리고 비디오가 끝나면 다음 비디오가 재생되어야 한다.

// react-player는 ssr을 지원하지 않아서 dynamic import를 사용했다.
// 그리고 풀스크린을 위해서는 ref를 사용해야 한다.
// 그리고 풀스크린을 위해서는 screenfull을 사용해야 한다.
//
