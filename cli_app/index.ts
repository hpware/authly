import { generateRandomString } from "./app/functions";
import fs from "fs";

const filepath = "/home/howard/.authly/computerId";
const server = process.env.SERVER_URL;
async function computerId() {
  try {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, "utf-8");
    }
    process.stdout.write("File does not exist!");
  } catch (e) {
    process.stdout.write("\nRequest failed! Press Control+C to quit \n");
    while (1);
  }
}

computerId();
