import { createBrowserRouter } from "react-router-dom";
import Index from "@/views/index";
import JsonViewer from "@/views/jsonViewer";
import WasmLab from "@/views/wasmLab";

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
    path: "/wasm",
    element: <WasmLab />,
  },
]);

export default router;
