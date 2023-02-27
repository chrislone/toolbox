import { List } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

const data = [
  {
    title: "JSON viewer",
    navigatTo: "/json-viewer",
  },
];

function App() {
  const navigate = useNavigate();

  const renderItemFunc = (item) => {
    return (
      <List.Item
        className="list-item"
        onClick={() => {
          navigate(item.navigatTo);
        }}
      >
        {item.title}
      </List.Item>
    );
  };
  return (
    <List
      style={{ margin: "0 auto", width: "500px" }}
      dataSource={data}
      renderItem={renderItemFunc}
    ></List>
  );
}

export default App;
