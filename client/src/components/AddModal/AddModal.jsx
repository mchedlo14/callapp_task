import React, { useState } from "react";
import "./AddModal.css";
import { Modal, Input, Select } from "antd";
import axios from "axios";
const AddModal = ({  setAddModal, addModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const handleCanselAddModal = () => {
    setAddModal(false);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleOkAddModal = async () => {
    try {
      const data = {
        name: name,
        email: email,
        phone: phone,
        address: {
          street: street,
          city: city,
        },
        gender: gender,
      };

      const response = await axios.post("http://localhost:3000/data", data);
      console.log("Data sent to server:", response.data);
    } catch (error) {
      console.error("Error While sending data:", error);
    }

    setAddModal(false);
  };

  return (
    <Modal
      title="Add Person"
      open={addModal}
      onOk={handleOkAddModal}
      onCancel={handleCanselAddModal}
    >
      <>
        <Input
          name="name"
          placeholder="name"
          defaultValue={""}
          onChange={(e) => setName(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Input
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Input
          name="phone"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Select
          placeholder="Select gender"
          onChange={handleGenderChange}
          value={gender}
          style={{ marginTop: "10px", width: "100%" }}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
        <Input
          name="street"
          placeholder="street"
          onChange={(e) => setStreet(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Input
          name="city"
          placeholder="city"
          onChange={(e) => setCity(e.target.value)}
          style={{ marginTop: "10px" }}
        />
      </>
    </Modal>
  );
};

export default AddModal;
