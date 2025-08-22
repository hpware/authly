export default defineEventHandler((event) => {
  try {
    deleteCookie(event, "session");
    return {
      true: "yes",
    };
  } catch (e) {
    return {
      true: "no",
    };
  }
});
