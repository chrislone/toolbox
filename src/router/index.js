import {
    createBrowserRouter,
} from "react-router-dom";
import Index from '@/views/index';
import JsonViewer from '@/views/jsonViewer';
import GifCompressor from '@/views/gifCompressor';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/json-viewer",
        element: <JsonViewer />,
    },
    {
        path: "/gif-compressor",
        element: <GifCompressor />,
    },
]);

export default router;