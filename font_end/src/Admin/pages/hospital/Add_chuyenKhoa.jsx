import React, { useState } from 'react'
import { Col, Row, Flex, Input, Button, ConfigProvider, Avatar, message } from 'antd';
import '../../../css/admin/Insert_admin.css'
const screenWidth = window.innerWidth;
export default function Add_chuyenKhoa() {
  const nameHospital = "BẠCH MAI";
  const avatarHospital = "https://ibrand.vn/wp-content/uploads/2022/10/logo-benh-vien-3.png";
  const [dataHopital, setDataHopital] = useState({
    name: "",
    description: "",
    price: "",
  });
  const handlePostData = () => {
 
    if (dataHopital?.name !=="", dataHopital.description !=="", dataHopital.price !=="") {
      message.success("Thêm chuyên khoa thành công")
      setDataHopital({
        name: "",
        description: "",
        price: "",
      })
      console.log(dataHopital)
    }
    else{
      message.warning("Vui lòng điền đủ thông tin ")
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

  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien'>
      <div className="content_addBenhVien">
        <p className='title_insertHopital'>THÊM THÔNG TIN CHUYÊN KHOA BỆNH VIỆN {nameHospital}</p>
        <Row>
          <Col span={12} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital' >Nhập tên chuyên khoa<sup>*</sup></p>
              <Input
                value={dataHopital.name}
                placeholder='Nhập tên chuyên khoa'
                onChange={(e) => handleChangeDataUser("name", e.target.value)}
                className='inout_InsertHopital'

              />
            </Flex>
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital'  >Nhập mô tả<sup>*</sup></p>
              <Input
                value={dataHopital.description}
                placeholder='Nhập mô tả chuyên khoa'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("description", e.target.value)}
              />
            </Flex>
            <Flex vertical className='form_InsertHopital'  >
              <p className='lable_InsertHopital'  >Nhập giá chuyên khoa<sup>*</sup></p>
              <Input
                value={dataHopital.price}
                placeholder='Nhập địa chỉ bệnh viện'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("price", e.target.value)}
              />
            </Flex>
          </Col>
          {/* <Col span={8} style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
           
           

          </Col> */}
          <Col span={12}>
            <Flex gap="middle" className='customUpload' style={{ marginTop: '50px', height: '120px' }} justify='center'>
              <Avatar src={avatarHospital} style={{ fontSize: '100px', width: '200px', height: '200px' }} />

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
