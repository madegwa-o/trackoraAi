import './global-polyfill';
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
import {WebSocketProvider} from "./hooks/WebSocketContext.jsx";
import {DonationPage} from "./pages/donation/DonationPage.jsx";
import Documentation from "./pages/Documentation.jsx";
import Unauthorised from "./pages/unauthorised/Unauthorised.jsx";


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
                path: '/converse',
                element: <Conversation />,
            },
            {
                path: '/donate',
                element: <DonationPage />,
            },
            {
                path: '/docs',
                element: <Documentation />,
            },
            {
                path: '/unauthorized',
                element: <Unauthorised />,
            },
            {
                path: '*',
                element: <Navigate to='/' replace={true} />
            }
        ]

    }
])

createRoot(document.getElementById('root')).render(
    // <StrictMode>
      <ThemeContextProvider>
          <WebSocketProvider>
              <RouterProvider router={router}/>
          </WebSocketProvider>
      </ThemeContextProvider>,
    {/*</StrictMode>,*/}
)