// auth.js
import { jwtDecode } from 'jwt-decode';


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
    localStorage.removeItem('userId');
};


export const handleAuthentication = (isAuthenticated, navigate) => {
    // Nếu người dùng đã đăng nhập, lấy thông tin từ token
    if (isAuthenticated) {
      const decodedToken = decodeAccessToken();
  
      // Kiểm tra role_id của người dùng
      if (decodedToken && decodedToken.role_id === 'R1') {
        navigate('/admin');
      }
      if (decodedToken && decodedToken.role_id === 'R2') {
        navigate('/benh-vien/' + decodedToken.id);
      }
      if (decodedToken && decodedToken.role_id === 'R3') {
        navigate('/bac-si/' + decodedToken.id);
      } else {
       // navigate('/');
      }
    } else {
     // chưa biết làm gì
    }
  };

  