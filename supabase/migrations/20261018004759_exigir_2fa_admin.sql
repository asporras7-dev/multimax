create or replace function es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from perfiles where id = auth.uid() and rol = 'admin' and activo
  ) and coalesce(auth.jwt()->>'aal', 'aal1') = 'aal2'
$$;