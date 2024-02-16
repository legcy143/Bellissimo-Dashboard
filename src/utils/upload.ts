import {API_URL} from '@/constants/API_URL'
import axios from 'axios'
export const uploadSingleFile = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await axios.post(`${API_URL}/upload/single`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data.data
}

export const uploadMultipleFiles = async (files: File[]) => {
    const formData = new FormData()
    
    const filesArray = Array.from(files);

    filesArray.forEach((file, index) => {
        formData.append(`images`, file);
    });

    const response = await axios.post(`${API_URL}/upload/multiple`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data.data
}