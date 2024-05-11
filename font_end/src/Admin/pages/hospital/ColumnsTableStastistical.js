import { Avatar, Image, Tooltip } from "antd";

const columnsMedicalHistories = [
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
      title: 'Giờ khám',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
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
      dataIndex: 'activateDay',
      key: 'activateDay',
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
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'center',
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (item) => (
    //     <Tooltip placement="topLeft" title={item}>
    //       {item}
    //     </Tooltip>
    //   ),
    // },
  
  
  ];

const columnsDoctor = [
    {
      title: 'Tên bác sĩ',
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
        width:'10%',
        render: (item) =><Image src={item} style={{width:'80px'}}/>,
    
      },
    {
        title: 'Năm Sinh',
        dataIndex: 'namSinh',
        key: 'namSinh',
        align: 'center',
        width:'10%',
        render: (item) => (
          <Tooltip placement="topLeft" title={item}>
            {item}
          </Tooltip>
        ),
    
      },
    {
      title: 'Giới Tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      align: 'center',
      width:'10%',
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
      width:'12%',
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
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
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },

  
  
  ];
export {
    columnsMedicalHistories,columnsDoctor
}