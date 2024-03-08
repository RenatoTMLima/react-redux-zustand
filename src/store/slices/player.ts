import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

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
};

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  return response.data;
});

const playerSlice = createSlice({
  name: "player",
  initialState,
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
        state?.course?.modules[state.currentModuleIndex].lessons[nextLesson] !=
        null
      ) {
        state.currentLessonIndex = nextLesson;
        return;
      }

      const nextModule = state.currentModuleIndex + 1;

      if (state?.course?.modules[nextModule] != null) {
        state.currentModuleIndex = nextModule;
        state.currentLessonIndex = 0;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((store) => {
    const { currentLessonIndex, currentModuleIndex } = store.player;

    const currentModule = store?.player?.course?.modules[currentModuleIndex];
    const currentLesson =
      store?.player?.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    return {
      currentModule,
      currentLesson,
    };
  });
};
