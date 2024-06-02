import { useState, useEffect } from "react";
import { Image, Upload, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import gifsicle from "gifsicle-wasm-browser";

const beforeUploadHandler = () => {
  return false;
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function downloadFile(file) {
  // 创建隐藏的可下载链接
  const element = document.createElement("a");
  element.setAttribute("href", URL.createObjectURL(file));
  element.setAttribute("download", file.name || "download");

  // 触发点击
  document.body.appendChild(element);
  element.click();

  // 然后移除
  document.body.removeChild(element);

  // 释放对象URL
  URL.revokeObjectURL(element.href);
}

function App() {
  const [loading] = useState(false);
  const [imageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [allFileList, setAllFileList] = useState([]);
  const [outputPreviewImageBase64, setOutputPreviewImageBase64] = useState("");
  const [outGifFiles, setOutGifFiles] = useState([]);

  const changeHandler = ({ fileList }) => {
    setAllFileList(fileList);
  };

  const uploadButton = (
    <Button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </Button>
  );

  useEffect(() => {}, [allFileList]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const downloadToLocalHandler = () => {
    if (outGifFiles.length) {
      downloadFile(outGifFiles[0]);
    }
  };

  const compressHandler = () => {
    const originFileList = allFileList.map((item) => {
      return {
        file: item.originFileObj,
        name: item.name,
      };
    });
    gifsicle
      .run({
        input: originFileList,
        command: [`--resize 100x_ ${allFileList[0].name} -o /out/out.gif`],
      })
      .then(async (outGifFiles) => {
        setOutGifFiles(outGifFiles);
        const base64 = await getBase64(outGifFiles[0]);
        setOutputPreviewImageBase64(base64);
      })
      .catch(() => {
        setOutGifFiles([]);
      });
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        accept={"image/gif"}
        showUploadList={true}
        onPreview={handlePreview}
        beforeUpload={beforeUploadHandler}
        onChange={changeHandler}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button onClick={compressHandler}>执行压缩</Button>
      {outputPreviewImageBase64 && (
        <Image src={outputPreviewImageBase64} width={200}></Image>
      )}
      <Button onClick={downloadToLocalHandler}>下载到本地</Button>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default App;
