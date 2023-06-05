# Flexy Register

## Objetivo del proyecto

Prueba técnica para la app Flexy.

## Boilerplate del proyecto

El boilerplate de este proyecto se creó utilizando Vite (https://vitejs.dev), y sus comandos son los proporcionados por la herramienta.

Para correr el proyecto en el localHost, es necesario el comando `run dev`.

## Características del proyecto

Este proyecto esta desarrollado con React y consta de una vista de Login, con un componente que se encarga tanto de gestionar el ingreso como el registro de un nuevo agente.

Dado que este proyecto no cuenta con un backend real, para simular una base de datos se utiliza el sessionStorage del navegador, por lo que se puede "registrar" un usuario, y luego se puede loguear ese usuario con las mismas credenciales.

## Comportamiento esperado

- Los inputs cuentan con validaciones propias. Si no se cumplen estas condiciones, aparecerá un mensaje de error.

- El botón del formulario no se activará hasta que no se complete toda la info necesaria y no existan errores en la misma.

- Al registrarse correctamente, se disparará un modal, dando la bienvenida al usuario, pero al no tener una pagina de inicio, no habrá una redirección. El usuario se guardará en un array de usuarios que simula la base de datos y se guardará en el sessionStorage del navegador.

- Al loguearse correctamente, se disparará el mismo modal (con otro texto); al existir problemas con el login, el modal informará al usuario del problema.

- "Recuperar Contraseña" no tiene un funcionamiento práctico, ya que no existe una pagina de recuperación de contraseña con un form adecuado para ello.

## Tecnologías utilizadas

El proyecto utiliza:

- Bootstrap: principalmente para la gestión del display y responsiveness. Los componentes se desarrollaron manualmente, para una mayor flexibilidad de estilo.

- Zustand: para la gestión de estados globales. Se utilizó solamente para la autorización simulada y la lógica de los modales.

## Estructura del proyecto

### Componentes

- Vista de Login: contiene los demas componentes de la app.

- LoginWidget: Se encarga de renderizar el widget para loguearse o registrarse o recuperar la contraseña. Dentro de el se encuentran los StyledInputs.

- StyledInputs: Son inputs componentizados a los que se aplica el estilo indicado en el maquetado de Figma.

- UploadWidget: Es un input estilado tal como se indica en el maquetado de Figma. Su función es recibir un archivo del usuario, y convertirlo a base64 para poder guardarse con el resto de la info del usuario en el sessionStorage, ademas de poder mostrarlo en el formulario.

- InfoModal: Es un modal cuyo único fin es indicar algo al usuario, dando unicamente la opción de "continuar".

### Utils

Utils es una carpeta con archivos que guardan funciones que pueden ser útiles a lo largo del proyecto, a medida que este crezca.

### Hooks

Hooks guarda los hooks personalizados que funcionan como Store de la aplicación, gracias a Zustand.