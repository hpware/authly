import sql from "./app/lib/pg.ts";

await sql`
CREATE TABLE IF NOT EXISTS auth (
  uuid text primary key not null,
  captcha_answer text not null,
  video_json_data json not null
)
`;

await sql`
CREATE TABLE if not exists sessions (
  uuid text primary key not null,
  auth_uuid text not null,
  username_uuid text not null
)
`;

await sql`
create table if not exists bottle (
  uuid text primary key not null,
  for_user_uuid text not null,
  data text not null,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)
`;

process.exit(0);
