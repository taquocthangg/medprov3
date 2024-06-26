import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message, Radio, Dropdown, DatePicker, Upload } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { getCurentUser, getUser, updateUser, uploadImage } from '../api';
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

export default function Model_Update_User({ openModal, setOpenModal, inforUser, setInforUser }) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataUpdate, setDateUpdate] = useState({
        name: "",
        email: "",
        sdt: "",
        diaChi: "",
        image: "",
        gioiTinh: "Nam",
        namSinh: "",
        password: ""
    })
    const handleOk = async () => {
        const response = await updateUser(inforUser.id, dataUpdate)
        console.log(response)
        message.success(response.message)
        setOpenModal(false);
        const inforUser_updater = await getCurentUser(inforUser.id)
        setInforUser(inforUser_updater.user)
        const test = await getUser({ name: 'th', page: 2 })
        console.log(test)
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

    const [uploading, setUploading] = useState(false);

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',

            }}
            type="button"
        >
            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,

                }}
            >
                Upload
            </div>
        </button>
    );
    const handleChange = async (info) => {
        setUploading(true);
        try {
            const response = await uploadImage(info.file);
            console.log(response);
            setImageUrl(response);
            setDateUpdate({ ...dataUpdate, image: response })
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        } finally {
            setUploading(false);
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
                                    beforeUpload={() => false}
                                    onChange={handleChange}
                                    size="large"
                                    loading={uploading}
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
