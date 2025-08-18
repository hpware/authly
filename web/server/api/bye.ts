export default defineEventHandler((event) => {
  deleteCookie(event, "session");
  return {
    true: "yes",
  };
});
