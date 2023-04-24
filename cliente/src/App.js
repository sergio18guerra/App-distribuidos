import './App.css';
import{ useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

const [nombre,setnombre] = useState("");
const [edad,setedad] = useState("");
const [pais,setpais] = useState("");
const [cargo,setcargo] = useState("");
const [anios,setanios] = useState("");
const [id,setid] = useState("");

const [editar,seteditar] = useState("false");

const [empleadoslista,setempleados] = useState([]);

const add = ()=>{
  Axios.post("http://localhost:3001/create",{
  nombre:nombre,
  edad:edad,
  pais:pais,
  cargo:cargo,
  anios:anios
  }).then(()=>{
    getempleados();
    limpiarcampos();
    Swal.fire({
      title: "<strong>Registro Exitoso!!</strong>",
      html: "<i>El empleado <strong>"+nombre+"<strong>fue registrado con exito!!</i>",
      icon: 'success',
      timer: 3000
    })
  });
}

const update = ()=>{
  Axios.put("http://localhost:3001/update",{
  id:id,
  nombre:nombre,
  edad:edad,
  pais:pais,
  cargo:cargo,
  anios:anios
  }).then(()=>{
    getempleados();
    limpiarcampos();
    Swal.fire({
      title: "<strong>Actualizacion Exitosa!!</strong>",
      html: "<i>El empleado <strong>"+nombre+"<strong>fue Actualizado con exito!!</i>",
      icon: 'success',
      timer: 3000
    })
  });
}


const eliminar = (id)=>{

  Swal.fire({
    title: 'Confirmar eliminado?',
    html: "<i>Realmente desea eliminar el registro?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28B463',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
        getempleados();
        limpiarcampos();
        Swal.fire(
          'Eliminado!',
          'Registro eliminado',
          'success'
        )
      });
    }
  });

}


const limpiarcampos = ()=>{
  setanios("");
  setnombre("");
  setcargo("");
  setedad("");
  setpais("");
  setid("");
  seteditar(false);
}

const editarempleado = (value) =>{
    seteditar(true);

    setnombre(value.nombre);
    setedad(value.edad);
    setcargo(value.cargo);
    setpais(value.pais);
    setanios(value.anios);
    setid(value.id);
}

const getempleados = ()=>{
  Axios.get("http://localhost:3001/empleados").then((response)=>{
    setempleados(response.data);
  });
}

getempleados();

  return (
  <div className="container-fluid">
  <div className="card text-center">
  <div className="card-header">
    GESTION DE EMPLEADOS
  </div>
  <div className="card-body">
  <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Nombre:</span>
  <input type="text" 
    onChange={(event)=>{
      setnombre(event.target.value);
    }}
  className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Edad:</span>
  <input type="number" value={edad}
    onChange={(event)=>{
      setedad(event.target.value);
    }}
  className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Pais:</span>
  <input type="text" value={pais}
    onChange={(event)=>{
    setpais(event.target.value);
  }} 
  className="form-control" placeholder="Ingrese el nombre del pais" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Cargo: </span>
  <input type="text" value={cargo}
        onChange={(event)=>{
          setcargo(event.target.value);
        }}
  className="form-control" placeholder="Ingrese el nombre del pais" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Años de experiencia: </span>
  <input type="text" value={anios}
        onChange={(event)=>{
          setanios(event.target.value);
        }}
  className="form-control" placeholder="Ingrese los años de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
  </div>
  <div className="card-footer text-body-secondary">
    {
      editar==true?
      <div>
      <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
      <button className='btn btn-info m-2' onClick={limpiarcampos}>cancelar</button>
      </div>
      :<button className='btn btn-success' onClick={add}>Registrar</button>
    }
    
  </div>
</div>

<table className="table table-striped">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {
        empleadoslista.map((value,key)=>{
          return <tr key={value.id}>
                  <th scope="row">{value.id}</th>
                  <td>{value.nombre}</td>
                  <td>{value.edad}</td>
                  <td>{value.pais}</td>
                  <td>{value.cargo}</td>
                  <td>{value.anios}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      
                      onClick={()=>{
                        editarempleado(value);
                      }}

                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={()=>{

                        eliminar(value.id);

                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
        })
      }

    
  </tbody>
</table>
    </div>
  );
}

export default App;
