import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
  reducer: {
    player,
  },
});

export type BaseStore = ReturnType<typeof store.getState>;
export type BaseStoreDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<BaseStore> = useSelector;
export const useAppDispatch: () => BaseStoreDispatch = useDispatch;
