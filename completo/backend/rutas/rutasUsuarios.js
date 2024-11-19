var ruta = require("express").Router();
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, editarUsuario, login} = require("../bd/usuariosBD"); 

ruta.post("/login",async(req,res)=>{
    const usuario = await login(req, req.body.usuario, req.body.password);
    //console.log(usuario);
    
    res.json(usuario)
})


ruta.get("/", async (req,res)=>{
    //res.send("Hola, estas en raíz");
    const usuarios = await mostrarUsuarios();
    //console.log(usuarios);
    res.json(usuarios);
});

ruta.get("/buscarporId/:id", async(req,res)=>{
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

ruta.delete("/borrarUsuario/:id", async(req,res)=>{
    var borrado = await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario", async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

ruta.delete("/editarUsuario/:id", async (req, res) => {
    var resultado = await editarUsuario(req.params.id, req.body);
    res.json(resultado);
});

//ACA ABAJO ESTA LA RUTA PARA LAS SUGERENCIAS

ruta.get("/buscar", async (req, res) => {
    const { query } = req.query; // Obtener el texto de búsqueda
    const usuarios = await mostrarUsuarios();
    
    // Filtrar usuarios por nombre que coincida parcialmente con el query
    const resultados = usuarios.filter(usuario => 
        usuario.nombre.toLowerCase().includes(query.toLowerCase())
    );

    res.json(resultados);
});

module.exports = ruta;