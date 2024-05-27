import { get } from 'http'
import {jwtDecode} from 'jwt-decode'
const key = 'token'


const storeToken = async(authToken:string) =>{
    try {
        await localStorage.setItem(key, authToken)
    } catch (error) {
        console.log('Error storing the auth token', error)
    }
}


const getToken = async () =>{
    try {
        const authToken = await localStorage.getItem(key)
        return authToken
    } catch (error) {
        console.log('Error getting the auth token', error)
    }
}

const getUser = async () =>{
    const token = await getToken()
    if(token) return jwtDecode(token)

    return     
}


const removeToken = async() =>{
    try {
        await localStorage.removeItem(key)
    } catch (error) {
        console.log('Error removing the auth token', error)
    }
}


export default {
    storeToken,
    getToken,
    getUser,
    removeToken
}