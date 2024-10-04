import React, { useEffect, useState } from 'react';
import { getClienteDetail, getTransaccionesPorCliente, getProductos, cancelarTransaccion } from '../services/api';

const ClienteDetail = ({ clienteId, onClose }) => {
    const [cliente, setCliente] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await fetchClienteDetail();
                await fetchTransacciones();
                await fetchProductos();
            } catch (err) {
                setError("Error al cargar los datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clienteId]);

    const fetchClienteDetail = async () => {
        const response = await getClienteDetail(clienteId);
        setCliente(response.data);
    };

    const fetchTransacciones = async () => {
        const response = await getTransaccionesPorCliente(clienteId);
        setTransacciones(response.data);
    };

    const fetchProductos = async () => {
        const response = await getProductos();
        setProductos(response.data);
    };

    const handleCancelarTransaccion = async (transaccionId) => {
        try {
            const data = {
                id: transaccionId,
                cliente_id: clienteId,
            };
            await cancelarTransaccion(data);
            await fetchTransacciones(); // Actualiza la lista de transacciones
        } catch (error) {
            setError("Error al cancelar la transacción.");
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Detalles del Cliente</h5>
                <button className="btn btn-close" onClick={onClose}></button>
            </div>
            <div className="card-body">
                {loading ? (
                    <p>Cargando detalles del cliente...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : cliente ? (
                    <>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                        <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
                        <p><strong>Saldo:</strong> ${cliente.saldo}</p>

                        <h6>Inscripciones a fondos</h6>
                        {transacciones.length > 0 ? (
                            <ul>
                                {transacciones.map(transaccion => {
                                    const producto = productos.find(p => p.id === transaccion.producto_id);
                                    return (
                                        <li key={transaccion.id}>
                                            {transaccion.fecha} - Monto: {transaccion.monto} - estado: {transaccion.tipo} - 
                                            Producto: {producto ? producto.nombre : 'Desconocido'}
                                            {transaccion.tipo !== 'afiliacion cancelada' && (
                                                <button 
                                                    className="btn btn-danger btn-sm float-right" 
                                                    onClick={() => handleCancelarTransaccion(transaccion.id)}
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>No hay transacciones para este cliente.</p>
                        )}
                    </>
                ) : (
                    <p>No se encontraron detalles del cliente.</p>
                )}
            </div>
        </div>
    );
};

export default ClienteDetail;
