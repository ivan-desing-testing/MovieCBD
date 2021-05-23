# MovieCBD

Proyecto sobre la herramienta Mongo Shell y la creación de una API con funcionalidad CRUD 
para la asignatura Complemento de Bases de Datos.

Desarrollado con MongoDB y NodeJS.

## Instalación del entorno local

El sistema debe tener instalado NodeJS y NPM.
No es necesario instalar MongoDB, ya que la base de datos conectada por defecto es accesible de forma online.

https://www.mongodb.com/es

https://nodejs.org/es/

https://www.npmjs.com/get-npm

Para instalar todas las dependencias necesarias ejecutar en consola dentro del repositorio del proyecto:

```
npm install
```

Para arrancar el proyecto:

```
npm start dev
```

## Documentación de la API

### GET:    /movies/search/{title}

{title}: String

Devuelve una lista de películas cuyo título coincide con {title}.

### GET:    /movies/search/{title}/{limit}

{title}: String
{limit}: Integer

Devuelve una lista de películas cuyo título coincide con {title} y el máximo de elementos a devolver se especifica con el parámetro {limit}.

### GET:    /movies/{id}

{id}: String

Devuelve en formato JSON la película con {id} especificado.

### GET:    /actors/search/{name}

{name}: String

Devuelve una lista de actores cuyo nombre coincide con {name}.

### GET:    /actors/search/{name}/{limit}

{name}: String
{limit}: Integer

Devuelve una lista de actores cuyo nombre coincide con {name} y el máximo de elementos a devolver se especifica con el parámetro {limit}.

### GET:    /actors/{id}

{id}: String

Devuelve en formato JSON el actor con {id} especificado.

### POST:   /movies

Recibe el JSON de una película y lo guarda en la base de datos.

### POST:   /actors

Recibe el JSON de un actor y lo guarda en la base de datos.

### POST:	/movies/{id}

{id}: String

Enviando los datos de una película en formato JSON, actualiza dichos parámetros en la película con {id} especificado.

### POST:   /actors/{id}

Enviando los datos de un actor en formato JSON, actualiza dichos parámetros en el actor con {id} especificado.

### GET:    /actors/ranking/{min}/{max}

{min}: Integer
{max}: Integer

Devuelve una lista de actores cuyo parámetro ranking tiene un valor entre {min} y {max}.

### GET:    /movies/score/{min}/{max}

{min}: Integer
{max}: Integer

Devuelve una lista de películas cuya puntuación (campo score) tiene un valor entre {min} y {max}.

### POST:   /movies/{id1}/actors/{id2}

{id1}: String
{id2}: String

Inserta el nombre del actor con {id1} dentro de la lista de nombres de actores de la película con {id2}.

### GET:    /movies/score

Devuelve una lista de películas ordenadas de mayor a menor puntuación (score).

### GET:    /actors/ranking

Devuelve una lista de películas ordenadas de mayor a menor ranking.

## Enlace al despliegue en Heroku

https://mongomovie--cbd-api.herokuapp.com/
