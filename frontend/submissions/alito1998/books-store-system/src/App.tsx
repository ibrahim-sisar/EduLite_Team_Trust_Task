import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store/store.ts'
import { addBook , removeBook } from './store/slices/bookSlice.ts'

function App() {
    const books = useSelector((state : RootState)=>state.book)
    const dispatch = useDispatch()

    return (
        <div className=" py-5">
            <ul>
                {books && books.map((ele ) => (
                    <li key={ele.id}>
                        <button onClick={() => {dispatch(removeBook(ele.id))}}>
                            {ele.name}
                        </button>
                    </li>
                )) }
            <li>
                <button
                    className="btn btn-primary"
                    onClick={() => {dispatch(addBook({id: Math.floor(Math.random()*1000), name:"newBook",description:"newDescription",price:2000}))}}
                >Add Book</button>
            </li>
            </ul>
        </div>
    )
}

export default App
