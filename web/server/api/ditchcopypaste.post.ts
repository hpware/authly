// yes all the true: "no" is intentional
import sql from "~/lib/pg";
import { v4 as uuidv4 } from "uuid";
import { videoJson, videoJson2 } from "../components/defaultVideoJson";
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body) {
      return {
        true: "no",
        msg: "This request does not include any of your secrets 😔",
      };
    }
    if (
      !(
        body.username.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        ) &&
        body.captcha_data &&
        body.video_json_data
      )
    ) {
      return {
        true: "no",
        msg: "Aww snap! You have seriously missed a bunch of important details!",
      };
    }
    if (
      !(
        JSON.stringify(body.video_json_data) !== JSON.stringify(videoJson) &&
        JSON.stringify(body.video_json_data) !== JSON.stringify(videoJson2)
      )
    ) {
      return {
        true: "no",
        msg: "This is super insecure 💥💥 Please change it!",
      };
    }
    const normalizedAnswer = body.captcha_data.toLowerCase().trim();
    const validAnswers = [
      "qin shi huang",
      "qinshihuang",
      "秦始皇",
      "qin shi huangdi",
      "qinshihuangdi",
      "idk", // yeah some ppl just don't know this
      "🐻‍❄️",
    ];
    if (!validAnswers.some((answer) => normalizedAnswer.includes(answer))) {
      return {
        true: "no",
        msg: "nooo, please go here to watch what I'm talking about https://www.instagram.com/share/_j8VKKUfE",
      };
    }
    // check user stuff
    const userData = await sql`
      SELECT * FROM auth
      WHERE uuid = ${body.username}`;
    if (userData.length === 0) {
      return {
        true: "no",
        msg: "OH NO, THIS ACCOUNT DOES NOT EXIST 🫨",
      };
    }
    if (
      !(
        userData[0].captcha_answer === body.captcha_data &&
        JSON.stringify(userData[0].video_json_data) ===
          JSON.stringify(body.video_json_data)
      )
    ) {
      return {
        true: "no",
        msg: "maybe you got it wrong 🤔 idk, im just a if statment",
      };
    }
    const session_uuid = uuidv4();
    setCookie(event, "session", session_uuid);
    // submit session
    await sql`
      INSERT INTO sessions (uuid, auth_uuid, username_uuid)
      VALUES (${uuidv4()}, ${session_uuid}, ${body.username})
      `;
    return {
      true: "yes",
      msg: null,
    };
  } catch (e) {
    console.error(e);
    return {
      true: "no",
      msg: e.msg,
    };
  }
});

/**
 * await sql`
 CREATE TABLE if not exists sessions (
   uuid text primary key not null,
   auth_uuid text not null,
   username_uuid text not null
 )
 `;
 */
