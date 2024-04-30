import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

export default function SilerMenuUser({ subMenus, additionalMenuItems }) {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/user");
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
                <Menu.Item key="/user" icon={<AppstoreOutlined />}>
                    <Link to="/user">Hồ Sơ Bệnh Nhân</Link>
                </Menu.Item>
                <Menu.Item key="/phieu-kham-benh" icon={<AppstoreOutlined />}>
                    <Link to="/phieu-kham-benh">Phiếu Khám Bệnh</Link>
                </Menu.Item>
                {subMenus?.map((menu, index) => (
                    <SubMenu key={`sub${index}`} icon={menu.icon} title={menu.title}>
                        {menu.items.map((item, i) => (
                            <Menu.Item key={item.key}>
                                <Link to={item.key}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                ))}
                {additionalMenuItems?.map((item, i) => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
}
