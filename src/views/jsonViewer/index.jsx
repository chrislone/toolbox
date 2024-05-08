import { Col, Row } from "antd";
import { useState } from "react";
import VanillaJSONEditor from "./vanillaJSONEditor";
import "./index.css";

function App() {
  const [showEditor] = useState(true);
  const [readOnly] = useState(false);
  const [content, setContent] = useState({
    json: {},
    text: undefined,
  });

  // const onJsonChangeHandler = (event) => {
  //   const value = event.target.value;
  //   let v = {};
  //   try {
  //     v = JSON.parse(value);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setContent({
  //     json: v,
  //     text: undefined,
  //   });
  // };

  return (
    <>
      <Row style={{ margin: "0 auto", width: "1200px" }}>
        <Col span={24}>
          {showEditor && (
            <div className={"text-area-wrapper"}>
              <VanillaJSONEditor
                content={content}
                readOnly={readOnly}
                onChange={setContent}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default App;
