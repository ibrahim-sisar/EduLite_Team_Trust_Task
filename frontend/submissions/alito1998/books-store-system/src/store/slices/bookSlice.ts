import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BookState {
    id: number
    name: string,
    description: string,
    price: number
}

const initialState: BookState[] = [{
    id: 123,
    name: "Book1",
    description: "Description 1",
    price: 1000
}]

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        removeBook: (state, action: PayloadAction<number>) => {
            return state.filter((ele)=>ele.id !== action.payload);
        },
        addBook: (state,action: PayloadAction<BookState>) => {
            state.push(action.payload);
        },
        updateBook: (state, action: PayloadAction<BookState>) => {
            const book = state.find((ele) => ele.id === action.payload.id);
            if (book) {
                book.name = action.payload.name;
                book.description = action.payload.description;
                book.price = action.payload.price;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addBook , removeBook , updateBook } = bookSlice.actions

export default bookSlice.reducer