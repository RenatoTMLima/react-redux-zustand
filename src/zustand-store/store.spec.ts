import { describe, it, expect, beforeEach } from "vitest";
import { useStore as store } from ".";

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: "Starting with React",
      lessons: [
        { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
        { id: "w-DW4DhDfcw", title: "Post styling", duration: "10:05" },
      ],
    },
    {
      id: 2,
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
};

describe("zustand store", () => {
  beforeEach(() => {
    store.setState(store.getInitialState());
  });

  it("should be able to play", () => {
    const { play } = store.getState();

    play({ moduleIndex: 1, lessonIndex: 2 });

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(2);
  });
  it("should be able to jump to the next lesson", () => {
    store.setState({ course });

    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });
  it("should be able to jump to the next module", () => {
    store.setState({ course, currentLessonIndex: 1 });

    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });
  it("should not update the current module and lesson if the user is in the last lesson", () => {
    store.setState({ course, currentModuleIndex: 1, currentLessonIndex: 1 });

    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(1);
  });
});
