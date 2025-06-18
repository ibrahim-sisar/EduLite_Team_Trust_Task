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
            }else {
                return rejectWithValue({message: 'An unexpected error occurred'});
            }
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

export const AddBook = createAsyncThunk(
    "books/AddBook",
    async (state:BookUnit, {rejectWithValue}) => {
        try {
            const response = await axios.post(`https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD`,state);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data);
            }
            return rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
);

export const updateBook = createAsyncThunk(
    "books/updateBook",
    async (state:BookUnit, {rejectWithValue}) => {
        try {
            const response = await axios.put(`https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD/${state.id}`,state);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data);
            }
            return rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
);

export interface BookUnit {
    id: number ;
    name: string,
    description: string,
    price: number
}

export interface BookState {
    books: BookUnit[];
    pending: boolean;
    error: {
        payload?: {}
        massage:string,
    }|null;
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
            state.error={
                massage: 'Failed to fetch books',
                payload: action.payload?action.payload:{}
            };
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
            state.error={
                massage: 'Failed to Delete book',
                payload: action.payload?action.payload:{}
            };
            state.pending = false;
        })

        //Add Book
        builder.addCase(AddBook.fulfilled,(state, action)=>{
            state.books.push(action.payload)
            state.pending = false;
            state.error = null;
        })
        builder.addCase(AddBook.pending,(state)=>{
            state.pending = true;
            state.error = null
        })
        builder.addCase(AddBook.rejected,(state, action)=>{
            state.error={
                massage: 'Failed to Add book',
                payload: action.payload?action.payload:{}
            };
            state.pending = false;
        })

        //Update Book
        builder.addCase(updateBook.fulfilled,(state, action)=>{
            const book = state.books.find((ele) => ele.id === action.payload.id);
            if (book) {
                book.name = action.payload.name;
                book.description = action.payload.description;
                book.price = action.payload.price;
            }
            state.pending = false;
            state.error = null;
        })
        builder.addCase(updateBook.pending,(state)=>{
            state.pending = true;
            state.error = null
        })
        builder.addCase(updateBook.rejected,(state, action)=>{
            state.error={
                massage: 'Failed to Edite book',
                payload: action.payload?action.payload:{}
            };state.pending = false;
        })
    }

})


export default bookSlice.reducer