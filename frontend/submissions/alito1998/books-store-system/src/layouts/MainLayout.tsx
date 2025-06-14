import {Fragment} from "react";
import MainPage from "../pages/MainPage.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import AddBookBtn from "../components/AddBookBtn.tsx";
import BookForm from "../components/BookForm.tsx";

const MainLayout = () => {
    return (
        <Fragment>
            <Header/>
            <MainPage />
            <AddBookBtn/>
            <BookForm/>
            <Footer/>
        </Fragment>
    );
};

export default MainLayout;