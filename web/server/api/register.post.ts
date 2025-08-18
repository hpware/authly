import sql from "~/lib/pg";
import { v4 as uuidv4 } from "uuid";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    return {
      true: "no",
    };
  }
  const isValidUUID = (uuid: string) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  const isValidVideoArray = (videoData: any) => {
    try {
      const data =
        typeof videoData === "string" ? JSON.parse(videoData) : videoData;
      // Check if it's an array
      if (!Array.isArray(data)) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const validAnswers = [
    "qin shi huang",
    "qinshihuang",
    "秦始皇",
    "qin shi huangdi",
    "qinshihuangdi",
    "idk",
  ];

  if (
    body.uuid &&
    isValidUUID(body.uuid) &&
    body.video_json_data &&
    isValidVideoArray(body.video_json_data) &&
    body.captcha_answer &&
    validAnswers.includes(body.captcha_answer.toLowerCase().trim())
  ) {
    // Proceed with your logic here
  } else {
    return {
      true: "no",
      msg: "Whoops! Your data is incompelete.",
    };
  }
  try {
    const checkIfUserExists = await sql`
      SELECT * FROM auth
      WHERE uuid = ${body.uuid}
      `;
    if (checkIfUserExists.length > 0) {
      return {
        true: "no",
        msg: "Oh no! This account exists",
      };
    }
    await sql`
      INSERT INTO auth (uuid, captcha_answer, video_json_data)
      VALUES (${body.uuid}, ${body.captcha_answer}, ${body.video_json_data})
      `;
    const auth_uuid = uuidv4();
    await sql`
      INSERT INTO sessions(uuid, auth_uuid, username_uuid)
      VALUES (${uuidv4()}, ${auth_uuid}, ${body.uuid})`;
    setCookie(event, "session", auth_uuid);
    return {
      true: "yes",
      account: body.uuid,
    };
  } catch (e) {
    console.log(e);
    return {
      true: "no",
      msg: "Oh no! Something went wrong.",
    };
  }
});

/**
 *
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

 */
