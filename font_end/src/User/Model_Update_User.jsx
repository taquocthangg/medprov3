import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message, Radio, Dropdown, DatePicker, Upload } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Vui lòng tải lên tệp tin có dang JPG/PNG !');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Vui lòng tải lên ảnh có kích thước nhỏ hơn 10MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function Model_Update_User({ openModal, setOpenModal, inforUser }) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataUpdate, setDateUpdate] = useState({
        name: "",
        email: "",
        sdt: "",
        diaChi: "",
        avatar: "",
        gioiTinh: "Nam",
        namSinh: "",
        password: ""
    })
    console.log(dataUpdate)

    const handleOk = () => {
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
    const onChangeDate = (date, dateString) => {
        handleChangeDataUser('namSinh', dateString);
    };
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
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: "#f5f5f5",
                        headerBg: "#f5f5f5"
                    },
                },
            }}
        >
            <Modal
                open={openModal}
                title="Cập nhập thông tin"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
                style={{ minWidth: '800px', borderRadius: '20px' }}

            >
                <Row>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập họ và tên</p>
                            <Input
                                placeholder={inforUser?.name}
                                className='input_update_user'
                                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' > Nhập địa chỉ email</p>
                            <Input
                                placeholder={inforUser?.email}
                                onChange={(e) => handleChangeDataUser("email", e.target.value)}
                                className='input_update_user'

                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital'  >Nhập số điện thoại</p>
                            <Input
                                placeholder={inforUser?.sdt}
                                className='input_update_user'
                                onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
                            />
                        </Flex>

                    </Col>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Nhập địa chỉ </p>
                            <Input
                                placeholder={inforUser?.diaChi}
                                className='input_update_user'
                                onChange={(e) => handleChangeDataUser("diaChi", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập năm sinh</p>
                            <ConfigProvider locale={viVN} >
                                <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" className='input_update_user' placeholder='Chọn năm sinh' />
                            </ConfigProvider>
                        </Flex>
                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Mật Khẩu </p>
                            <Input
                                placeholder='Nhập mật khẩu...'
                                className='input_update_user'
                                onChange={(e) => handleChangeDataUser("password", e.target.value)}
                            />
                        </Flex>
                    </Col>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' >Chọn giới tính</p>
                            <Radio.Group name="radiogroup" defaultValue={"Nam"} onChange={e => handleChangeDataUser("gioiTinh", e.target.value)} style={{ paddingBottom: '7px' }}>
                                <Radio value={"Nam"}>Nam</Radio>
                                <Radio value={"Nữ"}>Nữ</Radio>
                            </Radio.Group>
                        </Flex>
                        <Flex gap="middle" className='customUploadModal' style={{ height: '120px', marginTop: '20px' }} justify='center'>
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
                                    onChange={handleChange}
                                    size="large"
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
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

            </Modal>

        </ConfigProvider>
    )
}
