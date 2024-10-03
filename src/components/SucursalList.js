import React, { useEffect, useState } from 'react';
import { getSucursales, createSucursal, deleteSucursal, getProductosPorSucursal } from '../services/api';

const SucursalList = () => {
    const [sucursales, setSucursales] = useState([]);
    const [productos, setProductos] = useState({});
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [estado, setEstado] = useState('');
    const [showAddForm, setShowAddForm] = useState(false); // Estado para controlar la visibilidad del formulario

    useEffect(() => {
        fetchSucursales();
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

    const handleAddSucursal = async (e) => {
        e.preventDefault();
        const newSucursal = { id: Date.now().toString(), nombre, direccion, ciudad, estado };
        try {
            await createSucursal(newSucursal);
            alert("Sucursal creada con éxito.");
            fetchSucursales(); // Recargar la lista de sucursales
            clearForm(); // Limpiar el formulario
            setShowAddForm(false); // Ocultar el formulario después de agregar la sucursal
        } catch (error) {
            console.error("Error al crear sucursal:", error);
            alert("No se pudo crear la sucursal.");
        }
    };

    const clearForm = () => {
        setNombre('');
        setDireccion('');
        setCiudad('');
        setEstado('');
    };

    const handleDeleteSucursal = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta sucursal?")) {
            try {
                await deleteSucursal(id);
                alert("Sucursal eliminada con éxito.");
                fetchSucursales(); // Recargar la lista de sucursales
            } catch (error) {
                console.error("Error al eliminar sucursal:", error);
                alert("No se pudo eliminar la sucursal.");
            }
        }
    };

    const fetchProductos = async (sucursalId) => {
        setLoading(true);
        try {
            const response = await getProductosPorSucursal(sucursalId);
            setProductos((prev) => ({ ...prev, [sucursalId]: response.data }));
        } catch (error) {
            console.error("Error al obtener productos:", error);
            alert("No se pudo obtener la lista de productos.");
        } finally {
            setLoading(false);
        }
    };

    const toggleAddForm = () => {
        setShowAddForm((prev) => !prev); // Cambia el estado para mostrar u ocultar el formulario
    };

    return (
        <div>
            <h3>Sucursales</h3>
            <button className="btn btn-info mb-3" onClick={toggleAddForm}>
                {showAddForm ? 'Ocultar Formulario de Agregar Sucursal' : 'Agregar Sucursal'}
            </button>

            {showAddForm && (
                <form onSubmit={handleAddSucursal} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Dirección:</label>
                        <input type="text" id="direccion" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                        <input type="text" id="ciudad" className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado:</label>
                        <input type="text" id="estado" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar Sucursal</button>
                </form>
            )}

            {sucursales.length === 0 ? (
                <p>No hay sucursales disponibles.</p>
            ) : (
                <ul className="list-group">
                    {sucursales.map((sucursal) => (
                        <li key={sucursal.id} className="list-group-item">
                            <div>
                                <strong>{sucursal.nombre}</strong> - {sucursal.direccion}
                                <button className="btn btn-info btn-sm float-end" onClick={() => fetchProductos(sucursal.id)}>
                                    Ver Productos
                                </button>
                                <button className="btn btn-danger btn-sm float-end me-2" onClick={() => handleDeleteSucursal(sucursal.id)}>
                                    Eliminar
                                </button>
                            </div>
                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            {productos[sucursal.id] && productos[sucursal.id].length > 0 && (
                                <ul className="list-group mt-2">
                                    {productos[sucursal.id].map((producto) => (
                                        <li key={producto.id} className="list-group-item">
                                            {producto.nombre}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {productos[sucursal.id] && productos[sucursal.id].length === 0 && (
                                <p className="mt-2">No hay productos disponibles en esta sucursal.</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SucursalList;
