
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import BaseLayout from "./baseLayout/BaseLayout.jsx";
import {Home} from "lucide-react";
import HomePage from "./pages/homepage/HomePage.jsx";
import ThemeContextProvider from "./hooks/themeProvider.jsx";
import TextToSpeech from "./pages/textToSpeech/TextToSpeech.jsx";
import Conversation from "./pages/conversation/Conversation.jsx";
import Documentation from "./pages/Documentation.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/text-to-speech',
                element: <TextToSpeech />
            },
            {
                path: '/docs',
                element: <Documentation />,
            },
            {
                path: '/converse',
                element: <Conversation />,
            },

            {
                path: '*',
                element: <Navigate to='/' replace={true} />
            }
        ]

    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeContextProvider>
          <RouterProvider router={router}/>
      </ThemeContextProvider>
    </StrictMode>,
)