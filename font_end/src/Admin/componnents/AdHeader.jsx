import React, { useState } from 'react'
import '../../css/Admin_header.css'
import { Avatar, ConfigProvider, Dropdown, Flex, Image, Input, Space } from 'antd'
import icon_logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import { dataNoticeIcon } from '../../data'
export default function AdHeader() {
    const [focusBtnBell, setFocusBtnBell] = useState(true)
    console.log(focusBtnBell)
    const items = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Thông tin cá nhân
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Đăng xuất
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
    ];

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
                                    src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/283650867_1078709262713252_2832944920731518682_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHkxUyUwhMfGdwdfSHy_jp-JJeTLkBxGWYkl5MuQHEZZuu_URsp38NKkmo2y_O98V1PlHkikMQpaEAZh_qYwf_S&_nc_ohc=7DDJUxkcjOwAb6voAOg&_nc_ht=scontent.fhan15-2.fna&oh=00_AfAzbrmlN8InmhUOtC7m5UzaA1lNGlXbHarFsBz5jMmFSw&oe=663200E8"
                                />

                                <Flex align='center' gap={5} className='box_infAdminUser' >
                                    <p >Vũ Tiến Khoái</p>
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
