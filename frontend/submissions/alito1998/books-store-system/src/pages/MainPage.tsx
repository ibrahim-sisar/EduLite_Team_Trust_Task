import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import DeleteIcon from "../assets/deleteIcon.tsx";
import {deleteBook, getBooks} from "../store/slices/bookSlice.ts"
import {useEffect} from "react";
import type {ThunkDispatch} from "@reduxjs/toolkit";
//import AddBookBtn from "../components/AddBookBtn.tsx";


function MainPage() {
    const {books, pending, error} = useSelector((state: RootState) => state.books)
    const dispatch = useDispatch()

    useEffect(() => {
        (dispatch as ThunkDispatch<any, any, any>)(getBooks());

    }, [dispatch]);

    if (error) {
        return (
            <div className="bg-gray-400 h-[86vh] py-5 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    Error: {error}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-gray-400 h-[100%]  py-5 ">

            <table className="table-fixed mx-auto bg-[rgba(255,255,255,.4)] rounded-lg w-[85%]">
                <thead className="bg-gray-950 rounded-lg text-white">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {pending ?
                    <tr>
                        <td colSpan={4} className="text-center"> Pending...</td>
                    </tr>
                    : (!Array.isArray(books)) ?
                        <tr>
                            <td colSpan={4} className="text-center"> Error: Invalid books data!</td>
                        </tr>
                        : books.length === 0 ?
                            <tr>
                                <td colSpan={4} className="text-center"> No Data To Show</td>
                            </tr>
                            : books.map((book) =>
                                    <tr key={book.id}>
                                        <td className="text-start">{book.name}</td>
                                        <td className="text-start">{book.description}</td>
                                        <td className="text-center">{book.price}</td>
                                        <td className="text-center">
                                            <button
                                                type={"button"}
                                                onClick={() => {
                                                    console.log(book);
                                                    (dispatch as ThunkDispatch<any, any, any>)(deleteBook(book.id))
                                                }}
                                            >
                                                <DeleteIcon/>
                                            </button>
                                        </td>
                                    </tr>
                            )}
                </tbody>
            </table>
        </div>
    )
}

export default MainPage
