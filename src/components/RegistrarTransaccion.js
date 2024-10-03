// src/components/RegistrarTransacciones.js
import React, { useEffect, useState } from 'react';
import { getClientes, getProductos, registrarTransaccion } from '../services/api';

const RegistrarTransacciones = ({ onClose }) => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [productoId, setProductoId] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('apertura'); // Asumiendo que 'apertura' es el tipo predeterminado

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesResponse, productosResponse] = await Promise.all([getClientes(), getProductos()]);
                setClientes(clientesResponse.data);
                setProductos(productosResponse.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                alert("No se pudieron cargar los datos necesarios.");
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { cliente_id: clienteId, producto_id: productoId, monto: Number(monto), tipo };

        try {
            await registrarTransaccion(payload);
            alert("Transacción registrada con éxito.");
            onClose();  // Cerrar el formulario después de registrar la transacción
        } catch (error) {
            console.error("Error al registrar la transacción:", error);
            alert("No se pudo registrar la transacción. Por favor, verifica los datos.");
        }
    };

    return (
        <div>
            <h4>Registrar Incripcion</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="cliente" className="form-label">Cliente:</label>
                    <select id="cliente" className="form-select" value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellidos}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="producto" className="form-label">Producto:</label>
                    <select id="producto" className="form-select" value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
                        <option value="">Seleccione un producto</option>
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="monto" className="form-label">Monto:</label>
                    <input type="number" id="monto" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo de Transacción:</label>
                    <select id="tipo" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="apertura">Apertura</option>
                        <option value="cancelacion">Cancelación</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default RegistrarTransacciones;
