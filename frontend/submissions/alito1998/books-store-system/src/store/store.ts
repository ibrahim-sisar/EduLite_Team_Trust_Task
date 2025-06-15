import { configureStore } from '@reduxjs/toolkit'
import bookSliceReducer from "./slices/bookSlice.ts";
import modalSliceReducer from "./slices/modalsSlice.ts";

export const store = configureStore({
    reducer: {
        books: bookSliceReducer,
        modals: modalSliceReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatch = typeof store.dispatch