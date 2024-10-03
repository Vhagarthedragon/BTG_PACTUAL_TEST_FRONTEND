// src/pages/Clientes.js
import React from 'react';
import ClienteList from '../components/ClienteList';

const Clientes = () => {
    return (
        <div className="container mt-4">
            <h2>Lista de Clientes</h2>
            <ClienteList />
        </div>
    );
};
export default Clientes;
