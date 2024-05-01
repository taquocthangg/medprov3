import React, { useContext, useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Avatar, Flex, ConfigProvider, Table, Button, Modal, message } from 'antd';
import QueryAdmin from './../../service/QueryContext';

import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import ModalchuyenKhoa from './modalHospital/ModalchuyenKhoa';
import { dataChuyenKhoa } from '../../../data_fake/dataChuyenKhoa'
import { formatDate } from '../../../Common/dataFortmat';
import { dataDoctor } from '../../../data_fake/dataDoctor';
import ModalDoctor from './modalHospital/ModalDoctor';
import { deleteUser, getAllBacSiByBenhVien, getBacSiByChuyenKhoa } from '../../../api';
const { confirm } = Modal;
const screenWidth = window.innerWidth
export default function List_bacSi() {
  const [data, setDataHospital] = useState()
  const [openModal, setOpenModal] = useState();
  const [dataModal, setDataModal] = useState();
  const [queryHospital, setQueryHospital] = useState('')
  const { value } = useContext(QueryAdmin)
  const id_benhVien = localStorage.getItem("idUser")
  const handleGetDataHospital = async () => {
    const response =await getAllBacSiByBenhVien(id_benhVien)
    setDataHospital(response?.users)
  }
  const handleDeleteHospital = async (idHospital) => {
    const indexToDelete = data.findIndex(hospital => hospital.id === idHospital);
    if (indexToDelete !== -1) {
      const response = await deleteUser(idHospital)
      if(response?.mess==="Xóa user thành công"){
        const newData = [...data]; // Tạo một bản sao của mảng dataHospital
        newData.splice(indexToDelete, 1);
        setDataHospital(newData);
        message.success("Xóa thông tin bác sĩ thành công")
      }
      else{
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

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <p>{text}</p>,

    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (avatar) => (
        <Avatar src={avatar} style={{width:'60px',height:'60px'}}/>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),

    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (sdt) => (
        <Tooltip placement="topLeft" title={sdt}>
          {sdt}
        </Tooltip>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (diaChi) => (
        <Tooltip placement="topLeft" title={diaChi}>
          {diaChi}
        </Tooltip>
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (gioiTinh) => (
        <Tooltip placement="topLeft" title={gioiTinh}>
          {gioiTinh}
        </Tooltip>
      ),
    },
    {
      title: 'Năm sinh',
      dataIndex: 'namSinh',
      key: 'namSinh',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (namSinh) => (
        <Tooltip placement="topLeft" title={namSinh}>
          {namSinh}
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
                <EditOutlined style={{ fontSize: '20px', color: '#008CFF' }} />

              </Button>
              <Button style={{ border: 'none', background: 'none' }} onClick={() => showDeleteConfirm(record.id)}>
                <DeleteOutlined style={{ fontSize: '20px', color: '#E55353' }} />
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
  }, [])
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien' >
      <p className='title_insertHopital'>QUẢN LÝ BỆNH VIỆN</p>
      <div className="content_ListHospital">
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
        <ModalDoctor dataHopital={dataModal} dataHopitals={data} setDataHospital={setDataHospital} setOpenModal={setOpenModal} openModal={openModal} />

      </div>
    </div>
  )
}
// mày đợi chút t cho thủy nó đi ngủ cái sau ae mình đóng tới sáng nhá
