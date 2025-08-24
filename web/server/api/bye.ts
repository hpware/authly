import sql from "~/lib/pg";
export default defineEventHandler(async (event) => {
  try {
    const session = getCookie(event, "session");
    if (
      !(
        session &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          session,
        )
      )
    ) {
      return {
        true: "no",
      };
    }
    await sql`
      DELETE FROM table_name
      WHERE auth_uuid = ${session};
      `;
    deleteCookie(event, "session");
    return {
      true: "yes",
    };
  } catch (e) {
    return {
      true: "no",
    };
  }
});
