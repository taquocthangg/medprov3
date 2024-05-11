import React, { useContext, useEffect, useState } from 'react'
import '../../css/Admin_header.css'
import { Avatar, ConfigProvider, Dropdown, Flex, Image, Input, Space, message } from 'antd'
import icon_logo from '../../img/logo/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import { dataNoticeIcon } from '../../data'
import QueryAdmin from '../service/QueryContext'
import { logout } from '../../api/auth'
import { getCurent } from '../../api'
export default function AdHeader() {
    const [focusBtnBell, setFocusBtnBell] = useState(true)
    const idDoctor = localStorage.getItem("idUser")
    const [dataUser, setDataUser] = useState("")
    const { QueryValue, setQueryValue } = useContext(QueryAdmin)
    const navigte = useNavigate()
    const handleGetDataUser = async () => {
        const response = await getCurent(idDoctor)
        setDataUser(response?.user)
    }
    const handleLogout = () => {
        logout()
        message.success('Đã đăng xuất !!!')
        window.location.href = '/';

    };
    const items = [
        {
            label: (
                <Link to='/'>
                    Thông tin cá nhân
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <p onClick={handleLogout}>
                    Đăng xuất
                </p>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
    ];
    useEffect(()=>{
        handleGetDataUser()
    },[])
    return (
        <div className="container_headerAdmin">
            <Flex justify='space-between' align='center'>
                <Flex style={{ width: '60%' }} align='center' justify='space-between'>
                    <Flex className="box_logoAdmin"  >
                        <Link to={"/"}>
                            <Image
                                src={icon_logo}
                                style={{ width: '130px' }}
                                preview={false}
                            />
                        </Link>
                    </Flex>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgContainer: '#EBEBE9',
                                colorBorder: "#fff",

                            },
                        }}>
                        <Input
                            placeholder="Search"
                            //onSearch={onSearch}
                            style={{ width: '50%' }}
                            onChange={(e) => setQueryValue(e.target.value)}
                            allowClear
                        />
                    </ConfigProvider>
                </Flex>

                <Flex gap={10} align='center'>

                    <Dropdown
                        menu={{ items, }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Flex gap={10} style={{ marginRight: 10 }}>
                                <Avatar
                                    size={'large'}
                                    src={dataUser?.avatar}
                                />

                                <Flex align='center' gap={5} className='box_infAdminUser' >
                                    <p style={{textTransform:'uppercase'}}>{dataUser?.name}</p>
                                    <DownOutlined />
                                </Flex>

                            </Flex>
                        </a>

                    </Dropdown>
                    <div className="" style={{ position: 'relative' }}>
                        <BellOutlined
                            style={{ fontSize: 25, color: 'gray' }}
                            data-tooltip-id="box_BellHeader"

                        />
                        {focusBtnBell ? (<div className="icon_bellFocus"></div>) : null}
                        <Tooltip place={'bottom-end'} clickable id="box_BellHeader" openOnClick={true} className='toolTip_HeaderBell'  >
                            <Flex vertical className='content_boxHeaderBell' >
                                {dataNoticeIcon ? (
                                    dataNoticeIcon.map((item) => (
                                        <Flex className='item_HeaderBell' align='center' gap={10}>
                                            <Avatar
                                                src={item?.avatar}
                                            />
                                            <Flex vertical gap={8}>
                                                <p style={{ color: '#000', fontSize: '16.5px' }}>{item?.title}</p>
                                                <p style={{ color: 'gray', fontSize: '13px' }}>{item?.datetime}</p>
                                            </Flex>

                                        </Flex>
                                    ))
                                ) : (
                                    <Flex justify='center' align='center' style={{ height: '100%', width: '100%' }}>
                                        <p>Không có thông báo nào</p>
                                    </Flex>
                                )}
                            </Flex>
                        </Tooltip>
                    </div>
                </Flex>

            </Flex>
        </div>
    )
}
