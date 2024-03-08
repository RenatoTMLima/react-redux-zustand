import Player from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function VideoPlayer() {
  const { isLoading, next } = useStore((store) => ({
    isLoading: store.isLoading,
    next: store.next,
  }));

  const { currentLesson } = useCurrentLesson();

  function handlePlayNext() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center bg-zinc-50/10 animate-pulse">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
