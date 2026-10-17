create type rol_usuario as enum ('cliente', 'admin');

create table perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  telefono text,
  rol rol_usuario not null default 'cliente',
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

-- Todo usuario nuevo recibe un perfil de cliente automáticamente
create function crear_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin insert into perfiles (id) values (new.id); return new; end $$;

create trigger al_crear_usuario after insert on auth.users
  for each row execute function crear_perfil();

-- Función de apoyo para las políticas
create function es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from perfiles where id = auth.uid() and rol = 'admin' and activo
  )
$$;

-- Perfiles: cada quien ve el suyo, el admin ve todos.
-- Nadie puede cambiarse el rol desde el cliente.
alter table perfiles enable row level security;
revoke update on perfiles from authenticated;
grant update (nombre, telefono) on perfiles to authenticated;

create policy "ver perfil propio o admin" on perfiles
  for select using (id = auth.uid() or es_admin());
create policy "editar perfil propio" on perfiles
  for update using (id = auth.uid());

-- Catálogo: lectura pública, escritura solo admin
alter table tipos enable row level security;
alter table categorias enable row level security;
alter table tipos_prenda enable row level security;
alter table marcas enable row level security;
alter table productos enable row level security;
alter table producto_marcas enable row level security;
alter table producto_fotos enable row level security;

create policy "leer tipos" on tipos for select using (activo or es_admin());
create policy "leer categorias" on categorias for select using (activa or es_admin());
create policy "leer tipos_prenda" on tipos_prenda for select using (activo or es_admin());
create policy "leer marcas" on marcas for select using (activa or es_admin());
create policy "leer productos" on productos for select using (activo or es_admin());
create policy "leer producto_marcas" on producto_marcas for select using (true);
create policy "leer producto_fotos" on producto_fotos for select using (true);

create policy "admin escribe tipos" on tipos for all using (es_admin()) with check (es_admin());
create policy "admin escribe categorias" on categorias for all using (es_admin()) with check (es_admin());
create policy "admin escribe tipos_prenda" on tipos_prenda for all using (es_admin()) with check (es_admin());
create policy "admin escribe marcas" on marcas for all using (es_admin()) with check (es_admin());
create policy "admin escribe productos" on productos for all using (es_admin()) with check (es_admin());
create policy "admin escribe producto_marcas" on producto_marcas for all using (es_admin()) with check (es_admin());
create policy "admin escribe producto_fotos" on producto_fotos for all using (es_admin()) with check (es_admin());

-- Almacenamiento de fotos: lectura pública, subida solo admin
insert into storage.buckets (id, name, public) values ('productos', 'productos', true);

create policy "admin sube fotos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'productos' and es_admin());
create policy "admin actualiza fotos" on storage.objects
  for update to authenticated
  using (bucket_id = 'productos' and es_admin());
create policy "admin borra fotos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'productos' and es_admin());