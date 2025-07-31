-- Create user_preferences table
create table if not exists public.user_preferences (
  id uuid references auth.users on delete cascade not null primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  keywords text[] default '{}'::text[],
  hourly_rate_min numeric,
  fixed_price_min numeric,
  experience_levels text[] default '{}'::text[],
  client_verified_only boolean default false,
  min_client_spend numeric,
  min_client_rating numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint user_preferences_user_id_key unique (user_id)
);

-- Enable Row Level Security
alter table public.user_preferences enable row level security;

-- Create policies for user_preferences
create policy "Users can view their own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

-- Create a function to update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to update the updated_at column
create trigger handle_user_preferences_updated_at
  before update on public.user_preferences
  for each row
  execute function public.handle_updated_at();
