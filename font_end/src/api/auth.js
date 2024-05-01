import { jwtDecode } from "jwt-decode";
import { message } from 'antd';
import { getCurentUser } from ".";
import { useNavigate } from "react-router-dom";

export const useCheckLogin = ({ setInforUser, setRole_id }) => {
    const navigate = useNavigate();

    const checkLogin = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken !== "null") {
            const decode = accessToken ? jwtDecode(accessToken) : null;
            console.log(decode);
            try {
                if (decode !== null) {
                    localStorage.setItem('idUser', decode.id);
                    const inforData = await getCurentUser(decode.id);
                    setRole_id(decode.role_id)
                    setInforUser(inforData.user)
                    await message.success(`Đăng nhập thành công`);
                    navigate('/');
                } else {
                    message.error('Đăng nhập thất bại');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return checkLogin;
};


export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const decodeAccessToken = () => {
    const token = getAccessToken();
    if (token) {
        return jwtDecode(token);
    }
    return null;
};

export const isAuthenticated = () => {
    const token = getAccessToken();
    return !!token;
};
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('idUser');
};
