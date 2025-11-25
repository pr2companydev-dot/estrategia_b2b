-- Create profiles table for user information
create table public.profiles (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies for user access
create policy "Users can view their own profile" 
on public.profiles 
for select 
using (auth.uid() = user_id);

create policy "Users can update their own profile" 
on public.profiles 
for update 
using (auth.uid() = user_id);

create policy "Users can insert their own profile" 
on public.profiles 
for insert 
with check (auth.uid() = user_id);

-- Create function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for automatic timestamp updates
create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at_column();

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, name)
  values (
    new.id, 
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name')
  );
  return new;
end;
$$;

-- Create trigger to auto-create profile on signup
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();