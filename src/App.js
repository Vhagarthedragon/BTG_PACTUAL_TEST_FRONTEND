// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clientes from './pages/Clientes';
import Sucursales from './pages/Sucursales';
import Productos from './pages/Productos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div className={darkMode ? '' : 'light-theme'}>
                <Navbar toggleDarkMode={toggleDarkMode} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <h1>Descripción Técnica del Proyecto</h1>
                                <p>
                                    Este proyecto es una aplicación web que gestiona la información de clientes, sucursales y productos utilizando React en el frontend y FastAPI en el backend.
                                </p>
                                <h2>Arquitectura del Sistema</h2>
                                <p>
                                    La arquitectura del sistema se basa en una aplicación de una sola página (SPA) construida con React, que interactúa con un backend desarrollado en FastAPI. Esta arquitectura permite una experiencia de usuario fluida y eficiente.
                                </p>
                                <h2>Backend en AWS</h2>
                                <p>
                                    El backend está alojado en <strong>AWS Lambda</strong>, lo que permite la ejecución de código en un entorno sin servidor. Esto optimiza la escalabilidad y la gestión de recursos.
                                </p>
                                <h2>Base de Datos</h2>
                                <p>
                                    La aplicación utiliza <strong>Amazon DynamoDB</strong> como base de datos NoSQL para almacenar datos relacionados con clientes, sucursales y productos. DynamoDB ofrece un rendimiento rápido y escalable.
                                </p>
                                <h2>Despliegue con CloudFormation</h2>
                                <p>
                                    La infraestructura está definida y gestionada mediante <strong>AWS CloudFormation</strong>, lo que permite un despliegue automatizado y reproducible de todos los recursos necesarios, incluyendo las tablas de DynamoDB y las funciones de Lambda.
                                </p>
                                <h2>Endpoints del Backend</h2>
                                <p>
                                    Los siguientes endpoints están disponibles en la API:
                                </p>
                                <ul>
                                    <li><code>GET /clientes/</code>: Listar todos los clientes.</li>
                                    <li><code>POST /clientes/</code>: Crear un nuevo cliente.</li>
                                    <li><code>GET /sucursales/</code>: Listar todas las sucursales.</li>
                                    <li><code>GET /productos/</code>: Listar todos los productos.</li>
                                    <li><code>POST /productos/</code>: Crear un nuevo producto.</li>
                                    <li><code>POST /disponibilidad/sucursales/productos</code>: Agregar un producto a una sucursal.</li>
                                </ul>
                                <h2>Requerimientos Técnicos</h2>
                                <p>
                                    - <strong>Frontend:</strong> React, Axios para la comunicación con la API.<br />
                                    - <strong>Backend:</strong> FastAPI para la creación de la API RESTful.<br />
                                    - <strong>Base de Datos:</strong> Amazon DynamoDB.<br />
                                    - <strong>Despliegue:</strong> AWS Lambda y CloudFormation para la gestión de infraestructura.
                                </p>

                            </div>
                        } />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/sucursales" element={<Sucursales />} />
                        <Route path="/productos" element={<Productos />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
