# Planteamiento-ShopCraft
Este repositorio tiene como objetivo ver las bases y los lenguajes de programacion que seran incluidas en el proyecto "ShopCraft"

-Para conectar a la base de datos se utilizara php, el cual se utilizara XAMPP, y se creara la carpeta 'apiFrameworks', la cual contendra el index.php que contiene la logica para 
manejar la interaccion de los datos para ocn la aplicacion de react(CRUD), y otra carpeta que se llamara 'db' donde se alojara db.php que contiene toda la logica para conectar a la base de datos creada desde 'http://localhost/phpmyadmin/index.php' utilizando MySql, dicha base se llama 'tutorial' con el fin de testear como php (lenguaje orientado a la parte del servidor) interactua con react (lenguaje orientado a la parte del cliente) y como hacer que ambos lenguajes funcionen de manera sincronizada y funcional.

-para crear la Aplicacion de react el comando es el siguiente:'npx create-react-app crudframeworks' donde 'crudframeworks' sera el nombre de nuestra aplicacion
-Tambien se instalara 'npm i bootstrap reactstrap axios' donde:{
    Boostrap: Este servira para brindarle a nuestra pagina web variedades de estilos y un comportamiento responsivo
    Reactstrap: Este servira para otorgar una mejor visualizacion a las ventanas modales que utilizara nuestra aplicacion
    Axios: Este servira como mediador para poder realizar las peticiones a la api que creamos anteriormente
}


