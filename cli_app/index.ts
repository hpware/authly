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
async function computerId() {
  try {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, "utf-8");
    }
    process.stdout.write("File does not exist! Generating a new one! \n");
    const randomString = generateRandomString(30);
    fs.writeFileSync(filepath, randomString);
  } catch (e) {
    console.error(e);
    process.stdout.write("\nRequest failed! Press Control+C to quit \n");
    while (1);
  }
}

computerId();
