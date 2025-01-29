import { API_LOGIN, API_REGISTER } from '@/router/routes'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'

const headers = {
  headers: { 'Content-Type': 'application/json' },
}

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    return decoded.id || decoded.userId || decoded.sub
  } catch (error) {
    console.error('Error decodificando el token:', error)
    return null
  }
}

const login = async (data) => {
  try {
    const response = await axios.post(API_LOGIN, data, headers)
    const token = response.data.token
    // Guarda el token en localStorage
    localStorage.setItem('jwtToken', token)
    Swal.fire('¡Bienvenido!', 'Inicio de sesión exitoso')
    return token
  } catch (error) {
    const message = error.response?.data?.message || 'Ocurrió un error'
    Swal.fire('¡Ocurrió un error al iniciar sesión!', message, 'error')
    return false
  }
}

const register = async (data) => {
  try {
    await axios.post(API_REGISTER, data, headers)
    Swal.fire('¡Usuario registrado exitosamente!', 'Se registró al usuario de manera exitosa')
    return true
  } catch (error) {
    const message = error.response?.data?.message || 'Ocurrió un error'
    Swal.fire('¡Ocurrió un error al registrar el ususario!', message, 'error')
  }
}

export { login, register, getUserIdFromToken }
