import { generateRandomString } from "./app/functions";
import fs from "fs";
import path from "path";
import os from "os";

const args = {
  clientID:
    process.argv.find((arg) => arg.startsWith("--client="))?.split("=")[1] ||
    "100",
};

const filepath = path.join(os.homedir(), ".authly", "computerId");
const dirPath = path.dirname(filepath);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
const server = process.env.SERVER_URL;
function computerId() {
  try {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, "utf-8");
    }
    process.stdout.write("File does not exist! Generating a new one! \n");
    const randomString = generateRandomString(40);
    fs.writeFileSync(filepath, randomString);
    return randomString;
  } catch (e) {
    console.error(e);
    process.stdout.write("\nRequest failed! Press Control+C to quit \n");
    while (1);
  }
}

async function PublishId() {
  try {
    const computerid = computerId();
    const req = await fetch(`${server}/api/yourcompoter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        computer: computerid,
        clientID: args.clientID,
      }),
    });
    const res = await req.json();
    console.log(res);
  } catch (e) {}
}

PublishId();
