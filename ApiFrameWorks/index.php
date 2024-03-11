<?php
include './bd/bd.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from frameworks where id=".$_GET['id'];
        $result=methodGet($query);
        echo json_encode($result->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from frameworks";
        $result=methodGet($query);
        echo json_encode($result->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}

//se cambia a 'POST' porque php no soporta el metodo 'PUT' y solamente se puede
//obtener los datos por medio de 'GET' y 'POST'
//Se debe de utilizar 'METHOD' e ingresar la opcion que se desea utilizar, ya sea 'POST', 'PUT' o 'DELETE'
if($_POST['METHOD']=='POST'){//Se crea 'METHOD' para poder hacer las peticiones con 'POST' (llamar los datos que se encuentra en la base de datos)
    unset($_POST['METHOD']);
    //se obtienen los datos del formulario segundo el nombre de los campos en la base de datos 'frameworks'
    $nombre=$_POST['nombre'];
    $lanzamiento=$_POST['lanzamiento'];
    $desarrollador=$_POST['desarrollador'];
    $query="insert into frameworks(nombre, lanzamiento, desarrollador) values ('$nombre', '$lanzamiento', '$desarrollador')";
    $queryAutoIncrement="select MAX(id) as id from frameworks";
    $result=methodPost($query, $queryAutoIncrement);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){//Se crea 'METHOD' para poder hacer las peticiones con 'PUT' (para ingresar datos a la base de datos)
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $lanzamiento=$_POST['lanzamiento'];
    $desarrollador=$_POST['desarrollador'];
    $query="update frameworks set nombre='$nombre', lanzamiento='$lanzamiento', desarrollador='$desarrollador' where id='$id'";
    $result=methodPut($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){//Se crea 'METHOD' para poder hacer las peticiones con 'DELETE' (para eliminar datos de la base de datos)
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="delete from frameworks where id='$id'";
    $result=methodDelete($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>