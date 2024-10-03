import React, { useEffect, useState } from 'react';
import { getSucursales, getProductos, addProductoToSucursal } from '../services/api';

const AddProductoToSucursal = () => {
    const [sucursales, setSucursales] = useState([]);
    const [productos, setProductos] = useState([]);
    const [idSucursal, setIdSucursal] = useState('');
    const [idProducto, setIdProducto] = useState('');

    useEffect(() => {
        fetchSucursales();
        fetchProductos();
    }, []);

    const fetchSucursales = async () => {
        try {
            const response = await getSucursales();
            setSucursales(response.data);
        } catch (error) {
            console.error("Error al obtener sucursales:", error);
            alert("No se pudo obtener la lista de sucursales.");
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await getProductos();
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            alert("No se pudo obtener la lista de productos.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { idSucursal, idProducto };
        try {
            await addProductoToSucursal(data);
            alert("Producto agregado a la sucursal con éxito.");
            // Limpiar los campos después de agregar
            setIdSucursal('');
            setIdProducto('');
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("No se pudo agregar el producto.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="idSucursal" className="form-label">Seleccionar Sucursal:</label>
                <select id="idSucursal" className="form-select" value={idSucursal} onChange={(e) => setIdSucursal(e.target.value)} required>
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre} - {sucursal.direccion}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="idProducto" className="form-label">Seleccionar Producto:</label>
                <select id="idProducto" className="form-select" value={idProducto} onChange={(e) => setIdProducto(e.target.value)} required>
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
    );
};

export default AddProductoToSucursal;
