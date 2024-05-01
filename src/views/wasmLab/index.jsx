import "./index.css";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const importObject = {
  imports: {
    imported_func: (arg) => console.log(arg),
  },
};

function callWasm() {
  WebAssembly.instantiateStreaming(
    fetch("http://localhost:9000/hello.wasm"),
    importObject
  )
    .then((obj) => obj.instance.exports)
    .then(({ func_square, func_sum }) => {
      console.log("func_square: ", func_square(2));
      console.log("func_sum: ", func_sum(2, 3));
    });
}

const props = {
  action: "",
  beforeUpload: (file) => {
    console.log("file: ", file);
    const blobItem = new Blob([file], {
      type: file.type,
    });
    console.log("blobItem: ", blobItem);

    return false;
  },
};

function App() {
  return (
    <div className="upload-wrap">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button onClick={callWasm}>Call Wasm</Button>
    </div>
  );
}

export default App;
