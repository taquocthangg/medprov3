import React, { useContext, useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Flex, ConfigProvider, Table, Button, Modal, message } from 'antd';
import QueryAdmin from './../../service/QueryContext';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { dataNews } from '../../../data_fake/dataNews';
import { Link } from 'react-router-dom';
const { confirm } = Modal;
const screenWidth = window.innerWidth
export default function ListNews() {
  const [data, setDataHospital] = useState()
  const [queryHospital, setQueryHospital] = useState('')
  const { value } = useContext(QueryAdmin)
  const handleGetDataHospital = () => {
    setDataHospital(dataNews)
  }
  const handleDeleteHospital = (idHospital) => {
    const indexToDelete = data.findIndex(hospital => hospital.id === idHospital);
    if (indexToDelete !== -1) {
      const newData = [...data]; // Tạo một bản sao của mảng dataHospital
      newData.splice(indexToDelete, 1);
      setDataHospital(newData);
      message.success("Xóa thành công bệnh viện")
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

  const columns = [
    {
      title: 'Tên chuyên khoa',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          <p>{text}</p>,
        </Tooltip>

      )


    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: '25%',
      render: (diaChi) => (
        <Tooltip placement="topLeft" title={diaChi}>
          {diaChi}
        </Tooltip>
      ),

    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      width: '15%',
      render: (author) => (
        <Tooltip placement="topLeft" title={author}>
          {author}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      width: '15%',
      render: (createdAt) => (
        <Tooltip placement="topLeft" title={createdAt}>
          {createdAt}
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

              >
                <Link to={`update-tin-tuc/${record?.id}`}>
                  <EditOutlined style={{ fontSize: '20px', color: '#008CFF' }} />
                </Link>

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
    <div style={{ padding: '25px 50px', width: `${screenWidth}` }} className='container_addBenhVien' >
      <p className='title_insertHopital'>QUẢN LÝ TIN TỨC</p>
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
        {/* <ModalNews dataHopital={dataModal} dataHopitals={data} setDataHospital={setDataHospital} setOpenModal={setOpenModal} openModal={openModal} /> */}

      </div>
    </div>
  )
}
