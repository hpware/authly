import sql from "~/lib/pg";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //console.log(body);
  if (false) {
  }
  // check user stuff
  const userData = await sql``;
  if (userData.length === 0) {
  }
  // submit session
  await sql``;
  return {
    true: "yes",
  };
});
