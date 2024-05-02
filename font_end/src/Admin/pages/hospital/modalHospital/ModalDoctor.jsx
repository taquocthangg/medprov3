import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message, Radio, Dropdown, DatePicker, Upload } from 'antd';
import '../../../../css/admin/Insert_admin.css'
import viVN from 'antd/es/locale/vi_VN';
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../../Common/dataFortmat';
import { dataChuyenKhoa } from '../../../../data_fake/dataChuyenKhoa';
import { updateUser } from '../../../../api';
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

export default function ModalDoctor({ openModal, setOpenModal, dataHopitals, dataHopital, setDataHospital }) {
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
        // chuyenKhoa: "",
        // id_chuyenKhoa: "",
    })
    // console.log(dataUpdate)
    const handleUpdate =async  () => {
        const updateDate = dataHopitals.map((item) => {
            if (item?.id === dataHopital?.id) {
                const newData = {
                    name: dataUpdate.name || item.name,
                    email: dataUpdate.email || item.email,
                    sdt: dataUpdate.sdt || item.sdt,
                    diaChi: dataUpdate.diaChi || item.diaChi,
                    gioiTinh: dataUpdate.gioiTinh || item.gioiTinh,
                    namSinh: dataUpdate.namSinh || item.namSinh,
                    // chuyenKhoa: dataUpdate.chuyenKhoa || item.chuyenKhoa,
                    avatar: dataUpdate.avatar || item.avatar,

                }
                return { ...item, ...newData }
            }
            return item;
        })
        const response = await updateUser(dataHopital?.id, dataUpdate)
        if (response?.message === "Cập nhật thông tin người dùng thành công") {
            message.success(response?.message)
            setDataHospital(updateDate)
            setDateUpdate({
                name: "",
                email: "",
                sdt: "",
                diaChi: "",
                avatar: "",
                gioiTinh: "Nam",
                namSinh: "",
            })
            setOpenModal(false);
        }
        else {
            message.warning(response?.message)
            setOpenModal(true)
        }

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
    // const items = dataChuyenKhoa?.map(item => {
    //     return {
    //         key: item?.id,
    //         label: item?.name
    //     }
    // })
    const onChangeDate = (date, dateString) => {
        handleChangeDataUser('namSinh', dateString);
    };
    // const onClick = ({ key }) => {
    //     const dataFitelCK = items.filter(item => item.key == key);
    //     handleChangeDataUser("idchuyenKhoa", dataFitelCK[0].key)
    //     handleChangeDataUser("chuyenKhoa", dataFitelCK[0].label)
    // };
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
                        contentBg: "#53B3FE",
                        headerBg: "#53B3FE"
                    },
                },
            }}
        >
            <Modal
                open={openModal}
                title="CHỈNH SỬA THÔNG TIN BÁC SĨ"
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
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' > Nhập địa chỉ email<sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.email}
                                onChange={(e) => handleChangeDataUser("email", e.target.value)}
                                className='inout_InsertHopital'
                                value={dataUpdate?.email}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital'  >Nhập số điện thoại<sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.sdt}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
                                value={dataUpdate?.sdt}
                                maxLength={10}
                                showCount
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Nhập địa chỉ <sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.diaChi}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("diaChi", e.target.value)}
                                value={dataUpdate?.diaChi}
                            />
                        </Flex>
                    </Col>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                        {/* <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' >Chọn chuyên khoa<sup>*</sup></p>
                            <Flex style={{  backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '3.5px 15px', borderRadius: '6px' }}>
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick
                                    }}

                                >
                                    <a onClick={(e) => e.preventDefault()} className='text_updateInf item_infUpdateUser'>

                                        {!dataHopital?.chuyenKhoa ? (
                                            <Flex align='center' gap={10}>
                                                <p style={{ color: '#BFBFBF' }}>Chọn</p>
                                                <DownOutlined style={{ color: '#BFBFBF' }} />
                                            </Flex>
                                        ) : (
                                            <Flex align='center' gap={10}>
                                                <p style={{ color: '#000' }}>{dataHopital?.chuyenKhoa}</p>
                                                <DownOutlined style={{ color: '#000' }} />
                                            </Flex>
                                        )}


                                    </a>
                                </Dropdown>
                            </Flex>
                        </Flex> */}
                       
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập năm sinh<sup>*</sup></p>
                            <ConfigProvider locale={viVN} >
                                <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" className='inout_InsertHopital' />
                            </ConfigProvider>
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập họ và tên<sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.name}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                                value={dataUpdate?.name}
                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' >Chọn giới tính<sup>*</sup></p>
                            <Radio.Group name="radiogroup" defaultValue={"Nam"} onChange={e => handleChangeDataUser("gioiTinh", e.target.value)} style={{ paddingBottom: '7px' }}>
                                <Radio value={"Nam"}>Nam</Radio>
                                <Radio value={"Nữ"}>Nữ</Radio>
                            </Radio.Group>
                        </Flex>
                    </Col>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'60px' }}   >

                        <Flex gap="middle" className='customUploadModal' style={{ height: '120px' }} justify='center'>
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
