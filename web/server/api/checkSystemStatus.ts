import sql from "~/lib/pg";
export default defineEventHandler(async (event) => {
  try {
    const session = getCookie(event, "session");
    if (!session) {
      return {
        true: "no",
      };
    }
    const checkSession = await sql`
      SELECT * from sessions
      WHERE auth_uuid = ${session} `;
    if (checkSession.length > 0) {
      return {
        true: "yes",
      };
    }
    return {
      true: "no",
    };
  } catch (e) {
    console.error(e);
    return {
      true: "no",
    };
  }
});
