import sql from "~/lib/pg";
export default async function checkSession(sessionId: string) {
  const sessionFind = await sql`
    select * from sessions
    where username_uuid = ${sessionId}
    `;
  if (sessionFind.length === 0) {
    return {
      loggedIn: false,
      user: null,
    };
  }
  return {
    loggedIn: true,
    user: sessionFind[0].username_uuid,
  };
}
