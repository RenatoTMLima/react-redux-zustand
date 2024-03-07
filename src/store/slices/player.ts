import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    course: {
      modules: [
        {
          id: "1",
          title: "Starting with React",
          lessons: [
            { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
            { id: "w-DW4DhDfcw", title: "Post styling", duration: "10:05" },
            {
              id: "D83-55LUdKE",
              title: "Component: Header",
              duration: "06:33",
            },
            {
              id: "W_ATsETujaY",
              title: "Component: Sidebar",
              duration: "09:12",
            },
            { id: "Pj8dPeameYo", title: "CSS Global", duration: "03:23" },
            { id: "8KBq2vhwbac", title: "Comments Form", duration: "11:34" },
          ],
        },
        {
          id: "2",
          title: "Application Structure",
          lessons: [
            {
              id: "gE48FQXRZ_o",
              title: "Component: Comment",
              duration: "13:45",
            },
            { id: "Ng_Vk4tBl0g", title: "Responsiveness", duration: "10:05" },
            {
              id: "h5JA3wfuW1k",
              title: "Interactions in JSX",
              duration: "06:33",
            },
            { id: "1G0vSTqWELg", title: "Using states", duration: "09:12" },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },
  reducers: {
    play: (
      state,
      action: PayloadAction<{ moduleIndex: number; lessonIndex: number }>
    ) => {
      state.currentModuleIndex = action.payload.moduleIndex;
      state.currentLessonIndex = action.payload.lessonIndex;
    },
    next: (state) => {
      const nextLesson = state.currentLessonIndex + 1;

      if (
        state.course.modules[state.currentModuleIndex].lessons[nextLesson] !=
        null
      ) {
        state.currentLessonIndex = nextLesson;
        return;
      }

      const nextModule = state.currentModuleIndex + 1;

      if (state.course.modules[nextModule] != null) {
        state.currentModuleIndex = nextModule;
        state.currentLessonIndex = 0;
      }
    },
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((store) => {
    const { currentLessonIndex, currentModuleIndex } = store.player;

    const currentModule = store.player.course.modules[currentModuleIndex];
    const currentLesson =
      store.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    return {
      currentModule,
      currentLesson,
    };
  });
};
