import gifsicle from "gifsicle-wasm-browser";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Image } from "antd";
import { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const compressHandler = () => {
    console.log("compress: ", file);
    console.log("compress file.name: ", file.name);
    gifsicle
      .run({
        input: [
          {
            file: file,
            name: file.name.toLowerCase(),
          },
        ],
        command: [
          `--colors 256 --scale 0.8 ${file.name.toLowerCase()} -o /out/out.gif`,
        ],
      })
      .then((outGifFiles) => {
        console.log("outGifFiles: ", outGifFiles);
        const url = URL.createObjectURL(outGifFiles[0]);
        setImageUrl(url);
        // [File,File,File ...]
      });
  };

  const props = {
    action: "",
    accept: "image/gif",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    beforeUpload: (file) => {
      console.log("beforeUpload file: ", file);
      setFile(file);
      return false;
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button onClick={compressHandler}>压缩</Button>
      <Image width={300} src={imageUrl} />
    </>
  );
};

export default App;
