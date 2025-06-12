import {Fragment} from "react";
import MainPage from "../pages/MainPage.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const MainLayout = () => {
    return (
        <Fragment>
            <Header/>
            <MainPage />
            <Footer/>
        </Fragment>
    );
};

export default MainLayout;