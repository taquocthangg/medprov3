import React, { useState } from 'react'
import MarkDown from '../../../componnets/MarkDown/markDown'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import { Flex, Input, Row, Upload, message, Col, ConfigProvider } from 'antd'
import { uploadImage } from '../../../api';
const screenWidthNews = window.innerWidth
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
export default function AddTinTuc() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataIntroduce, setIntroduce] = useState({
        titleNews: "",
        imageNews: "",
        description: ""
    })

    const handleChangeDataUser = (key, value) => {
        if (value) {
            setIntroduce(prev => ({
                ...prev,
                [key]: value
            }))
        }
    }
    const handleChange = async (info) => {
        try {
            const response = await uploadImage(info.file);
            console.log(response);
            setImageUrl(response);
            setIntroduce({ ...dataIntroduce, imageNews: response })
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        } finally {
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
        <div style={{ padding: '25px ', width: `${screenWidthNews}` }} className='container_addBenhVien' >
            <div >
                <p className='title_insertHopital'>THÊM NỘI DUNG BÀI VIẾT </p>
                <div style={{ padding: '30px' }} className='content_addBenhVien'>
                    <h3 style={{ margin: 20 }}>
                        Thêm tiêu đề, ảnh và mô tả
                    </h3>
                    <Row style={{ marginTop: '20px', padding: '35px', boxShadow: '2px 5px 15px rgba(0, 0, 0, 0.2)', border: '0.5px solid #ccc', borderRadius: '15px', backgroundColor: "#fff" }}>
                        <Col span={12}>
                            <Flex className="" style={{ width: '80%' }} vertical gap={10} align='center'>
                                <Input
                                    value={dataIntroduce.titleNews}
                                    placeholder='Nhập tiêu đề...'
                                    maxLength={200}
                                    showCount
                                    onChange={(e) => handleChangeDataUser("titleNews", e.target.value)}
                                />
                                <TextArea
                                    style={{ minHeight: '150px' }}
                                    value={dataIntroduce.description}
                                    placeholder='Nhập mô tả ngắn ....'
                                    maxLength={300}
                                    showCount
                                    onChange={(e) => handleChangeDataUser("description", e.target.value)}
                                />
                            </Flex>
                        </Col>
                        <Col span={12}>
                            <Flex gap="middle" className='customAddNews' justify='center'>
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
                    </Row >
                    <h3 style={{ margin: '30px 20px 20px 15px' }}>
                        Thêm nội dung bài viết
                    </h3>

                    <MarkDown dataIntroduce={dataIntroduce} setIntroduce={setIntroduce} />

                </div>
            </div>
        </div>
    )
}
