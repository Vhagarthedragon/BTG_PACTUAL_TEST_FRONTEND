import React, { useEffect, useState } from 'react';
import { getClienteDetail, getTransaccionesPorCliente, getProductos } from '../services/api';

const ClienteDetail = ({ clienteId, onClose }) => {
    const [cliente, setCliente] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    const [productos, setProductos] = useState([]);  // Estado para almacenar productos

    useEffect(() => {
        fetchClienteDetail();
        fetchTransacciones();
        fetchProductos();  // Llama a la función para obtener productos
    }, [clienteId]);

    const fetchClienteDetail = async () => {
        try {
            const response = await getClienteDetail(clienteId);
            setCliente(response.data);
        } catch (error) {
            console.error("Error al obtener detalles del cliente:", error);
        }
    };

    const fetchTransacciones = async () => {
        try {
            const response = await getTransaccionesPorCliente(clienteId);
            console.log("Registros de Inscripción a productos obtenidos:", response.data);
            setTransacciones(response.data);
        } catch (error) {
            console.error("Error al obtener transacciones del cliente:", error);
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await getProductos();  // Obtener todos los productos
            setProductos(response.data);  // Almacenar en el estado
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Detalles del Cliente</h5>
                <button className="btn btn-close" onClick={onClose}></button>
            </div>
            <div className="card-body">
                {cliente ? (
                    <>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                        <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
                        <p><strong>Saldo:</strong> ${cliente.saldo}</p>

                        <h6>Inscripciones a fondos</h6>
                        {transacciones.length > 0 ? (
                            <ul>
                                {transacciones.map(transaccion => {
                                    // Busca el nombre del producto usando el producto_id
                                    const producto = productos.find(p => p.id === transaccion.producto_id);
                                    return (
                                        <li key={transaccion.fecha}>
                                            {transaccion.fecha} - Monto: {transaccion.monto} -
                                            Producto: {producto ? producto.nombre : 'Desconocido'}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>No hay transacciones para este cliente.</p>
                        )}
                    </>
                ) : (
                    <p>Cargando detalles del cliente...</p>
                )}
            </div>
        </div>
    );
};

export default ClienteDetail;
