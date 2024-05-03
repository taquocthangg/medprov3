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


export const getAllLichSuKham = async (idDoctor, date) => {
    console.log(date)
    return handleRequest(async () => {
        return await api.post(`auth/getAllLichSuKham/${idDoctor}`, { appointmentDate: date })
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
    console.log(amount)
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