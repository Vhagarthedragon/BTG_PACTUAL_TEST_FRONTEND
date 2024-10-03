// src/components/ProductoList.js
import React, { useEffect, useState } from 'react';
import { getProductos, createProducto, addProductoToSucursal, getSucursales } from '../services/api';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [montoMinimo, setMontoMinimo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [productoIdSucursal, setProductoIdSucursal] = useState('');
    const [idSucursal, setIdSucursal] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);  // Estado para el formulario de creación
    const [showAddToSucursalForm, setShowAddToSucursalForm] = useState(false);  // Estado para el formulario de agregar a sucursal
    const [sucursales, setSucursales] = useState([]); // Estado para las sucursales

    useEffect(() => {
        fetchProductos();
        fetchSucursales();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await getProductos();
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            alert("No se pudo obtener la lista de productos.");
        }
    };

    const fetchSucursales = async () => {
        try {
            const response = await getSucursales();
            setSucursales(response.data);
        } catch (error) {
            console.error("Error al obtener sucursales:", error);
            alert("No se pudo obtener la lista de sucursales.");
        }
    };

    const handleCreateProductSubmit = async (e) => {
        e.preventDefault();
        const productoData = { nombre, monto_minimo: parseFloat(montoMinimo), categoria };

        try {
            await createProducto(productoData);
            alert("Producto creado con éxito.");
            fetchProductos(); // Recargar la lista de productos
            clearCreateForm();
            setShowCreateForm(false); // Ocultar el formulario después de crear el producto
        } catch (error) {
            console.error("Error al crear producto:", error);
            alert("No se pudo crear el producto.");
        }
    };

    const handleAddToSucursalSubmit = async (e) => {
        e.preventDefault();
        const data = { idSucursal, idProducto: productoIdSucursal }; // Aquí puedes agregar una cantidad si es necesario

        try {
            await addProductoToSucursal(data);
            alert("Producto agregado a la sucursal con éxito.");
            fetchProductos(); // Actualiza la lista de productos si es necesario
            clearAddToSucursalForm();
            setShowAddToSucursalForm(false); // Ocultar el formulario después de agregar el producto
        } catch (error) {
            console.error("Error al agregar producto a sucursal:", error);
            alert("No se pudo agregar el producto a la sucursal.");
        }
    };

    const clearCreateForm = () => {
        setNombre('');
        setMontoMinimo('');
        setCategoria('');
    };

    const clearAddToSucursalForm = () => {
        setProductoIdSucursal('');
        setIdSucursal('');
    };

    return (
        <div>
            <h3>Productos</h3>

            {/* Botones para mostrar/ocultar los formularios */}
            <button className="btn btn-success mb-3" onClick={() => {
                setShowCreateForm(!showCreateForm);
                setShowAddToSucursalForm(false); // Ocultar el formulario de agregar a sucursal
            }}>
                {showCreateForm ? "Ocultar Formulario de Producto" : "Crear Producto"}
            </button>

            <button className="btn btn-info mb-3" onClick={() => {
                setShowAddToSucursalForm(!showAddToSucursalForm);
                setShowCreateForm(false); // Ocultar el formulario de creación de producto
            }}>
                {showAddToSucursalForm ? "Ocultar Formulario de Agregar a Sucursal" : "Agregar Producto a Sucursal"}
            </button>

            {/* Formulario para crear productos */}
            {showCreateForm && (
                <form onSubmit={handleCreateProductSubmit} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="montoMinimo" className="form-label">Monto Mínimo:</label>
                        <input type="number" id="montoMinimo" className="form-control" value={montoMinimo} onChange={(e) => setMontoMinimo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">Categoría:</label>
                        <input type="text" id="categoria" className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar Producto</button>
                </form>
            )}

            {/* Formulario para agregar productos a una sucursal */}
            {showAddToSucursalForm && (
                <form onSubmit={handleAddToSucursalSubmit} className="mb-4">
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
                        <label htmlFor="productoIdSucursal" className="form-label">Seleccionar Producto:</label>
                        <select id="productoIdSucursal" className="form-select" value={productoIdSucursal} onChange={(e) => setProductoIdSucursal(e.target.value)} required>
                            <option value="">Seleccione un producto</option>
                            {productos.map((producto) => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar a Sucursal</button>
                </form>
            )}

            {productos.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <ul className="list-group">
                    {productos.map((producto) => (
                        <li key={producto.id} className="list-group-item">
                            {producto.nombre} - {producto.monto_minimo} COP ({producto.categoria})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductoList;
