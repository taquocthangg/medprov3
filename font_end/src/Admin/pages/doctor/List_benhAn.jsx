import React, { useContext, useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Avatar, Flex, ConfigProvider, Table, Button, Modal, message, DatePicker, Col, Row } from 'antd';
import QueryAdmin from './../../service/QueryContext';
import viVN from 'antd/es/locale/vi_VN';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled,PrinterFilled } from '@ant-design/icons';
import { deleteUser, getAllBacSiByBenhVien, getAllLichSuKham, getBacSiByChuyenKhoa } from '../../../api';
import { formatDateNoHours } from '../../../Common/dataFortmat';
import Modal_BenhAn from './Modal_BenhAn';
const { confirm } = Modal;
const screenWidth = window.innerWidth
export default function List_benhAn() {
  const today = new Date()
  const [data, setDataHospital] = useState()
  const [dateTime, setDateTime] = useState(formatDateNoHours(today));
  const [openModal, setOpenModal] = useState();
  const [dataModal, setDataModal] = useState();
  const [queryHospital, setQueryHospital] = useState('')
  const { value } = useContext(QueryAdmin)
  const id_benhVien = localStorage.getItem("idUser")
  const handleGetDataHospital = async () => {
    const response = await getAllLichSuKham(id_benhVien, dateTime)

    setDataHospital(response?.MedicalHistory?.rows)

  }
  const handleDeleteHospital = async (idHospital) => {
    const indexToDelete = data.findIndex(hospital => hospital.id === idHospital);
    if (indexToDelete !== -1) {
      const response = await deleteUser(idHospital)
      if (response?.mess === "Xóa user thành công") {
        const newData = [...data]; // Tạo một bản sao của mảng dataHospital
        newData.splice(indexToDelete, 1);
        setDataHospital(newData);
        message.success("Xóa thông tin bác sĩ thành công")
      }
      else {
        message.warning(response?.mess)
      }

    }
  }
  const showDeleteConfirm = (idHospital) => {
    confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu sẽ mất và không thể khôi phục',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        try {

          handleDeleteHospital(idHospital)

        }
        catch (e) {
          message.error(e)
        }
      },
      onCancel() {

      },
    });
  }
  const showModal = (data) => {
    setOpenModal(true)
    setDataModal(data)

  }

  const onChangeDate = (date, dateString) => {
    setDateTime(dateString);
  };
  const columns = [
    {
      title: 'Tên bệnh nhân',
      dataIndex: 'User',
      key: 'User',
      align: 'center',
      render: (item) => <p>{item?.name}</p>,

    },
    {
      title: 'Năm Sinh',
      dataIndex: 'User',
      key: 'User',
      align: 'center',
      render: (item) => <p>{item?.namSinh}</p>,

    },
    {
      title: 'Giới Tính',
      dataIndex: 'User',
      key: 'User',
      align: 'center',
      render: (item) => (
        <Tooltip placement="topLeft" title={item?.gioiTinh}>
          {item?.gioiTinh}
        </Tooltip>
      ),

    },
    {
      title: 'Số điện thoại',
      dataIndex: 'User',
      key: 'User',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item?.sdt}>
          {item?.sdt}
        </Tooltip>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'User',
      key: 'User',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item?.diaChi}>
          {item?.diaChi}
        </Tooltip>
      ),
    },
    {
      title: 'Đơn thuốc',
      dataIndex: 'medication',
      key: 'medication',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Chuẩn đoán',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày khám',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Chức Năng',
      dataIndex: 'Edit',
      key: 'Edit',
      align: 'center',

      ellipsis: {
        showTitle: false,
      },

      render: (Edit, record) => (
        <div className="">
          <Flex justify='center'>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            >
              <Button
                style={{ border: 'none', background: 'none' }}
                onClick={() => showModal(record)}

              >
                <PrinterFilled style={{ fontSize: '20px', color: '#008CFF' }}/>
          

              </Button>

            </ConfigProvider>

          </Flex>

        </div>
      ),
      width: '12%',
    },


  ];
  useEffect(() => {
    handleGetDataHospital()
  }, [dateTime])
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien' >
      <p className='title_insertHopital'>QUẢN LÝ BỆNH ÁN</p>
      <div className="content_ListHospital">
        <Row>
          <Col span={8}>
            <Flex vertical className='form_InsertHopital'>
              <p className='lable_InsertHopital' >Nhập ngày khám<sup>*</sup></p>
              <ConfigProvider locale={viVN} >
                <DatePicker
                  onChange={onChangeDate}
                  format="YYYY-MM-DD"
                  className='inout_InsertHopital'

                />
              </ConfigProvider>
            </Flex>
          </Col>
        </Row>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#9FDFFB',
                headerColor: '#000',
                borderColor: '#9FDFFB',
                borderRadius: 20,
                footerBg: '#9FDFFB',
                footerColor: '#000'
              },
            },
            token: {
              colorBgContainer: 'rgba(255, 255, 255, 0.5)',
              boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
            },
          }}
        >
          <Table columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            bordered={true}
            style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
          />
        </ConfigProvider>
        <Modal_BenhAn dataModal={dataModal} setDataModal={setDataModal} setOpenModal={setOpenModal} openModal={openModal} />

      </div>
    </div>
  )
}
