import axios from 'axios'
import { LOGIN_USER } from './types'

export function loginUser(loginData) {

    const request = axios.post('/api/users/login', loginData)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }

}