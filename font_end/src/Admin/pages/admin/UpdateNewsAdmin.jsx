import React,{useState} from 'react'
import MarkDown from '../../../componnets/MarkDown/markDown'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import { Flex, Input, Row, Upload, message, Col, ConfigProvider } from 'antd'
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
const screenWidthNews = window.innerWidth
export default function UpdateNewsAdmin() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataIntroduce, setIntroduce] = useState({
        titleNews: "",
        imageNews: "",
        description: ""
    })
    console.log(dataIntroduce)
    const handleChangeDataUser = (key, value) => {
        if (value) {
            setIntroduce(prev => ({
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
                                    placeholder='Nhập tiêu đề...'
                                    maxLength={200}
                                    showCount
                                    onChange={(e) => handleChangeDataUser("titleNews", e.target.value)}
                                />
                                <TextArea
                                    style={{ minHeight: '150px' }}

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
                                        listType="picture-card"
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
                    </Row >
                    <h3 style={{ margin: '30px 20px 20px 15px' }}>
                        Thêm nội dung bài viết
                    </h3>

                    <MarkDown dataIntroduce={dataIntroduce} />

                </div>
            </div>
        </div>
    )
}
