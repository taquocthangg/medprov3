import React from 'react';
import AppRouteAdmin from '../../componnets/AppRouteAdmin';
import SideMenu from './SideMenu';
import {
    AppstoreOutlined,
    ShopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
// Định nghĩa các danh sách subMenus và additionalMenuItems cho mỗi role_id
const menuConfig = {
    R1: {
        subMenus: [
            {
                title: "Bệnh Viện",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/benh-viens",
                        label: "Thêm Bệnh Viện"
                    },
                    {
                        key: "/ds-benh-vien",
                        label: "DS Bệnh Viện"
                    }
                ]
            },
            {
                title: "Tin Tức",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/tin-tuc",
                        label: "Thêm Tin Tức"
                    },
                    {
                        key: "/ds-tin-tuc",
                        label: "DS Tin Tức"
                    }
                ]
            }
        ],
        additionalMenuItems: [
            {
                key: "/thong-ke",
                label: "Thống Kê",
                icon: <AppstoreOutlined />
            },
            {
                key: "/thong-bao",
                label: "Thông Báo",
                icon: <NotificationOutlined />
            }
        ]
    },
    R2: {
        subMenus: [
            {
                title: "Chuyên Khoa",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/benh-viens",
                        label: "Thêm Chuyên Khoa"
                    },
                    {
                        key: "/ds-benh-vien",
                        label: "DS Chuyên Khoa"
                    }
                ]
            },
            {
                title: "Bác Sĩ",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/benh-viens",
                        label: "Thêm Bác Sĩ"
                    },
                    {
                        key: "/ds-benh-vien",
                        label: "DS Bác Sĩ"
                    }
                ]
            },
            {
                title: "Tin Tức",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/tin-tuc",
                        label: "Thêm Tin Tức"
                    },
                    {
                        key: "/ds-tin-tuc",
                        label: "DS Tin Tức"
                    }
                ]
            }
        ],
        additionalMenuItems: [
            {
                key: "/thong-ke",
                label: "Thống Kê",
                icon: <AppstoreOutlined />
            },
        ]
    },
    R3: {
        subMenus: [
            {
                title: "Lịch Khám",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/benh-viens",
                        label: "Thêm Lịch Khám"
                    },
                    {
                        key: "/ds-benh-vien",
                        label: "Lịch Khám Đã Đặt"
                    }
                ]
            },
            {
                title: "Chưa nghĩ ra",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/benh-viens",
                        label: "Thêm Bác Sĩ"
                    },
                    {
                        key: "/ds-benh-vien",
                        label: "DS Bác Sĩ"
                    }
                ]
            },
        ],
        additionalMenuItems: [
            {
                key: "/thong-ke",
                label: "Thống Kê",
                icon: <AppstoreOutlined />
            },
        ]
    },
};

export default function MenuBar({ role_id }) {
    console.log(role_id)
    const { subMenus, additionalMenuItems } = menuConfig[role_id] || {};

    return (
        <div style={{ display: 'flex' }}>
            <div className="menus" style={{ width: '200px', position: 'fixed', top: '120px', height: '100vh', overflowY: 'auto' }}>
                <SideMenu subMenus={subMenus} additionalMenuItems={additionalMenuItems} />
            </div>
            <div style={{ marginLeft: '200px' }}>
                <AppRouteAdmin />
            </div>
        </div>
    );
}
