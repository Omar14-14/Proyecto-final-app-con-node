"use client";
import React, { useState } from "react";
import axios from "axios";

async function guardarVenta(e) {
    e.preventDefault();
    const url = "http://localhost:3000/b/nuevaVenta";
    const datos = {
        estatus: "vendido",
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        idProducto: document.getElementById("idProducto").dataset.id, // Usar el ID del producto
        idUsuario: document.getElementById("idUsuario").dataset.id, // Usar el ID del cliente
    };

    const respuesta = await axios.post(url, datos);
    window.location.href = "http://localhost:3001/ventas/mostrar";
}

export default function NuevaVenta() {
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(""); // Nombre del producto
    const [clienteSeleccionado, setClienteSeleccionado] = useState(""); // Nombre del cliente
    const [idProducto, setIdProducto] = useState(""); // ID del producto
    const [idUsuario, setIdUsuario] = useState(""); // ID del cliente

    // Buscar productos dinámicamente
    const buscarProductos = async (query) => {
        if (!query) {
            setProductos([]);
            return;
        }

        const respuesta = await axios.get("http://localhost:3000/a/buscar", {
            params: { query },
        });
        setProductos(respuesta.data);
    };

    // Buscar clientes dinámicamente
    const buscarClientes = async (query) => {
        if (!query) {
            setClientes([]);
            return;
        }

        const respuesta = await axios.get("http://localhost:3000/buscar", {
            params: { query },
        });
        setClientes(respuesta.data);
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva venta</h1>
                    </div>
                    <div className="card-body">
                        {/* Campo de Producto */}
                        <input
                            placeholder="Producto"
                            className="form-control mb-3"
                            id="idProducto"
                            value={productoSeleccionado}
                            data-id={idProducto} // Almacena el ID del producto
                            onChange={(e) => {
                                setProductoSeleccionado(e.target.value);
                                buscarProductos(e.target.value);
                            }}
                            required
                            autoFocus
                            type="text"
                        />
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {productos.map((producto) => (
                                <li
                                    key={producto.id}
                                    onClick={() => {
                                        setProductoSeleccionado(producto.descripcion); // Mostrar el nombre
                                        setIdProducto(producto.id); // Guardar el ID
                                        setProductos([]);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    {producto.descripcion}
                                </li>
                            ))}
                        </ul>

                        {/* Campo de Cliente */}
                        <input
                            placeholder="Cliente"
                            className="form-control mb-3"
                            id="idUsuario"
                            value={clienteSeleccionado}
                            data-id={idUsuario} // Almacena el ID del cliente
                            onChange={(e) => {
                                setClienteSeleccionado(e.target.value);
                                buscarClientes(e.target.value);
                            }}
                            required
                            type="text"
                        />
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {clientes.map((cliente) => (
                                <li
                                    key={cliente.id}
                                    onClick={() => {
                                        setClienteSeleccionado(cliente.nombre); // Mostrar el nombre
                                        setIdUsuario(cliente.id); // Guardar el ID
                                        setClientes([]);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    {cliente.nombre}
                                </li>
                            ))}
                        </ul>

                        <input
                            placeholder="Hora de compra"
                            className="form-control mb-3"
                            id="hora"
                            required
                            type="text"
                        />
                        <input
                            placeholder="Fecha de compra"
                            className="form-control mb-3"
                            id="fecha"
                            required
                            type="text"
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Guardar nueva venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
