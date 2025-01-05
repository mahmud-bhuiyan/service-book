import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">ServiceBook</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="bg-gray-800"
        >
          <Menu.Item key="1">
            <a href="/" className="text-white">
              Home
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/login" className="text-white">
              Login
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/register" className="text-white">
              Register
            </a>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
