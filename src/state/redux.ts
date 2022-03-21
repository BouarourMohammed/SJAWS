import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import alertSlice from "./alert";
import profileSlice from "./profile";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    alertSlice,
    profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
