export default defineEventHandler(async (event) => {
  const body = readBody(event);
  return {
    true: "yes",
  };
});
