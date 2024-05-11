import React, { useContext, useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Avatar, Flex, ConfigProvider, Table, Button, Modal, message, Pagination } from 'antd';
import QueryAdmin from './../../service/QueryContext';
import { dataHospital } from '../../../data_fake/dataHospital';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import ModalHopital from './ModalHopital';
import { deleteUser, getAllBenhVien } from '../../../api';
const screenWidth = window.innerWidth
const { confirm } = Modal;
export default function ListHospital() {
  const [data, setDataHospital] = useState()
  const [totalPage, setTotalPage] = useState(1)
  const [openModal, setOpenModal] = useState();
  const [dataModal, setDataModal] = useState();
  const [loading, setLoading] = useState(false)
  const [queryHospital, setQueryHospital] = useState('')
  const { value } = useContext(QueryAdmin)
  const handleGetDataHospital = async (page) => {
    setLoading(true)
    const data = await getAllBenhVien({ page: page })
    setDataHospital(data?.benhvien?.rows)
    setTotalPage(data?.benhvien?.count)
    setLoading(false)
  }
  const handleDeleteHospital = async (idHospital) => {
    const indexToDelete = data.findIndex(hospital => hospital.id === idHospital);
    if (indexToDelete !== -1) {
      const response = await deleteUser(idHospital)
      console.log(response)
      if (response?.mess === "Xóa user thành công") {
        const newData = [...data]; // Tạo một bản sao của mảng dataHospital
        newData.splice(indexToDelete, 1);
        setDataHospital(newData);
        message.success("Xóa thành công bệnh viện")
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
      title: 'Tên bệnh viện',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <p>{text}</p>,
      width: 150,
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (text) => <Avatar src={`${text}`} size={60} />,
      width: 150,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      align: 'center',
      render: (diaChi) => (
        <Tooltip placement="topLeft" title={diaChi}>
          {diaChi}
        </Tooltip>
      ),
      width: '10%',
    },
    {
      title: 'Hotline',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
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
    handleGetDataHospital(1)
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
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
              total: totalPage, // Tong so ban ghi
              pageSize: 5,
              onChange: (page) => {
                handleGetDataHospital(page)
              }
            }}
            bordered={true}
            style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
          />
          {/* <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalPage}
          /> */}

        </ConfigProvider>
        <ModalHopital dataHopital={dataModal} dataHopitals={data} setDataHospital={setDataHospital} setOpenModal={setOpenModal} openModal={openModal} />

      </div>
    </div>
  )
}
