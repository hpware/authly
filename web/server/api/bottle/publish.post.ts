import sql from "~/lib/pg";
import { v4 as uuidv4 } from "uuid";
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
      /***
       action: "done",
       to: uuid,
       data: currentStatus,
       */
      const isValidUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const isValidInput =
        body.to?.length > 0 &&
        isValidUUID.test(body.to) &&
        typeof body.data === "boolean";

      if (!isValidInput) {
        return {
          success: false,
          message:
            "Invalid input: Please ensure you're providing a valid UUID and boolean value",
        };
      }
      console.log(body);
      await sql`
        update bottle
        set done = ${body.data}
        where uuid = ${body.to}
        `;
      return {
        true: "yes",
        msg: null,
      };
    } else if (body.action === "submit") {
      if (!body.data) {
        return {
          true: "no",
          msg: "are you trying to use another client to send actions 🧐 you are missing a json col.",
        };
      }
      await sql`
        INSERT INTO bottle (uuid, for_user_uuid, data)
        values (${uuidv4()}, ${session.user}, ${body.data})
        `;
      return {
        true: "yes",
        msg: null,
      };
    } else {
      return {
        true: "no",
        msg: "this actions does not exist, please dice and find thje correct one 🎲",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      true: "no",
      msg: "no, this is not running, dont try refreshing ⛔",
    };
  }
});
