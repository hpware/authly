export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    return new Response("Params incorrect", {
      status: 400,
    });
  }
  if (body.token && body.account) {
  } else {
    return new Response("Params incorrect", {
      status: 400,
    });
  }
});
