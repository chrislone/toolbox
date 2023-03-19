import { createBrowserRouter } from "react-router-dom";
import Index from "@/views/index";
import JsonViewer from "@/views/jsonViewer";
import GifManipulation from "@/views/gifManipulation";

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
    path: "/gif",
    element: <GifManipulation />,
  },
]);

export default router;
