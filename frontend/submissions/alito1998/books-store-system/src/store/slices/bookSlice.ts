import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD');
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data);
            }
            return rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id:number, {rejectWithValue}) => {
        try {
            await axios.delete(`https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD/${id}`);
            return id;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data);
            }
            return rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
);

interface BookUnit {
    id: number
    name: string,
    description: string,
    price: number
}

export interface BookState {
    books: BookUnit[];
    pending: boolean;
    error: string|null;
}

const initialState: BookState = {
    books : [],
    pending : true,
    error: null
}

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET BOOKS
        builder.addCase(getBooks.fulfilled,(state, action)=>{
            state.books = Array.isArray(action.payload)? action.payload:[];
            state.pending = false;
            state.error = null;
        })
        builder.addCase(getBooks.pending,(state)=>{
            state.pending = true;
            state.error = null
        })
        builder.addCase(getBooks.rejected,(state, action)=>{
            state.error = action.error.message
                ? action.error.message
                : 'Failed to fetch books';
            state.pending = false;
        })

        //Delete BOOK
        builder.addCase(deleteBook.fulfilled,(state, action)=>{
            state.books = state.books.filter((ele)=>ele.id !== action.payload);
            state.pending = false;
            state.error = null;
        })
        builder.addCase(deleteBook.pending,(state)=>{
            state.pending = true;
            state.error = null
        })
        builder.addCase(deleteBook.rejected,(state, action)=>{
            state.error = action.error.message? action.error.message : "Failed to delete books " ;
            state.pending = false;
        })
    }

})


export default bookSlice.reducer