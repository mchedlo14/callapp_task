import React, { useState, useEffect } from 'react'
import './UserTable.css';
import useJsonDataStore from '../../zustand/store';
import { Table, Button, Modal, Input, Select } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const UserTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addModal, setAddModal] = useState(false)
    const [userId,setUserId] = useState()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');

    const userData = useJsonDataStore((state) => state.jsonData);

    const { Option } = Select;
    const navigate = useNavigate()

    const showAddModal = () => {
        setAddModal(true)
    }




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

                const response = await axios.post('http://localhost:3000/data', data);
                console.log('Data sent to server:', response.data);
            


        } catch (error) {
            console.error('Error While sending data:', error);
        }

        setAddModal(false)
    }

    const handleOk = async () => {
        try {
            const data = {
                id:userId,
                name: name,
                email: email,
                phone: phone,
                address: {
                    street: street,
                    city: city,
                },
                gender: gender,
            };

            const response = await axios.put(`http://localhost:3000/data/${data.id}`, data);
            console.log('Data update:', response.data);


        } catch (error) {
            console.error('Error While sending data:', error);
        }
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCanselAddModal = () => {
        setAddModal(false)
    }

    //table data 
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',

        },
        {
            title: 'Street',
            dataIndex: ['address', 'street'],
            key: 'street',
        },
        {
            title: 'City',
            dataIndex: ['address', 'city'],
            key: 'city',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className='btn__wrapper'>
                    <Button className='delete__btn' onClick={() => handleDelete(record)}>Delete</Button>
                </div>
            ),
        },
    ]

    //delete row
    const handleDelete = (record) => {
        try {
            axios.delete(`http://localhost:3000/data/${record.id}`);
        } catch (error) {
            console.error(error);
        }

    }

    const handleDoubleClick = (record) => {

        try {
            const filterData = userData.find((user) => user.id === record);
            setIsModalVisible(true);
            setName(filterData.name);
            setEmail(filterData.email);
            setPhone(filterData.phone);
            setStreet(filterData.address.street);
            setCity(filterData.address.city);
            setGender(filterData.gender)
            setUserId(filterData.id)
        } catch (error) {
            console.error(error);
        }

    };

    const handleGenderChange = (value) => {
        setGender(value);
        console.log(value)
    };

    return (
        <div className='table__wrapper'>
            {
                userData === null ? <>Loading</>
                    :
                    <>
                        <div className='nav__wrapper'>
                            <Button type="primary" className='add_btn' onClick={showAddModal}>Add User</Button>
                            <Button type="primary" className='add_btn' onClick={() => navigate('/piechart')}>Pie Chart</Button>
                        </div>
                        <Table
                            style={{ marginTop: '20px' }}
                            columns={columns}
                            dataSource={userData} onRow={(record) => ({
                                onDoubleClick: () => handleDoubleClick(record.id),
                            })} />

                    </>

            }

            <Modal
                title="Person Data"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className='modal__input__wrapper'>
                    <Input name="name" placeholder='name' onChange={e => setName(e.target.value)} value={name} style={{ marginTop: '10px' }} />
                    <Input name="email" placeholder='email' onChange={e => setEmail(e.target.value)} value={email} style={{ marginTop: '10px' }} />
                    <Input name="phone" placeholder='phone' onChange={e => setPhone(e.target.value)} value={phone} style={{ marginTop: '10px' }} />
                    <Select
                        labelInValue="Select gender"
                        onChange={handleGenderChange}
                        value={gender}
                        style={{ marginTop: '10px', width: "100%" }}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                    <Input name="street" placeholder='street' onChange={e => setStreet(e.target.value)} value={street} style={{ marginTop: '10px' }} />
                    <Input name="city" placeholder='city' onChange={e => setCity(e.target.value)} value={city} style={{ marginTop: '10px' }} />
                </div>
            </Modal>

            <Modal
                title="Add Person"
                open={addModal}
                onOk={handleOkAddModal}
                onCancel={handleCanselAddModal}
            >
                <div className='modal__input__wrapper'>
                    <Input name="name" placeholder='name' defaultValue={''} onChange={e => setName(e.target.value)} style={{ marginTop: '10px' }} />
                    <Input name="email" placeholder='email' onChange={e => setEmail(e.target.value)}  style={{ marginTop: '10px' }} />
                    <Input name="phone" placeholder='phone' onChange={e => setPhone(e.target.value)}  style={{ marginTop: '10px' }} />
                    <Select
                        placeholder="Select gender"
                        onChange={handleGenderChange}
                        style={{ marginTop: '10px', width: "100%" }}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                    <Input name="street" placeholder='street' onChange={e => setStreet(e.target.value)}  style={{ marginTop: '10px' }} />
                    <Input name="city" placeholder='city' onChange={e => setCity(e.target.value)} style={{ marginTop: '10px' }} />
                </div>
            </Modal>
        </div>
    )
}

export default UserTable