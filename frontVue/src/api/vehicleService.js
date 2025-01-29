import { API_VECHICLES } from '@/router/routes'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getUserIdFromToken } from './autentication'

// Función para obtener el token JWT de localStorage
const getToken = () => localStorage.getItem('jwtToken')

const fetchVehicles = async () => {
  const token = getToken()
  try {
    const response = await axios.get(API_VECHICLES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al traer los vehículos.',
    })
    throw error // Re-lanzar el error para que pueda ser manejado por el llamador
  }
}

const createVehicle = async (data) => {
  try {
    const token = getToken()
    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario del token.')
    }
    const response = await axios.post(
      API_VECHICLES,
      { ...data, createdBy: userId, updatedBy: userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Vehículo creado exitosamente!',
    })
    return true
  } catch (error) {
    // Error message using SweetAlert2
    const errorMessage =
      error.response?.data?.error ||
      'Hubo un problema creando el vehículo. Por favor, inténtalo de nuevo.'
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    })
    return false
  }
}

// Actualiza el estado del vehículo utilizando la nueva ruta del endpoint
const updateStatus = async (vehicleId, newStatus) => {
  const token = getToken()
  const userId = getUserIdFromToken(token)
  try {
    await axios.put(
      `${API_VECHICLES}/${vehicleId}/status`,
      {
        status: newStatus,
        updatedBy: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    // Mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Estado del vehículo actualizado exitosamente!',
    })
  } catch (error) {
    console.error('Error actualizando el estado del vehículo:', error)

    // Capturar y mostrar el mensaje de error del backend
    const errorMessage =
      error.response?.data?.error ||
      'Hubo un problema actualizando el estado del vehículo. Por favor, inténtalo de nuevo.'
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    })
  }
}

export { fetchVehicles, createVehicle, updateStatus, getToken, getUserIdFromToken }
