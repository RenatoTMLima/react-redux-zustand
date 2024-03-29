import * as Collapsible from "@radix-ui/react-collapsible";

import { ChevronDown } from "lucide-react";
import { Lesson } from "./lesson";
import { useStore } from "../zustand-store";

type ModuleProps = {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
};

export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (store) => {
      const { currentLessonIndex, currentModuleIndex, play } = store;

      return {
        currentLessonIndex,
        currentModuleIndex,
        play,
        lessons: store.course?.modules[moduleIndex].lessons,
      };
    }
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">
            {amountOfLessons} lessons
          </span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons != null
            ? lessons.map((lesson, lessonIndex) => {
                const isCurrent =
                  moduleIndex === currentModuleIndex &&
                  lessonIndex === currentLessonIndex;

                return (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    duration={lesson.duration}
                    onPlay={() => play({ moduleIndex, lessonIndex })}
                    isCurrent={isCurrent}
                  />
                );
              })
            : null}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
