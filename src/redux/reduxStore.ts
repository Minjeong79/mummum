import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { serializableCheck } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const persistConfig = {
  key: "root", //저장할 데이터 key
  storage, //사용할 엔진
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        // 직렬화 가능한지 확인할 수 있도록 대상을 설정합니다.
        ignoredActions: ["persist/PERSIST"], // redux-persist에 의해 발생하는 액션은 무시합니다.
        ignoredPaths: ["some.nested.path"], // 직렬화 검사를 건너뛸 경로를 설정합니다.
      },
    });
    return defaultMiddleware;
  },
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
