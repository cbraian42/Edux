-- Ejecutar como administrador solo en desarrollo. Todos los datos se revierten.
begin;

do $$
declare
    teacher uuid;
    student uuid;
    course uuid;
    session uuid;
    observation uuid;
    analysis uuid;
    external_sub text := 'schema-check-' || gen_random_uuid()::text;
    table_name text;
    api_role text;
begin
    insert into public.teachers (cognito_sub, name, email)
    values (external_sub, 'Docente ficticia', 'schema-check@example.invalid') returning id into teacher;
    insert into public.students (teacher_id, name, birth_date, gender)
    values (teacher, 'Alumno ficticio', '2016-01-01', 'Sin especificar') returning id into student;
    insert into public.courses (teacher_id, name, level, day_of_week, start_time, end_time)
    values (teacher, 'Curso ficticio', 'Inicial', 1, '17:00', '18:00') returning id into course;
    insert into public.course_students values (course, student);
    insert into public.class_sessions (course_id, date)
    values (course, '2026-11-02') returning id into session;
    insert into public.class_observations (class_session_id, raw_text, topics, general_observation)
    values (session, 'Texto original ficticio.', array[]::text[], null) returning id into observation;
    insert into public.student_observations (student_id, class_session_id, observation)
    values (student, session, 'Observación ficticia.') returning id into observation;
    insert into public.course_analyses (course_id, summary, recommendations, generated_at)
    values (course, 'Resumen ficticio.', array[]::text[], '2026-11-03T12:00:00Z') returning id into analysis;

    -- Las seis reglas de unicidad del modelo deben rechazar duplicados.
    begin
        insert into public.teachers (cognito_sub, name, email) values (external_sub, 'Otra', 'other@example.invalid');
        raise exception 'Se aceptó cognito_sub duplicado';
    exception when unique_violation then null;
    end;
    begin
        insert into public.course_students values (course, student);
        raise exception 'Se aceptó vinculación duplicada';
    exception when unique_violation then null;
    end;
    begin
        insert into public.class_sessions (course_id, date) values (course, '2026-11-02');
        raise exception 'Se aceptó encuentro duplicado';
    exception when unique_violation then null;
    end;
    begin
        insert into public.class_observations (class_session_id, raw_text, topics)
        values (session, 'Otro registro.', array[]::text[]);
        raise exception 'Se aceptó segundo registro docente';
    exception when unique_violation then null;
    end;
    begin
        insert into public.student_observations (student_id, class_session_id, observation)
        values (student, session, 'Segunda observación.');
        raise exception 'Se aceptó segunda observación del mismo alumno y encuentro';
    exception when unique_violation then null;
    end;
    begin
        insert into public.course_analyses (course_id, summary, recommendations, generated_at)
        values (course, 'Otro resumen.', array[]::text[], now());
        raise exception 'Se aceptó segundo análisis para el curso';
    exception when unique_violation then null;
    end;

    -- Relaciones, nulos y dominios básicos.
    begin
        insert into public.class_sessions (course_id, date) values (gen_random_uuid(), '2026-11-03');
        raise exception 'Se aceptó referencia a curso inexistente';
    exception when foreign_key_violation then null;
    end;
    begin
        delete from public.teachers where id = teacher;
        raise exception 'Se eliminó una docente con información dependiente';
    exception when foreign_key_violation then null;
    end;
    begin
        update public.class_observations set topics = null where class_session_id = session;
        raise exception 'Se aceptaron temas nulos';
    exception when not_null_violation then null;
    end;
    begin
        update public.class_observations set general_observation = '' where class_session_id = session;
        raise exception 'Se aceptó observación general vacía en lugar de null';
    exception when check_violation then null;
    end;
    begin
        update public.courses set day_of_week = 8 where id = course;
        raise exception 'Se aceptó día fuera del rango ISO';
    exception when check_violation then null;
    end;
    begin
        update public.courses set status = 'deleted' where id = course;
        raise exception 'Se aceptó estado de curso desconocido';
    exception when check_violation then null;
    end;

    -- Desactivar conserva el historial; el último análisis se reemplaza.
    update public.courses set status = 'inactive' where id = course;
    if not exists (select 1 from public.class_sessions where id = session) then
        raise exception 'Se perdió el historial al desactivar';
    end if;
    update public.course_analyses set summary = 'Resumen actualizado.', generated_at = '2026-11-04T12:00:00Z' where id = analysis;
    if (select count(*) from public.course_analyses where course_id = course) <> 1 then
        raise exception 'No se conserva un único último análisis';
    end if;
    if not exists (select 1 from public.class_observations where class_session_id = session
        and raw_text = 'Texto original ficticio.' and topics = array[]::text[] and general_observation is null) then
        raise exception 'No se conserva texto original y categorías vacías';
    end if;

    -- Barrera inicial: ninguna tabla se expone a los roles de la Data API.
    foreach table_name in array array['teachers', 'courses', 'students', 'course_students',
        'class_sessions', 'class_observations', 'student_observations', 'course_analyses'] loop
        if not (select relrowsecurity from pg_class where oid = ('public.' || table_name)::regclass) then
            raise exception 'RLS desactivada: %', table_name;
        end if;
        foreach api_role in array array['anon', 'authenticated', 'service_role'] loop
            if has_table_privilege(api_role, 'public.' || table_name, 'SELECT,INSERT,UPDATE,DELETE') then
                raise exception 'Acceso API inesperado: % / %', api_role, table_name;
            end if;
        end loop;
    end loop;
end;
$$;

rollback;
