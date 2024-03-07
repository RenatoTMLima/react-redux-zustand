import { describe, expect, it } from "vitest";
import { player as reducer, play, next } from "./player";

const mockedState = {
  course: {
    modules: [
      {
        id: "1",
        title: "Starting with React",
        lessons: [
          { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
          { id: "w-DW4DhDfcw", title: "Post styling", duration: "10:05" },
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
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

describe("player slice", () => {
  it("should be able to play", () => {
    const state = reducer(
      mockedState,
      play({ moduleIndex: 1, lessonIndex: 2 })
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(2);
  });
  it("should be able to jump to the next lesson", () => {
    const state = reducer(mockedState, next());

    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });
  it("should be able to jump to the next module", () => {
    const currentTestState = { ...mockedState, currentLessonIndex: 1 };

    const state = reducer(currentTestState, next());

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(0);
  });
  it("should not update the current module and lesson if the user is in the last lesson", () => {
    const currentTestState = {
      ...mockedState,
      currentLessonIndex: 1,
      currentModuleIndex: 1,
    };

    const state = reducer(currentTestState, next());

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(1);
  });
});
