"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditarVenta({ params }) {
    const [idUsuario, setIdUsuario] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("");
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        async function fetchVentaData() {
            if (id) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/b/buscarPorId/${id}`
                    );
                    const ventaData = response.data;
                    setIdUsuario(ventaData.idUsuario || "");
                    setClienteSeleccionado(ventaData.clienteNombre || ""); // Nombre del cliente
                    setIdProducto(ventaData.idProducto || "");
                    setProductoSeleccionado(ventaData.productoDescripcion || ""); // Nombre del producto
                    setFecha(ventaData.fecha || "");
                    setHora(ventaData.hora || "");
                    setEstatus(ventaData.estatus || "vendido");
                } catch (error) {
                    console.error("Error al cargar los datos de la venta:", error);
                }
            }
        }
        fetchVentaData();
    }, [id]);

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

    async function editarVenta(e) {
        e.preventDefault();
        const url = `http://localhost:3000/b/editarVenta/${id}`;
        const datos = {
            idUsuario,
            idProducto,
            fecha,
            hora,
            estatus,
        };

        try {
            const respuesta = await axios.delete(url, { data: datos });
            console.log(respuesta.data);
            alert("Venta editada correctamente");
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al intentar editar la venta:", error);
            alert("Ocurrió un error al intentar editar la venta");
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={editarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Cliente"
                            className="form-control mb-3"
                            id="idUsuario"
                            value={clienteSeleccionado}
                            data-id={idUsuario}
                            onChange={(e) => {
                                setClienteSeleccionado(e.target.value);
                                buscarClientes(e.target.value);
                            }}
                            type="text"
                            required
                        />
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {clientes.map((cliente) => (
                                <li
                                    key={cliente.id}
                                    onClick={() => {
                                        setClienteSeleccionado(cliente.nombre);
                                        setIdUsuario(cliente.id);
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
                            placeholder="Producto"
                            className="form-control mb-3"
                            id="idProducto"
                            value={productoSeleccionado}
                            data-id={idProducto}
                            onChange={(e) => {
                                setProductoSeleccionado(e.target.value);
                                buscarProductos(e.target.value);
                            }}
                            type="text"
                        />
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {productos.map((producto) => (
                                <li
                                    key={producto.id}
                                    onClick={() => {
                                        setProductoSeleccionado(producto.descripcion);
                                        setIdProducto(producto.id);
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

                        <input
                            placeholder="Fecha"
                            className="form-control mb-3"
                            id="fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                        <input
                            placeholder="Hora"
                            className="form-control mb-3"
                            id="hora"
                            type="time"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                        />
                        <select
                            className="form-control mb-3"
                            id="estatus"
                            value={estatus}
                            onChange={(e) => setEstatus(e.target.value)}
                        >
                            <option value="vendido">Vendido</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Guardar edición de venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
