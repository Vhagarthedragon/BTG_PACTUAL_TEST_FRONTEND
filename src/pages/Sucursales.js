// src/pages/Sucursales.js
import React from 'react';
import SucursalList from '../components/SucursalList';

const Sucursales = () => {
    return (
        <div className="container mt-4">
            <h2>Lista de Sucursales</h2>
            <SucursalList />
        </div>
    );
};

export default Sucursales;
