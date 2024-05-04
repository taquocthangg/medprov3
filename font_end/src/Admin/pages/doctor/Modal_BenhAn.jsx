import React, { useEffect, useState } from 'react'
import { Button, Modal, Col, Flex,  ConfigProvider } from 'antd';
import { getCurent, getCurentUser } from '../../../api';
import html2canvas from 'html2canvas';
import '../../../css/admin/Insert_admin.css'
import jsPDF from 'jspdf';
export default function Modal_BenhAn({ setOpenModal, openModal, dataModal }) {
  const id_benhVien = localStorage.getItem("idUser")
  const [infDoctor, setInfDoctor] = useState()
  const [infHospital, setInfHospital] = useState()
  const [loader, setLoader] = useState(false)
  const handleGetInfDoctor = async () => {
    const response = await getCurent(id_benhVien);
    const resInfHospital = await getCurentUser(dataModal?.hospitalId)
    setInfDoctor(response?.user)
    setInfHospital(resInfHospital?.user)


  }
  const handleOk = () => {

    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const printfPDF = () => {
    const capture = document.querySelector('.content_printfPDF');
    setLoader(true)
    html2canvas(capture).then((canvas) => {
      const imageData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a5');
      const componetWidth = doc.internal.pageSize.getWidth();
      const componetHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imageData, 'PNG', 0, 8, componetWidth, 90);
      setLoader(false);
      doc.save('Đơn thuốc')
    })
  }

  

  useEffect(() => {
    handleGetInfDoctor()
  }, [dataModal])
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
          },
        },
      }}
    >
      <Modal
        open={openModal}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ minWidth: '850px', borderRadius: '20px' }}
      >
        <div className="container_printfPDF" >
          <div className="content_printfPDF" style={{width:'90%',height:'100%',padding:'15px',margin:'0 auto'}}>
            <Flex justify='space-between' >
              <Col span={10}>
                <Flex justify='center'>
                  <img src={infDoctor?.avatar} style={{ width: '100px', height: '100px' }} />
                </Flex>
              </Col>
              <Col span={14}>
                <Flex vertical>
                  <p style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '23px', marginLeft: '30px' }}>{infHospital?.name}</p>
                  <p style={{ marginBottom: '2px' }}><strong>Địa chỉ: </strong>{dataModal?.User?.diaChi}</p>
                  <p style={{}}><strong>Số điện thoại: </strong>{dataModal?.User?.sdt}</p>
                </Flex>
              </Col>

            </Flex>
            <h1 style={{ textAlign: 'center', marginTop: '8px' }}>ĐƠN THUỐC CHUẨN ĐOÁN</h1>
            <Flex justify='flex-end'>
              <p style={{ marginRight: '30px' }}><strong>Số:</strong>{dataModal?.id}</p>
            </Flex>
            <div>

              <div className="">
                <Flex justify='space-between' style={{ marginBottom: '5px' }}>
                  <Col span={15}>
                    <p style={{ fontSize: '16.5px' }}><strong>Tên khách hàng: </strong>{dataModal?.User?.name}</p>
                  </Col>
                  <Col span={9}>
                    <Flex justify=''>
                      <p style={{ fontSize: '16.5px' }}><strong>Bác sĩ khám:</strong> {infDoctor?.name}</p>
                    </Flex>
                  </Col>
                </Flex>
                <Flex justify='space-between' style={{ marginBottom: '8px' }}>
                  <Col span={15}>
                    <p style={{ fontSize: '16.5px' }}><strong >Địa chỉ: </strong>{dataModal?.User?.name}</p>
                  </Col>
                  <Col span={9}>
                    <Flex justify=''>
                      <p style={{ fontSize: '16.5px' }}><strong>Số điện thoại bác sĩ:</strong> {infDoctor?.sdt}</p>
                    </Flex>
                  </Col>
                </Flex>
                <div className="">
                  <Flex>
                    <Flex style={{ width: '100%', marginTop: '20px' }}>
                      <Col span={8} style={{ border: '0.5px solid #000', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center', fontWeight: '600', textTransform: 'uppercase' }}>Đơn thuốc</p>
                      </Col>
                      <Col span={8} style={{ border: '0.5px solid #000', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center', fontWeight: '600', textTransform: 'uppercase' }}>Chuẩn đoán</p>
                      </Col>
                      <Col span={8} style={{ border: '0.5px solid #000', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center', fontWeight: '600', textTransform: 'uppercase' }}>Ngày khám</p>
                      </Col>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex style={{ width: '100%' }}>
                      <Col span={8} style={{ border: '0.5px solid #000', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center' }}>{dataModal?.medication}</p>
                      </Col>
                      <Col span={8} style={{ border: '0.5px solid #000', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center' }}>{dataModal?.diagnosis}</p>
                      </Col>
                      <Col span={8} style={{ border: '0.5px solid #000', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center' }}>{dataModal?.appointmentDate}</p>
                      </Col>
                    </Flex>
                  </Flex>
                  {/* <Table
                    columns={columns}
                    dataSource={dataModal}
                  /> */}
                </div>
              </div>
              <div>
              </div>
            </div>

          </div>

        </div>
        <Flex justify='center' style={{marginTop:'20px'}}>
        <Button
          onClick={() => printfPDF()}
          disabled={!(loader === false)}
          type='primary'
          style={{minWidth:'120px'}}
        >
          {loader ? (
            <p>Downloading..</p>
          ) : (
            <p>Xuất Đơn Thuốc</p>
          )}


        </Button>
        </Flex>


      </Modal>

    </ConfigProvider>
  )
}
