import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message } from 'antd';

import '../../../../css/admin/Insert_admin.css'
import { formatPrice } from '../../../../Common/dataFortmat';
export default function ModalchuyenKhoa({ openModal, setOpenModal, dataHopitals, dataHopital, setDataHospital}) {

    const [dataUpdate, setDateUpdate] = useState({
        name: "",
        description: "",
        price: "",
    })
    console.log(dataUpdate)
    const handleUpdate = () => {
        const updateDate = dataHopitals.map((item) => {
            if (item?.id === dataHopital?.id) {
                const newData = {
                    name: dataUpdate.name || item.name,
                    description: dataUpdate.description || item.description,
                    price: dataUpdate.price || item.price,
                   
                }
                return { ...item, ...newData }
            }
            return item;
        })
        setDataHospital(updateDate)
        setDateUpdate({
            name: "",
            description: "",
            price: "",
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
                title="CHỈNH SỬA THÔNG TIN CHUYÊN KHOA"
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
                    <Col span={12} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                        <Flex vertical className='form_InsertHopital' >
                            <p className='lable_InsertHopital' >Nhập tên bệnh viện<sup>*</sup></p>
                            <Input
                                placeholder={dataHopital?.name}
                                value={dataUpdate?.name}
                                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                                className='inout_InsertHopital'

                            />
                        </Flex>
                        <Flex vertical className='form_InsertHopital'>
                            <p className='lable_InsertHopital' >Nhập mô tả chuyên khoa<sup>*</sup></p>
                            <Input
                                value={dataUpdate.description}
                                placeholder={dataHopital?.description}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("description", e.target.value)}
                            />
                        </Flex>
                    </Col>
                    <Col span={12} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >

                        <Flex vertical className='form_InsertHopital'  >
                            <p className='lable_InsertHopital'  >Nhập giá dịch vụ<sup>*</sup></p>
                            <Input
                                value={dataUpdate.price}
                                placeholder={formatPrice(dataHopital?.price)}
                                className='inout_InsertHopital'
                                onChange={(e) => handleChangeDataUser("price", e.target.value)}
                            />
                        </Flex>


                    </Col>


                </Row>
               
            </Modal>

        </ConfigProvider>
    )
}
