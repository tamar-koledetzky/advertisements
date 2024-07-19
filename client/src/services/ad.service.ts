import axios from '../utils/axios'
import { Ad } from "../types/ad.types"
import { getSession } from '../auth/auth.utils'

export const getAllAds = async () => {
    try {
        const response = await axios.get('/Ad')
        const ads = response.data
        return ads
    }
    catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
}
export const getAd = async (id: number) => {
    try {
        const response = await axios.get(`/Ad/${id}`)
        console.log(response.data)
        const ad = response.data
        return ad
    }
    catch (error) {
        console.error('Error fetching ad by id:', error);
        throw error;
    }
}
export const getAdsByCategory = async (id: number) => {
    try {
        const response = await axios.get(`/Ad/byCategory/${id}`)
        const ads = response.data
        return ads
    }
    catch (error) {
        console.error('Error fetching ad by id:', error);
        throw error;
    }
}
export const getAdsByUser = async (id: string) => {
    try {
        const response = await axios.get(`/Ad/byUser/${id}`)
        const ads = response.data
        return ads
    }
    catch (error) {
        console.error('Error fetching ad by id:', error);
        throw error;
    }
}

export const addAd = async (ad: Omit<Ad, 'id'>) => {
    try {
        const token=getSession()?.token
        const response = await axios.post('/Ad', ad,
        {
            headers:{
            Authorization:`Bearer ${token}`
        }

        })
        const newAd = response.data
        return newAd
    }
    catch (error) {
        console.error('Error adding ad:', error);
        throw error;
    }
}
export const defineCategory = async (ad: Omit<Ad, 'id'>) => {
    try {
        const token=getSession()?.token
        console.log('service defineCategory '+ ad.userId)
        const response = await axios.post('/Ad/DefineCategory', ad,
            {
                headers:{
                Authorization:`Bearer ${token}`
            }

            }
        )
        const categoryId = response.data
        return categoryId
    }
    catch (error) {
        console.error('Error adding ad:', error);
        throw error;
    }
}

export const updateAd = async (ad: Ad) => {
    try {
        const response = await axios.put(`/Ad/${ad.id}`, ad)
        const updatedAd = response.data
        return updatedAd
    }
    catch (error) {
        console.error(`Error updating ad: ${ad.id} }`, error);
        throw error;
    }
}

export const deleteAd = async (id: number) => {
    try {
        const response = await axios.delete(`/Ad/${id}`)
        return response
    }
    catch (error) {
        console.error('Error delete ad:', error);
        throw error;
    }
}
