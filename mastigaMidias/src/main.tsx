import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SelectDevice } from './components/SelectDevice'
import { Content } from './pages/content'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const router = createBrowserRouter([
    {
        path: "/",
        element: <SelectDevice />
    },
    {
        path: "/:playlistId",
        element: <Content />

    },
]
)
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<SelectDevice/>}/>
    </QueryClientProvider>
)
