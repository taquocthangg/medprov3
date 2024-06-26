import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});



const handleRequest = async (req) => {
    try {
        const response = await req();
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const uploadImage = async (file) => {
    return handleRequest(async () => {
        const image = new FormData();
        image.append('image', file);
        return await api.post('/auth/upload-image', image)
    })
};

export const login = async (email, password) => {
    return handleRequest(async () => {
        return await api.post('/auth/login', { email, password })
    })
}

export const regiter = async (data) => {
    return handleRequest(async () => {
        return await api.post('/auth', data)
    })
}

export const updateUser = async (idUser, dataUser) => {
    return handleRequest(async () => {
        return await api.post(`/auth/updateUser/${idUser}`, dataUser)
    })
}

export const themchuyenkhoa = async (id_benhVien, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/themchuyenkhoa/${id_benhVien}`, data)
    })
}

export const thembacsi = async (id_chuyenKhoa, data) => {

    return handleRequest(async () => {
        return await api.post(`auth/thembacsi/${id_chuyenKhoa}`, data)
    })
}

export const themlichkham = async (data) => {
    return handleRequest(async () => {
        return await api.post(`auth/themlichkham`, data)
    })
}

export const xacnhanlichkham = async (id_lichkham) => {
    return handleRequest(async () => {
        return await api.post(`auth/xacnhanlichkham/${id_lichkham}`)
    })
}

export const datlich = async (id_lichkham, id_benhNhan) => {
    return handleRequest(async () => {
        return await api.post(`auth/datlich/${id_lichkham}`, id_benhNhan)
    })
}


// Lấy dữ liệu lịch khám
export const lichkham = async (id_doctor, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/lichkham/${id_doctor}`, { activateDay: data })
    })
}

export const lichDatKham = async (id_doctor, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/lichDatKham/${id_doctor}`, { activateDay: data })
    })
}

export const themLichsukham = async (scheduleId, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/themsulichkham/${scheduleId}`, data)
    })
}

export const layLichsukham = async (getLichSuKhamById, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/laysulichkham/${getLichSuKhamById}`, data)
    })
}


// Lấy lịch khám theo ngày
export const getAllLichSuKham = async (idDoctor, date) => {
    return handleRequest(async () => {
        return await api.post(`auth/getAllLichSuKham/${idDoctor}`, { appointmentDate: date })
    })
}

// Lấy lịch khám theo idBacSi
export const getAllLichSuKhamFull = async (idDoctor) => {
    return handleRequest(async () => {
        return await api.get(`auth/getAllLichSuKham/${idDoctor}`)
    })
}

// Lấy lịch khám theo trạng thái
export const getAllLichSuKhamStatus = async (idDoctor, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/getAllLichSuKhamStatus/${idDoctor}`, { status: data })
    })
}



export const getSearchDoctor = async (idBenhVien, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/getSearchDoctor/${idBenhVien}`, data)
    })
}

export const getAllBacSi = async (idBenhVien) => {
    return handleRequest(async () => {
        return await api.get(`auth/getAllBacSiByHospital/${idBenhVien}`)
    })
}

export const getDoanhThu = async (idBenhVien) => {
    return handleRequest(async () => {
        return await api.get(`auth/getDoanhThuHospital/${idBenhVien}`)
    })
}


export const suaChuyenKhoa = async (idChuyenKhoa, data) => {
    return handleRequest(async () => {
        return await api.post(`auth/suaChuyenKhoa/${idChuyenKhoa}`, data)
    })
}

export const getAllBenhVien = async (params) => {
    return handleRequest(async () => {
        return await api.get(`/getAllBenhVien`, { params })
    })
}

export const getCurent = async (params) => {
    return handleRequest(async () => {
        return await api.get(`auth/getCurent/${params}`)
    })
}

export const lichkhamdadat = async (getSchedulebyID) => {
    return handleRequest(async () => {
        return await api.get(`auth/lichkhamdadat/${getSchedulebyID}`)
    })
}

export const GetLayLichsukham = async (getLichSuKhamById) => {
    return handleRequest(async () => {
        return await api.get(`auth/laysulichkham/${getLichSuKhamById}`)
    })
}

//Dashboard 
export const getAllLichSuKhamByStatus = async (id_doctor) => {
    return handleRequest(async () => {
        return await api.get(`auth/LaySoLuongLich/${id_doctor}`)
    })
}

export const getAllLichSuKhamByHospital = async (id_hospital) => {
    return handleRequest(async () => {
        return await api.get(`auth/LaySoLuongLichHospital/${id_hospital}`)
    })
}

export const getLichSuKhamDaDat = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-da-dat-by-id-benhnhan/${id_benhnhan}`)
    })
}

