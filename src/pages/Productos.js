// src/pages/Productos.js
import React from 'react';
import ProductoList from '../components/ProductoList';
import AddProductoToSucursal from '../components/AddProductoToSucursal';

const Productos = () => {
    return (
        <div className="container mt-4">
            <h2>Lista de Productos</h2>
            <ProductoList />
        </div>
    );
};

export default Productos;
