import {createSlice} from "@reduxjs/toolkit";

export interface ModalState {
    state: "Add"|"Edit"|"close",
    id: number|null,
}
const initialState:ModalState ={
    state: "close",
    id: null,
}
const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers:{
        openAddBookModal: (state) => {
            state.state = "Add";
            state.id = null;
        },
        closeModal: (state) => {
            state.state = "close";
            state.id = null;
        },
        openEditBookModal: (state,action) => {
            state.state = "Edit";
            state.id = action.payload;
            },

    }

});

export const {openAddBookModal,openEditBookModal,closeModal} = modalsSlice.actions;
export default modalsSlice.reducer