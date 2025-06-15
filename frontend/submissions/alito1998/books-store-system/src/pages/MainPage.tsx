import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import DeleteIcon from "../assets/deleteIcon.tsx";
import {deleteBook, getBooks} from "../store/slices/bookSlice.ts"
import {Fragment, useEffect} from "react";
import type {ThunkDispatch} from "@reduxjs/toolkit";
import EditeIcon from "../assets/EditeIcon.tsx";
import { openEditBookModal} from "../store/slices/modalsSlice.ts"

function MainPage() {
    const {books, pending, error} = useSelector((state: RootState) => state.books)
    const dispatch = useDispatch()

    useEffect(() => {
        (dispatch as ThunkDispatch<any, any, any>)(getBooks());

    }, [dispatch]);

    /*if (error) {
        return (
            <div className="bg-gray-400 h-[86vh] py-5 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    Error: {error.massage} <br/> <small>for more details open Console</small>
                </div>
            </div>
        );
    }*/
    return (
        <Fragment>{error?<div className="bg-red-700 w-full flex items-center justify-center">
           <p> <strong>Error: {error.massage}</strong> <br/> <small>Check your Internet Connection</small></p>
        </div>:null}
        <div className="bg-gray-400 h-[88%] py-5">
            <div className="mx-auto bg-[rgba(255,255,255,.4)] rounded-lg w-[85%] overflow-auto max-h-[calc(100vh-120px)]">
                <table className="table-fixed  w-full">
                    <thead className="bg-gray-950 sticky top-0 text-white">
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
                                                className="px-2.5 rounded-full hover:bg-red-800  "
                                                type={"button"}
                                                onClick={() => {
                                                    (dispatch as ThunkDispatch<any, any, any>)(deleteBook(book.id))
                                                }}
                                            >
                                                <DeleteIcon/>
                                            </button>
                                            <button
                                                className="px-2.5 rounded-full hover:bg-gray-800"
                                                type={"button"}
                                                onClick={() => {
                                                    dispatch(openEditBookModal(book.id))
                                                }}
                                            >
                                                <EditeIcon/>
                                            </button>
                                        </td>
                                    </tr>
                            )}
                </tbody>
            </table>
        </div>
        </div>
        </Fragment>
    )
}

export default MainPage
