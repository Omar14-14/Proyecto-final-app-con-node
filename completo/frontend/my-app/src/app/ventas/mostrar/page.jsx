"use client";
import BorrarVenta from "@/components/borrarv";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [productos, setProductos] = useState({});
    const [usuarios, setUsuarios] = useState({});

    // Función para cargar las ventas con estatus "vendido"
    const cargarVentas = async () => {
        const url = "http://localhost:3000/b/ventas";
        const respuesta = await axios.get(url);
        // Filtrar ventas con estatus "vendido"
        const ventasFiltradas = respuesta.data.filter((venta) => venta.estatus === "vendido");
        setVentas(ventasFiltradas);
    };

    // Función para cargar productos y crear un diccionario
    const cargarProductos = async () => {
        const url = "http://localhost:3000/a"; 
        const respuesta = await axios.get(url);
        const diccionario = respuesta.data.reduce((acc, producto) => {
            acc[producto.id] = producto.descripcion;
            return acc;
        }, {});
        setProductos(diccionario);
    };

    // Función para cargar usuarios y crear un diccionario
    const cargarUsuarios = async () => {
        const url = "http://localhost:3000";
        const respuesta = await axios.get(url);
        const diccionario = respuesta.data.reduce((acc, usuario) => {
            acc[usuario.id] = usuario.nombre;
            return acc;
        }, {});
        setUsuarios(diccionario);
    };

    // Función para cancelar una venta
    const cancelarVenta = async (id) => {
        const url = `http://localhost:3000/b/cancelarVenta/${id}`; // Ajusta esta URL si es necesario
        await axios.delete(url); // Enviar solicitud para cancelar la venta
        cargarVentas(); // Recargar las ventas
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        cargarVentas();
        cargarProductos();
        cargarUsuarios();
    }, []);

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Cliente</th>
                        <th>Hora compra</th>
                        <th>Fecha compra</th>
                        <th>Estatus venta</th>
                        <th>Editar venta</th>
                        <th>Cancelar venta</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={venta.id}>
                            <td>
                                <Link href={`/ventas/${venta.id}`}>{i + 1}</Link>
                            </td>
                            <td>{productos[venta.idProducto] || "Producto no encontrado"}</td>
                            <td>{usuarios[venta.idUsuario] || "Cliente no encontrado"}</td>
                            <td>{venta.hora}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.estatus}</td>
                            <td>
                                <Link href={`/ventas/editar/${venta.id}`}>Editar</Link>
                            </td>
                            <td>
                                <button
                                    onClick={() => cancelarVenta(venta.id)}
                                    className="btn"
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
