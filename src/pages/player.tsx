import { MessageCircle } from "lucide-react";
import { Header } from "../components/header";
import { VideoPlayer } from "../components/video";
import { Module } from "../components/module";
import { useEffect } from "react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Player() {
  const { load, course } = useStore((store) => ({
    load: store.load,
    course: store.course,
  }));

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (currentLesson?.title != null) {
      document.title = `Watching: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center antialiased">
      <div className="flex w-[1100px] flex-col gap-6">
        <header className="flex items-center justify-between">
          <Header />

          <button
            type="button"
            className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600"
          >
            <MessageCircle className="w-4 h-4" />
            Leave feedback
          </button>
        </header>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <VideoPlayer />
          </div>
          <aside className="w-80 absolute top-0 right-0 bottom-0 divide-y-2 divide-zinc-900 border-l border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules != null
              ? course.modules.map((mdl, index) => (
                  <Module
                    key={mdl.id}
                    title={mdl.title}
                    amountOfLessons={mdl.lessons.length}
                    moduleIndex={index}
                  />
                ))
              : null}
          </aside>
        </main>
      </div>
    </div>
  );
}
