import {Link, Outlet} from "react-router-dom";


export default function BaseLayout() {

    return (
        <div>
            <header>
                <h1>Trachora Ai</h1>
                <nav>
                    <ul>
                       <Link to='/'>Home</Link> <br/>
                       <Link to='/docs'>Docs</Link> <br/>
                       <Link to='/login'>Login</Link>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </div>
    )
}