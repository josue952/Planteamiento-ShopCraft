<?php
$pdo=null;//hace referencia a la base de datos
$host="localhost";//hace referencia al servidor
$user="root";//hace referencia al usuario de la base de datos
$password="";//en 'http://localhost/phpmyadmin/index.php' no se coloca contraseña
$db="tutorial";//hace referencia al nombre de la base de datos

//Funcion para conectar a la base de datos
function connect(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['db'].";charset=utf8",$GLOBALS['user'],$GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        print("Error!: No se pudo conectar a la base de datos ".$GLOBALS['db']."<br/>");
        print("\nError!: ".$e."<br/>");
        die();
    }
}
//Funcion para desconectar de la base de datos
function disconnect(){
    $GLOBALS['pdo']=null;
}
//Funcion para ejecutar un query de tipo INSERT, DELETE, UPDATE
function methodGet($query){
    try{
        connect();
        $sentence=$GLOBALS['pdo']->prepare($query);
        $sentence->setFetchMode(PDO::FETCH_ASSOC);//lo convierte en un arreglo asociativo
        $sentence->execute();
        disconnect();
        return $sentence;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function methodPost($query, $queryAutoIncrement){
    try{
        connect();
        $sentence=$GLOBALS['pdo']->prepare($query);
        $sentence->execute();
        $idAutoIncrement=methodGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);  
        $result=array_merge($idAutoIncrement, $_POST);     
        $sentence->closeCursor();                        
        disconnect();
        return $sentence;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function methodPut($query){
    try{
        connect();
        $sentence=$GLOBALS['pdo']->prepare($query);
        $sentence->execute();
        $result=array_merge($_GET, $_POST);
        $sentence->closeCursor();
        disconnect();
        return $sentence;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function methodDelete($query){
    try{
        connect();
        $sentence=$GLOBALS['pdo']->prepare($query);
        $sentence->execute();
        $sentence->closeCursor();
        disconnect();
        return $_GET['id'];
    }catch(Exception $e){
        die("Error: ".$e);
    }
}
?>