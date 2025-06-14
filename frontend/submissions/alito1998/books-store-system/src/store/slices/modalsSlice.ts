import {createSlice} from "@reduxjs/toolkit";

export interface ModalState {
    AddBook: "open"|"close",
    EditBook: "open"|"close"
}
const initialState:ModalState ={
    AddBook :"close",
    EditBook :"close"
}
const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers:{
        openAddBook: (state) => {
            state.AddBook = "open";
            state.EditBook = "close";
        },
        closeAddBook: (state) => {
            state.AddBook = "close";
        },
        openEditBook: (state) => {
            state.EditBook = "open";
            state.AddBook = "close";
        },
        closeEditBook: (state) => {
            state.EditBook = "close";
        }
    }

});

export const {openAddBook,openEditBook,closeEditBook,closeAddBook} = modalsSlice.actions;
export default modalsSlice.reducer