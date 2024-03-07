import Player from "react-player";
import { useDispatch } from "react-redux";
import { next, useCurrentLesson } from "../store/slices/player";

export function VideoPlayer() {
  const dispatch = useDispatch();

  const { currentLesson } = useCurrentLesson();

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
      />
    </div>
  );
}