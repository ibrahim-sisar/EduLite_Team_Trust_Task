import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from"../store/slices/modalsSlice.ts"
import type {RootState} from "../store/store.ts";
import {AddBook, updateBook} from "../store/slices/bookSlice.ts";
import type { BookUnit }from "../store/slices/bookSlice.ts"
import type {ThunkDispatch} from "@reduxjs/toolkit";


const BookModal = () => {
    const {register, reset , handleSubmit, formState: { errors }} = useForm<BookUnit>();
    const modals=useSelector((state:RootState)=>{return state.modals})
    const dispatch = useDispatch();
    const booksArr=useSelector((state:RootState)=>{return state.books.books})
    const selectedBook=modals.state === "Edit"? booksArr.filter((ele)=>ele.id === modals.id)[0]:null;


    const onSaveChanges :SubmitHandler<BookUnit> = (data)=>{
        data.id=selectedBook?.id?selectedBook.id:data.id;
        (dispatch as ThunkDispatch<any, any, any>)(updateBook(data))
        dispatch(closeModal())
        reset()
    }

    const onSubmit: SubmitHandler<BookUnit> =(data)=>{
        (dispatch as ThunkDispatch<any, any, any>)(AddBook(data))
        reset();
        dispatch(closeModal())
    }

    const ModalHeader=()=>{
        return (
            <div
            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 ">
                {modals.state === "Add"? "Create New Book": "Edit Book"  }
            </h3>
            <button type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={()=>{dispatch(closeModal());reset()}}
            >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>)
    }

    const BookForm =()=>{
        return(
            <form onSubmit={modals.state === "Add"?
                handleSubmit(onSubmit)
                :modals.state === "Edit" ?
                    handleSubmit(onSaveChanges):()=>{}} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Name</label>
                        <input type="text"
                               {...register("name", { required: "this is required" })}
                               id="name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               defaultValue={selectedBook !== null? selectedBook.name:undefined}
                               placeholder={"Enter Book Name"}
                        />
                        <p className="mt-1 text-sm font-extrabold  text-start text-pink-400">{errors.name?.message}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number"
                               {...register("price", {
                                   required: "this is required" ,
                                   min:{
                                       value:10,
                                       message: "min is 10"
                                   },
                                   max:{
                                       value:9999,
                                       message: "max is 9999"
                                   },
                               })}
                               id="price"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               defaultValue={selectedBook !== null? selectedBook.price.toString():undefined}
                               placeholder={"1000"}
                               max={9999}
                               min={10}
                        />
                        <p className="mt-1 text-sm font-extrabold text-start text-pink-400">{errors.price?.message}</p>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book
                            Description</label>
                        <textarea id="description" rows={4}
                                  {...register("description",{
                                      required:"this is required",
                                      minLength:{
                                          value:10,
                                          message:"the Min Length is 10 "
                                      },
                                      maxLength:{
                                          value:300,
                                          message:"the Max Length is 300"
                                      }
                                  })}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  defaultValue={selectedBook !== null? selectedBook.description:undefined}
                                  placeholder={"Write book description here"}
                        ></textarea>
                        <p className="mt-1 text-sm font-extrabold text-start text-pink-400">{errors.description?.message}</p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {modals.state === "Add"? "Add new Book" : "Save Changes"}
                </button>
            </form>
        )
    }

    return(
        modals.state !== "close"?
        <div className="overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 m-auto max-w-md max-h-full">
                <div className="relative bg-gray-700 rounded-lg shadow-sm ">
                    <ModalHeader />
                    <BookForm/>
                </div>
            </div>
        </div>:null)
};



export default BookModal;