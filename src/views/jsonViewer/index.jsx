import { JsonViewer } from "@textea/json-viewer";
import { Col, Row, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function App() {
  const [object, setObject] = useState(null);

  const onJsonChangeHandler = (event) => {
    const value = event.target.value;
    let v = {};
    try {
      v = JSON.parse(value);
    } catch (err) {
      console.error(err);
    }
    setObject(v);
  };

  return (
    <>
      <Row style={{ margin: "0 auto", width: "1200px" }}>
        <Col span={12}>
          <div style={{ padding: "10px" }}>
            <TextArea
              placeholder="your json"
              autoSize={{
                minRows: 10,
                maxRows: 36,
              }}
              onChange={onJsonChangeHandler}
            />
          </div>
        </Col>
        <Col span={12}>
          <JsonViewer value={object} />
        </Col>
      </Row>
    </>
  );
}

export default App;
