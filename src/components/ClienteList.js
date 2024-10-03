// src/components/ClienteList.js
import React, { useEffect, useState } from 'react';
import { getClientes, createCliente, deleteCliente } from '../services/api';
import ClienteDetail from './ClienteDetail';
import RegistrarTransaccion from './RegistrarTransaccion'; // Importa el nuevo componente

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showRegistrarTransaccion, setShowRegistrarTransaccion] = useState(false) // Estado para el formulario de registrar transacciones

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await getClientes();
            setClientes(response.data);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            alert("No se pudo obtener la lista de clientes.");
        }
    };

    const handleAddCliente = async (e) => {
        e.preventDefault();
        const clienteData = { nombre, apellidos, ciudad };

        try {
            await createCliente(clienteData);
            alert("Cliente creado con éxito.");
            fetchClientes();
            clearForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error al crear cliente:", error);
            alert("No se pudo crear el cliente.");
        }
    };

    const clearForm = () => {
        setNombre('');
        setApellidos('');
        setCiudad('');
    };

    const handleDeleteCliente = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            try {
                await deleteCliente(id);
                alert("Cliente eliminado con éxito.");
                fetchClientes();
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                alert("No se pudo eliminar el cliente.");
            }
        }
    };

    return (
        <div>
            <h3>Clientes</h3>

            <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Ocultar Formulario" : "Crear Cliente"}
            </button>
            <button className="btn btn-secondary mb-3 ms-2" onClick={() => setShowRegistrarTransaccion(!showRegistrarTransaccion)}>
                {showRegistrarTransaccion ? "Ocultar Registro de Inscripciones" : "Inscribirse a Producto"}
            </button>

            {showForm && (
                <form onSubmit={handleAddCliente} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                        <input type="text" id="apellidos" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                        <input type="text" id="ciudad" className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar Cliente</button>
                </form>
            )}


            {showRegistrarTransaccion && (
                <RegistrarTransaccion onClose={() => setShowRegistrarTransaccion(false)} />
            )}

            {clientes.length === 0 ? (
                <p>No hay clientes disponibles.</p>
            ) : (
                <ul className="list-group">
                    {clientes.map((cliente) => (
                        <li key={cliente.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {cliente.nombre} {cliente.apellidos} - {cliente.ciudad} - ${cliente.saldo}
                            <div>
                                <button className="btn btn-info btn-sm me-2" onClick={() => setSelectedClienteId(cliente.id)}>
                                    Ver Detalles
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selectedClienteId && (
                <ClienteDetail clienteId={selectedClienteId} onClose={() => setSelectedClienteId(null)} />
            )}
        </div>
    );
};

export default ClienteList;