export const getLichSuKhamHoanThanh = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-hoan-thanh-by-id-benhnhan/${id_benhnhan}`)
    })
}

export const getLichKhamDaHuy = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-da-huy-by-id-benhnhan/${id_benhnhan}`)
    })
}

export const LichKhamHoanThanhbyBenhNhan = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-hoan-thanh/${id_benhnhan}`)
    })
}

// Lịch  khám hoàn thành bệnh viện 
export const benhAn = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-hoan-thanh-bv/${id_benhnhan}`)
    })
}

export const lichKhamHuy = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-da-huy/${id_benhnhan}`)
    })
}

export const benhAnTheoLich = async (id_benhnhan) => {
    return handleRequest(async () => {
        return await api.get(`auth/lich-kham-hoan-thanh-by-lichkham/${id_benhnhan}`)
    })
}

export const getUser = async (params) => {
    return handleRequest(async () => {
        return await api.get('/getUser', { params })
    })
}
export const getCurentUser = async (idUser) => {
    return handleRequest(async () => {
        return await api.get(`/getCurentUser/${idUser}`)
    })
}

export const getBacSiByChuyenKhoa = async (id_chuyenKhoa, data) => {

    return handleRequest(async () => {
        return await api.post(`auth/getBacSiByChuyenKhoa/${id_chuyenKhoa}`, data)
    })
}
export const getAllBacSiByBenhVien = async (id_benhVien) => {
    return handleRequest(async () => {
        return await api.post(`auth/getBacSiByChuyenKhoa/`, { id_benhVien })
    })
}

export const getChuyenKhoas = async (id_benhVien) => {
    return handleRequest(async () => {
        return await api.get(`auth/chuyenkhoa/${id_benhVien}`)
    })
}
//lấy số lượng bệnh án theo bệnh viện

export const getAllBenhAnByHospital = async (id_benhVien) => {
    return handleRequest(async () => {
        return await api.get(`auth/getAllLichSuKhamByHospital/${id_benhVien}`)
    })
}

export const getAllUser = async () => {
    return handleRequest(async () => {
        return await api.get(`/getAllUser`)
    })
}

//Lấy thông tin tất cả tin tức theo bệnh viện
export const getAllNewsbyHospital = async (id_benhVien) => {
    return handleRequest(async () => {
        return await api.get(`auth/getAllNewsByHospital/${id_benhVien}`)
    })
}

export const getAllNews = async () => {
    return handleRequest(async () => {
        return await api.get(`auth/getAllNews`)
    })
}


export const getInfChuyenKhoa = async (idChuyenKhoa) => {
    return handleRequest(async () => {
        return await api.get(`auth/getInfomationChuyenKhoa/${idChuyenKhoa}`)
    })
}

export const huylichkham = async (id_lichkham) => {
    return handleRequest(async () => {
        return await api.get(`auth/huylichkham/${id_lichkham}`)
    })
}

export const deleteUser = async (idUser) => {
    return handleRequest(async () => {
        return await api.delete(`auth/xoaUser/${idUser}`)
    })
}

export const deleteLichKham = async (scheduleId) => {
    return handleRequest(async () => {
        return await api.delete(`auth/xoalich/${scheduleId}`)
    })
}

export const deleteChuyenKhoaS = async (id_chuyenKhoa) => {
    return handleRequest(async () => {
        return await api.delete(`auth/xoaChuyenKhoa/${id_chuyenKhoa}`)
    })
}

export const deleteUsers = async (userId) => {
    return handleRequest(async () => {
        return await api.delete(`auth/xoaUser/${userId}`)
    })
}

export const create_payment_url = async (amount, id_user) => {
    return handleRequest(async () => {
        return await api.post(`auth/create_payment_url`, { amount, id_user, bankCode: "", })
    })
}
export const vnPay_Return = async (params) => {

    return handleRequest(async () => {
        return await api.get('auth/vnpay_return', {
            params: { params }
        })
    })
}
export const getCurentNews = async (id_tinTuc) => {
    return handleRequest(async () => {
        return await api.get(`/getCurentNews/${id_tinTuc}`)
    })
}
export const getCurentNew = async (id_tinTuc) => {
    return handleRequest(async () => {
        return await api.get(`/getCurentNews/2`)
    })
}

export const getNews = async (params) => {
    return handleRequest(async () => {
        return await api.get(`/getNews`, { params })
    })
}
export const addNews = async (data) => {
    return handleRequest(async () => {
        return await api.post(`addNews`, { data })
    })
}
export const addComment = async (data) => {
    console.log(data)
    return handleRequest(async () => {
        return await api.post(`addComment`, data)
    })
}

