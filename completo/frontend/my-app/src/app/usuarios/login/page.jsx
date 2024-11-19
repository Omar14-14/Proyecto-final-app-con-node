"use client"
const axios = require("axios");

async function verificarLogin(e){
    e.preventDefault();
    const url = "http://localhost:3000/login";
    const datos ={
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    const usuario =  await axios.post(url, datos);
    //console.log("Estas en verificar");
    //console.log(usuario.data);
    if (usuario.data.tipoUsuario=="usuario"){
        
        window.location.replace("/usuarios/mostrar");

    }else if (usuario.data.tipoUsuario=="admin"){

        window.location.replace("/usuarios/nuevo");

    }else{
        document.getElementById("mensaje").innerHTML="Datos incorrectos";
    }
    
}

export default function Login(){
    return(
        <div className="m-0 row justify-content-center">
            <form onSubmit={verificarLogin} className="col-6 mt-5" action="">
                <div className="card">
                    <div className="card-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <input className = "form-control mb-3" placeholder="Usuario" id = "usuario" type="text" autoFocus />
                        <input className = "form-control mb-3" placeholder="Password" id = "password" type="text" />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-secondary col-12" type="submit" >Inicar Sesión</button>
                        <div id="mensaje" className="text-danger fs-3"></div>
                    </div>
                </div>
            </form>
        </div>
    );
}