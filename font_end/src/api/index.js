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

export const login = async (email, password) => {
    return handleRequest(async () => {
        return await api.post('/auth/login', { email, password })
    })
}

export const getUser = async (params) => {
    return handleRequest(async () => {
        return await api.get('/getUser', { params })
    })
}
export const getCurentUser = async (idUser) => {
    const url = api
    return handleRequest(async () => {
        return await api.get(`/getCurentUser/${idUser}`)
    })
}