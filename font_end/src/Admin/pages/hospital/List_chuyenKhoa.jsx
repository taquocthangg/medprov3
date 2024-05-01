import React, { useContext, useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Flex, ConfigProvider, Table, Button, Modal, message } from 'antd';
import QueryAdmin from './../../service/QueryContext';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import ModalchuyenKhoa from './modalHospital/ModalchuyenKhoa';
import { formatPrice } from '../../../Common/dataFortmat';
import { deleteChuyenKhoaS, getChuyenKhoas } from '../../../api';
const { confirm } = Modal;
const screenWidth = window.innerWidth
export default function List_chuyenKhoa() {
  const [data, setDataHospital] = useState()
  const [openModal, setOpenModal] = useState();
  const [dataModal, setDataModal] = useState();
  const [queryHospital, setQueryHospital] = useState('')
  const { value } = useContext(QueryAdmin)

  const handleDeleteHospital = async (idHospital) => {
    const indexToDelete = data.findIndex(hospital => hospital.id === idHospital);
    if (indexToDelete !== -1) {
      const response = await deleteChuyenKhoaS(idHospital)
      if (response?.mess === "Xóa chuyên khoa thành công") {
        const newData = [...data]; // Tạo một bản sao của mảng dataHospital
        newData.splice(indexToDelete, 1);
        setDataHospital(newData);
        message.success("Xóa chuyên khoa thành công")
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
  const handleGetDataHopital = async () => {
    const idHopital = localStorage.getItem("idUser")
    const response = await getChuyenKhoas(idHopital)
    setDataHospital(response?.chuyenkhoa)
  }
  const columns = [
    {
      title: 'Tên chuyên khoa',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <p>{text}</p>,

    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (diaChi) => (
        <Tooltip placement="topLeft" title={diaChi}>
          {diaChi}
        </Tooltip>
      ),

    },
    {
      title: 'Giá dịch vụ',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (price) => (
        <Tooltip placement="topLeft" title={price}>
          {formatPrice(price)} đ
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
    handleGetDataHopital();
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
        <ModalchuyenKhoa dataHopital={dataModal} dataHopitals={data} setDataHospital={setDataHospital} setOpenModal={setOpenModal} openModal={openModal} />

      </div>
    </div>
  )
}
