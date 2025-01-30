import { useState, useEffect } from "react";
import { Button, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import DynamicHelmet from "../../components/Custom/DynamicHelmet";

const EditableForm = ({
  userData,
  isEditing,
  handleChange,
  handleEditClick,
  handleUpdateClick,
}) => (
  <Form layout="vertical">
    <Form.Item label="Name" className="mb-4">
      <Input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Form.Item>
    <Form.Item label="Username" className="mb-4">
      <Input
        type="text"
        name="userName"
        value={userData.userName}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Form.Item>
    <Form.Item label="Email" className="mb-4">
      <Input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Form.Item>
    {isEditing ? (
      <Button
        type="primary"
        onClick={handleUpdateClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Information
      </Button>
    ) : (
      <Button
        type="default"
        onClick={handleEditClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit Information
      </Button>
    )}
  </Form>
);

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setEditedData(JSON.parse(data));
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setUserData(editedData);
    localStorage.setItem("userData", JSON.stringify(editedData));
    setIsEditing(false);
    message.success("Information updated successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordUpdateClick = () => {
    setIsPasswordUpdating(true);
  };

  const handlePasswordSubmit = () => {
    if (newPassword) {
      message.success("Password updated successfully");
      setIsPasswordUpdating(false);
      setNewPassword("");
    } else {
      message.error("Password cannot be empty");
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      <DynamicHelmet title={"Profile | ServiceBook"} />
      <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile</h3>
        <div className="mb-4 text-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4" />
          )}
          <Upload onChange={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">Update Password</h4>
          {isPasswordUpdating ? (
            <Form>
              <Form.Item label="New Password" className="mb-4">
                <Input.Password
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={handlePasswordSubmit}
                disabled={!newPassword}
              >
                Update Password
              </Button>
            </Form>
          ) : (
            <Button type="default" onClick={handlePasswordUpdateClick}>
              Update Password
            </Button>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4 bg-white rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
        {userData ? (
          <EditableForm
            userData={editedData}
            isEditing={isEditing}
            handleChange={handleChange}
            handleEditClick={handleEditClick}
            handleUpdateClick={handleUpdateClick}
          />
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
