# Proyecto Escalab 2021 - React con Graphql

Este proyecto permite conectar con el  <a href="https://github.com/Vilo0/graphql-server-node">`Backend`</a> realizado con `NodeJs` y `Graphql`. Administación de posts, autenticación y administración del perfil de usuario.

### Variables de entorno

```
REACT_APP_GRAPHQL_ENDPOINT: Url del backend -> Ejemplo http://localhost:8000/graphql
REACT_APP_REST_ENDPOINT:  Ejemplo http://localhost:8000
REACT_APP_CONFIRMATION_EMAIL_REDIRECT:  Ejemplo http://localhost:8000/complete-registration
REACT_APP_PASSWORD_FORGOT_REDIRECT: Ejemplo http://localhost:8000/login
PUBLIC_URL: (Opcional) 
```

#### Firebase

Documentación de generación de información: <a href="https://firebase.google.com/docs/web/setup?hl=es-419">`https://firebase.google.com/docs/web/setup?hl=es-419`</a>


```
REACT_APP_FIREBASE_APIKEY: apiKey
REACT_APP_FIREBASE_AUTHDOMAIN: authDomain
REACT_APP_FIREBASE_PROJECTID: projectId
REACT_APP_FIREBASE_STORAGEBUCKET: storageBucket
REACT_APP_FIREBASE_MESSAGINGSENDERID: messagingSenderId
REACT_APP_FIREBASE_APPID: appId
```

### Script disponibles

En el directorio del proyecto, puede ejecutar:

Parámetros de búsqueda para los post:

```
- Cantidad de post por página
- Paginación a través de botones de NEXT y PREVIUS
- Búsqueda de texto a través del context
```

##### `yarn start`

Ejecuta la aplicación en modo de desarrollo.

Abrir <a href="http://localhost:3000">`http://localhost:3000`</a> para ver la web en el navegador.

La página se recargará si realiza modificaciones.
También verá cualquier error que haya en la consola.

##### `yarn build`

Construye la aplicación para producción en la carpeta `build`.
Compila React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

¡Tu aplicación está lista para el `deploy`!

Ver la sección en [deployment](https://facebook.github.io/create-react-app/docs/deployment) para más información.


### IMPORTANTE

```
Para el login y/o registro, se requiere de un correo real, con el cual deben hacer las validaciones necesarias para su correcto inicio de sesión.
Permisos en el caso del Login con Gmail. Permiso a través de un correo que se envía cuando es con el mail y posteriormente con el password.
```
