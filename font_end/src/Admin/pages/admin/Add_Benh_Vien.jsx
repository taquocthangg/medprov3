import React, { useState } from 'react'
import { Col, Row, Flex, Input, Button, Upload, message, ConfigProvider } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../../css/admin/Insert_admin.css'
import { regiter } from '../../../api';
const screenWidth = window.innerWidth
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
export default function Add_Benh_Vien() {
    // const props = {
    //     action: api + 'users/uploadImage',
    //     onChange({ file }) {
    //         if (file.status === 'done') {
    //             const url = file.response
    //             handleChangeDataUser("avatar", url)
    //         }
    //     },
    // };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataHopital, setDataHopital] = useState({
        name: "",
        email: "",
        password: "",
        checkPassword: "",
        sdt: "",
        diaChi: "",
        avatar: "",
        role_id:"R2"
    });
    const handlePostData = async () => {
        if (dataHopital?.password === dataHopital?.checkPassword) {
            const response = await regiter(dataHopital)
            console.log(response)
            if (response?.mess === "Đăng kí thành công") {
                message.success(response?.mess)
                setDataHopital({
                    name: "",
                    email: "",
                    password: "",
                    checkPassword: "",
                    sdt: "",
                    diaChi: "",
                    avatar: "",
                    role_id:"R2"
                })
            }
            else {
                message.warning(response?.mess)
            }
        }
        else {
            message.warning("Mật khẩu nhập lại không khớp !")
        }

    }
    const handleChangeDataUser = (key, value) => {
        if (value) {
            setDataHopital(prev => ({
                ...prev,
                [key]: value
            }))
        }
    }
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
        <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien'>
            <div className="content_addBenhVien">
                <p className='title_insertHopital'>THÊM THÔNG TIN BỆNH VIỆN </p>
                <Row>
                    <Col span={8} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' > Nhập địa chỉ email<sup>*</sup></p>
                            <Input
                                value={dataHopital?.email}
                                placeholder='Nhập email'
                                onChange={(e) => handleChangeDataUser("email", e.target.value)}
                                className='inout_InsertHopital'

                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập mật khẩu<sup>*</sup></p>
                            <Input.Password
                                value={dataHopital?.password}
                                placeholder='Nhập mật khẩu'
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("password", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' >Nhập lại mật khẩu<sup>*</sup></p>
                            <Input.Password
                                value={dataHopital?.checkPassword}
                                placeholder='Nhập lại mật khẩu'
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("checkPassword", e.target.value)}
                            />
                        </Flex>
                    </Col>
                    <Col span={8} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital'  >Nhập số điện thoại<sup>*</sup></p>
                            <Input
                                value={dataHopital?.sdt}
                                placeholder='Nhập số điện thoại'
                                maxLength={10}
                                showCount
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Nhập địa chỉ bệnh viện<sup>*</sup></p>
                            <Input
                                value={dataHopital?.diaChi}
                                placeholder='Nhập địa chỉ bệnh viện'
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("diaChi", e.target.value)}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Tên bệnh viện<sup>*</sup></p>
                            <Input
                                value={dataHopital?.name}
                                placeholder='Nhập tên bệnh viện'
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                            />
                        </Flex>

                    </Col>
                    <Col span={8}>
                        <Flex gap="middle" className='customUpload' style={{ marginTop: '50px', height: '120px' }} justify='center'>
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
                <Flex justify='center' >
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBg: "#fff"
                                },
                            },
                        }}
                    >
                        <Button
                            type='primary'
                            style={{ minWidth: '120px', background: '#3EA8FF', marginTop: '30px' }}
                            onClick={() => handlePostData()}
                        >
                            Xác nhận
                        </Button>
                    </ConfigProvider>

                </Flex>
            </div>
        </div>
    )
}
