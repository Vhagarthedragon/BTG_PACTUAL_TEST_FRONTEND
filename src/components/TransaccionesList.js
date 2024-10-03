// src/components/TransaccionesList.js
import React, { useEffect, useState } from 'react';
import { getTransacciones } from '../services/api';

const TransaccionesList = () => {
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        fetchTransacciones();
    }, []);

    const fetchTransacciones = async () => {
        try {
            const response = await getTransaccionesPorCliente(clienteId);
            console.log("Transacciones obtenidas:", response.data);  // Verifica los datos que trae la API
            setTransacciones(response.data);
        } catch (error) {
            console.error("Error al obtener transacciones del cliente:", error);
        }
    };
    

    return (
        <div>
            <h3>Transacciones</h3>
            {transacciones.length === 0 ? (
                <p>No hay transacciones disponibles.</p>
            ) : (
                <ul className="list-group">
                    {transacciones.map(transaccion => (
                        <li key={transaccion.id} className="list-group-item">
                            Cliente: {transaccion.clienteNombre} - Producto: {transaccion.productoNombre} - Monto: ${transaccion.monto}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransaccionesList;
