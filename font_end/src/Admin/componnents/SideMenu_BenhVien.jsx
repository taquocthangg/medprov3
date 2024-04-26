import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function SideMenu_BenhVien() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        navigate(key);
        setOpenKeys([]);
    };

    const handleOpenChange = (keys) => {
        if (keys.length === 0) {
            setOpenKeys([]);
        } else {
            setOpenKeys([keys.pop()]);
        }
    };

    return (
        <div>
            <Menu
                className="SideMenuVertical"
                mode="inline"
                onClick={handleMenuClick}
                selectedKeys={[selectedKeys]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
            >
                <Menu.Item key="/" icon={<AppstoreOutlined />}>
                    <Link to="/">Bảng điều khiển</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<ShopOutlined />} title="Bác Sĩ">
                    <Menu.Item key="/benh-viens">
                        <Link to="/benh-viens">Thêm Bác Sĩ</Link>
                    </Menu.Item>
                    <Menu.Item key="/ds-benh-vien">
                        <Link to="/ds-benh-vien">DS Bệnh Viện</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<ShopOutlined />} title="Tin Tức">
                    <Menu.Item key="/them-tin-tuc">
                        <Link to="/them-tin-tuc">Thêm Tin Tức</Link>
                    </Menu.Item>
                    <Menu.Item key="/ds-tin-tuc">
                        <Link to="/ds-tin-tuc">DS Tin Tức</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="/thong-ke" icon={<AppstoreOutlined />}>
                    <Link to="/thong-ke">Thống Kê</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
