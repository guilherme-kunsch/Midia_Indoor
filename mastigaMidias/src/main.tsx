import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SelectDevice } from './components/SelectDevice'
import { Content } from './pages/content'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Teste } from './pages/teste'
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         }).catch((error) => {
//             console.log('Service Worker registration failed:', error);
//         });
//     });
// }
const router = createBrowserRouter([
    {
        path: "/",
        element: <SelectDevice />
    },
    {
        path: "/:playlistId",
        element: <Content />
    },
    {
        path: "/teste",
        element: <Teste />
    }
]
)
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)
