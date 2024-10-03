// src/services/api.js
import axios from 'axios';

// Configura la base URL de tu backend de FastAPI
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// Endpoints de Clientes
export const getClientes = () => API.get('/clientes/');
export const createCliente = (cliente) => API.post('/clientes/', cliente);
export const deleteCliente = (id) => API.delete(`/clientes/${id}`);
export const getClienteDetail = (id) => API.get(`/clientes/${id}`);


// Endpoints de Sucursales
export const getSucursales = () => API.get('/sucursales/');
export const createSucursal = (sucursal) => API.post('/sucursales/', sucursal);
export const deleteSucursal = (sucursalId) => API.delete(`/sucursales/${sucursalId}`);
export const getProductosPorSucursal = (sucursalId) => API.get(`/disponibilidad/sucursales/${sucursalId}/productos`);

// Endpoints de Productos
export const getProductos = () => API.get('/productos/');
export const createProducto = (producto) => API.post('/productos/', producto);

// Endpoints de Transacciones
export const getTransaccionesPorCliente = (clienteId) => API.get(`/transacciones/${clienteId}`);
export const registrarTransaccion = (clienteId) => API.post('/transacciones/', clienteId); 


// Endpoints de Disponibilidad
export const addProductoToSucursal = (data) => API.post('/disponibilidad/sucursales/productos', data);

export default API;
