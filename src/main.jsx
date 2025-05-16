import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BaseLayout from "./baseLayout/BaseLayout.jsx";
import Documentation from "./pages/Documentation.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/docs',
                element: <Documentation />
            },
            {
                path: '/login',
                element: <Login />
            },

        ]
    },

    {
        path: '*',
        element: <Navigate to='/' replace={true} />
    }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
