import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost/apiFrameWorks/';
  const [data, setData] = useState([]);
  //estado para el modal para cuando este en true se abra y cuando este en false se cierre
  const [modalInsertar, setModalInsertar] = useState(false);

  const openCloseModalInsertar = () => {
    //cambia el estado del modalInsertar a su estado contrario
    //Si es true lo pone en false y si es false lo pone en true
    setModalInsertar(!modalInsertar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }

  useEffect(() => {
    peticionGet();
  },[])

  return (
    <div>
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
              <button className='btn btn-primary'>Editar</button>{" "}
              <button className='btn btn-danger' onClick={()=>openCloseModalInsertar()}>Eliminar</button>

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
            <input type='text' className='form-control' />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input type='text' className='form-control' />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input type='text' className='form-control' />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'>Insertar</button>{" "}
          <button className='btn btn-danger'>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
