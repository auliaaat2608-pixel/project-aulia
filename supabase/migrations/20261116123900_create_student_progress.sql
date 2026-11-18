create table public.student_progress (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 30),
  pretest_score numeric(5, 2) check (pretest_score between 0 and 100),
  posttest_score numeric(5, 2) check (posttest_score between 0 and 100),
  updated_at timestamptz not null default now()
);

alter table public.student_progress enable row level security;

grant select, insert, update on public.student_progress to authenticated;

create policy "Students can view their own progress"
  on public.student_progress
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Students can insert their own progress"
  on public.student_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Students can update their own progress"
  on public.student_progress
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
