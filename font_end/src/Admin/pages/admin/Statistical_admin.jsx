import { ConfigProvider, Table, Image, Tooltip, Flex, Button, Input, Col, Segmented, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { getAllBenhVien, getAllNews, getAllUser } from './../../../api/index';
import { PrinterFilled } from '@ant-design/icons';
import '../../../css/admin/StastisticalHospital.css'
import '../../../css/admin/Insert_admin.css'
import { formatDate } from '../../../Common/dataFortmat';
import { exportToExcelHospital, exportToExcelNews } from '../doctor/ExportExcel';
const columnsDoctor = [
  {
    title: 'Tên bệnh viện',
    dataIndex: 'name',
    key: 'name',
    align: 'center',

    render: (item) => <p>{item}</p>,

  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',

    render: (item) => <p>{item}</p>,

  },
  {
    title: 'Ảnh',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center',

    render: (item) => <Image src={item} style={{ width: '80px' }} />,

  },
  {
    title: 'Địa chỉ',
    dataIndex: 'diaChi',
    key: 'diaChi',
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
    title: 'Số điện thoại',
    dataIndex: 'sdt',
    key: 'sdt',
    align: 'center',
    ellipsis: {
      showTitle: false,
    },
    width: '12%',

    render: (item) => (
      <Tooltip placement="topLeft" title={item}>
        {item}
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
    render: (item) => (
      <Tooltip placement="topLeft" title={formatDate(item)}>
        {formatDate(item)}
      </Tooltip>
    ),
  },




];
const columnsNews = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    align: 'center',

    render: (item) => <p>{item}</p>,

  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    align: 'center',

    render: (item) => <p>{item}</p>,

  },
  {
    title: 'Nội dung',
    dataIndex: 'htmlContent',
    key: 'htmlContent',
    align: 'center',

    render: (item) => <p>{item}</p>,

  },
  {
    title: 'Loại dịch vụ',
    dataIndex: 'news_types',
    key: 'news_types',
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
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    ellipsis: {
      showTitle: false,
    },

    render: (item) => (
      <Tooltip placement="topLeft" title={item}>
        {formatDate(item)}
      </Tooltip>
    ),
  },





];
export default function Statistical_admin() {
  const [dataHospital, setDataHospital] = useState();
  const [dataNews, setDataNews] = useState()
  const [querySearch, setQuerySearch] = useState("");
  const [selectedComponent, setSelectedComponent] = useState('Hospital');
  const [dataQuantity, setDataQuantity] = useState({
    countHospital: "0",
    quantityNews: "0",
    quantityUser: "0"
  })
  const handleGetDataHospital = async () => {
    const DataHospital = await getAllBenhVien();
    const DataNews = await getAllNews();
    const DataUser = await getAllUser();
    setDataHospital(DataHospital?.benhvien)
    setDataNews(DataNews?.Schedule?.rows)

    setDataQuantity(prev => ({
      ...prev,
      countHospital: DataHospital?.benhvien?.count,
      quantityNews: DataNews?.Schedule?.count,
      quantityUser: DataUser?.user?.count
    }))
  }

  const handleSegmentChange = useCallback((value) => {
    setSelectedComponent(value);
  }, [selectedComponent])

  const handleExport = () => {
    if (selectedComponent === "Hospital") {
      exportToExcelHospital(dataHospital?.rows, "Danh sách bệnh viện")
    }
    exportToExcelNews(dataNews,"Danh sách tin tức")

  }
  const onSearchHospital = (e) => {
    setQuerySearch(e)
  }
  useEffect(() => {
    handleGetDataHospital();
  })
  return (
    <div>
      <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: '600', marginBottom: '50px' }} >THỐNG KÊ</p>
      <div className="content_StatisticalAdmin ">
        <Col className="box_contentStastistical" span={11} >

          <Flex vertical justify='space-around' gap={'5px'} style={{ minHeight: '150px' }}>
            <p style={{ fontSize: '16.5px', color: '#4a4a4a' }}> <strong>Tổng số lượng bệnh viện tham gia:</strong> {dataQuantity?.countHospital} Bệnh viện </p>
            <p style={{ fontSize: '16.5px', color: '#4a4a4a' }}> <strong>Tổng số lượng tin tức đã thêm:</strong> {dataQuantity?.quantityNews} Tin tức </p>
            <p style={{ fontSize: '16.5px', color: '#4a4a4a' }}> <strong>Tổng số lượng người đang sử dụng dịch vụ:</strong> {dataQuantity?.quantityUser} Người dùng </p>
          </Flex>
        </Col>
        <Flex className="" justify='center' style={{ width: '100%', marginTop: '30px' }}>
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg:'#008CFF' 
                },
              },
              token: {
                colorText:'#fff'
              },
            }}
          >
            <Segmented
              style={{
              color:'#008CFF'
              }}
              onChange={(value) => handleSegmentChange(value)}
              options={['Hospital', 'News']}
            />
          </ConfigProvider>

        </Flex>
        <Flex justify='space-between' style={{ marginBottom: '30px', marginTop: '30px' }}>
          <Col span={5}>
            <Input
              placeholder={selectedComponent === "Hospital" ? 'Nhập vào tên bệnh viện' : "Nhập vào tên tin tức"}
              onChange={e => onSearchHospital(e.target.value.toLocaleLowerCase())}
              allowClear
            />
          </Col>
          <div  >
            <Button
              type='primary'
              style={{ fontSize: '18px', minHeight: '35px', minWidth: '100px' }}

              onClick={() => handleExport()}
            >
              {/* <p>Xuất excel</p> */}
              <Tooltip title='Xuất excel'>
                <PrinterFilled />
              </Tooltip>
            </Button>
          </div >
        </Flex>
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
            columns={
              selectedComponent === "Hospital" ? columnsDoctor : columnsNews}
            dataSource={
              selectedComponent === "Hospital" ? (
                dataHospital?.rows?.filter((item) => item?.name?.toLocaleLowerCase().includes(querySearch))
              ) : (
                dataNews?.filter((item) => item?.title?.toLocaleLowerCase().includes(querySearch))
              )
            }
            pagination={{ pageSize: 5 }}
            bordered={true}
            style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
