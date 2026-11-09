-- Modelo físico inicial de docs/data-model.md. No incorpora Supabase Auth.
-- Sin IF NOT EXISTS: una divergencia de esquema debe fallar, no ocultarse.
create table public.teachers (
    id uuid primary key default gen_random_uuid(),
    cognito_sub text not null unique check (btrim(cognito_sub) <> ''),
    name text not null check (btrim(name) <> ''),
    email text not null check (btrim(email) <> '')
);

create table public.courses (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references public.teachers(id) on delete restrict,
    name text not null check (btrim(name) <> ''),
    level text not null check (btrim(level) <> ''),
    -- ISO: lunes = 1, domingo = 7. Horas locales del taller, sin zona horaria.
    day_of_week smallint not null check (day_of_week between 1 and 7),
    start_time time not null,
    end_time time not null,
    status text not null default 'active' check (status in ('active', 'inactive'))
);

create table public.students (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references public.teachers(id) on delete restrict,
    name text not null check (btrim(name) <> ''),
    birth_date date not null,
    -- El modelo no define un catálogo de género; no se inventa un enum.
    gender text not null check (btrim(gender) <> '')
);

create table public.course_students (
    course_id uuid not null references public.courses(id) on delete restrict,
    student_id uuid not null references public.students(id) on delete restrict,
    primary key (course_id, student_id)
);

create table public.class_sessions (
    id uuid primary key default gen_random_uuid(),
    course_id uuid not null references public.courses(id) on delete restrict,
    date date not null,
    unique (course_id, date)
);

create table public.class_observations (
    id uuid primary key default gen_random_uuid(),
    class_session_id uuid not null unique references public.class_sessions(id) on delete restrict,
    raw_text text not null check (btrim(raw_text) <> ''),
    -- Sin default: [] debe ser un resultado explícito, no un estado pendiente.
    topics text[] not null check (array_position(topics, null) is null),
    general_observation text check (general_observation is null or btrim(general_observation) <> ''),
    created_at timestamptz not null default now()
);

create table public.student_observations (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.students(id) on delete restrict,
    class_session_id uuid not null references public.class_sessions(id) on delete restrict,
    observation text not null check (btrim(observation) <> ''),
    created_at timestamptz not null default now(),
    unique (class_session_id, student_id)
);

create table public.course_analyses (
    id uuid primary key default gen_random_uuid(),
    course_id uuid not null unique references public.courses(id) on delete restrict,
    summary text not null check (btrim(summary) <> ''),
    recommendations text[] not null check (array_position(recommendations, null) is null),
    -- Debe informarse la fecha de generación, no asignar la fecha de inserción.
    generated_at timestamptz not null
);

-- Bloqueo inicial de la Data API. No son políticas RLS por docente.
-- Los roles existen en Supabase; una prueba con PostgreSQL puro debe crearlos.
alter table public.teachers enable row level security;
alter table public.courses enable row level security;
alter table public.students enable row level security;
alter table public.course_students enable row level security;
alter table public.class_sessions enable row level security;
alter table public.class_observations enable row level security;
alter table public.student_observations enable row level security;
alter table public.course_analyses enable row level security;

revoke all privileges on table
    public.teachers, public.courses, public.students, public.course_students,
    public.class_sessions, public.class_observations,
    public.student_observations, public.course_analyses
from public, anon, authenticated, service_role;
