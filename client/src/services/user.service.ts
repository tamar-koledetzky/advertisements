import axios from '../utils/axios'
import { User } from "../types/user.types"


export const login = async (userEmail: string, password: string) => {
    debugger
    const response = await axios.get(`/User/Login/${userEmail}/${password}`)
    return {
        user: response.data.user1,
        token: response.data.token1
    }
}

export const addUser = async (user: User) => {
    try {
        console.log("react service: ")
        // console.log(user)
        const response = await axios.post('/User', user)
        console.log(response.data)
        const newUser = response.data
        return newUser
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export const updateUser = async (user: User) => {
    try {
        const response = await axios.put(`/User/${user.id}`, user)
        const updatedTodo = response.data
        return updatedTodo
    }
    catch (error) {
        console.error(`Error updating user: ${user.id}`, error);
        throw error;
    }
}

// export const deleteUser = async (id: string) => {
//     const response = await axios.delete(`/users/${id}`)
//     return response
// }

export const getUsers = async () => {
    try {
        const response = await axios.get(`/User/`,)
        return response.data
    }
    catch (error) {
        console.error(`Error fetching users`, error);
        throw error;
    }
}