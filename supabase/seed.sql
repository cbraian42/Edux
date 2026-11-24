-- OPCIONAL: datos totalmente ficticios para un proyecto de desarrollo vacío.
-- La CLI no lo aplica automáticamente (db.seed.enabled = false).
-- Una segunda ejecución falla y revierte todo: no modifica registros previos.
begin;

insert into public.teachers (id, cognito_sub, name, email) values
    ('00000000-0000-4000-8000-000000000001', 'local-test-teacher-a', 'Docente de prueba A', 'teacher-a@example.invalid'),
    ('00000000-0000-4000-8000-000000000002', 'local-test-teacher-b', 'Docente de prueba B', 'teacher-b@example.invalid');

insert into public.courses (id, teacher_id, name, level, day_of_week, start_time, end_time) values
    ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'Robótica de prueba A', 'Inicial', 1, '17:00', '18:00'),
    ('10000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'Robótica de prueba A2', 'Inicial', 3, '17:00', '18:00'),
    ('10000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000002', 'Robótica de prueba B', 'Inicial', 2, '17:00', '18:00');

insert into public.students (id, teacher_id, name, birth_date, gender) values
    ('20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'Alumno ficticio A', '2016-01-01', 'Sin especificar'),
    ('20000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000002', 'Alumno ficticio B', '2016-01-01', 'Sin especificar');

insert into public.course_students (course_id, student_id) values
    ('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001'),
    ('10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001'),
    ('10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000002');

insert into public.class_sessions (id, course_id, date) values
    ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', '2026-11-02');

insert into public.class_observations (id, class_session_id, raw_text, topics, general_observation) values
    ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'Registro ficticio sin información relevante para extraer.', array[]::text[], null);

-- No se inventan observaciones individuales ni análisis del curso.
commit;
