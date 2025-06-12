import {removeBook} from "../store/slices/bookSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import DeleteIcon from "../assets/deleteIcon.tsx";

function MainPage() {
    const books = useSelector((state : RootState)=>state.book)
    const dispatch = useDispatch()
    return (
        <div className="bg-gray-400 h-[86vh]  py-5 ">
                {books?
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
                    {books.length === 0 ?
                        <tr>
                                <td colSpan={4} className="text-center"> No Data To Show </td>
                    </tr>:books.map((book) => {
                    return (
                                <tr
                                    key={book.id}

                                >
                                    <td className="text-start">{book.name}</td>
                                    <td className="text-start">{book.description}</td>
                                    <td className="text-center">{book.price}</td>
                                    <td className="text-center">
                                        <button
                                            type={"button"}
                                            onClick={() => {dispatch(removeBook(book.id))}}>
                                            <DeleteIcon/>
                                        </button>
                                    </td>
                                </tr>
                    )})}
                        </tbody>
                        </table>
                    : <h1 className="m-auto">Loading...</h1>}

        </div>
)
}

export default MainPage
