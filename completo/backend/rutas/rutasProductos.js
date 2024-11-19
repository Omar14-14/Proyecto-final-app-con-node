var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, editarProducto } = require("../bd/productosBD");

ruta.get("/", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarporId/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

ruta.delete("/editarProducto/:id", async (req, res) => {
    var actualizado = await editarProducto(req.params.id, req.body);
    res.json(actualizado);
});

//Aabajo esta la ruta para sugerencias 
ruta.get("/buscar", async (req, res) => {
    const { query } = req.query; // Obtener el texto de búsqueda
    const productos = await mostrarProductos();

    // Filtrar productos por nombre que coincida parcialmente con el query
    const resultados = productos.filter(producto => 
        producto.descripcion.toLowerCase().includes(query.toLowerCase())
    );

    res.json(resultados);
});

module.exports = ruta;