revoke execute on function crear_perfil() from public, anon, authenticated;

-- El visitante solo necesita leer; quitarle escritura es una segunda barrera detrás de RLS
revoke insert, update, delete on all tables in schema public from anon;
alter default privileges in schema public revoke insert, update, delete on tables from anon;