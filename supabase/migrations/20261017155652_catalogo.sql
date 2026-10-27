create type formato_producto as enum ('paca', 'unidad');
create type tamano_producto as enum ('normal', 'plus');

create table tipos (            -- calidad: súper premium, premium...
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  descripcion text,
  orden int not null default 0,
  activo boolean not null default true
);

create table categorias (       -- hombre, mujer, niños...
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  orden int not null default 0,
  activa boolean not null default true
);

create table tipos_prenda (     -- camisetas, jeans, chaquetas...
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  imagen_url text,
  orden int not null default 0,
  activo boolean not null default true
);

create table marcas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  logo_url text,
  orden int not null default 0,
  activa boolean not null default true
);

create table productos (
  id uuid primary key default gen_random_uuid(),
  formato formato_producto not null,
  nombre text not null,
  slug text not null unique,
  descripcion text,
  precio numeric(10,2) not null check (precio >= 0),
  stock int not null default 1 check (stock >= 0),
  tipo_id uuid not null references tipos(id),
  categoria_id uuid not null references categorias(id),
  tipo_prenda_id uuid references tipos_prenda(id),
  tamano tamano_producto not null default 'normal',
  talla text,
  color text,
  peso_kg numeric(6,2),
  cantidad_prendas int,
  destacado boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint paca_requiere_datos check (
    formato <> 'paca' or (peso_kg is not null and cantidad_prendas is not null)
  ),
  constraint unidad_requiere_datos check (
    formato <> 'unidad' or (
      nullif(trim(talla), '') is not null
      and nullif(trim(color), '') is not null
    )
  ),
  constraint paca_sin_talla_color check (
    formato <> 'paca' or (talla is null and color is null)
  )
);

create table producto_marcas (
  producto_id uuid not null references productos(id) on delete cascade,
  marca_id uuid not null references marcas(id),
  primary key (producto_id, marca_id)
);

create table producto_fotos (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete cascade,
  url text not null,
  orden int not null default 0,
  es_principal boolean not null default false
);

create index on productos (formato, activo);
create index on productos (categoria_id);
create index on productos (tipo_id);
create index on productos (tipo_prenda_id);
create index on producto_fotos (producto_id);

create function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger productos_updated_at before update on productos
  for each row execute function set_updated_at();