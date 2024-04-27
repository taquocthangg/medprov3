import React, { useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Tooltip, Avatar, Flex, ConfigProvider, Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
const screenWidth = window.innerWidth
export default function ListHospital() {
  const [dataHospital, setDataHospital] = useState()
  const [queryHospital, setQueryHospital] = useState()
  const columns = [
    {
      title: 'Mã bệnh viện',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <p>{text}</p>,
      width: 150,
    },
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
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price) => (
        <Tooltip placement="topLeft" title={price}>

        </Tooltip>
      ),
      width: '10%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'describe',
      key: 'describe',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (describe) => (
        <Tooltip placement="topLeft" title={describe}>
          {describe}
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'species',
      key: 'species',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (species) => (
        <Tooltip placement="topLeft" title={species}>
          {species}
        </Tooltip>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      key: 'Edit',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (Edit, record) => (
        <Flex gap={'20px'} wrap='wrap' justify='center'>
          <Link to={`/admin/updatePets/${record?.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          {/* <DeletePets idPet={record?.id} setProducts={setProducts} /> */}
        </Flex>

      ),
    },
  ];
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien' >
      <p className='title_insertHopital'>Quản lý bệnh viện</p>
      <Input placeholder='Nhập tên thú cưng' onChange={(e) => setQueryHospital(e.target.value.toLocaleLowerCase())} style={{ width: '20%' }} />
      <div className="content_ListHospital">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#3F95FD',
                headerColor: '#fff',
                borderColor: '#ccc',
                borderRadius: 10
              },
            },
          }}
        >
          <Table columns={columns}
            dataSource={dataHospital?.filter((item) => item?.name?.toLocaleLowerCase().includes(queryHospital))}
            pagination={{ pageSize: 5 }}
            bordered={true}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
