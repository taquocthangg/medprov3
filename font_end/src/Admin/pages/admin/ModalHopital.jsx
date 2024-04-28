import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Upload, Input, ConfigProvider, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../../css/admin/Insert_admin.css'
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
export default function ModalHopital({ openModal, setOpenModal, dataHopitals, dataHopital, setDataHospital }) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [btnOk, setBtnOk] = useState(false)
    const [dataUpdate, setDateUpdate] = useState({
        name: "",
        diaChi: "",
        sdt: "",
        avatar: "",
        email: ""
    })
    const handleUpdate = () => {
        const updateDate = dataHopitals.map((item) => {
            if (item?.id === dataHopital?.id) {
                const newData = {
                    name: dataUpdate.name || item.name,
                    diaChi: dataUpdate.diaChi || item.diaChi,
                    sdt: dataUpdate.sdt || item.sdt,
                    email: dataUpdate.email || item.email
                }
                return { ...item, ...newData }
            }
            return item;
        })
        setDataHospital(updateDate)
        setDateUpdate({
            name: "",
            diaChi: "",
            sdt: "",
            avatar: "",
            email: ""
        })
        message.success("Cập nhật thông tin thành công")
    }
    const handleOk = () => {
        handleUpdate()
        setOpenModal(false);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    const handleChangeDataUser = (key, value) => {
        if (value) {
            setDateUpdate(prev => ({
                ...prev,
                [key]: value
            }))
        }
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',

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
        </button>
    );
    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: "#53B3FE",
                        headerBg: "#53B3FE"
                    },
                },
            }}
        >
            <Modal
                open={openModal}
                title="Chỉnh sửa nội dung bệnh viện"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
                // footer={null}
                style={{ minWidth: '800px', borderRadius: '20px' }}

            >
                <Row>
                    <Col span={8} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' > Nhập địa chỉ email<sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.email}
                                value={dataUpdate.email}
                                onChange={(e) => handleChangeDataUser("email", e.target.value)}
                                className='inout_InsertHopital'

                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Tên bệnh viện<sup>*</sup></p>
                            <Input
                                value={dataUpdate.name}
                                placeholder={dataHopital?.name}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                            />
                        </Flex>
                    </Col>
                    <Col span={8} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital'  >Nhập số điện thoại<sup>*</sup></p>
                            <Input
                                value={dataUpdate.sdt}
                                placeholder={dataHopital?.sdt}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Nhập địa chỉ bệnh viện<sup>*</sup></p>
                            <Input
                                value={dataUpdate.diaChi}
                                placeholder={dataHopital?.diaChi}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("diaChi", e.target.value)}
                            />
                        </Flex>


                    </Col>
                    <Col span={8}>
                        <Flex gap="middle" className='customUpload' style={{ marginTop: '20px', height: '120px' }} justify='center'>
                            <ConfigProvider
                                theme={{
                                    token: {

                                    },
                                }}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    // onChange={handleChange}
                                    size="large"
                                >
                                    {imageUrl ? (
                                        <img
                                            src={dataHopital?.avatar}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </ConfigProvider>

                        </Flex>
                    </Col>

                </Row>
                {/* <p>{dataHopital}</p> */}
                {/* <p>{dataHopital?.name}</p>
            <p>{dataHopital?.sdt}</p>
            <Avatar src={`${dataHopital?.avatar}`} />
            <p>{dataHopital?.diaChi}</p>
            <p>{dataHopital?.email}</p> */}
            </Modal>

        </ConfigProvider>
    )
}
