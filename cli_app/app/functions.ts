const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_-";
export function generateRandomString(length: number) {
  let slug = "";
  for (let times = 0; times < length; times++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
}
