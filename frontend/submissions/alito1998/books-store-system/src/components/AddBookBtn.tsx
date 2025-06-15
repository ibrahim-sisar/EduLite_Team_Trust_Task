import AddBookIcon from "../assets/AddBookIcon.tsx";
import {openAddBookModal} from "../store/slices/modalsSlice.ts"
import {useDispatch} from "react-redux";


const AddBookBtn = () => {
    const dispatch = useDispatch();
    return (
        <div className="fixed bottom-8 right-4">
            <button type="button"
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold p-2  rounded-full shadow-lg"
                    onClick={()=>{dispatch(openAddBookModal())}}
            >
                <AddBookIcon/>
            </button>
        </div>











    );
};

export default AddBookBtn;