import React from 'react';
import AppRouteAdmin from '../../componnets/AppRouteAdmin';
import SideMenu from './SideMenu';
import {
    AppstoreOutlined,
    ShopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

const screenWidth = window.innerWidth - 250
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
                        key: "/them-chuyen-khoa",
                        label: "Thêm Chuyên Khoa"
                    },
                    {
                        key: "/ds-chuyen-khoa",
                        label: "DS Chuyên Khoa"
                    }
                ]
            },
            {
                title: "Bác Sĩ",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/them-bac-si",
                        label: "Thêm Bác Sĩ"
                    },
                    {
                        key: "/ds-bac-si",
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
                        key: "/them-lich-kham",
                        label: "Thêm Lịch Khám"
                    },
                    {
                        key: "/ds-lich-kham",
                        label: "Danh sách lịch khám"
                    },
                    {
                        key: "/ds-lich-kham-dang-cho",
                        label: "Lịch khám đang chờ "
                    }
                ]
            },
            {
                title: "Bệnh Án",
                icon: <ShopOutlined />,
                items: [
                    {
                        key: "/ds-benh-an",
                        label: "Danh sách bệnh án"
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
    const { subMenus, additionalMenuItems } = menuConfig[role_id] || {};

    return (
        <div style={{ display: 'flex' }}>
            <div className="menus" style={{ width: '250px', position: 'fixed', top: '80px', overflowY: 'auto', backgroundColor: '#fff' }}>
                <SideMenu subMenus={subMenus} additionalMenuItems={additionalMenuItems} />
            </div>
            <div style={{ marginLeft: '250px', width: screenWidth, minHeight: '60vh' }}>
                <AppRouteAdmin />
            </div>
        </div>
    );
}
