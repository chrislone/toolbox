import {
    createBrowserRouter,
} from "react-router-dom";
import Index from '@/views/index';
import JsonViewer from '@/views/jsonViewer';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/json-viewer",
        element: <JsonViewer />,
    },
]);

export default router;