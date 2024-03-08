import { create } from "zustand";
import { api } from "../lib/axios";

export type Course = {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
};

export type PlayerState = {
  course: Course | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  isLoading: boolean;

  load: () => Promise<void>;
  play: (moduleAndLessonIndex: {
    moduleIndex: number;
    lessonIndex: number;
  }) => void;
  next: () => void;
};

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true });

      const response = await api.get("/courses/1");

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: {
      moduleIndex: number;
      lessonIndex: number;
    }) => {
      const { lessonIndex, moduleIndex } = moduleAndLessonIndex;

      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      });
    },
    next: () => {
      const { course, currentLessonIndex, currentModuleIndex } = get();

      const nextLesson = currentLessonIndex + 1;

      if (course?.modules[currentModuleIndex].lessons[nextLesson] != null) {
        set({
          currentLessonIndex: nextLesson,
        });
        return;
      }

      const nextModule = currentModuleIndex + 1;

      if (course?.modules[nextModule] != null) {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: nextModule,
        });
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((store) => {
    const { currentLessonIndex, currentModuleIndex } = store;

    const currentModule = store?.course?.modules[currentModuleIndex];
    const currentLesson =
      store?.course?.modules[currentModuleIndex].lessons[currentLessonIndex];

    return {
      currentModule,
      currentLesson,
    };
  });
};
