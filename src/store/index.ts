import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
  reducer: {
    player,
  },
});

export type BaseStore = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<BaseStore> = useSelector;
