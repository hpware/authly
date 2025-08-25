import sql from "~/lib/pg";
import checkSession from "~~/server/components/checkSession";
export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "session") || "";
  const body = await readBody(event);
  if (
    !(
      sessionCookie.length !== 0 &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        sessionCookie,
      )
    )
  ) {
    return {
      true: "no",
      msg: "Yeah you shouldn't be here. 🧐",
    };
  }
  const session = await checkSession(sessionCookie);
  if (session.loggedIn === false) {
    return {
      true: "no",
      msg: "Yeah you shouldn't be here. 🧐",
    };
  }
  if (!(body && body.action)) {
    return {
      true: "no",
      msg: "yea please dont send nothing 🪹",
    };
  }
  try {
    if (body.action === "done") {
    } else if (body.action === "submit") {
    } else {
      return {
        true: "no",
        msg: "this actions does not exist, please dice and find thje correct one 🎲",
      };
    }
  } catch (e) {
    return {
      true: "no",
      msg: "no, this is not running, dont try refreshing ⛔",
    };
  }
});
