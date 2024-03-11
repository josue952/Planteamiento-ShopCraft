import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost/apiFrameWorks/';
  const [data, setData] = useState([]);
  //estado para el modal para cuando este en true se abra y cuando este en false se cierre
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSelected, setFrameworkSelect] = useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  });

  //esta funcion se encarga de capturar los datos que se ingresan en los inputs
  const handleChange = e => {
    const {name, value} = e.target;
    setFrameworkSelect((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(frameworkSelected);
  }

  //se ejecutara cada vez que la pagina se recargue o sufriera algun cambio
  useEffect(() => {
    peticionGet();
  });

  const openCloseModalInsertar = () => {
    //cambia el estado del modalInsertar a su estado contrario
    //Si es true lo pone en false y si es false lo pone en true
    setModalInsertar(!modalInsertar);
  }

  const openCloseModalEditar = () => {
    //cambia el estado del modalInsertar a su estado contrario
    //Si es true lo pone en false y si es false lo pone en true
    setModalEditar(!modalEditar);
  }

  const openCloseModalEliminar = () => {
    //cambia el estado del modalInsertar a su estado contrario
    //Si es true lo pone en false y si es false lo pone en true
    setModalEliminar(!modalEliminar);
  }

  //funcion que se encarga de jalar los datos de la base de datos
  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  
  //funcion que se encarga de insertar los datos en la base de datos
  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSelected.nombre);
    f.append("lanzamiento", frameworkSelected.lanzamiento);
    f.append("desarrollador", frameworkSelected.desarrollador);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response => {
        setData(data.concat(response.data));
        openCloseModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  //funcion que se encarga de actualizar los datos en la base de datos  
  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSelected.nombre);
    f.append("lanzamiento", frameworkSelected.lanzamiento);
    f.append("desarrollador", frameworkSelected.desarrollador);
    f.append("METHOD", "PUT");  
    await axios.post(baseUrl, f, {params: {id: frameworkSelected.id}})
      .then(response => {
        var dataNueva = data;
        dataNueva.map(framework=>{
          if(framework.id === frameworkSelected.id){
            framework.nombre = frameworkSelected.nombre;
            framework.lanzamiento = frameworkSelected.lanzamiento;
            framework.desarrollador = frameworkSelected.desarrollador;
          }
        })
        setData(dataNueva);
        openCloseModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  //funcion que se encarga de eliminar los datos en la base de datos
  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: frameworkSelected.id}})
      .then(response => {
        setData(data.filter(framework => framework.id !== frameworkSelected.id));
        openCloseModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  //funcion que se encarga de seleccionar el framework que se quiere editar o eliminar
  const selectFramework = (framework, caso) => {
    setFrameworkSelect(framework);
    (caso === "Editar")?
    openCloseModalEditar():
    openCloseModalEliminar();
  }


  return (
    <div style={{textAlign:'center'}}>
      <br />
        <button className='btn btn-success' onClick={()=>openCloseModalInsertar()}>Insertar</button>
      <br /><br />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/*Renderiza todos los datos que hay en la tabla 'frameworks' en la base de datos*/}
          {data.map(framework=>(
            <tr key={framework.id}>{/*Agregamos un key para que react pueda identificar cada elemento, la cual fue obtenida gracias al id de la base de datos en MySql*/ }
              <td>{framework.id}</td>
              <td>{framework.nombre}</td>{/*Agregamos el nombre, la cual fue obtenida gracias al id de la base de datos en MySql*/ }
              <td>{framework.lanzamiento}</td>{/*Cada dato obetenido dependera de que se quiera mostrar y las tablas que han en la BD*/ }
              <td>{framework.desarrollador}</td>
            <td>
              <button className='btn btn-primary' onClick={() => selectFramework(framework, "Editar")}>Editar</button>{" "}
              <button className='btn btn-danger' onClick={() => selectFramework(framework, "Eliminar")}>Eliminar</button>

            </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar framework</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nombre: </label>
            <br />
            <input type='text' className='form-control' name='nombre' onChange={handleChange}/>
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input type='text' className='form-control' name='lanzamiento' onChange={handleChange}/>
            <br />
            <label>Desarrollador: </label>
            <br />
            <input type='text' className='form-control' name='desarrollador' onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => peticionPost()}>Insertar</button>{" "}
          <button className='btn btn-danger' onClick={() => openCloseModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar framework</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nombre: </label>
            <br />
            <input type='text' className='form-control' name='nombre' onChange={handleChange} value={frameworkSelected && frameworkSelected.nombre}/>
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input type='text' className='form-control' name='lanzamiento' onChange={handleChange} value={frameworkSelected && frameworkSelected.lanzamiento}/>
            <br />
            <label>Desarrollador: </label>
            <br />
            <input type='text' className='form-control' name='desarrollador' onChange={handleChange} value={frameworkSelected && frameworkSelected.desarrollador}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => peticionPut()}>Editar</button>{" "}
          <button className='btn btn-danger' onClick={() => openCloseModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el framework {frameworkSelected && frameworkSelected.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => peticionDelete()}>
            sí
          </button>
          <button className='btn btn-secondary' onClick={() => openCloseModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
