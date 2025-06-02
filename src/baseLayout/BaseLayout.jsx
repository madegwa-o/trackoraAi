import {Outlet} from "react-router-dom";
import Header from "../components/header/Header.jsx";


function BaseLayout() {
    return (
        <>
            <Header />
            <main >
                <Outlet/>
            </main>
        </>
    );
}

export default BaseLayout;
