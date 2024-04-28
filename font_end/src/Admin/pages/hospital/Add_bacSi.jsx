import React, { useState } from 'react'
import { Col, Row, Flex, Input, Button, Upload, message, ConfigProvider, Radio, DatePicker, Space, Dropdown } from 'antd';
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import '../../../css/admin/Insert_admin.css'
import viVN from 'antd/es/locale/vi_VN';
import { dataChuyenKhoa } from '../../../data_fake/dataChuyenKhoa';
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

export default function Add_bacSi() {
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
    gioiTinh: "Nam",
    namSinh: "",
    chuyenKhoa: "",
    idchuyenKhoa: "",
  });
  console.log(dataHopital)
  const onChangeDate = (date, dateString) => {
    handleChangeDataUser('namSinh', dateString);
  };
  const handlePostData = () => {
    if (dataHopital?.name && dataHopital.email && dataHopital.password && dataHopital.sdt && dataHopital.namSinh) {
      message.success("Thêm bác sĩ thành công")
      setDataHopital({
        name: "",
        email: "",
        password: "",
        checkPassword: "",
        sdt: "",
        diaChi: "",
        avatar: "",
        gioiTinh: "Nam",
        namSinh: "",
      })
      console.log(dataHopital)
    }
    else {
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
  const items = dataChuyenKhoa?.map(item => {
    return {
      key: item?.id,
      label: item?.name
    }
  })
  const onClick = ({ key }) => {
    const dataFitelCK = items.filter(item => item.key == key);
    handleChangeDataUser("idchuyenKhoa", dataFitelCK[0].key)
    handleChangeDataUser("chuyenKhoa", dataFitelCK[0].label)
  };

  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien'>
      <div className="content_addBenhVien">
        <p className='title_insertHopital'>THÊM THÔNG TIN BÁC SĨ</p>
        <Row>
          <Col span={6} style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital' > Nhập địa chỉ email<sup>*</sup></p>
              <Input
                placeholder='Nhập email'
                onChange={(e) => handleChangeDataUser("email", e.target.value)}
                className='inout_InsertHopital'

              />
            </Flex>
            <Flex vertical className='form_InsertHopital'>
              <p className='lable_InsertHopital' >Nhập mật khẩu<sup>*</sup></p>
              <Input.Password
                placeholder='Nhập mật khẩu'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("password", e.target.value)}
              />
            </Flex>
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital' >Nhập lại mật khẩu<sup>*</sup></p>
              <Input.Password
                placeholder='Nhập lại mật khẩu'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("checkPassword", e.target.value)}
              />
            </Flex>

          </Col>
          <Col span={6} style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital'  >Nhập số điện thoại<sup>*</sup></p>
              <Input
                placeholder='Nhập số điện thoại'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
              />
            </Flex>
            <Flex vertical className='form_InsertHopital'  >
              <p className='lable_InsertHopital'  >Nhập địa chỉ <sup>*</sup></p>
              <Input
                placeholder='Nhập địa chỉ'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("diaChi", e.target.value)}
              />
            </Flex>
            <Flex vertical className='form_InsertHopital'>
              <p className='lable_InsertHopital' >Nhập họ và tên<sup>*</sup></p>
              <Input
                placeholder='Nhập họ và tên'
                className='inout_InsertHopital'
                onChange={(e) => handleChangeDataUser("name", e.target.value)}
              />
            </Flex>


          </Col>
          <Col span={6} style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital' >Chọn giới tính<sup>*</sup></p>
              <Radio.Group name="radiogroup" defaultValue={"Nam"} onChange={e => handleChangeDataUser("gioiTinh", e.target.value)} style={{ paddingBottom: '7px' }}>
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
              </Radio.Group>
            </Flex>
            <Flex vertical className='form_InsertHopital'>
              <p className='lable_InsertHopital' >Nhập năm sinh<sup>*</sup></p>
              <ConfigProvider locale={viVN} >
                <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" className='inout_InsertHopital' />
              </ConfigProvider>
            </Flex>
            <Flex vertical className='form_InsertHopital' >
              <p className='lable_InsertHopital' >Chọn chuyên khoa<sup>*</sup></p>
              <Flex style={{ marginTop: '0px', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '7px 15px', borderRadius: '6px' }}>
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
            </Flex>
          </Col>
          <Col span={6}>
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
    </div >
  )
}
