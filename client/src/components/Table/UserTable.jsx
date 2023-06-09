import {Button, Input, Modal, Select, Table} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteUser, updateUser} from "../../utils/users-api/users.utils.js";
import useJsonDataStore from "../../zustand/store";
import AddModal from "../AddModal/AddModal";
import Loader from "../Loader/Loader";
import "./UserTable.css";

const UserTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const userData = useJsonDataStore((state) => state.jsonData);

  const {Option} = Select;
  const navigate = useNavigate();

  const showAddModal = () => {
    setAddModal(true);
  };

  const handleOk = async () => {
    try {
      const data = {
        id: userId,
        name: name,
        email: email,
        phone: phone,
        address: {
          street: street,
          city: city,
        },
        gender: gender,
      };

      await updateUser(data.id, data)

    } catch (error) {
      console.error("Error While sending data:", error);
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //table data
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="btn__wrapper">
          <Button className="delete__btn" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  //delete row
  const handleDelete = async (record) => {
    try {
      await deleteUser(record.id)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoubleClick = (record) => {
    try {
      const filterData = userData.find((user) => user.id === record);
      setIsModalVisible(true);
      setName(filterData.name);
      setEmail(filterData.email);
      setPhone(filterData.phone);
      setStreet(filterData.address.street);
      setCity(filterData.address.city);
      setGender(filterData.gender);
      setUserId(filterData.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <div className="table__wrapper">
      {userData === null ? (
        <Loader/>
      ) : (
        <>
          <div className="nav__wrapper">
            <Button type="primary" className="add_btn" onClick={showAddModal}>
              Add User
            </Button>
            <Button
              type="primary"
              className="add_btn"
              onClick={() => navigate("/piechart")}
            >
              Pie Chart
            </Button>
          </div>
          <Table
            style={{marginTop: "20px"}}
            columns={columns}
            dataSource={userData}
            onRow={(record) => ({
              onDoubleClick: () => handleDoubleClick(record.id),
            })}
          />
        </>
      )}

      <Modal
        title="Person Data"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <>
          <Input
            name="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{marginTop: "10px"}}
          />
          <Input
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{marginTop: "10px"}}
          />
          <Input
            name="phone"
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            style={{marginTop: "10px"}}
          />
          <Select
            labelInValue={false}
            onChange={handleGenderChange}
            value={gender}
            style={{marginTop: "10px", width: "100%"}}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Input
            name="street"
            placeholder="street"
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            style={{marginTop: "10px"}}
          />
          <Input
            name="city"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            style={{marginTop: "10px"}}
          />
        </>
      </Modal>

      <AddModal
        handleGenderChange={handleGenderChange}
        setAddModal={setAddModal}
        addModal={addModal}
        setName={setName}
      />
    </div>
  );
};

export default UserTable;
