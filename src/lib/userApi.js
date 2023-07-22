import axios from 'axios'

const base_url = 'https://qstnr.intvw.logodiffusion.com/api/questionnaire'
export const urls = {
    questionnaireCreate: `/`,
    questionnaireList: `/`,
    questionnaireRead: (id) => `/${id}/`,
    questionnaireUpdate : (id) => `/${id}/`,
    questionnairePartialUpdate: (id) => `/${id}/`,
    questionnaireDelete: (id) => `/${id}/`
}


const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = {
    get:(url, data) => {
        return axiosInstance.get(`${url}`, data);
    },
    
    post:(url, data) => {
        return axiosInstance.post(`${url}`, data);
    },
    
    put:(url, data) => {
        return axiosInstance.put(`${url}`, data);
    },
    
    deleteData:(url, data) => {
        return axiosInstance.delete(`${url}`, data);
    },
}

