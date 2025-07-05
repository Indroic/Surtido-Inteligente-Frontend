// store/hooks.ts
import type { RootState, AppDispatch } from "./store";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Usa estos hooks a través de tu aplicación en lugar de los de `react-redux`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
