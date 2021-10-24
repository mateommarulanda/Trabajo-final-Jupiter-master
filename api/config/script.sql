CREATE TABLE public.usuarios (
    nombre varchar NOT NULL,
    id varchar NOT NULL,
    apellidos varchar NOT NULL,
    rol int4 NOT NULL,
    clave varchar NOT NULL
);
CREATE TABLE public.categorias (
	nombre varchar NOT NULL,
	id varchar NOT NULL
);
CREATE TABLE public.reservas (
	id varchar NOT NULL,
	lugar varchar NOT NULL,
	hora int NOT NULL
);
CREATE TABLE public.proyectos (
	codigo varchar NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar,
    estado varchar NOT NULL
);