import axios from '../utils/axios'
import { Category } from "../types/category.type"

export const getCategories = async () => {
    try{
        const response = await axios.get('/Category')
        const categories = response.data
        return categories
    }
    catch(error)
    {
        console.error('Error fetching categories:', error);
        throw error;
    }
}