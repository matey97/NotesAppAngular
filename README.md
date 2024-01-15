# Notes app (Angular version)

Este repositorio contiene una pequeña aplicación web desarrollada usando Angular cuyo objetivo es mostrar
implementación de historias de usuario, pruebas de aceptación y de integración. 

Este es un proyecto de ejemplo para las asignaturas Diseño de Software (EI1039) y Paradigmas de
Software (EI1048) del Grado en Ingeniería Informática de la Universitat Jaume I de Castellón, España.

> [!NOTE]
> Para obtener la especificación de las historias de usuario, así como otros proyectos de
> ejemplo, visitar el siguiente [repositorio](https://github.com/matey97/NotesAppVersions).

## Tecnologías empleadas

La aplicación en este repositorio es una aplicación desarrollada mediante el framework de desarrollo web
[Angular](https://angular.io). Las tecnologías empleadas en este proyecto son las siguientes:

- Framework: [Angular](https://angular.io).
- Lenguaje de programación: TypeScript.
- UI: implementación de [Material Design para Angular](https://material.angular.io) y [Bootstrap](https://getbootstrap.com).
- DB: almacenamiento local del navegador.
- Tests: [Karma](https://karma-runner.github.io/latest/index.html) + [Jasmine](https://jasmine.github.io).

### Herramientas necesarias

- [Node.js](https://nodejs.org): entorno de ejecución para JavaScript
- [npm](https://www.npmjs.com) (Node Package Manager): gestor de paquetes para Node.
- [Angular CLI](https://angular.io/cli): herramienta por linea de comandos para desarrollar proyectos Angular.

> [!TIP]
> Si surge cualquier problema, no dudéis en poneros en contacto.

## Estructura del repositorio

El repositorio contiene una gran cantidad de ficheros, pero lo que nos interesa esta en el directorio `src/`, donde
reside el código de la aplicación y las pruebas.

### La aplicación

El código principal de la aplicación se encuenta dentro del directorio `app`, la cual contiene los siguientes directorios y componentes:

- [`data`](src/app/data): definición del modelo de datos y del repositorio. A destacar:
  - [`NoteRepository`](src/app/data/notes-repository.ts): interfaz que define los métodos que debe cumplir un repositorio. Permitiría intercambiar distintos repositorios (p.ej., local, remoto).
- [`errors`](src/app/errors): definición de excepciones.
- [`services`](src/app/services): contiene el servicio [`NotesControllerService`](src/app/services/notes-controller.service.ts), la cual implementa las operaciones de gestión de notas.
- [`view`](src/app/view): define la intefaz de la aplicación. Componentes:
  - `notes-list`: página principal de la aplicación que muestra la lista de notas y permite realizar las acciones de gestión (añadir, actualizar, eliminar).
  - `dialog`: componente para añadir/editar notas.

Las aplicación web puede ejecutarse mediante el siguiente comando:

```bash
ng serve
```

### Las pruebas

En Angular, las deben se incluyen en cualquier fichero que sea nombrado como `*.spec.{ts|js}`. Cuando se genera un componente,
servicio, etc. usando Angular CLI, por defecto se crea un fichero para contener las pruebas del componente/servicio asociado.

En el proyecto, las pruebas tanto de aceptación y de integración van sobre el servicio [`NotesControllerService`](src/app/services/notes-controller.service.ts).
Las pruebas de integración están situadas en el fichero para pruebas asociado en `src/app/services/notes-controller.service.spec.ts`. Por otro lado, las prubeas
de aceptación se encuentran en el directorio [`acceptance`](src/acceptance).

- [`src/acceptance/notes-controller.service.spec.ts`](src/acceptance/notes-controller.service.spec.ts): pruebas de aceptación sobre
  el componente `NotesControllerService`. Se utilizan dependencias reales (base de datos).
- [`src/app/services/notes-controller.service.spec.ts`](src/app/services/notes-controller.service.spec.ts): contiene pruebas de integración análogas a las de aceptación.
  En estas pruebas, se inyecta un _mock_ de la base de datos a `NotesControllerService`.

Las pruebas pueden ejecutarse mediante el siguiente comando:

```bash
ng test
```

Las pruebas se ejecutan en el navegador, el cual puede abrirse automaticamente con la configuración adequada (preguntar para más información) 
o manualmente accediendo a la dirección que se indica tras ejecutar el comando.


## Autor

<a href="https://github.com/matey97" title="Miguel Matey Sanz">
  <img src="https://avatars3.githubusercontent.com/u/25453537?s=120" alt="Miguel Matey Sanz" width="120"/>
</a>

## Licencia

El código de este repositorio esta bajo la licencia Apache 2.0 (ver [LICENSE](LICENSE)).
