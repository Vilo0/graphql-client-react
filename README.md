# Proyecto Escalab 2021 - React con Graphql

Este proyecto permite conectar con el  <a href="https://github.com/Vilo0/graphql-server-node">`Backend`</a> realizado con `NodeJs` y `Graphql`. Administación de posts, autenticación y administración del perfil de usuario.

Link demo del proyecto: <a href="https://vilo0.github.io/graphql-client-react/">`https://vilo0.github.io/graphql-client-react/`</a>

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
