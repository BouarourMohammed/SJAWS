import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./alert";
export * from "./alert/hooks";

export * from "./profile";

export * from "./profile/hooks";

export * from "./redux";
